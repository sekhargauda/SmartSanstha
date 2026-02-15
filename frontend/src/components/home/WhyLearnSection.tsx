// import React from 'react';
// import { Eye, Zap, MessageSquare, LineChart, Award, Users, BookMarked, Target } from 'lucide-react';

// export const WhyLearnSection: React.FC = () => {
//   const reasons = [
//     { icon: Eye, title: 'Clarity & Understanding', desc: 'Simplified content makes complex legal concepts accessible', color: 'from-blue-500 to-cyan-500' },
//     { icon: Zap, title: 'Engaging Experience', desc: 'Gamification keeps you motivated and interested', color: 'from-purple-500 to-pink-500' },
//     { icon: MessageSquare, title: 'Instant Guidance', desc: 'AI chatbot provides 24/7 support and answers', color: 'from-green-500 to-emerald-500' },
//     { icon: LineChart, title: 'Track Progress', desc: 'Visual analytics show your learning journey', color: 'from-orange-500 to-red-500' },
//     { icon: Award, title: 'Earn Achievements', desc: 'Badges and rewards motivate continuous learning', color: 'from-yellow-500 to-orange-500' },
//     { icon: Users, title: 'Community Learning', desc: 'Connect with fellow learners nationwide', color: 'from-red-500 to-pink-500' },
//     { icon: BookMarked, title: 'Structured Content', desc: 'Well-organized parts and articles for easy navigation', color: 'from-indigo-500 to-purple-500' },
//     { icon: Target, title: 'Goal-Oriented', desc: 'Set targets and achieve milestones at your pace', color: 'from-cyan-500 to-blue-500' },
//   ];

//   return (
//     <section className="py-16 md:py-24 px-6 md:px-8 w-full max-w-7xl">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
//           Why Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">SmartSanstha?</span>
//         </h2>
//         <p className="text-slate-400 text-lg max-w-3xl mx-auto">
//           Discover the advantages that make us the best platform for constitutional literacy
//         </p>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {reasons.map((reason, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center text-center group cursor-pointer"
//           >
//             <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl shadow-lg`}>
//               <reason.icon className="w-12 h-12 text-white" />
//             </div>
//             <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">{reason.title}</h3>
//             <p className="text-xs text-slate-400">{reason.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };








import React from 'react';
import { Shield, Brain, Trophy, Heart, TrendingUp, Scale, Eye, Zap, MessageSquare, LineChart, Award, Users, BookMarked, Target } from 'lucide-react';
import { Card } from '../common/Card';
import { useInView } from 'react-intersection-observer';

export const WhyLearnSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // const reasons = [
  //   {
  //     title: 'Know Your Rights',
  //     description: 'Understand your fundamental rights as a citizen and how to protect them.',
  //     icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
  //     color: 'bg-blue-500'
  //   },
  //   {
  //     title: 'Be an Informed Citizen',
  //     description: 'Make better decisions and participate meaningfully in democracy.',
  //     icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
  //     color: 'bg-purple-500'
  //   },
  //   {
  //     title: 'Exam Preparation',
  //     description: 'Essential for UPSC, SSC, and other competitive examinations.',
  //     icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />,
  //     color: 'bg-orange-500'
  //   },
  //   {
  //     title: 'Civic Responsibility',
  //     description: 'Fulfill your duty as a responsible citizen of India.',
  //     icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
  //     color: 'bg-red-500'
  //   },
  //   {
  //     title: 'Professional Growth',
  //     description: 'Important for careers in law, governance, and public administration.',
  //     icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
  //     color: 'bg-green-500'
  //   },
  //   {
  //     title: 'Understand Governance',
  //     description: 'Learn how India\'s government system works and functions.',
  //     icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6" />,
  //     color: 'bg-yellow-500'
  //   }
  // ];

  const reasons = [
    { icon: Eye, title: 'Clarity & Understanding', desc: 'Simplified content makes complex legal concepts accessible', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, title: 'Engaging Experience', desc: 'Gamification keeps you motivated and interested', color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, title: 'Instant Guidance', desc: 'AI chatbot provides 24/7 support and answers', color: 'from-green-500 to-emerald-500' },
    { icon: LineChart, title: 'Track Progress', desc: 'Visual analytics show your learning journey', color: 'from-orange-500 to-red-500' },
    // { icon: Award, title: 'Earn Achievements', desc: 'Badges and rewards motivate continuous learning', color: 'from-yellow-500 to-orange-500' },
    // { icon: Users, title: 'Community Learning', desc: 'Connect with fellow learners nationwide', color: 'from-red-500 to-pink-500' },
    { icon: BookMarked, title: 'Structured Content', desc: 'Well-organized parts and articles for easy navigation', color: 'from-indigo-500 to-purple-500' },
    { icon: Target, title: 'Goal-Oriented', desc: 'Set targets and achieve milestones at your pace', color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-4 sm:mb-6">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold text-xs sm:text-sm">Why Learn?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Why Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">SmartSanstha?</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto px-4">
            Discover the advantages that make us the best platform for constitutional literacy
          </p>
        </div>

        <div 
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={inView ? 'animate-fade-in-up' : 'opacity-0'}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card hover className="flex flex-col h-full">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${reason.color} flex items-center justify-center shadow-inner shadow-black/30`}>
                    <div className="text-white"><reason.icon /></div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">{reason.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm">{reason.desc}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


























// import React from 'react';
// import { Shield, Brain, Trophy, Heart, TrendingUp, Scale, Target } from 'lucide-react';
// import { Card } from '../common/Card';
// import { useInView } from 'react-intersection-observer';

// export const WhyLearnSection: React.FC = () => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const reasons = [
//     {
//       title: 'Know Your Rights',
//       description: 'Understand your fundamental rights as a citizen and how to protect them.',
//       icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
//       color: 'bg-blue-500'
//     },
//     {
//       title: 'Be an Informed Citizen',
//       description: 'Make better decisions and participate meaningfully in democracy.',
//       icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
//       color: 'bg-purple-500'
//     },
//     {
//       title: 'Exam Preparation',
//       description: 'Essential for UPSC, SSC, and other competitive examinations.',
//       icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />,
//       color: 'bg-orange-500'
//     },
//     {
//       title: 'Civic Responsibility',
//       description: 'Fulfill your duty as a responsible citizen of India.',
//       icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
//       color: 'bg-red-500'
//     },
//     {
//       title: 'Professional Growth',
//       description: 'Important for careers in law, governance, and public administration.',
//       icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
//       color: 'bg-green-500'
//     },
//     {
//       title: 'Understand Governance',
//       description: 'Learn how India\'s government system works and functions.',
//       icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6" />,
//       color: 'bg-yellow-500'
//     }
//   ];

//   return (
//     <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12 sm:mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-4 sm:mb-6">
//             <Target className="w-4 h-4 text-green-400" />
//             <span className="text-green-400 font-semibold text-xs sm:text-sm">Why Learn?</span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
//             Why Learn the Constitution?
//           </h2>
//           <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto px-4">
//             Understanding the Constitution empowers you as a citizen and opens doors to opportunities
//           </p>
//         </div>

//         <div 
//           ref={ref}
//           className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
//         >
//           {reasons.map((reason, index) => (
//             <div
//               key={index}
//               className={inView ? 'animate-fade-in-up' : 'opacity-0'}
//               style={{ animationDelay: `${0.1 * index}s` }}
//             >
//               <Card hover className="flex flex-col h-full">
//                 <div className="flex items-start gap-3 sm:gap-4">
//                   <div className={`w-10 h-10 sm:w-12 sm:h-12 ${reason.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
//                     <div className="text-white">{reason.icon}</div>
//                   </div>
//                   <div>
//                     <h3 className="text-base sm:text-lg font-bold text-white mb-2">{reason.title}</h3>
//                     <p className="text-slate-400 text-xs sm:text-sm">{reason.description}</p>
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };