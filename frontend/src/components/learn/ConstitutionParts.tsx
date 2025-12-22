// frontend/src/components/learn/ConstitutionParts.tsx

import React from 'react';
import { Card } from '../common/Card';
import { BookOpen, FileText, TrendingUp } from 'lucide-react';

interface ConstitutionPartsProps {
  parts: any[];
  searchQuery: string;
  selectedCategory: string;
  onNavigate?: (page: string, data?: any) => void;
}

export const ConstitutionParts: React.FC<ConstitutionPartsProps> = ({
  parts,
  searchQuery,
  selectedCategory,
  onNavigate = () => {}
}) => {
  const filteredParts = parts.filter((part) => {
    const matchesSearch =
      part.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const difficultyColors = {
    beginner: 'from-teal-500 to-emerald-600',    
    intermediate: 'from-amber-400 to-orange-500', 
    advanced: 'from-red-600 to-slate-700',      
  };

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'fundamental-rights': <BookOpen className="w-5 h-5" />,
    'directive-principles': <FileText className="w-5 h-5" />,
    'union': <TrendingUp className="w-5 h-5" />,
    'other': <BookOpen className="w-5 h-5" />,
  };

  const handlePartClick = (part: any) => {
    console.log('🎯 Part clicked:', part);
    
    // Navigate to part articles page to show all articles in this part
    onNavigate('part-articles', { 
      partName: part.title,  // e.g., "Preamble", "Part I", "Part III"
      partTitle: part.title
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-orange-400" />
        <h2 className="text-3xl font-bold text-white">Constitution Parts</h2>
        <span className="text-slate-500">({filteredParts.length} parts)</span>
      </div>

      {filteredParts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <Card 
              key={part.id} 
              hover 
              className="group cursor-pointer"
              onClick={() => handlePartClick(part)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    difficultyColors[part.difficulty as keyof typeof difficultyColors] || difficultyColors.intermediate
                  } rounded-xl flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-transform`}>
                    {part.partNumber !== undefined ? part.partNumber : '?'}
                  </div>
                  {/* <div className="text-slate-400">
                    {categoryIcons[part.category] || categoryIcons['other']}
                  </div> */}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${
                  difficultyColors[part.difficulty as keyof typeof difficultyColors] || difficultyColors.intermediate
                } text-white`}>
                  {part.difficulty || 'intermediate'}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                {part.title}
              </h3>
              
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                {part.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="text-sm text-slate-500">
                  {part.totalArticles} {part.totalArticles === 1 ? 'Article' : 'Articles'}
                </div>
                <button className="text-orange-400 font-semibold text-sm hover:gap-2 flex items-center gap-1 transition-all">
                  View Articles →
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">No parts found</h3>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};