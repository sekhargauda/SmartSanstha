// // frontend/src/components/dashboard/UserProgress.tsx

// import React from "react";
// import { BookOpen, Trophy, Target, Zap } from "lucide-react";
// import type { UserData } from "../../App";
// import { Card } from "../common/Card";

// interface UserProgressProps {
//   user: UserData | null;
//   onNavigate: (page: string, data?: any) => void;
//   stats: {
//     articlesRead: number;
//     quizzesTaken: number;
//     totalScore: number;
//     currentStreak: number;
//   };
// }

// export const UserProgress: React.FC<UserProgressProps> = ({ user, onNavigate, stats }) => {
//   const goals = [
//     {
//       id: 1,
//       icon: BookOpen,
//       title: "Read 50 Articles",
//       current: stats.articlesRead,
//       target: 50,
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       id: 2,
//       icon: Trophy,
//       title: "Complete 20 Quiz",
//       current: stats.quizzesTaken,
//       target: 20,
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       id: 3,
//       icon: Target,
//       title: "Score 3000 Points",
//       current: stats.totalScore,
//       target: 3000,
//       color: "from-orange-500 to-red-500",
//     },
//     {
//       id: 4,
//       icon: Zap,
//       title: "Maintain 30-Day Streak",
//       current: stats.currentStreak,
//       target: 30,
//       color: "from-green-500 to-emerald-500",
//     },
//   ];

//   return (
//     <Card>
//       <div className="flex items-center gap-3 mb-6">
//         <Target className="w-6 h-6 text-orange-400" />
//         <h2 className="text-2xl font-bold text-white">Your Goals</h2>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {goals.map((goal) => {
//           const Icon = goal.icon;
//           const progress = (goal.current / goal.target) * 100;

//           return (
//             <div key={goal.id} className="relative">
//               <div className="text-center mb-4">
//                 <div
//                   className={`w-20 h-20 bg-gradient-to-br ${goal.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
//                 >
//                   <Icon className="w-10 h-10 text-white" />
//                 </div>

//                 <h3 className="font-bold text-white text-sm mb-2">{goal.title}</h3>

//                 <div className="text-2xl font-bold text-white mb-1">
//                   {goal.current}
//                   <span className="text-slate-500 text-lg">/{goal.target}</span>
//                 </div>
//               </div>

//               <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
//                   style={{ width: `${Math.min(progress, 100)}%` }}
//                 />
//               </div>

//               <div className="text-center mt-2 text-xs text-slate-400">
//                 {Math.round(progress)}% Complete
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </Card>
//   );
// };










// frontend/src/components/dashboard/UserProgress.tsx

import React from "react";
import { BookOpen, Trophy, Target, Zap } from "lucide-react";
import type { UserData } from "../../App";
import { Card } from "../common/Card";

interface UserProgressProps {
  user: UserData | null;
  stats: {
    articlesRead: number;
    quizzesTaken: number;
    totalScore: number;
    currentStreak: number;
  };
}

export const UserProgress: React.FC<UserProgressProps> = ({ user, stats }) => {
  const goals = [
    {
      id: 1,
      icon: BookOpen,
      title: "Read 50 Articles",
      current: stats.articlesRead,
      target: 50,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      icon: Trophy,
      title: "Complete 20 Quiz",
      current: stats.quizzesTaken,
      target: 20,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      icon: Target,
      title: "Score 3000 Points",
      current: stats.totalScore,
      target: 3000,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      icon: Zap,
      title: "Maintain 30-Day Streak",
      current: stats.currentStreak,
      target: 30,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-orange-400" />
        <h2 className="text-2xl font-bold text-white">Your Goals</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const progress = (goal.current / goal.target) * 100;

          return (
            <div key={goal.id} className="relative">
              <div className="text-center mb-4">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${goal.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="font-bold text-white text-sm mb-2">{goal.title}</h3>

                <div className="text-2xl font-bold text-white mb-1">
                  {goal.current}
                  <span className="text-slate-500 text-lg">/{goal.target}</span>
                </div>
              </div>

              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <div className="text-center mt-2 text-xs text-slate-400">
                {Math.round(progress)}% Complete
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};