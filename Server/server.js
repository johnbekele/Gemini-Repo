import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
import fs from "fs";
import MOCK_BUGS from "./mokeData/data.js";
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Set up file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = join(__dirname, "uploads");

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for memory storage (no disk writing)
const memoryStorage = multer.memoryStorage();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  }
});

// Set up multer with file filters
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Create two upload middlewares - one for memory and one for disk
const uploadToMemory = multer({ 
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: fileFilter
});

const uploadToDisk = multer({ 
  storage: diskStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: fileFilter
});

// Initialize Google GenAI client
const data = JSON.stringify(MOCK_BUGS);
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

// Direct processing endpoint - upload and process in one step
app.post("/process-image", uploadToDisk.single('image'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "No image file uploaded. Use 'image' as the field name."
      });
    }
    
    console.log("Processing image:", req.file.originalname);
    
    // Upload file to Google GenAI
    const myfile = await ai.files.upload({
      file: req.file.path,
      config: { mimeType: req.file.mimetype },
    });
    
    // Generate content using the uploaded file
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: createUserContent([
        createPartFromUri(myfile.uri, myfile.mimeType),
        `Use this ${data} data and respond with the resolution provided.`,
      ]),
    });
    
    // Return the AI response
    res.status(200).json({
      error: false,
      image: {
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
      },
      aiResponse: response.text
    });
    
  } catch (error) {
    console.error("Error processing image with Google GenAI:", error);
    res.status(500).json({
      error: true,
      message: "Failed to process image with AI",
      details: error.message
    });
  }
});

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Image Processing API is running. Use POST /process-image to upload and process an image.");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: true,
    message: "Internal server error",
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});