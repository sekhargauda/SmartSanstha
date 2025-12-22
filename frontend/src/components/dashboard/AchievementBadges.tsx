// frontend/src/components/dashboard/AchievementBadges.tsx

import React from 'react';
import { Award, Star, Zap, Target, Trophy, Medal } from 'lucide-react';
import { Card } from '../common/Card';

export const AchievementBadges: React.FC = () => {
  const achievements = [
    { id: 1, icon: Star, title: 'First Steps', desc: 'Complete your first game', earned: true, color: 'from-yellow-500 to-orange-500' },
    { id: 2, icon: Zap, title: 'Speed Learner', desc: 'Complete 5 games in one day', earned: true, color: 'from-blue-500 to-cyan-500' },
    { id: 3, icon: Target, title: 'Perfectionist', desc: 'Score 100% in a quiz', earned: true, color: 'from-purple-500 to-pink-500' },
    { id: 4, icon: Trophy, title: 'Constitution Master', desc: 'Read all 25 parts', earned: false, color: 'from-green-500 to-emerald-500' },
    { id: 5, icon: Medal, title: 'Week Warrior', desc: '7-day learning streak', earned: true, color: 'from-red-500 to-pink-500' },
    { id: 6, icon: Award, title: 'Quiz Champion', desc: 'Complete 10 quizzes', earned: false, color: 'from-indigo-500 to-purple-500' },
  ];

  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-bold text-white">Achievements</h2>
        </div>
        <span className="text-sm text-slate-400">{earnedCount}/{achievements.length}</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`relative group cursor-pointer transition-transform hover:scale-110 ${!achievement.earned ? 'opacity-40' : ''}`}
              title={`${achievement.title}: ${achievement.desc}`}
            >
              <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center relative overflow-hidden`}>
                <Icon className="w-8 h-8 text-white relative z-10" />
                {!achievement.earned && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
                )}
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl border border-slate-700">
                <div className="font-bold mb-1">{achievement.title}</div>
                <div className="text-slate-400">{achievement.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};