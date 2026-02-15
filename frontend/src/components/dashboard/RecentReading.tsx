// import React from "react";
// import { Calendar, BookOpen } from "lucide-react";
// import { Card } from "../common/Card";

// interface RecentReadingItem {
//   id: number;
//   title: string;
//   articleNumber?: string;
//   partName?: string;
//   date: string;
// }

// interface RecentReadingProps {
//   activities: RecentReadingItem[];
//   onNavigate: (page: string, data?: any) => void;
// }

// export const RecentReading: React.FC<RecentReadingProps> = ({
//   activities,
//   onNavigate,
// }) => {
//   return (
//     <Card>
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-6">
//         <Calendar className="w-6 h-6 text-orange-400" />
//         <h2 className="text-xl font-bold text-white">Recent Reading</h2>
//       </div>

//       {/* Body */}
//       <div className="space-y-3">
//         {activities.length === 0 ? (
//           <p className="text-slate-500 text-sm py-4">
//             No recent activity found.
//           </p>
//         ) : (
//           activities.map((activity) => (
//             <div
//               key={activity.id}
//               onClick={() =>
//                 activity.articleNumber &&
//                 onNavigate("learn", {
//                   fromDashboard: true,
//                   targetPartName: activity.partName,
//                   targetArticleNumber: activity.articleNumber,
//                 })
//               }
//               className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl hover:bg-slate-800 transition-all cursor-pointer group"
//             >
//               {/* ✅ BookOpen Icon (No Emoji) */}
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <BookOpen className="w-5 h-5 text-white" />
//               </div>

//               {/* Text */}
//               <div className="flex-1 min-w-0">
//                 <h4 className="text-white font-semibold text-sm truncate">
//                   {activity.title}
//                 </h4>
//                 <p className="text-xs text-slate-500">{activity.date}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </Card>
//   );
// };







// frontend/src/components/dashboard/RecentReading.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, BookOpen } from "lucide-react";
import { Card } from "../common/Card";

interface RecentReadingItem {
  id: number;
  title: string;
  articleNumber?: string;
  partName?: string;
  date: string;
}

interface RecentReadingProps {
  activities: RecentReadingItem[];
}

export const RecentReading: React.FC<RecentReadingProps> = ({ activities }) => {
  const navigate = useNavigate();

  const handleActivityClick = (activity: RecentReadingItem) => {
    if (activity.articleNumber) {
      navigate(`/learn/article/${activity.articleNumber}`, {
        state: {
          articleNumber: activity.articleNumber,
          partName: activity.partName,
        },
      });
    }
  };

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-orange-400" />
        <h2 className="text-xl font-bold text-white">Recent Reading</h2>
      </div>

      {/* Body */}
      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="text-slate-500 text-sm py-4">
            No recent activity found.
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl hover:bg-slate-800 transition-all cursor-pointer group"
            >
              {/* BookOpen Icon */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm truncate">
                  {activity.title}
                </h4>
                <p className="text-xs text-slate-500">{activity.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};