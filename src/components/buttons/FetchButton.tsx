import React from 'react';
import { ArrowDown } from 'lucide-react';
import { BaseButton } from './BaseButton';

interface FetchButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export function FetchButton({ onClick, isLoading, disabled }: FetchButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled || isLoading}
      variant="success"
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
    </BaseButton>
  );
}