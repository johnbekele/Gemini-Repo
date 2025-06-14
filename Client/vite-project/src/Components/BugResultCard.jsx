import React, { useState } from 'react';
import { FaBug, FaCheck, FaClock, FaExclamationTriangle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const BugResultCard = ({ bug }) => {
  const [expanded, setExpanded] = useState(false);

  // Status badge component
  const StatusBadge = ({ status }) => {
    let icon, bgColor, textColor;
    
    switch (status.toLowerCase()) {
      case 'resolved':
        icon = <FaCheck className="mr-1" />;
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'in-progress':
        icon = <FaClock className="mr-1" />;
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'open':
        icon = <FaExclamationTriangle className="mr-1" />;
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      default:
        icon = <FaBug className="mr-1" />;
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
    }

    return (
      <span className={`flex items-center text-xs px-2 py-1 rounded-full ${bgColor} ${textColor} font-medium`}>
        {icon} {status}
      </span>
    );
  };

  // Severity indicator component
  const SeverityIndicator = ({ level }) => {
    let bgColor;
    
    switch (level.toLowerCase()) {
      case 'critical':
        bgColor = 'bg-red-500';
        break;
      case 'high':
        bgColor = 'bg-orange-500';
        break;
      case 'medium':
        bgColor = 'bg-yellow-500';
        break;
      case 'low':
        bgColor = 'bg-green-500';
        break;
      default:
        bgColor = 'bg-gray-500';
    }

    return (
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${bgColor} mr-1`}></div>
        <span className="text-xs text-gray-600 capitalize">{level}</span>
      </div>
    );
  };

  // Calculate match percentage from similarity score
  const matchPercentage = Math.round(bug.similarityScore * 100);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <FaBug className="text-blue-500 mr-2" />
            <h3 className="font-medium text-gray-800">{bug.id}</h3>
            <span className="ml-2 text-sm bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
              {bug.product}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-blue-600 mr-2">
              {matchPercentage}% match
            </span>
            <StatusBadge status={bug.status} />
          </div>
        </div>
        
        <h4 className="font-semibold text-gray-900 mb-2">{bug.title}</h4>
        
        <div className="flex justify-between items-center mb-3">
          <SeverityIndicator level={bug.severity} />
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            {expanded ? (
              <>
                <FaChevronUp className="mr-1" /> Show less
              </>
            ) : (
              <>
                <FaChevronDown className="mr-1" /> Show more
              </>
            )}
          </button>
        </div>
        
        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-700">
            <p className="mb-3">{bug.description}</p>
            
            {bug.resolution ? (
              <div className="bg-green-50 p-3 rounded-md">
                <h5 className="font-medium text-green-800 mb-1">Resolution</h5>
                <p className="text-green-700">{bug.resolution}</p>
              </div>
            ) : (
              <div className="bg-yellow-50 p-3 rounded-md">
                <p className="text-yellow-700">This bug is still being investigated.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BugResultCard;