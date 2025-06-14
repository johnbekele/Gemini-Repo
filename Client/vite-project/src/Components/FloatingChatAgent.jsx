import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaChevronUp } from 'react-icons/fa';
import ChatInterface from './ChatInterface';

const FloatingChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatBoxRef = useRef(null);

  const toggleChat = () => {
    if (isOpen) {
      // If already open, just toggle minimized state
      setIsMinimized(!isMinimized);
    } else {
      // If closed, open it and ensure it's not minimized
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  // Handle clicks outside the chat box to minimize it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target) && isOpen && !isMinimized) {
        setIsMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMinimized]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isOpen && !isMinimized ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open support chat"
      >
        <FaRobot className="text-2xl" />
      </button>

      {/* Chat box */}
      {isOpen && (
        <div
          ref={chatBoxRef}
          className={`fixed right-6 z-40 transition-all duration-300 transform ${
            isMinimized 
              ? 'bottom-6 w-80 h-14 rounded-full' 
              : 'bottom-6 w-96 h-[600px] rounded-lg'
          } bg-white shadow-2xl flex flex-col overflow-hidden`}
          style={{ maxHeight: 'calc(100vh - 100px)' }}
        >
          {isMinimized ? (
            <div 
              onClick={toggleChat}
              className="flex items-center justify-between w-full h-full px-4 cursor-pointer bg-blue-600 text-white"
            >
              <div className="flex items-center">
                <FaRobot className="text-xl mr-2" />
                <span className="font-medium">Bug Search Assistant</span>
              </div>
              <FaChevronUp className="text-sm" />
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <FaRobot className="text-xl mr-2" />
                  <h2 className="font-semibold">Bug Search Assistant</h2>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="text-white hover:text-blue-200 mr-2"
                    aria-label="Minimize chat"
                  >
                    <FaChevronUp />
                  </button>
                  <button
                    onClick={closeChat}
                    className="text-white hover:text-blue-200"
                    aria-label="Close chat"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              
              {/* Chat interface */}
              <ChatInterface />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatAgent;