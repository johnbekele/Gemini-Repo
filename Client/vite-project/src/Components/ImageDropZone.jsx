import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaImage, FaSpinner } from 'react-icons/fa';

const ImageDropZone = ({ onDrop, isLoading }) => {
  const handleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onDrop(acceptedFiles);
    }
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      
      {isLoading ? (
        <div className="flex flex-col items-center text-gray-500">
          <FaSpinner className="text-3xl animate-spin mb-2" />
          <p>Processing image...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <FaImage className="text-4xl mb-3" />
          <p className="font-medium mb-1">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an error screenshot here'}
          </p>
          <p className="text-sm">or click to select a file</p>
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;