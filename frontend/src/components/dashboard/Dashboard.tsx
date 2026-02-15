// // frontend/src/components/dashboard/Dashboard.tsx

// import React, { useEffect, useState } from "react";
// import {
//   BarChart3,
//   Trophy,
//   Target,
//   TrendingUp,
//   Flame,
//   Calendar,
//   BookOpen,
// } from "lucide-react";
// import { Card } from "../common/Card";
// import { ProgressBar } from "../common/ProgressBar";
// import { UserProgress } from "./UserProgress";
// import { ScoreCard } from "./ScoreCard";
// import { Bookmarks } from "./Bookmarks";
// import { RecentReading } from "./RecentReading";
// import { progressAPI } from "../../services/api";
// import type { UserData } from "../../App";

// interface DashboardProps {
//   user: UserData | null;
//   onNavigate: (page: string, data?: any) => void;
// }

// interface DashboardState {
//   totalScore: number;
//   gamesPlayed: number;
//   articlesRead: number;
//   quizzesTaken: number;
//   currentStreak: number;
//   joinedDate?: string;
//   lastArticles: {
//     articleNumber: string;
//     partName?: string;
//   }[];
//   bookmarks: any[];
//   perPart: {
//     partName: string;
//     readCount: number;
//     totalInPart: number;
//   }[];
// }

// const normalizeArticleId = (raw: string): string => {
//   const str = raw.trim();
//   if (str.toLowerCase().includes("preamble")) return "0";
//   const match = str.match(/(\d+[A-Za-z]*)/);
//   return match ? match[1] : str;
// };

// type ActivityType = "game" | "article" | "quiz";

// interface RecentActivityItem {
//   id: number;
//   type: ActivityType;
//   title: string;
//   articleNumber?: string;
//   partName?: string;
//   score?: number;
//   progress?: number;
//   date: string;
// }

// const weeklyProgress = [
//   { day: "Mon", value: 65 },
//   { day: "Tue", value: 80 },
//   { day: "Wed", value: 45 },
//   { day: "Thu", value: 90 },
//   { day: "Fri", value: 75 },
//   { day: "Sat", value: 60 },
//   { day: "Sun", value: 85 },
// ];

// export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
//   const [data, setData] = useState<DashboardState | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [trends, setTrends] = useState({
//     totalScore: "+0",
//     gamesPlayed: "+0",
//     currentStreak: "+0",
//     articlesRead: "+0",
//   });

//   useEffect(() => {
//     if (!user) return;
//     let cancelled = false;

//     const loadDashboard = async () => {
//       try {
//         setLoading(true);

//         const res: any = await progressAPI.getDashboard();
//         if (!res?.success || cancelled) return;

//         const { stats, lastArticles, bookmarks, perPart } = res;

//         const newState: DashboardState = {
//           totalScore: stats?.totalScore ?? 0,
//           gamesPlayed: stats?.gamesPlayed ?? 0,
//           articlesRead: stats?.articlesRead ?? 0,
//           quizzesTaken: stats?.quizzesTaken ?? 0,
//           currentStreak: stats?.currentStreak ?? 0,
//           joinedDate: user.id,
//           lastArticles: (lastArticles || []).map((a: any) => ({
//             articleNumber: normalizeArticleId(String(a.articleNumber)),
//             partName: a.partName,
//           })),
//           bookmarks: bookmarks || [],
//           perPart: perPart || [],
//         };

//         // ✅ TREND FIX (use localStorage previous value)
//         const key = `dashboard_prev_${user.id}`;
//         const prevRaw = localStorage.getItem(key);

//         const prev = prevRaw
//           ? JSON.parse(prevRaw)
//           : {
//             totalScore: newState.totalScore,
//             gamesPlayed: newState.gamesPlayed,
//             currentStreak: newState.currentStreak,
//             articlesRead: newState.articlesRead,
//           };

//         const formatTrend = (diff: number) => (diff >= 0 ? `+${diff}` : `${diff}`);

//         setTrends({
//           totalScore: formatTrend(newState.totalScore - (prev.totalScore ?? 0)),
//           gamesPlayed: formatTrend(newState.gamesPlayed - (prev.gamesPlayed ?? 0)),
//           currentStreak: formatTrend(newState.currentStreak - (prev.currentStreak ?? 0)),
//           articlesRead: formatTrend(newState.articlesRead - (prev.articlesRead ?? 0)),
//         });

//         // ✅ Save latest stats as "previous" for next time
//         localStorage.setItem(
//           key,
//           JSON.stringify({
//             totalScore: newState.totalScore,
//             gamesPlayed: newState.gamesPlayed,
//             currentStreak: newState.currentStreak,
//             articlesRead: newState.articlesRead,
//           })
//         );

//         setData(newState);
//       } catch (err) {
//         console.error("Failed to load dashboard data", err);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     loadDashboard();
//     return () => {
//       cancelled = true;
//     };
//   }, [user]);

//   if (!user || loading || !data) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   const avatar = user.name.split(" ").map((n) => n[0]).join("");

//   const recentActivity: RecentActivityItem[] = data.lastArticles
//     .slice(0, 3)
//     .map((a, index): RecentActivityItem => ({
//       id: index + 1,
//       type: "article",
//       articleNumber: a.articleNumber,
//       partName: a.partName,
//       title: `Article ${a.articleNumber}`,
//       progress: 100,
//       date: new Date().toISOString().slice(0, 10),
//     }));

//   const sortedPerPart = [...data.perPart]
//     .filter((p) => p.totalInPart > 0)
//     .sort((a, b) => {
//       const pa = a.readCount / a.totalInPart;
//       const pb = b.readCount / b.totalInPart;
//       if (pa === 1 && pb !== 1) return 1;
//       if (pa !== 1 && pb === 1) return -1;
//       return pb - pa;
//     })
//     .slice(0, 3);

//   return (
//     <div className="w-full max-w-7xl animate-fade-in mx-auto px-4 py-6">
//       {/* Header */}
//       <div className="mb-8 flex items-center gap-6">
//         <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">
//           {avatar}
//         </div>
//         <div>
//           <h1 className="text-4xl font-bold text-white">
//             Welcome back, {user.name}! 👋
//           </h1>
//           <p className="text-slate-400 mt-1">
//             Track your constitutional learning journey
//           </p>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <ScoreCard
//           icon={Trophy}
//           label="Total Score"
//           value={data.totalScore}
//           gradient="from-yellow-500 to-orange-500"
//           trend={trends.totalScore}
//         />
//         <ScoreCard
//           icon={Flame}
//           label="Streak"
//           value={`${data.currentStreak} days`}
//           gradient="from-red-500 to-pink-500"
//           trend={trends.currentStreak}
//         />
//         <ScoreCard
//           icon={Target}
//           label="Games"
//           value={data.gamesPlayed}
//           gradient="from-blue-500 to-cyan-500"
//           trend={trends.gamesPlayed}
//         />
//         <ScoreCard
//           icon={BookOpen}
//           label="Articles"
//           value={data.articlesRead}
//           gradient="from-purple-500 to-pink-500"
//           trend={trends.articlesRead}
//         />
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Main Column */}
//         <div className="lg:col-span-2 space-y-8">
//           <Card>
//             <div className="flex items-center gap-3 mb-6">
//               <TrendingUp className="w-6 h-6 text-orange-400" />
//               <h2 className="text-2xl font-bold text-white">Learning Progress</h2>
//             </div>

//             <div className="space-y-6">
//               {sortedPerPart.map((part) => (
//                 <div key={part.partName}>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-slate-300 font-semibold">{part.partName}</span>
//                     <span className="text-slate-400 text-sm">
//                       {part.readCount}/{part.totalInPart}
//                     </span>
//                   </div>
//                   <ProgressBar value={part.readCount} max={part.totalInPart || 1} color="primary" />
//                 </div>
//               ))}

//               <div>
//                 <div className="flex justify-between items-center mb-2 pt-4 border-t border-slate-700/50">
//                   <span className="text-slate-300 font-semibold">Overall Completion</span>
//                   <span className="text-slate-400 text-sm">{data.articlesRead}/395</span>
//                 </div>
//                 <ProgressBar value={data.articlesRead} max={395} color="success" />
//               </div>
//             </div>
//           </Card>

//           <Card>
//             <div className="flex items-center gap-3 mb-6">
//               <BarChart3 className="w-6 h-6 text-orange-400" />
//               <h2 className="text-2xl font-bold text-white">Weekly Activity</h2>
//             </div>

//             <div className="flex items-end justify-between gap-2 h-48 px-2">
//               {weeklyProgress.map((day, index) => (
//                 <div key={index} className="flex-1 flex flex-col items-center gap-2">
//                   <div className="w-full bg-slate-800 rounded-t-lg h-40 flex items-end overflow-hidden">
//                     <div
//                       className="w-full bg-gradient-to-t from-orange-600 to-orange-400 transition-all duration-700 ease-out"
//                       style={{ height: `${day.value}%` }}
//                     />
//                   </div>
//                   <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
//                     {day.day}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-8">
//           <Bookmarks bookmarks={data.bookmarks} onNavigate={onNavigate} />

//           <RecentReading
//             activities={recentActivity}
//             onNavigate={onNavigate}
//           />

//         </div>
//       </div>

//       <div className="mt-8">
//         <UserProgress
//           user={user}
//           onNavigate={onNavigate}
//           stats={{
//             articlesRead: data.articlesRead,
//             quizzesTaken: data.quizzesTaken,
//             totalScore: data.totalScore,
//             currentStreak: data.currentStreak,
//           }}
//         />
//       </div>
//     </div>
//   );
// };









// frontend/src/components/dashboard/Dashboard.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Trophy,
  Target,
  TrendingUp,
  Flame,
  BookOpen,
} from "lucide-react";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";
import { UserProgress } from "./UserProgress";
import { ScoreCard } from "./ScoreCard";
import { Bookmarks } from "./Bookmarks";
import { RecentReading } from "./RecentReading";
import { progressAPI } from "../../services/api";
import type { UserData } from "../../App";

interface DashboardProps {
  user: UserData | null;
}

interface DashboardState {
  totalScore: number;
  gamesPlayed: number;
  articlesRead: number;
  quizzesTaken: number;
  currentStreak: number;
  joinedDate?: string;
  lastArticles: {
    articleNumber: string;
    partName?: string;
  }[];
  bookmarks: any[];
  perPart: {
    partName: string;
    readCount: number;
    totalInPart: number;
  }[];
}

const normalizeArticleId = (raw: string): string => {
  const str = raw.trim();
  if (str.toLowerCase().includes("preamble")) return "0";
  const match = str.match(/(\d+[A-Za-z]*)/);
  return match ? match[1] : str;
};

type ActivityType = "game" | "article" | "quiz";

interface RecentActivityItem {
  id: number;
  type: ActivityType;
  title: string;
  articleNumber?: string;
  partName?: string;
  score?: number;
  progress?: number;
  date: string;
}

const weeklyProgress = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 60 },
  { day: "Sun", value: 85 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardState | null>(null);
  const [loading, setLoading] = useState(true);

  const [trends, setTrends] = useState({
    totalScore: "+0",
    gamesPlayed: "+0",
    currentStreak: "+0",
    articlesRead: "+0",
  });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const res: any = await progressAPI.getDashboard();
        if (!res?.success || cancelled) return;

        const { stats, lastArticles, bookmarks, perPart } = res;

        const newState: DashboardState = {
          totalScore: stats?.totalScore ?? 0,
          gamesPlayed: stats?.gamesPlayed ?? 0,
          articlesRead: stats?.articlesRead ?? 0,
          quizzesTaken: stats?.quizzesTaken ?? 0,
          currentStreak: stats?.currentStreak ?? 0,
          joinedDate: user.id,
          lastArticles: (lastArticles || []).map((a: any) => ({
            articleNumber: normalizeArticleId(String(a.articleNumber)),
            partName: a.partName,
          })),
          bookmarks: bookmarks || [],
          perPart: perPart || [],
        };

        const key = `dashboard_prev_${user.id}`;
        const prevRaw = localStorage.getItem(key);

        const prev = prevRaw
          ? JSON.parse(prevRaw)
          : {
            totalScore: newState.totalScore,
            gamesPlayed: newState.gamesPlayed,
            currentStreak: newState.currentStreak,
            articlesRead: newState.articlesRead,
          };

        const formatTrend = (diff: number) => (diff >= 0 ? `+${diff}` : `${diff}`);

        setTrends({
          totalScore: formatTrend(newState.totalScore - (prev.totalScore ?? 0)),
          gamesPlayed: formatTrend(newState.gamesPlayed - (prev.gamesPlayed ?? 0)),
          currentStreak: formatTrend(newState.currentStreak - (prev.currentStreak ?? 0)),
          articlesRead: formatTrend(newState.articlesRead - (prev.articlesRead ?? 0)),
        });

        localStorage.setItem(
          key,
          JSON.stringify({
            totalScore: newState.totalScore,
            gamesPlayed: newState.gamesPlayed,
            currentStreak: newState.currentStreak,
            articlesRead: newState.articlesRead,
          })
        );

        setData(newState);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user || loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const avatar = user.name.split(" ").map((n) => n[0]).join("");

  const recentActivity: RecentActivityItem[] = data.lastArticles
    .slice(0, 3)
    .map((a, index): RecentActivityItem => ({
      id: index + 1,
      type: "article",
      articleNumber: a.articleNumber,
      partName: a.partName,
      title: `Article ${a.articleNumber}`,
      progress: 100,
      date: new Date().toISOString().slice(0, 10),
    }));

  const sortedPerPart = [...data.perPart]
    .filter((p) => p.totalInPart > 0)
    .sort((a, b) => {
      const pa = a.readCount / a.totalInPart;
      const pb = b.readCount / b.totalInPart;
      if (pa === 1 && pb !== 1) return 1;
      if (pa !== 1 && pb === 1) return -1;
      return pb - pa;
    })
    .slice(0, 3);

  return (
    <div className="w-full max-w-7xl animate-fade-in mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-6">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">
          {avatar}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-slate-400 mt-1">
            Track your constitutional learning journey
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <ScoreCard
          icon={Trophy}
          label="Total Score"
          value={data.totalScore}
          gradient="from-yellow-500 to-orange-500"
          trend={trends.totalScore}
        />
        <ScoreCard
          icon={Flame}
          label="Streak"
          value={`${data.currentStreak} days`}
          gradient="from-red-500 to-pink-500"
          trend={trends.currentStreak}
        />
        <ScoreCard
          icon={Target}
          label="Games"
          value={data.gamesPlayed}
          gradient="from-blue-500 to-cyan-500"
          trend={trends.gamesPlayed}
        />
        <ScoreCard
          icon={BookOpen}
          label="Articles"
          value={data.articlesRead}
          gradient="from-purple-500 to-pink-500"
          trend={trends.articlesRead}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Learning Progress</h2>
            </div>

            <div className="space-y-6">
              {sortedPerPart.map((part) => (
                <div key={part.partName}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 font-semibold">{part.partName}</span>
                    <span className="text-slate-400 text-sm">
                      {part.readCount}/{part.totalInPart}
                    </span>
                  </div>
                  <ProgressBar value={part.readCount} max={part.totalInPart || 1} color="primary" />
                </div>
              ))}

              <div>
                <div className="flex justify-between items-center mb-2 pt-4 border-t border-slate-700/50">
                  <span className="text-slate-300 font-semibold">Overall Completion</span>
                  <span className="text-slate-400 text-sm">{data.articlesRead}/395</span>
                </div>
                <ProgressBar value={data.articlesRead} max={395} color="success" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Weekly Activity</h2>
            </div>

            <div className="flex items-end justify-between gap-2 h-48 px-2">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-800 rounded-t-lg h-40 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-orange-600 to-orange-400 transition-all duration-700 ease-out"
                      style={{ height: `${day.value}%` }}
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Bookmarks bookmarks={data.bookmarks} />

          <RecentReading activities={recentActivity} />
        </div>
      </div>

      <div className="mt-8">
        <UserProgress
          user={user}
          stats={{
            articlesRead: data.articlesRead,
            quizzesTaken: data.quizzesTaken,
            totalScore: data.totalScore,
            currentStreak: data.currentStreak,
          }}
        />
      </div>
    </div>
  );
};