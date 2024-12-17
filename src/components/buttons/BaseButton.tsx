import React from 'react';
import { cn } from '../../utils/classNames';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success';
  children: React.ReactNode;
}

export function BaseButton({ 
  variant = 'primary', 
  className, 
  children, 
  disabled, 
  ...props 
}: BaseButtonProps) {
  const baseStyles = "w-full py-3 px-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors";
  
  const variantStyles = {
    primary: "bg-[#0052CC] hover:bg-[#0747A6] focus:ring-[#0052CC]",
    success: "bg-[#36B37E] hover:bg-[#2D9969] focus:ring-[#36B37E]",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}