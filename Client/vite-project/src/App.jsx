import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FloatingChatAgent from './Components/FloatingChatAgent';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Your Main Application</h1>
        
        {/* Your main app content goes here */}
        <div className="bg-white p-6 rounded-lg shadow">
          <p>This is your main application content.</p>
          <p className="mt-4">The chat agent is available in the bottom right corner.</p>
        </div>
        
        {/* Floating chat agent */}
        <FloatingChatAgent />
      </div>
    </QueryClientProvider>
  );
}

export default App;