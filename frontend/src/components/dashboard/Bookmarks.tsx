// frontend/src/components/dashboard/Bookmarks.tsx
import React from "react";
import { Bookmark } from "lucide-react";
import { Card } from "../common/Card";

interface BookmarkItem {
  articleNumber: string;
  partName?: string;
}

interface BookmarksProps {
  bookmarks: BookmarkItem[];
  onNavigate: (page: string, data?: any) => void;
}

export const Bookmarks: React.FC<BookmarksProps> = ({
  bookmarks,
  onNavigate,
}) => {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <Bookmark className="w-6 h-6 text-orange-400" />
        <h2 className="text-xl font-bold text-white">Bookmarks</h2>
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-slate-500 text-sm">
          You haven’t bookmarked any articles yet.
        </p>
      ) : (
        <div className="space-y-3">
          {bookmarks.slice(0, 5).map((b, index) => (
            <div
              key={index}
              onClick={() =>
                onNavigate("learn", {
                  fromDashboard: true,
                  targetPartName: b.partName,
                  targetArticleNumber: b.articleNumber,
                })
              }
              className="p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition cursor-pointer"
            >
              <div className="text-white font-semibold text-sm">
                Article {b.articleNumber}
              </div>
              {b.partName && (
                <div className="text-xs text-slate-400">{b.partName}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
