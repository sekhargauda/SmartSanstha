// // frontend/src/components/home/HeroSection.tsx

// import React from 'react';
// import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';
// import { Button } from '../common/Button';
// import { UserData } from '@/App';

// interface HeroSectionProps {
//   onNavigate: (page: string) => void;
//   user: UserData | null;
// }

// export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, user }) => {
//   return (
//     <section className="relative text-center text-white rounded-2xl overflow-hidden py-20 md:py-32 w-full">
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90"></div>
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 max-w-5xl mx-auto">
//         <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6 animate-fade-in">
//           <Sparkles className="w-4 h-4 text-orange-400" />
//           <span className="text-sm text-orange-300 font-semibold">AI-Powered Learning Platform</span>
//         </div>

//         <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
//           Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400">SmartSanstha</span>
//         </h1>

//         <p className="text-xl md:text-2xl mt-4 text-slate-300 max-w-3xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
//           Master the Indian Constitution through gamified learning, AI-powered assistance, and interactive experiences
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
//           <Button
//             size="lg"
//             onClick={() => {
//               if (!user) {
//                 onNavigate('auth'); // redirect to login if not signed in
//               } else {
//                 onNavigate('learn');
//               }
//             }}
//             icon={<ArrowRight className="w-5 h-5" />}
//           >
//             Start Learning
//           </Button>
//           <Button
//             size="lg"
//             variant="outline"
//             onClick={() => {
//               if (!user) {
//                 onNavigate('auth');
//               } else {
//                 onNavigate('games');
//               }
//             }}
//             icon={<PlayCircle className="w-5 h-5" />}
//           >
//             Explore Games
//           </Button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-5 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">25</div>
//             <div className="text-sm text-slate-400 mt-1">Constitution Parts</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">465</div>
//             <div className="text-sm text-slate-400 mt-1">Articles to Learn</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">12</div>
//             <div className="text-sm text-slate-400 mt-1">Schedules</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">106</div>
//             <div className="text-sm text-slate-400 mt-1">Amendments</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">5+</div>
//             <div className="text-sm text-slate-400 mt-1">Interactive Games</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };









// frontend/src/components/home/HeroSection.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { UserData } from '@/App';

interface HeroSectionProps {
  user: UserData | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <section className="relative text-center text-white rounded-2xl overflow-hidden py-20 md:py-32 w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-orange-300 font-semibold">AI-Powered Learning Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-amber-400">SmartSanstha</span>
        </h1>

        <p className="text-xl md:text-2xl mt-4 text-slate-300 max-w-3xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Master the Indian Constitution through gamified learning, AI-powered assistance, and interactive experiences
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button
            size="lg"
            onClick={() => {
              if (!user) {
                navigate('/login'); // redirect to login if not signed in
              } else {
                navigate('/learn');
              }
            }}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start Learning
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              if (!user) {
                navigate('/login');
              } else {
                navigate('/games');
              }
            }}
            icon={<PlayCircle className="w-5 h-5" />}
          >
            Explore Games
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">25</div>
            <div className="text-sm text-slate-400 mt-1">Constitution Parts</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">465</div>
            <div className="text-sm text-slate-400 mt-1">Articles to Learn</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">12</div>
            <div className="text-sm text-slate-400 mt-1">Schedules</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">106</div>
            <div className="text-sm text-slate-400 mt-1">Amendments</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">5+</div>
            <div className="text-sm text-slate-400 mt-1">Interactive Games</div>
          </div>
        </div>
      </div>
    </section>
  );
};