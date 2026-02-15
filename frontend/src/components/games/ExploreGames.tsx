// import React from 'react';
// import { Gamepad2, Info, PlayCircle } from 'lucide-react';
// import { GAMES } from '../../data/gamesData';
// import { GameCard } from './GameCard';
// import { Card } from '../common/Card';

// interface ExploreGamesProps {
//   onNavigate: (page: string) => void;
// }

// export const ExploreGames: React.FC<ExploreGamesProps> = ({ onNavigate }) => {
//   return (
//     <div className="w-full max-w-7xl animate-fade-in">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
//           <Gamepad2 className="w-10 h-10 text-white" />
//         </div>
//         <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
//           Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Games</span>
//         </h1>
//         <p className="text-xl text-slate-400 max-w-3xl mx-auto">
//           Play interactive games to master constitutional concepts while having fun
//         </p>
//       </div>

//       {/* How Games Work */}
//       <Card className="mb-12">
//         <div className="flex items-center gap-3 mb-6">
//           <Info className="w-6 h-6 text-orange-400" />
//           <h2 className="text-2xl font-bold text-white">How Our Games Work</h2>
//         </div>
//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="flex flex-col items-center text-center p-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 text-white font-bold text-2xl">
//               1
//             </div>
//             <h3 className="font-bold text-white mb-2">Choose a Game</h3>
//             <p className="text-sm text-slate-400">Select from various difficulty levels and topics</p>
//           </div>
//           <div className="flex flex-col items-center text-center p-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 text-white font-bold text-2xl">
//               2
//             </div>
//             <h3 className="font-bold text-white mb-2">Play & Learn</h3>
//             <p className="text-sm text-slate-400">Engage with interactive challenges and scenarios</p>
//           </div>
//           <div className="flex flex-col items-center text-center p-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 text-white font-bold text-2xl">
//               3
//             </div>
//             <h3 className="font-bold text-white mb-2">Track Progress</h3>
//             <p className="text-sm text-slate-400">View your scores and achievements</p>
//           </div>
//         </div>
//       </Card>

//       {/* Available Games */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-white mb-6">Available Games</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {GAMES.map((game) => (
//             <GameCard key={game.id} game={game} onPlay={() => onNavigate(game.route)} />
//           ))}
//         </div>
//       </div>

//       {/* Coming Soon Banner */}
//       <Card className="text-center bg-gradient-to-r from-slate-800 to-slate-700">
//         <PlayCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
//         <h3 className="text-2xl font-bold text-white mb-2">More Games Coming Soon!</h3>
//         <p className="text-slate-400 max-w-2xl mx-auto">
//           We're constantly developing new games to make constitutional learning even more exciting. Stay tuned!
//         </p>
//       </Card>
//     </div>
//   );
// };