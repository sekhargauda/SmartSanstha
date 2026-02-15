// frontend/src/components/games/RightsDutiesGame/TokenTray.tsx

import React, { DragEvent, useState } from 'react';
import { IToken } from "../../../types";
import { Sparkles, GripVertical } from 'lucide-react';

interface TokenTrayProps {
  tokens: IToken[];
}

export const TokenTray: React.FC<TokenTrayProps> = ({ tokens }) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const Token = ({ token }: { token: IToken }) => {
    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('application/json', JSON.stringify(token));
      setDraggingId(token.id);
    };

    const onDragEnd = () => {
      setDraggingId(null);
    };

    const isDragging = draggingId === token.id;

    return (
      <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className={`relative cursor-grab active:cursor-grabbing p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all border-2 border-orange-400 group ${
          isDragging ? 'opacity-40 scale-95' : ''
        }`}
      >
        {/* Drag handle indicator */}
        <div className="absolute top-2 left-2 text-white/50 group-hover:text-white/80 transition-colors">
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Token content */}
        <div className="flex flex-col items-center text-center">
          <Sparkles className="w-6 h-6 mb-2 group-hover:animate-spin" />
          <span className="font-bold text-lg">{token.label}</span>
        </div>

        {/* Drag hint */}
        <div className="absolute -bottom-1 -right-1 bg-slate-900 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          DRAG ME
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900/50 rounded-2xl mt-6 border-2 border-slate-700">
      <h3 className="text-center text-xl font-semibold text-slate-300 mb-6 flex items-center justify-center gap-2">
        <Sparkles className="w-6 h-6 text-orange-400" />
        Choose Your Decision Token
        <Sparkles className="w-6 h-6 text-orange-400" />
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokens.map((token) => (
          <Token key={token.id} token={token} />
        ))}
      </div>
      <p className="text-center text-sm text-slate-400 mt-4 flex items-center justify-center gap-2">
        <GripVertical className="w-4 h-4" />
        Click and drag a token upward to the decision zone
      </p>
    </div>
  );
};