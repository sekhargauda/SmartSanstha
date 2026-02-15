// frontend/src/components/games/RightsDutiesGame/BalanceMeter.tsx

import React from 'react';
import { Scale } from 'lucide-react';

interface BalanceMeterProps {
  freedom: number;
  order: number;
}

export const BalanceMeter: React.FC<BalanceMeterProps> = ({ freedom, order }) => {
  const freedomPercentage = Math.max(0, Math.min(100, freedom));
  const orderPercentage = Math.max(0, Math.min(100, order));

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 mb-8">
      <h2 className="text-center text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
        <Scale className="w-6 h-6 text-orange-400" />
        Societal Equilibrium
      </h2>
      <div className="flex justify-between items-center gap-6">
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-sky-300 mb-2 block">Freedom</span>
          <div className="w-full bg-slate-700 rounded-full h-10 overflow-hidden border-2 border-slate-600 shadow-inner">
            <div
              className="bg-gradient-to-r from-sky-500 to-blue-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
              style={{ width: `${freedomPercentage}%` }}
            >
              {freedomPercentage > 20 && (
                <span className="text-white font-bold text-sm">{freedomPercentage.toFixed(0)}</span>
              )}
            </div>
          </div>
          {freedomPercentage <= 20 && (
            <p className="text-white text-xl font-bold mt-2">{freedomPercentage.toFixed(0)}</p>
          )}
        </div>
        
        <div className="text-5xl text-slate-400">
          <Scale className="w-12 h-12" />
        </div>
        
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-teal-300 mb-2 block">Order</span>
          <div className="w-full bg-slate-700 rounded-full h-10 overflow-hidden border-2 border-slate-600 shadow-inner">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
              style={{ width: `${orderPercentage}%` }}
            >
              {orderPercentage > 20 && (
                <span className="text-white font-bold text-sm">{orderPercentage.toFixed(0)}</span>
              )}
            </div>
          </div>
          {orderPercentage <= 20 && (
            <p className="text-white text-xl font-bold mt-2">{orderPercentage.toFixed(0)}</p>
          )}
        </div>
      </div>
    </div>
  );
};