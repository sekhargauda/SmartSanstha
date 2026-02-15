// frontend/src/components/games/RightsDutiesGame/DropScale.tsx

import React, { DragEvent, useState } from 'react';
import { IToken } from "../../../types";
import { Scale, MousePointerClick, MoveDown } from 'lucide-react';

interface DropScaleProps {
  onDrop: (token: IToken) => void;
}

export const DropScale: React.FC<DropScaleProps> = ({ onDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const token: IToken = JSON.parse(e.dataTransfer.getData('application/json'));
    if (token) onDrop(token);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      {/* Arrow indicator */}
      <div className="flex justify-center mb-4 animate-bounce">
        <MoveDown className="w-8 h-8 text-orange-400" />
      </div>
      
      {/* Drop Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={handleDrop}
        className={`relative p-12 border-4 border-dashed rounded-2xl text-center transition-all duration-300 ${
          isDragOver
            ? 'border-orange-500 bg-orange-500/20 scale-105 shadow-2xl shadow-orange-500/50'
            : 'border-orange-500/50 bg-slate-800/50 hover:border-orange-400 hover:bg-slate-800/70'
        }`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Scale className="w-48 h-48 text-orange-500" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Scale className={`w-20 h-20 mx-auto mb-4 transition-all duration-300 ${
            isDragOver ? 'text-orange-400 animate-bounce scale-125' : 'text-orange-500/70'
          }`} />
          
          <h3 className={`text-2xl font-bold mb-2 transition-colors ${
            isDragOver ? 'text-orange-400' : 'text-slate-300'
          }`}>
            {isDragOver ? 'Release to Decide!' : 'Decision Zone'}
          </h3>
          
          <p className={`font-semibold transition-colors ${
            isDragOver ? 'text-orange-300' : 'text-slate-400'
          }`}>
            {isDragOver ? 'Drop your token here' : 'Drag and drop a token here to make your decision'}
          </p>

          {/* Visual cue */}
          {!isDragOver && (
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-500 text-sm">
              <MousePointerClick className="w-4 h-4" />
              <span>Click and drag from below</span>
            </div>
          )}
        </div>

        {/* Animated border effect */}
        {isDragOver && (
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 rounded-2xl animate-pulse bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20"></div>
          </div>
        )}
      </div>

      {/* Helper text */}
      <div className="text-center mt-4 text-slate-500 text-sm">
        💡 Tip: Each decision affects the balance between freedom and order
      </div>
    </div>
  );
};