// frontend/src/components/common/Card.tsx

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700
        ${hover ? 'transition-all duration-300 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};