// frontend/src/components/dashboard/Dashboard.tsx

import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Trophy,
  Target,
  TrendingUp,
  Flame,
  Calendar,
  BookOpen,
} from "lucide-react";
import { Card } from "../common/Card";
import { ProgressBar } from "../common/ProgressBar";
import { UserProgress } from "./UserProgress";
import { ScoreCard } from "./ScoreCard";
import { AchievementBadges } from "./AchievementBadges";
import { progressAPI } from "../../services/api";
import type { UserData } from "../../App";

interface DashboardProps {
  user: UserData | null;
  onNavigate: (page: string, data?: any) => void;
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
}


// helper to ensure we always use clean article ids like "372" or "0"
const normalizeArticleId = (raw: string): string => {
  const str = raw.trim();
  if (str.toLowerCase().includes("preamble")) return "0";
  const match = str.match(/(\d+[A-Za-z]*)/);
  return match ? match[1] : str;
};

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const [data, setData] = useState<DashboardState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        const res: any = await progressAPI.getDashboard();
        if (!res?.success || cancelled) return;

        const { stats, lastArticles, bookmarks } = res;

        setData({
          totalScore: stats?.totalScore ?? 0,
          gamesPlayed: stats?.gamesPlayed ?? 0,
          articlesRead: stats?.articlesRead ?? 0,
          quizzesTaken: stats?.quizzesTaken ?? 0,
          currentStreak: stats?.currentStreak ?? 0,
          joinedDate: user.id, // or from backend later
          lastArticles: (lastArticles || []).map((a: any) => ({
            articleNumber: normalizeArticleId(String(a.articleNumber)),
            partName: a.partName,
          })),
          bookmarks: bookmarks || [],
        });
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
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Loading user data...</h1>
      </div>
    );
  }

  const userData = {
    avatar: user.name
      .split(" ")
      .map((n) => n[0])
      .join(""),
    totalScore: data.totalScore,
    gamesPlayed: data.gamesPlayed,
    articlesRead: data.articlesRead,
    quizzesTaken: data.quizzesTaken,
    currentStreak: data.currentStreak,
    joinedDate: data.joinedDate ?? "—",
  };

  const recentActivity = data.lastArticles
  .slice(0, 3)
  .map((a, index) => ({
    id: index + 1,
    type: "article" as const,
    articleNumber: a.articleNumber,
    partName: a.partName,                // add this
    title: `Article ${a.articleNumber}`,
    progress: 100,
    date: new Date().toISOString().slice(0, 10),
  })) as {
    id: number;
    type: "game" | "article" | "quiz";
    title: string;
    articleNumber?: string;
    partName?: string;
    score?: number;
    progress?: number;
    date: string;
  }[];



  const weeklyProgress = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 80 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 75 },
    { day: "Sat", value: 60 },
    { day: "Sun", value: 85 },
  ];

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl">
            {userData.avatar}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-slate-400">
              Track your constitutional learning journey
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <ScoreCard
          icon={Trophy}
          label="Total Score"
          value={userData.totalScore}
          gradient="from-yellow-500 to-orange-500"
          trend="+12%"
        />
        <ScoreCard
          icon={Flame}
          label="Current Streak"
          value={`${userData.currentStreak} days`}
          gradient="from-red-500 to-pink-500"
          trend="🔥"
        />
        <ScoreCard
          icon={Target}
          label="Games Played"
          value={userData.gamesPlayed}
          gradient="from-blue-500 to-cyan-500"
          trend="+3"
        />
        <ScoreCard
          icon={BookOpen}
          label="Articles Read"
          value={userData.articlesRead}
          gradient="from-purple-500 to-pink-500"
          trend="+5"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Learning Progress */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">
                Learning Progress
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-semibold">
                    Fundamental Rights
                  </span>
                  <span className="text-slate-400 text-sm">
                    18/30 Articles
                  </span>
                </div>
                <ProgressBar value={18} max={30} color="primary" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-semibold">
                    Directive Principles
                  </span>
                  <span className="text-slate-400 text-sm">
                    10/19 Articles
                  </span>
                </div>
                <ProgressBar value={10} max={19} color="info" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-semibold">
                    Union & States
                  </span>
                  <span className="text-slate-400 text-sm">
                    45/100 Articles
                  </span>
                </div>
                <ProgressBar value={45} max={100} color="warning" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-semibold">
                    Overall Progress
                  </span>
                  <span className="text-slate-400 text-sm">
                    {data.articlesRead}/395 Articles
                  </span>
                </div>
                <ProgressBar
                  value={data.articlesRead}
                  max={395}
                  color="success"
                />
              </div>
            </div>
          </Card>

          {/* Weekly Activity Chart */}
          <Card className="mt-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Weekly Activity</h2>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyProgress.map((day, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="relative w-full bg-slate-700 rounded-t-lg overflow-hidden"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg transition-all duration-500"
                      style={{ height: `${day.value}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-slate-500">
              Average daily activity: 72 minutes
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <AchievementBadges />

          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-bold text-white">
                Recent Activity
              </h2>
            </div>
            <div className="space-y-4">
              {recentActivity.length === 0 && (
                <p className="text-slate-500 text-sm">
                  Start reading to see your activity here.
                </p>
              )}
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => {
                    if (activity.type === "article" && activity.articleNumber) {
                      // Go to Learn → PartArticles with this part and article
                      onNavigate("learn", {
                        fromDashboard: true,
                        targetPartName: activity.partName,        // need partName in recentActivity
                        targetArticleNumber: activity.articleNumber,
                      });
                    }
                  }}

                  className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.type === "game"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : activity.type === "article"
                        ? "bg-gradient-to-br from-purple-500 to-pink-500"
                        : "bg-gradient-to-br from-green-500 to-emerald-500"
                      }`}
                  >
                    {activity.type === "game"
                      ? "🎮"
                      : activity.type === "article"
                        ? "📖"
                        : "📝"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm truncate">
                      {activity.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-400">
                        {activity.date}
                      </span>
                      {activity.score && (
                        <span className="text-xs font-bold text-orange-400">
                          {activity.score}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <UserProgress />
    </div>
  );
};
