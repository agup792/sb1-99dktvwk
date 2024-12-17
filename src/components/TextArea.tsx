import React from 'react';
import { MAX_TEXT_LENGTH } from '../config/constants';
import { CharacterCount } from './display/CharacterCount';
import { theme } from '../config/theme';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextArea({ value, onChange }: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label 
        htmlFor="text-input" 
        className={`block text-lg font-medium text-[${theme.colors.text.primary}]`}
      >
        Paste the Job Description here (up to {MAX_TEXT_LENGTH.toLocaleString()} characters)
      </label>
      <textarea
        id="text-input"
        className={`w-full h-64 p-4 border border-[${theme.colors.border}] rounded-lg focus:ring-2 focus:ring-[${theme.colors.primary}] focus:border-transparent resize-none`}
        maxLength={MAX_TEXT_LENGTH}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your job description here..."
      />
      <CharacterCount current={value.length} max={MAX_TEXT_LENGTH} />
    </div>
  );
}