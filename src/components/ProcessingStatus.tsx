import React from 'react';
import { Timer } from './Timer';
import { FetchButton } from './buttons/FetchButton';
import { Loader2 } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  timerComplete: boolean;
  onTimerComplete: () => void;
  onFetch: () => void;
  isFetching: boolean;
  duration: number;
}

export function ProcessingStatus({
  isProcessing,
  timerComplete,
  onTimerComplete,
  onFetch,
  isFetching,
  duration
}: ProcessingStatusProps) {
  if (isProcessing) {
    return (
      <div className="flex items-center justify-center space-x-2 text-[#0052CC]">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Processing your text...</span>
      </div>
    );
  }

  if (!timerComplete) {
    return (
      <div className="space-y-4">
        <p className="text-center text-[#5E6C84]">Please wait while we process your job description</p>
        <Timer duration={duration} onComplete={onTimerComplete} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-[#5E6C84]">Processing complete! You can now fetch your query.</p>
      <FetchButton
        onClick={onFetch}
        isLoading={isFetching}
        disabled={false}
      />
    </div>
  );
}