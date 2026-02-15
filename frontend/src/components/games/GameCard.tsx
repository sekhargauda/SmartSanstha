// frontend/src/components/games/GameCard.tsx

import React from 'react';
import { Clock, Lock, Brain, Scale, Zap, Puzzle, Lightbulb, Building2, Landmark, Gamepad2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
  onPlay: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  const icons = {
    Brain,
    Scale,
    Zap,
    Puzzle,
    Lightbulb,
    Building2, 
    Landmark, 
    Building: Building2, 
  };

  const Icon = icons[game.icon as keyof typeof icons] || Brain;

  const difficultyColors = {
    easy: { bg: 'from-green-500 to-emerald-500', text: 'text-green-400', badge: 'bg-green-900/50' },
    medium: { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-400', badge: 'bg-yellow-900/50' },
    hard: { bg: 'from-red-500 to-pink-500', text: 'text-red-400', badge: 'bg-red-900/50' },
  };

  const colors = difficultyColors[game.difficulty];

  return (
    <Card hover={game.isAvailable} className={`group ${!game.isAvailable ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center ${game.isAvailable ? 'group-hover:scale-110' : ''} transition-transform duration-300 shadow-lg relative`}>
          <Icon className="w-8 h-8 text-white" />
          {!game.isAvailable && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.text} ${colors.badge}`}>
          {game.difficulty.toUpperCase()}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
        {game.title}
      </h3>
      <p className="text-slate-400 text-sm mb-4">{game.subtitle}</p>
      <p className="text-slate-500 text-xs mb-6">{game.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Clock className="w-4 h-4" />
          <span>{game.estMinutes} min</span>
        </div>
        <Button
          size="sm"
          variant={game.isAvailable ? 'primary' : 'secondary'}
          onClick={onPlay}
          disabled={!game.isAvailable}
        >
          {game.isAvailable ? 'Play Now' : 'Coming Soon'}
        </Button>
      </div>
    </Card>
  );
};