import React from 'react';
import { theme } from '../../config/theme';

interface CharacterCountProps {
  current: number;
  max: number;
}

export function CharacterCount({ current, max }: CharacterCountProps) {
  return (
    <div className={`text-sm text-[${theme.colors.text.secondary}]`}>
      {current.toLocaleString()}/{max.toLocaleString()} characters
    </div>
  );
}