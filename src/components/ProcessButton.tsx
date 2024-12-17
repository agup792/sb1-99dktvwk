import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ProcessButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

export function ProcessButton({ onClick, isProcessing, disabled }: ProcessButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 px-4 bg-[#0052CC] text-white rounded-lg hover:bg-[#0747A6] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <Send className="w-5 h-5" />
          <span>Process Job Description</span>
        </>
      )}
    </button>
  );
}