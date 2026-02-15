// import React from 'react';
// import { Lightbulb, Drama, Gamepad2, BarChart, Bot, BookOpen, Zap, Trophy } from 'lucide-react';
// import { Card } from '../common/Card';

// export const FeaturesSection: React.FC = () => {
//   const features = [
//     {
//       icon: BookOpen,
//       title: 'Simplified Learning',
//       desc: 'Complex constitutional articles translated into clear, easy-to-understand language with AI support and visual aids.',
//       gradient: 'from-blue-500 to-cyan-500'
//     },
//     {
//       icon: Gamepad2,
//       title: 'Gamified Approach',
//       desc: 'Memory games, puzzles, and scenario challenges make learning engaging and fun while retaining information better.',
//       gradient: 'from-purple-500 to-pink-500'
//     },
//     {
//       icon: Drama,
//       title: 'Courtroom Simulation',
//       desc: 'Watch real-life inspired cases unfold and observe petitions, defenses, and judgments in interactive courtroom scenarios.',
//       gradient: 'from-orange-500 to-red-500'
//     },
//     {
//       icon: Bot,
//       title: 'AI Chatbot Assistant',
//       desc: 'Get instant answers to your questions, simplify legal terms, and receive guided suggestions from our intelligent chatbot.',
//       gradient: 'from-green-500 to-emerald-500'
//     },
//     {
//       icon: BarChart,
//       title: 'Progress Tracking',
//       desc: 'Track your learning journey with visual dashboards, performance metrics, and personalized improvement suggestions.',
//       gradient: 'from-yellow-500 to-orange-500'
//     },
//     {
//       icon: Trophy,
//       title: 'Achievements & Rewards',
//       desc: 'Earn badges, unlock achievements, and compete on leaderboards as you master constitutional knowledge.',
//       gradient: 'from-red-500 to-pink-500'
//     },
//     {
//       icon: Lightbulb,
//       title: 'Interactive Quizzes',
//       desc: 'Test your knowledge with adaptive quizzes that adjust difficulty based on your performance and learning pace.',
//       gradient: 'from-indigo-500 to-purple-500'
//     },
//     {
//       icon: Zap,
//       title: 'Quick Learning',
//       desc: 'Micro-lessons and bite-sized content designed for busy schedules, learn anytime, anywhere at your own pace.',
//       gradient: 'from-cyan-500 to-blue-500'
//     }
//   ];

//   return (
//     <section className="py-16 md:py-24 px-6 md:px-8 w-full max-w-7xl">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
//           Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Features</span>
//         </h2>
//         <p className="text-slate-400 text-lg max-w-3xl mx-auto">
//           Everything you need to master the Indian Constitution in one comprehensive platform
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {features.map((feature, index) => (
//           <Card
//             key={index}
//             hover
//             className="text-center group transform transition-all duration-300"
//           >
//             <div className="mb-4 flex justify-center">
//               <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
//                 <feature.icon className="w-8 h-8 text-white" />
//               </div>
//             </div>
//             <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
//             <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// };














import React from 'react';
import { BookOpen, Brain, Trophy, Users, Zap, Lightbulb, Drama, Gamepad2, BarChart, Bot } from 'lucide-react';
import { Card } from '../common/Card';
import { useInView } from 'react-intersection-observer';

export const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // const features = [
  //   {
  //     icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
  //     title: 'Simplified Learning',
  //     description: 'Complex constitutional concepts explained in simple, easy-to-understand language for everyone.',
  //     color: 'from-blue-500 to-cyan-500'
  //   },
  //   {
  //     icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
  //     title: 'Interactive Quizzes',
  //     description: 'Test your knowledge with engaging quizzes and track your progress as you learn.',
  //     color: 'from-purple-500 to-pink-500'
  //   },
  //   {
  //     icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />,
  //     title: 'Gamified Experience',
  //     description: 'Learn through fun games and challenges that make constitutional education enjoyable.',
  //     color: 'from-orange-500 to-red-500'
  //   },
  //   {
  //     icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
  //     title: 'AI-Powered Chatbot',
  //     description: 'Get instant answers to your questions about the Constitution from our intelligent assistant.',
  //     color: 'from-green-500 to-emerald-500'
  //   }
  // ];

  const features = [
    {
      icon: BookOpen,
      title: 'Simplified Learning',
      desc: 'Complex constitutional articles translated into clear, easy-to-understand language with AI support and visual aids.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Gamepad2,
      title: 'Gamified Approach',
      desc: 'Memory games, puzzles, and scenario challenges make learning engaging and fun while retaining information better.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Drama,
      title: 'Courtroom Simulation',
      desc: 'Watch real-life inspired cases unfold and observe petitions, defenses, and judgments in interactive courtroom scenarios.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Bot,
      title: 'AI Chatbot Assistant',
      desc: 'Get instant answers to your questions, simplify legal terms, and receive guided suggestions from our intelligent chatbot.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart,
      title: 'Progress Tracking',
      desc: 'Track your learning journey with visual dashboards, performance metrics, and personalized improvement suggestions.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Trophy,
      title: 'Achievements & Rewards',
      desc: 'Earn badges, unlock achievements, and compete on leaderboards as you master constitutional knowledge.',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Lightbulb,
      title: 'Interactive Quizzes',
      desc: 'Test your knowledge with adaptive quizzes that adjust difficulty based on your performance and learning pace.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Quick Learning',
      desc: 'Micro-lessons and bite-sized content designed for busy schedules, learn anytime, anywhere at your own pace.',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4 sm:mb-6">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold text-xs sm:text-sm">Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Features</span> for Effective Learning
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto px-4">
            Everything you need to master the Constitution of India
          </p>
        </div>

        <div 
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={inView ? 'animate-fade-in-up' : 'opacity-0'}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card hover className="text-center h-full">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transform hover:scale-110 transition-transform`}>
                  <div className="text-white"><feature.icon className="w-8 h-8 text-white" /></div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm">{feature.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};