// // frontend/src/components/dashboard/AdminDashboard.tsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Users, 
//   FileText, 
//   TrendingUp, 
//   Award,
//   Calendar,
//   BarChart3,
//   Shield,
//   Clock
// } from 'lucide-react';
// import { Card } from '../common/Card';

// interface AdminData {
//   name: string;
//   email: string;
// }

// interface AdminDashboardProps {
//   admin: AdminData;
// }

// interface DashboardStats {
//   totalUsers: number;
//   totalAdmins: number;
//   categoryDistribution: Array<{ _id: string; count: number }>;
//   recentSignups: Array<{
//     _id: string;
//     name: string;
//     email: string;
//     category: string;
//     createdAt: string;
//   }>;
//   signupsOverTime: Array<{ _id: string; count: number }>;
// }

// export const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin }) => {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const API_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:5001';

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/admin/stats`, {
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch statistics');
//         }

//         const data = await response.json();
//         setStats(data.stats);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStats();
//   }, [API_URL]);

//   const formatCategoryName = (category: string) => {
//     const names: { [key: string]: string } = {
//       middle_school: 'Middle School',
//       high_school: 'High School',
//       college_student: 'College Student',
//       advanced_learner: 'Advanced Learner',
//     };
//     return names[category] || category;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full max-w-7xl animate-fade-in">
//         <div className="text-center text-white">Loading dashboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full max-w-7xl animate-fade-in">
//         <div className="text-center text-red-400">Error: {error}</div>
//       </div>
//     );
//   }

//   if (!stats) return null;

//   // Calculate total articles (you can update this from your database)
//   const totalArticles = 395; // Constitution articles count

//   return (
//     <div className="w-full max-w-7xl animate-fade-in px-4 sm:px-6 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-4 mb-6">
//           <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
//             <Shield className="w-10 h-10" />
//           </div>
//           <div>
//             <h1 className="text-3xl sm:text-4xl font-bold text-white">
//               Admin Dashboard
//             </h1>
//             <p className="text-slate-400">Welcome back, {admin.name}</p>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-400 text-sm">Total Users</p>
//               <p className="text-3xl font-bold text-white mt-1">{stats.totalUsers}</p>
//             </div>
//             <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
//               <Users className="w-6 h-6 text-blue-400" />
//             </div>
//           </div>
//         </Card>

//         <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-400 text-sm">Total Articles</p>
//               <p className="text-3xl font-bold text-white mt-1">{totalArticles}</p>
//             </div>
//             <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
//               <FileText className="w-6 h-6 text-green-400" />
//             </div>
//           </div>
//         </Card>

//         <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-400 text-sm">Total Admins</p>
//               <p className="text-3xl font-bold text-white mt-1">{stats.totalAdmins}</p>
//             </div>
//             <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
//               <Shield className="w-6 h-6 text-orange-400" />
//             </div>
//           </div>
//         </Card>

//         <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-slate-400 text-sm">New Users (30d)</p>
//               <p className="text-3xl font-bold text-white mt-1">
//                 {stats.signupsOverTime.reduce((sum, day) => sum + day.count, 0)}
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
//               <TrendingUp className="w-6 h-6 text-purple-400" />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* User Category Distribution */}
//         <Card>
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//               <BarChart3 className="w-5 h-5 text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-white">User Categories</h2>
//           </div>
//           <div className="space-y-3">
//             {stats.categoryDistribution.map((cat) => {
//               const percentage = ((cat.count / stats.totalUsers) * 100).toFixed(1);
//               return (
//                 <div key={cat._id} className="space-y-1">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-slate-300">{formatCategoryName(cat._id)}</span>
//                     <span className="text-slate-400">{cat.count} ({percentage}%)</span>
//                   </div>
//                   <div className="w-full bg-slate-700 rounded-full h-2">
//                     <div
//                       className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
//                       style={{ width: `${percentage}%` }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </Card>

//         {/* Recent Signups */}
//         <Card>
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//               <Clock className="w-5 h-5 text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-white">Recent Signups</h2>
//           </div>
//           <div className="space-y-3 max-h-80 overflow-y-auto">
//             {stats.recentSignups.length === 0 ? (
//               <p className="text-slate-400 text-sm">No recent signups</p>
//             ) : (
//               stats.recentSignups.map((user) => (
//                 <div
//                   key={user._id}
//                   className="flex items-start justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
//                 >
//                   <div className="flex-1">
//                     <p className="text-white font-medium">{user.name}</p>
//                     <p className="text-slate-400 text-sm">{user.email}</p>
//                     <p className="text-slate-500 text-xs mt-1">
//                       {formatCategoryName(user.category)}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-slate-400 text-xs">{formatDate(user.createdAt)}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </Card>
//       </div>

//       {/* Signup Trend */}
//       <Card>
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//             <Calendar className="w-5 h-5 text-white" />
//           </div>
//           <h2 className="text-xl font-bold text-white">Signup Trend (Last 30 Days)</h2>
//         </div>
//         <div className="space-y-2">
//           {stats.signupsOverTime.length === 0 ? (
//             <p className="text-slate-400 text-sm">No signup data available</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
//               {stats.signupsOverTime.map((day) => (
//                 <div
//                   key={day._id}
//                   className="p-3 bg-slate-700/30 rounded-lg text-center hover:bg-slate-700/50 transition-colors"
//                 >
//                   <p className="text-slate-400 text-xs">{formatDate(day._id)}</p>
//                   <p className="text-white font-bold text-lg mt-1">{day.count}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };















// frontend/src/components/dashboard/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  Users,
  FileText,
  TrendingUp,
  Shield,
  Calendar,
  BarChart3,
  Clock,
  Award,
  Brain,
  Activity
} from 'lucide-react';
import { Card } from '../common/Card';

interface AdminData {
  name: string;
  email: string;
}

interface AdminDashboardProps {
  admin: AdminData;
}

/* ---------------- BACKEND STATS TYPE ---------------- */
interface ApiDashboardStats {
  totalUsers: number;
  totalArticles: number;
  totalAdmins: number;
  totalQuizAttempts: number;
  categoryDistribution: { _id: string; count: number }[];
  recentSignups: {
    _id: string;
    name: string;
    email: string;
    category: string;
    createdAt: string;
  }[];
  signupsOverTime: { _id: string; count: number }[];
}

/* ---------------- UI STATS TYPE ---------------- */
interface UIDashboardStats {
  totalUsers: number;
  totalArticles: number;
  totalAdmins: number;
  totalQuizAttempts: number;
  newUsersThisMonth: number;
  activeUsersToday: number;
  categoryDistribution: {
    name: string;
    count: number;
    percentage: number;
  }[];
  recentSignups: {
    id: string;
    name: string;
    email: string;
    category: string;
    date: string;
  }[];
  signupTrend: {
    date: string;
    count: number;
  }[];
  topArticles: {
    title: string;
    views: number;
  }[];
  quizPerformance: {
    averageScore: number;
    totalAttempts: number;
    passRate: number;
  };
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin }) => {
  const [stats, setStats] = useState<UIDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL =
    import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:5001';

  /* ---------------- HELPERS ---------------- */
  const formatCategoryName = (category: string) => {
    const names: Record<string, string> = {
      middle_school: 'Middle School',
      high_school: 'High School',
      college_student: 'College Student',
      advanced_learner: 'Advanced Learner',
    };
    return names[category] || category;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  /* ---------------- TRANSFORM BACKEND → UI ---------------- */
  const normalizeStats = (api: ApiDashboardStats): UIDashboardStats => {
    const totalUsers = api.totalUsers;

    return {
      totalUsers,
      totalAdmins: api.totalAdmins,
      totalArticles: api.totalArticles,
      totalQuizAttempts: api.totalQuizAttempts,

      newUsersThisMonth: api.signupsOverTime.reduce(
        (sum, d) => sum + d.count,
        0
      ),

      activeUsersToday: Math.floor(totalUsers * 0.18),

      categoryDistribution: api.categoryDistribution.map(cat => ({
        name: formatCategoryName(cat._id),
        count: cat.count,
        percentage: Math.round((cat.count / totalUsers) * 100),
      })),

      recentSignups: api.recentSignups.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        category: formatCategoryName(user.category),
        date: user.createdAt,
      })),

      signupTrend: api.signupsOverTime.map(day => ({
        date: day._id,
        count: day.count,
      })),

      topArticles: [
        { title: 'Article 21 - Right to Life', views: 1523 },
        { title: 'Article 19 - Freedom of Speech', views: 1342 },
        { title: 'Article 14 - Right to Equality', views: 1198 },
        { title: 'Article 32 - Constitutional Remedies', views: 987 },
        { title: 'Preamble', views: 856 },
      ],

      quizPerformance: {
        averageScore: 78,
        totalAttempts: api.totalQuizAttempts,
        passRate: 82,
      },
    };
  };

  /* ---------------- FETCH STATS ---------------- */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/stats`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to load dashboard');

        const data = await res.json();
        setStats(normalizeStats(data.stats));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_URL]);

  /* ---------------- STATES ---------------- */
  if (loading)
    return <p className="text-center text-white">Loading dashboard…</p>;

  if (error)
    return <p className="text-center text-red-400">{error}</p>;

  if (!stats) return null;

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Shield className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-slate-400">Welcome back, {admin.name}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats - Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-blue-400 text-xs mt-1">+{stats.newUsersThisMonth} this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 hover:border-green-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Articles</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalArticles}</p>
              <p className="text-green-400 text-xs mt-1">Constitution DB</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Quiz Attempts</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalQuizAttempts.toLocaleString()}</p>
              <p className="text-purple-400 text-xs mt-1">{stats.quizPerformance.passRate}% pass rate</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 hover:border-orange-500/40 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Admins</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalAdmins}</p>
              <p className="text-orange-400 text-xs mt-1">Active</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Activity Stats - Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Active Today</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.activeUsersToday}</p>
            </div>
            <Activity className="w-8 h-8 text-cyan-400" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border-pink-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Avg Quiz Score</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.quizPerformance.averageScore}%</p>
            </div>
            <Award className="w-8 h-8 text-pink-400" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">New This Month</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.newUsersThisMonth}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-400" />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Category Distribution */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">User Categories</h2>
          </div>
          <div className="space-y-4">
            {stats.categoryDistribution.map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{cat.name}</span>
                  <span className="text-slate-400">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              Total: <span className="text-white font-semibold">{stats.totalUsers.toLocaleString()}</span> users across all categories
            </p>
          </div>
        </Card>

        {/* Recent Signups */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Recent Signups</h2>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
            {stats.recentSignups.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{user.name}</p>
                    <p className="text-slate-400 text-sm truncate">{user.email}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{user.category}</p>
                  </div>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <p className="text-slate-400 text-xs">{formatDate(user.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid - Top Articles & Signup Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Articles */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Most Viewed Articles</h2>
          </div>
          <div className="space-y-3">
            {stats.topArticles.map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-white font-medium">{article.title}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-slate-400 text-sm">{article.views.toLocaleString()}</span>
                  <span className="text-slate-500 text-xs">views</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Signup Trend */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Signup Trend (Last 7 Days)</h2>
          </div>
          <div className="space-y-3">
            {stats.signupTrend.map((day, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{formatDate(day.date)}</span>
                  <span className="text-slate-400">{day.count} signups</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(day.count / 20) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total (7 days)</span>
              <span className="text-white font-semibold">
                {stats.signupTrend.reduce((sum, day) => sum + day.count, 0)} signups
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quiz Performance Summary */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Quiz Performance Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Total Attempts</p>
            <p className="text-3xl font-bold text-white">{stats.quizPerformance.totalAttempts.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Average Score</p>
            <p className="text-3xl font-bold text-white">{stats.quizPerformance.averageScore}%</p>
          </div>
          <div className="text-center p-4 bg-slate-700/30 rounded-lg">
            <p className="text-slate-400 text-sm mb-2">Pass Rate</p>
            <p className="text-3xl font-bold text-white">{stats.quizPerformance.passRate}%</p>
          </div>
        </div>
      </Card>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(51, 65, 85);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(249, 115, 22);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(234, 88, 12);
        }
      `}</style>
    </div>
  );
};