import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FaImage, FaPaperPlane, FaTimes, FaRobot } from 'react-icons/fa';
import ImageDropZone from './ImageDropZone.jsx';
import BugResultCard from './FloatingChatAgent';

const BugSearchChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock mutation for processing text queries
  const textQueryMutation = useMutation({
    mutationFn: (text) => {
      // This would be your actual API call
      console.log('Processing text query:', text);
      // Simulating API response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            results: [
              {
                id: 'BUG-1234',
                title: 'Application crashes when disk space is low',
                description: 'The application fails to handle low disk space gracefully and crashes without warning.',
                status: 'resolved',
                severity: 'high',
                product: 'DAPA',
                resolution: 'Added proper error handling for disk space checks and user notifications.',
                similarityScore: 0.92
              },
              {
                id: 'BUG-789',
                title: 'Disk space warning not showing correctly',
                description: 'Warning about low disk space appears even when there is sufficient space available.',
                status: 'in-progress',
                severity: 'medium',
                product: 'COsec',
                resolution: null,
                similarityScore: 0.78
              }
            ]
          });
        }, 1500);
      });
    },
    onSuccess: (data) => {
      addMessage({
        type: 'response',
        content: data.results,
        timestamp: new Date()
      });
    }
  });

  // Mock mutation for processing image queries
  const imageQueryMutation = useMutation({
    mutationFn: (imageFile) => {
      // This would be your actual API call
      console.log('Processing image:', imageFile.name);
      // Simulating API response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            results: [
              {
                id: 'BUG-5678',
                title: 'Error dialog appears with incorrect formatting',
                description: 'Error messages in dialog boxes have formatting issues, making them hard to read.',
                status: 'open',
                severity: 'medium',
                product: 'DPM',
                resolution: null,
                similarityScore: 0.89
              }
            ]
          });
        }, 2000);
      });
    },
    onSuccess: (data) => {
      addMessage({
        type: 'response',
        content: data.results,
        timestamp: new Date()
      });
      setIsDropzoneActive(false);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
    setTimeout(scrollToBottom, 100);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || textQueryMutation.isPending) return;

    // Add user message
    addMessage({
      type: 'user',
      content: inputText,
      timestamp: new Date()
    });

    // Process with AI
    textQueryMutation.mutate(inputText);
    setInputText('');
  };

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Add user message with image
      addMessage({
        type: 'user',
        content: file,
        isImage: true,
        timestamp: new Date()
      });

      // Process with AI
      imageQueryMutation.mutate(file);
    }
  };

  const toggleDropzone = () => {
    setIsDropzoneActive(!isDropzoneActive);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
        <FaRobot className="text-xl mr-2" />
        <h2 className="font-semibold">Bug Search Assistant</h2>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FaRobot className="text-5xl mb-4 text-blue-500" />
            <p className="text-lg font-medium mb-2">Welcome to Bug Search Assistant</p>
            <p className="text-center max-w-md">
              Drop an image of your error or paste your error message below to find similar bugs and their solutions.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 ${msg.type === 'user' ? 'flex justify-end' : ''}`}
            >
              <div 
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.type === 'user' 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                {msg.isImage ? (
                  <div>
                    <div className="flex items-center mb-2">
                      <FaImage className="mr-2" />
                      <span className="font-medium">{msg.content.name}</span>
                    </div>
                    <img 
                      src={URL.createObjectURL(msg.content)} 
                      alt="Uploaded error" 
                      className="max-h-64 rounded-md"
                    />
                  </div>
                ) : msg.type === 'user' ? (
                  <p>{msg.content}</p>
                ) : (
                  <div className="space-y-4">
                    <p className="font-medium text-gray-700 mb-2">
                      Found {msg.content.length} potential matches:
                    </p>
                    {msg.content.map((result, idx) => (
                      <BugResultCard key={idx} bug={result} />
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Image dropzone (conditionally rendered) */}
      {isDropzoneActive && (
        <div className="p-4 bg-gray-100 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Upload Error Screenshot</h3>
            <button 
              onClick={toggleDropzone}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <ImageDropZone 
            onDrop={handleImageDrop} 
            isLoading={imageQueryMutation.isPending}
          />
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleTextSubmit} className="flex items-center">
          <button
            type="button"
            onClick={toggleDropzone}
            className={`p-2 rounded-full mr-2 ${
              isDropzoneActive 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title="Upload image"
          >
            <FaImage />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste error message or describe your issue..."
            className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={textQueryMutation.isPending}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || textQueryMutation.isPending}
            className={`bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg py-2 px-4 flex items-center ${
              !inputText.trim() || textQueryMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {textQueryMutation.isPending ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : (
              <>
                <FaPaperPlane className="mr-1" /> Send
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BugSearchChat;