import { useState, useCallback } from 'react';

export function useCopyToClipboard(duration = 2000) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), duration);
  }, [duration]);

  return { copied, copyToClipboard };
}