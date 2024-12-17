import React from 'react';
import { ArrowDown } from 'lucide-react';

interface FetchButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export function FetchButton({ onClick, isLoading, disabled }: FetchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full py-3 px-4 bg-[#36B37E] text-white rounded-lg hover:bg-[#2D9969] focus:outline-none focus:ring-2 focus:ring-[#36B37E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Fetching Query...</span>
        </>
      ) : (
        <>
          <ArrowDown className="w-5 h-5" />
          <span>Fetch Boolean Query</span>
        </>
      )}
    </button>
  );
}