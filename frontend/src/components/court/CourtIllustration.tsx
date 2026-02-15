import React from 'react';
import { Scale, Users, BookOpen, Gavel } from 'lucide-react';

interface CourtIllustrationProps {
  currentSpeaker: string;
}

export const CourtIllustration: React.FC<CourtIllustrationProps> = ({ currentSpeaker }) => {
  const getSpeakerPosition = (speaker: string) => {
    const positions: { [key: string]: string } = {
      judge: 'top-10 left-1/2 -translate-x-1/2',
      defendant: 'bottom-32 right-1/4',
      counsel: 'bottom-32 left-1/4',
      witness: 'top-1/2 left-10',
      prosecutor: 'top-1/2 right-10',
    };
    return positions[speaker.toLowerCase()] || 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-800 via-slate-900 to-black overflow-hidden">
      {/* Background courtroom illustration */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          {/* Judge's bench */}
          <rect x="400" y="100" width="400" height="150" fill="#4e342e" />
          <rect x="420" y="120" width="360" height="110" fill="#5d4037" />
          
          {/* Defendant table */}
          <rect x="700" y="400" width="200" height="100" fill="#6d4c41" />
          
          {/* Counsel table */}
          <rect x="300" y="400" width="200" height="100" fill="#6d4c41" />
          
          {/* Witness stand */}
          <rect x="150" y="250" width="100" height="150" fill="#5d4037" />
          
          {/* Gallery */}
          <rect x="200" y="600" width="800" height="50" fill="#6d4c41" />
        </svg>
      </div>

      {/* Animated speaker indicators */}
      <div className="absolute inset-0">
        {/* Judge */}
        <div className={`absolute top-10 left-1/2 -translate-x-1/2 transition-all duration-500 ${
          currentSpeaker.toLowerCase() === 'judge' ? 'scale-125 opacity-100' : 'scale-100 opacity-40'
        }`}>
          <div className="relative">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl ${
              currentSpeaker.toLowerCase() === 'judge' ? 'animate-pulse ring-4 ring-orange-400' : ''
            }`}>
              <Gavel className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-white font-bold text-sm">Judge</span>
            </div>
          </div>
        </div>

        {/* Defendant */}
        <div className={`absolute bottom-32 right-1/4 transition-all duration-500 ${
          currentSpeaker.toLowerCase() === 'defendant' ? 'scale-125 opacity-100' : 'scale-100 opacity-40'
        }`}>
          <div className="relative">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl ${
              currentSpeaker.toLowerCase() === 'defendant' ? 'animate-pulse ring-4 ring-blue-400' : ''
            }`}>
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-white font-bold text-sm">Defendant</span>
            </div>
          </div>
        </div>

        {/* Counsel */}
        <div className={`absolute bottom-32 left-1/4 transition-all duration-500 ${
          currentSpeaker.toLowerCase() === 'counsel' ? 'scale-125 opacity-100' : 'scale-100 opacity-40'
        }`}>
          <div className="relative">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl ${
              currentSpeaker.toLowerCase() === 'counsel' ? 'animate-pulse ring-4 ring-purple-400' : ''
            }`}>
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-white font-bold text-sm">Counsel</span>
            </div>
          </div>
        </div>

        {/* Witness */}
        <div className={`absolute top-1/2 left-10 -translate-y-1/2 transition-all duration-500 ${
          currentSpeaker.toLowerCase() === 'witness' ? 'scale-125 opacity-100' : 'scale-100 opacity-40'
        }`}>
          <div className="relative">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl ${
              currentSpeaker.toLowerCase() === 'witness' ? 'animate-pulse ring-4 ring-green-400' : ''
            }`}>
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-white font-bold text-sm">Witness</span>
            </div>
          </div>
        </div>

        {/* Prosecutor */}
        <div className={`absolute top-1/2 right-10 -translate-y-1/2 transition-all duration-500 ${
          currentSpeaker.toLowerCase() === 'prosecutor' ? 'scale-125 opacity-100' : 'scale-100 opacity-40'
        }`}>
          <div className="relative">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl ${
              currentSpeaker.toLowerCase() === 'prosecutor' ? 'animate-pulse ring-4 ring-yellow-400' : ''
            }`}>
              <Scale className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-white font-bold text-sm">Prosecutor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3 text-amber-500">
          <Scale className="w-8 h-8" />
          <span className="text-2xl font-bold">Supreme Court</span>
          <Scale className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};