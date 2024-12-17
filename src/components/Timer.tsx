import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { theme } from '../config/theme';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

export function Timer({ duration, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const progress = ((duration - timeLeft) / duration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-[#DEEBFF] rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-[#0052CC]">
          <Clock className="w-5 h-5" />
          <span className="font-medium">Processing Time Remaining</span>
        </div>
        <span className="text-2xl font-bold text-[#0052CC] font-mono">
          {formatTime(minutes, seconds)}
        </span>
      </div>
      <div className="w-full h-2 bg-[#B3D4FF] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#0052CC] transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}