import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { BaseButton } from './BaseButton';

interface ProcessButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  disabled: boolean;
}

export function ProcessButton({ onClick, isProcessing, disabled }: ProcessButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      variant="primary"
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
    </BaseButton>
  );
}