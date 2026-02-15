// frontend/src/components/games/RightsDutiesGame/ScenarioDisplay.tsx

import React from 'react';
import { IScenario } from '../../../types';

interface ScenarioDisplayProps {
  scenario: IScenario;
  currentIndex: number;
  totalScenarios: number;
}

export const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({ 
  scenario, 
  currentIndex, 
  totalScenarios 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-lg text-center my-6 border border-slate-600">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4 text-sm">
        <span className="text-orange-400 font-semibold">Scenario {currentIndex + 1} of {totalScenarios}</span>
      </div>
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-3">
        {scenario.title}
      </h3>
      <p className="text-slate-300 text-lg leading-relaxed">{scenario.description}</p>
    </div>
  );
};