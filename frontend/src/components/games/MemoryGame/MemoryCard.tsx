// frontend/src/components/games/MemoryGame/MemoryCard.tsx

import React from 'react';
import { Brain, CheckCircle, Lightbulb } from 'lucide-react';
import { ArticleCard } from '../../../types';

interface MemoryCardProps {
  card: ArticleCard;
  onFlip: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ card, onFlip }) => {
  return (
    <button
      className="group w-full rounded-xl h-40 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
      style={{ perspective: "1000px" }}
      onClick={onFlip}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 group-hover:scale-105"
        style={{ transformStyle: "preserve-3d", transform: card.flipped || card.matched ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 rounded-xl shadow-lg bg-gradient-to-br from-slate-700 to-slate-800 p-4 flex flex-col items-center justify-center text-white border border-slate-600" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="text-base font-bold tracking-wider mb-1">SmartSanstha</div>
          <div className="text-xs opacity-70 text-slate-400">Tap to Flip</div>
        </div>

        {/* BACK SIDE */}
        <div className={`absolute inset-0 rounded-xl shadow-xl flex flex-col justify-between p-3 ${card.matched ? 'bg-green-50 text-green-900 border-2 border-green-500' : 'bg-white text-slate-800 border-2 border-orange-500'}`} style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
          <div className="flex items-start justify-between">
            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${card.matched ? 'bg-green-100' : 'bg-orange-100 text-orange-700'}`}>
              {card.matched ? "MATCHED" : "ARTICLE"}
            </div>
            {card.matched && (
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-2xl font-bold text-center">{card.article}</div>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Lightbulb className="w-3 h-3" /> Learn
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};