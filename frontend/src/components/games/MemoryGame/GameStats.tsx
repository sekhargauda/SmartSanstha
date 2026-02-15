// frontend/src/components/games/MemoryGame/GameStats.tsx

import React from 'react';
import { Target, CheckCircle, Clock, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '../../common/Button';

interface GameStatsProps {
  moves: number;
  matches: number;
  totalPairs: number;
  time: string;
  best: number | null;
  onNewGame: () => void;
}

export const GameStats: React.FC<GameStatsProps> = ({ moves, matches, totalPairs, time, best, onNewGame }) => {
  const stats = [
    { icon: <Target />, label: "Moves", value: moves },
    { icon: <CheckCircle />, label: "Matches", value: `${matches}/${totalPairs}` },
    { icon: <Clock />, label: "Time", value: time },
    { icon: <Trophy />, label: "Best", value: best === null ? "—" : `${best} moves` },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-slate-700">
          <div className="text-orange-400">{React.cloneElement(stat.icon, { className: 'w-5 h-5' })}</div>
          <span className="text-sm font-semibold text-slate-300">{stat.label}: {stat.value}</span>
        </div>
      ))}
      <Button onClick={onNewGame} icon={<RotateCcw className="w-5 h-5" />}>New Game</Button>
    </div>
  );
};