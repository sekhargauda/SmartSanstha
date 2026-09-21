// frontend/src/components/court/CourtIllustration.tsx

import React from 'react';
import { Scale, Users, BookOpen, Gavel } from 'lucide-react';

interface CourtIllustrationProps {
  currentSpeaker: string;
}

interface SpeakerConfig {
  id: string;
  label: string;
  position: string;
  icon: React.ElementType;
  gradient: string;
  ring: string;
  size: string;
}

const SPEAKERS: SpeakerConfig[] = [
  {
    id: 'judge',
    label: 'Judge',
    position: 'top-10 left-1/2 -translate-x-1/2',
    icon: Gavel,
    gradient: 'from-red-500 to-orange-500',
    ring: 'ring-orange-400',
    size: 'w-24 h-24',
  },
  {
    id: 'defendant',
    label: 'Defendant',
    position: 'bottom-32 right-1/4',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    ring: 'ring-blue-400',
    size: 'w-20 h-20',
  },
  {
    id: 'counsel',
    label: 'Counsel',
    position: 'bottom-32 left-1/4',
    icon: BookOpen,
    gradient: 'from-purple-500 to-pink-500',
    ring: 'ring-purple-400',
    size: 'w-20 h-20',
  },
  {
    id: 'witness',
    label: 'Witness',
    position: 'top-1/2 left-10 -translate-y-1/2',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500',
    ring: 'ring-green-400',
    size: 'w-20 h-20',
  },
  {
    id: 'prosecutor',
    label: 'Prosecutor',
    position: 'top-1/2 right-10 -translate-y-1/2',
    icon: Scale,
    gradient: 'from-yellow-500 to-orange-500',
    ring: 'ring-yellow-400',
    size: 'w-20 h-20',
  },
];

const normalizeSpeaker = (speaker: string) => speaker.trim().toLowerCase();

export const CourtIllustration: React.FC<CourtIllustrationProps> = ({
  currentSpeaker,
}) => {
  const activeSpeaker = normalizeSpeaker(currentSpeaker);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-black">
      
      {/* Courtroom background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
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

      {/* Speaker indicators */}
      <div className="absolute inset-0 pointer-events-none">
        {SPEAKERS.map((speaker) => {
          const Icon = speaker.icon;
          const isActive = activeSpeaker === speaker.id;

          return (
            <div
              key={speaker.id}
              className={`
                absolute ${speaker.position}
                transition-all duration-500
                ${isActive
                  ? 'scale-125 opacity-100'
                  : 'scale-100 opacity-40'}
              `}
            >
              <div className="relative">
                <div
                  className={`
                    ${speaker.size}
                    rounded-full
                    bg-gradient-to-br ${speaker.gradient}
                    flex items-center justify-center
                    shadow-2xl
                    ${isActive
                      ? `animate-pulse ring-4 ${speaker.ring}`
                      : ''}
                  `}
                >
                  <Icon
                    className={`
                      text-white
                      ${speaker.id === 'judge'
                        ? 'w-12 h-12'
                        : 'w-10 h-10'}
                    `}
                  />
                </div>

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-white font-bold text-sm">
                    {speaker.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Court title */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex items-center gap-3 text-amber-500">
          <Scale className="w-8 h-8" />

          <span className="text-2xl font-bold whitespace-nowrap">
            Supreme Court
          </span>

          <Scale className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};