// frontend/src/components/dashboard/ScoreCard.tsx

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../common/Card';

interface ScoreCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  gradient: string;
  trend?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ icon: Icon, label, value, gradient, trend }) => {
  return (
    <Card className="text-center">
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mx-auto mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400 mb-2">{label}</div>
      {trend && (
        <div className="text-xs font-semibold text-green-400">{trend}</div>
      )}
    </Card>
  );
};