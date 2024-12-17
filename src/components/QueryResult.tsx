import React from 'react';
import { ClipboardCopy, AlertCircle } from 'lucide-react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface QueryResultProps {
  query: string | null;
  error?: string | null;
}

export function QueryResult({ query, error }: QueryResultProps) {
  const { copied, copyToClipboard } = useCopyToClipboard();

  if (error) {
    return (
      <div className="mt-6 p-4 bg-[#FFEBE6] rounded-lg border border-[#FF5630]">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-[#DE350B] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[#172B4D] font-medium mb-1">Query Not Ready</h3>
            <p className="text-[#5E6C84]">{error}</p>
            <p className="text-[#5E6C84] mt-2">Please try fetching again in a few moments.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!query) return null;

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-[#DFE1E6]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-[#172B4D]">Generated Boolean Query</h3>
        <button
          onClick={() => copyToClipboard(query)}
          className="flex items-center space-x-1 text-sm text-[#0052CC] hover:text-[#0747A6]"
        >
          <ClipboardCopy className="w-4 h-4" />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 bg-[#F4F5F7] rounded border border-[#DFE1E6] overflow-x-auto font-mono text-[#172B4D]">
        {query}
      </pre>
    </div>
  );
}