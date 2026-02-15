// // frontend/src/pages/GamesPage.tsx

// import React, { useState } from 'react';
// import { 
//   Gamepad2, 
//   Brain, 
//   Trophy, 
//   Target, 
//   Puzzle, 
//   Users,
//   Scale,
//   Sparkles,
//   ArrowRight,
//   Play,
//   Zap,
//   Clock,
//   Star,
//   TrendingUp,
//   Award,
//   CheckCircle,
//   Lightbulb,
//   Heart
// } from 'lucide-react';
// import { Card } from '../components/common/Card';
// import { GAMES } from '../data/gamesData';
// import { GameCard } from '../components/games/GameCard';

// interface GamesPageProps {
//   onNavigate: (page: string, data?: any) => void;
// }

// export const GamesPage: React.FC<GamesPageProps> = ({ onNavigate }) => {
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');

//   const categories = [
//     { id: 'all', label: 'All Games', icon: Gamepad2 },
//     { id: 'easy', label: 'Easy', icon: Lightbulb },
//     { id: 'medium', label: 'Medium', icon: Target },
//     { id: 'hard', label: 'Hard', icon: Trophy },
//   ];

//   const filteredGames = selectedCategory === 'all' 
//     ? GAMES 
//     : GAMES.filter(game => game.difficulty === selectedCategory);

//   const handleGameClick = (route: string) => {
//     onNavigate(route);
//   };

//   return (
//     <div className="w-full min-h-screen bg-slate-900 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Hero Section */}
//         <div className="text-center mb-16 animate-fade-in">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 animate-bounce-slow">
//             <Sparkles className="w-5 h-5 text-purple-400" />
//             <span className="text-purple-400 font-semibold text-sm">Interactive Learning Platform</span>
//           </div>
          
//           <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
//             Constitutional{' '}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 animate-gradient">
//               Games
//             </span>
//           </h1>
          
//           <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
//             Master the Indian Constitution through engaging, interactive games designed to make learning fun and memorable
//           </p>

//           {/* Stats Bar */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//             <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-4">
//               <div className="flex flex-col items-center">
//                 <Gamepad2 className="w-8 h-8 text-blue-400 mb-2" />
//                 <div className="text-2xl font-bold text-white">{GAMES.length}+</div>
//                 <div className="text-xs text-slate-400">Games</div>
//               </div>
//             </Card>
//             <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 p-4">
//               <div className="flex flex-col items-center">
//                 <Scale className="w-8 h-8 text-purple-400 mb-2" />
//                 <div className="text-2xl font-bold text-white">3D</div>
//                 <div className="text-xs text-slate-400">Courtroom Experience</div>
//               </div>
//             </Card>
//             <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 p-4">
//               <div className="flex flex-col items-center">
//                 <Puzzle className="w-8 h-8 text-orange-400 mb-2" />
//                 <div className="text-2xl font-bold text-white">Fun</div>
//                 <div className="text-xs text-slate-400">Learning Method</div>
//               </div>
//             </Card>
//             {/* <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 p-4">
//               <div className="flex flex-col items-center">
//                 <Users className="w-8 h-8 text-green-400 mb-2" />
//                 <div className="text-2xl font-bold text-white">5k+</div>
//                 <div className="text-xs text-slate-400">Players</div>
//               </div>
//             </Card> */}
//           </div>
//         </div>

//         {/* How It Works Section */}
//         <div className="mb-16 animate-fade-in-delay-1">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
//             <p className="text-slate-400">Simple steps to start your learning journey</p>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-6">
//             <Card className="text-center bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all group">
//               <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                 <Play className="w-8 h-8 text-white" />
//               </div>
//               <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-orange-400 font-bold text-lg">1</span>
//               </div>
//               <h3 className="text-lg font-bold text-white mb-3">Choose Your Game</h3>
//               <p className="text-slate-400 text-sm leading-relaxed">
//                 Select from various interactive games designed to teach different aspects of the Constitution
//               </p>
//             </Card>

//             <Card className="text-center bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all group">
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                 <Zap className="w-8 h-8 text-white" />
//               </div>
//               <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-blue-400 font-bold text-lg">2</span>
//               </div>
//               <h3 className="text-lg font-bold text-white mb-3">Play & Learn</h3>
//               <p className="text-slate-400 text-sm leading-relaxed">
//                 Engage with interactive challenges while learning about your rights, duties, and constitutional principles
//               </p>
//             </Card>

//             <Card className="text-center bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all group">
//               <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                 <Trophy className="w-8 h-8 text-white" />
//               </div>
//               <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-green-400 font-bold text-lg">3</span>
//               </div>
//               <h3 className="text-lg font-bold text-white mb-3">Track Progress</h3>
//               <p className="text-slate-400 text-sm leading-relaxed">
//                 Earn points, unlock achievements, and track your understanding of constitutional principles
//               </p>
//             </Card>
//           </div>
//         </div>

//         {/* Featured: Court Simulation Banner */}
//         <div className="mb-16 animate-fade-in-delay-2">
//           <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-[2px] group hover:shadow-2xl hover:shadow-orange-500/30 transition-all">
//             <div className="relative bg-slate-900 rounded-3xl overflow-hidden">
//               {/* Animated Background */}
//               <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10"></div>
//               <div className="absolute inset-0 opacity-10">
//                 <div className="absolute inset-0" style={{
//                   backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
//                   backgroundSize: '40px 40px'
//                 }}></div>
//               </div>

//               {/* Floating Elements */}
//               <div className="absolute top-10 right-10 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
//               <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-pulse-delayed"></div>

//               {/* Content */}
//               <div className="relative z-10 p-8 md:p-12">
//                 <div className="grid md:grid-cols-2 gap-8 items-center">
//                   {/* Left Side - Text Content */}
//                   <div>
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
//                       <Sparkles className="w-5 h-5 text-orange-400 animate-spin-slow" />
//                       <span className="text-orange-400 font-semibold text-sm uppercase tracking-wide">
//                         Featured Experience
//                       </span>
//                     </div>
                    
//                     <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
//                       Virtual Courtroom<br />
//                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
//                         Simulation
//                       </span>
//                     </h2>
                    
//                     <p className="text-slate-300 text-lg mb-8 leading-relaxed">
//                       Step into a realistic 3D courtroom and experience constitutional law in action. 
//                       Take on the role of a judge, examine evidence, hear arguments, and deliver verdicts 
//                       based on fundamental rights and articles.
//                     </p>

//                     {/* Features Grid */}
//                     <div className="grid grid-cols-2 gap-4 mb-8">
//                       <div className="flex items-start gap-3">
//                         <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
//                           <Scale className="w-6 h-6 text-orange-400" />
//                         </div>
//                         <div>
//                           <h4 className="font-bold text-white text-sm mb-1">Realistic Cases</h4>
//                           <p className="text-slate-400 text-xs">Based on actual scenarios</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
//                           <Brain className="w-6 h-6 text-orange-400" />
//                         </div>
//                         <div>
//                           <h4 className="font-bold text-white text-sm mb-1">Deep Learning</h4>
//                           <p className="text-slate-400 text-xs">Understand through practice</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
//                           <Users className="w-6 h-6 text-orange-400" />
//                         </div>
//                         <div>
//                           <h4 className="font-bold text-white text-sm mb-1">Role Playing</h4>
//                           <p className="text-slate-400 text-xs">Become a judge</p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
//                           <Award className="w-6 h-6 text-orange-400" />
//                         </div>
//                         <div>
//                           <h4 className="font-bold text-white text-sm mb-1">Earn Badges</h4>
//                           <p className="text-slate-400 text-xs">Track achievements</p>
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => handleGameClick('court-simulation')}
//                       className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:scale-105"
//                     >
//                       <Scale className="w-6 h-6" />
//                       <span>Enter Courtroom</span>
//                       <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
//                     </button>
//                   </div>

//                   {/* Right Side - Stats & Visual */}
//                   <div className="relative">
//                     <div className="grid grid-cols-2 gap-4">
//                       {/* Stat Cards */}
//                       <Card className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20 p-6 hover:scale-105 transition-transform">
//                         <div className="text-center">
//                           <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                             <Scale className="w-7 h-7 text-orange-400" />
//                           </div>
//                           <div className="text-3xl font-bold text-white mb-1">3D</div>
//                           <div className="text-xs text-slate-400">Immersive</div>
//                         </div>
//                       </Card>
                      
//                       <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 hover:scale-105 transition-transform">
//                         <div className="text-center">
//                           <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                             <Trophy className="w-7 h-7 text-blue-400" />
//                           </div>
//                           <div className="text-3xl font-bold text-white mb-1">10+</div>
//                           <div className="text-xs text-slate-400">Cases</div>
//                         </div>
//                       </Card>
                      
//                       <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6 hover:scale-105 transition-transform">
//                         <div className="text-center">
//                           <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                             <Brain className="w-7 h-7 text-purple-400" />
//                           </div>
//                           <div className="text-3xl font-bold text-white mb-1">25+</div>
//                           <div className="text-xs text-slate-400">Articles</div>
//                         </div>
//                       </Card>
                      
//                       <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20 p-6 hover:scale-105 transition-transform">
//                         <div className="text-center">
//                           <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                             <Sparkles className="w-7 h-7 text-green-400" />
//                           </div>
//                           <div className="text-3xl font-bold text-white mb-1">100%</div>
//                           <div className="text-xs text-slate-400">Interactive</div>
//                         </div>
//                       </Card>
//                     </div>

//                     {/* Decorative Glow Effects */}
//                     <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
//                     <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-red-500/20 rounded-full blur-3xl animate-pulse-delayed"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Why Play Games Section */}
//         <div className="mb-16 animate-fade-in-delay-3">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-white mb-2">Why Learn Through Games?</h2>
//             <p className="text-slate-400">Discover the benefits of gamified learning</p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all">
//               <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
//                 <Heart className="w-6 h-6 text-blue-400" />
//               </div>
//               <h3 className="font-bold text-white mb-2">Engaging</h3>
//               <p className="text-slate-400 text-sm">Makes learning fun and memorable through interactive gameplay</p>
//             </Card>

//             <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all">
//               <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
//                 <Brain className="w-6 h-6 text-purple-400" />
//               </div>
//               <h3 className="font-bold text-white mb-2">Effective</h3>
//               <p className="text-slate-400 text-sm">Improves retention and understanding of complex topics</p>
//             </Card>

//             <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20 hover:border-orange-500/40 transition-all">
//               <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
//                 <TrendingUp className="w-6 h-6 text-orange-400" />
//               </div>
//               <h3 className="font-bold text-white mb-2">Progressive</h3>
//               <p className="text-slate-400 text-sm">Gradual difficulty increase ensures steady learning progress</p>
//             </Card>

//             <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20 hover:border-green-500/40 transition-all">
//               <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
//                 <CheckCircle className="w-6 h-6 text-green-400" />
//               </div>
//               <h3 className="font-bold text-white mb-2">Instant Feedback</h3>
//               <p className="text-slate-400 text-sm">Get immediate results and learn from your mistakes</p>
//             </Card>
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="flex flex-wrap gap-3 mb-8 justify-center animate-fade-in-delay-4">
//           {categories.map((category) => {
//             const Icon = category.icon;
//             return (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
//                   selectedCategory === category.id
//                     ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 scale-105'
//                     : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700 hover:border-slate-600'
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//                 <span>{category.label}</span>
//               </button>
//             );
//           })}
//         </div>

//         {/* Games Grid */}
//         <div className="mb-12 animate-fade-in-delay-5">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-3xl font-bold text-white">
//               {selectedCategory === 'all' ? 'All Games' : `${categories.find(c => c.id === selectedCategory)?.label} Games`}
//             </h2>
//             <div className="flex items-center gap-2 text-slate-400 text-sm">
//               <Gamepad2 className="w-4 h-4" />
//               <span>{filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'}</span>
//             </div>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredGames.map((game, index) => (
//               <div 
//                 key={game.id}
//                 className={`animate-fade-in-stagger-${Math.min(index, 5)}`}
//               >
//                 <GameCard 
//                   game={game} 
//                   onPlay={() => handleGameClick(game.route)} 
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Coming Soon Section */}
//         <Card className="text-center bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 animate-fade-in-delay-6">
//           <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto mb-6">
//             <Sparkles className="w-10 h-10 text-white animate-pulse" />
//           </div>
//           <h3 className="text-3xl font-bold text-white mb-4">More Games Coming Soon!</h3>
//           <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-6">
//             We're constantly developing new games to make constitutional learning even more exciting. 
//             Stay tuned for updates and new releases!
//           </p>
//           <div className="flex flex-wrap gap-3 justify-center">
//             <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
//               🎯 Quiz Master
//             </div>
//             <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 text-sm">
//               🧩 Constitutional Crossword
//             </div>
//             <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
//               🎲 Rights Dice
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Custom Animations using Tailwind */}
//       <style>{`
//         .animate-fade-in {
//           animation: fadeIn 0.6s ease-out forwards;
//         }

//         .animate-fade-in-delay-1 {
//           animation: fadeIn 0.6s ease-out 0.1s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-delay-2 {
//           animation: fadeIn 0.6s ease-out 0.2s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-delay-3 {
//           animation: fadeIn 0.6s ease-out 0.3s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-delay-4 {
//           animation: fadeIn 0.6s ease-out 0.4s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-delay-5 {
//           animation: fadeIn 0.6s ease-out 0.5s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-delay-6 {
//           animation: fadeIn 0.6s ease-out 0.6s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-stagger-0 {
//           animation: fadeIn 0.6s ease-out 0s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-stagger-1 {
//           animation: fadeIn 0.6s ease-out 0.1s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-stagger-2 {
//           animation: fadeIn 0.6s ease-out 0.2s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-stagger-3 {
//           animation: fadeIn 0.6s ease-out 0.3s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-stagger-4 {
//           animation: fadeIn 0.6s ease-out 0.4s forwards;
//           opacity: 0;
//         }

//         .animate-fade-in-stagger-5 {
//           animation: fadeIn 0.6s ease-out 0.5s forwards;
//           opacity: 0;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slide-up {
//           animation: slideUp 0.8s ease-out forwards;
//         }

//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-bounce-slow {
//           animation: bounceSlow 2s ease-in-out infinite;
//         }

//         @keyframes bounceSlow {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }

//         @keyframes gradient {
//           0%, 100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }

//         .animate-spin-slow {
//           animation: spinSlow 3s linear infinite;
//         }

//         @keyframes spinSlow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .animate-pulse-delayed {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite;
//         }
//       `}</style>
//     </div>
//   );
// };
















// frontend/src/pages/GamesPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Gamepad2, 
  Brain, 
  Trophy, 
  Target, 
  Puzzle, 
  Users,
  Scale,
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  Lightbulb,
  Heart
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { GAMES } from '../data/gamesData';
import { GameCard } from '../components/games/GameCard';

export const GamesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Games', icon: Gamepad2 },
    { id: 'easy', label: 'Easy', icon: Lightbulb },
    { id: 'medium', label: 'Medium', icon: Target },
    { id: 'hard', label: 'Hard', icon: Trophy },
  ];

  const filteredGames = selectedCategory === 'all' 
    ? GAMES 
    : GAMES.filter(game => game.difficulty === selectedCategory);

  const handleGameClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 animate-bounce-slow">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold text-sm">Interactive Learning Platform</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Constitutional{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 animate-gradient">
              Games
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Master the Indian Constitution through engaging, interactive games designed to make learning fun and memorable
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-4">
              <div className="flex flex-col items-center">
                <Gamepad2 className="w-8 h-8 text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-white">{GAMES.length}+</div>
                <div className="text-xs text-slate-400">Games</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 p-4">
              <div className="flex flex-col items-center">
                <Scale className="w-8 h-8 text-purple-400 mb-2" />
                <div className="text-2xl font-bold text-white">3D</div>
                <div className="text-xs text-slate-400">Courtroom Experience</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 p-4">
              <div className="flex flex-col items-center">
                <Puzzle className="w-8 h-8 text-orange-400 mb-2" />
                <div className="text-2xl font-bold text-white">Fun</div>
                <div className="text-xs text-slate-400">Learning Method</div>
              </div>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16 animate-fade-in-delay-1">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
            <p className="text-slate-400">Simple steps to start your learning journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-400 font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Choose Your Game</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Select from various interactive games designed to teach different aspects of the Constitution
              </p>
            </Card>

            <Card className="text-center bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Play & Learn</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Engage with interactive challenges while learning about your rights, duties, and constitutional principles
              </p>
            </Card>

            <Card className="text-center bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Track Progress</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Earn points, unlock achievements, and track your understanding of constitutional principles
              </p>
            </Card>
          </div>
        </div>

        {/* Featured: Court Simulation Banner */}
        <div className="mb-16 animate-fade-in-delay-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-[2px] group hover:shadow-2xl hover:shadow-orange-500/30 transition-all">
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10"></div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              <div className="absolute top-10 right-10 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-pulse-delayed"></div>

              <div className="relative z-10 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
                      <Sparkles className="w-5 h-5 text-orange-400 animate-spin-slow" />
                      <span className="text-orange-400 font-semibold text-sm uppercase tracking-wide">
                        Featured Experience
                      </span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                      Virtual Courtroom<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                        Simulation
                      </span>
                    </h2>
                    
                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                      Step into a realistic 3D courtroom and experience constitutional law in action. 
                      Take on the role of a judge, examine evidence, hear arguments, and deliver verdicts 
                      based on fundamental rights and articles.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Scale className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1">Realistic Cases</h4>
                          <p className="text-slate-400 text-xs">Based on actual scenarios</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Brain className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1">Deep Learning</h4>
                          <p className="text-slate-400 text-xs">Understand through practice</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1">Role Playing</h4>
                          <p className="text-slate-400 text-xs">Become a judge</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1">Earn Badges</h4>
                          <p className="text-slate-400 text-xs">Track achievements</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleGameClick('/court-simulation')}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:scale-105"
                    >
                      <Scale className="w-6 h-6" />
                      <span>Enter Courtroom</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-slate-800/50 backdrop-blur-sm border-orange-500/20 p-6 hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Scale className="w-7 h-7 text-orange-400" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-1">3D</div>
                          <div className="text-xs text-slate-400">Immersive</div>
                        </div>
                      </Card>
                      
                      <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20 p-6 hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Trophy className="w-7 h-7 text-blue-400" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-1">10+</div>
                          <div className="text-xs text-slate-400">Cases</div>
                        </div>
                      </Card>
                      
                      <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 p-6 hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Brain className="w-7 h-7 text-purple-400" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-1">25+</div>
                          <div className="text-xs text-slate-400">Articles</div>
                        </div>
                      </Card>
                      
                      <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20 p-6 hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Sparkles className="w-7 h-7 text-green-400" />
                          </div>
                          <div className="text-3xl font-bold text-white mb-1">100%</div>
                          <div className="text-xs text-slate-400">Interactive</div>
                        </div>
                      </Card>
                    </div>

                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-red-500/20 rounded-full blur-3xl animate-pulse-delayed"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Play Games Section */}
        <div className="mb-16 animate-fade-in-delay-3">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Why Learn Through Games?</h2>
            <p className="text-slate-400">Discover the benefits of gamified learning</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Engaging</h3>
              <p className="text-slate-400 text-sm">Makes learning fun and memorable through interactive gameplay</p>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Effective</h3>
              <p className="text-slate-400 text-sm">Improves retention and understanding of complex topics</p>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20 hover:border-orange-500/40 transition-all">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Progressive</h3>
              <p className="text-slate-400 text-sm">Gradual difficulty increase ensures steady learning progress</p>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20 hover:border-green-500/40 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-bold text-white mb-2">Instant Feedback</h3>
              <p className="text-slate-400 text-sm">Get immediate results and learn from your mistakes</p>
            </Card>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center animate-fade-in-delay-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700 hover:border-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Games Grid */}
        <div className="mb-12 animate-fade-in-delay-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">
              {selectedCategory === 'all' ? 'All Games' : `${categories.find(c => c.id === selectedCategory)?.label} Games`}
            </h2>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Gamepad2 className="w-4 h-4" />
              <span>{filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'}</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game, index) => (
              <div 
                key={game.id}
                className={`animate-fade-in-stagger-${Math.min(index, 5)}`}
              >
                <GameCard 
                  game={game} 
                  onPlay={() => handleGameClick(game.route)} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <Card className="text-center bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 animate-fade-in-delay-6">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">More Games Coming Soon!</h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-6">
            We're constantly developing new games to make constitutional learning even more exciting. 
            Stay tuned for updates and new releases!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
              🎯 Quiz Master
            </div>
            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 text-sm">
              🧩 Constitutional Crossword
            </div>
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
              🎲 Rights Dice
            </div>
          </div>
        </Card>
      </div>

      {/* Inline styles for animations - keeping your existing animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fadeIn 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-4 {
          animation: fadeIn 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-5 {
          animation: fadeIn 0.6s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-6 {
          animation: fadeIn 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger-0 {
          animation: fadeIn 0.6s ease-out 0s forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger-1 {
          animation: fadeIn 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger-2 {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger-3 {
          animation: fadeIn 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger-4 {
          animation: fadeIn 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-stagger-5 {
          animation: fadeIn 0.6s ease-out 0.5s forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-delayed {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite;
        }
      `}</style>
    </div>
  );
};