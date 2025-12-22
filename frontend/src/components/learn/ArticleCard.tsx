// frontend/src/components/learn/ArticleCard.tsx

import React from 'react';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';

interface ArticleCardProps {
  article: {
    id: string;
    article: string; // e.g., "Article 14" or "Preamble"
    title: string;
    summary: string;
    readTime: number;
    category: string;
    difficulty?: string; // Add difficulty field
  };
  onNavigate: (page: string, data?: any) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate }) => {
  // Difficulty-based colors for book icon
  const difficultyColors: { [key: string]: string } = {
    'beginner': 'from-teal-500 to-emerald-600',
    'intermediate': 'from-amber-400 to-orange-500',
    'advanced': 'from-red-600 to-slate-700',
  };

  // Get the color based on difficulty, default to orange if not specified
  const getIconColor = () => {
    if (article.difficulty && difficultyColors[article.difficulty]) {
      return difficultyColors[article.difficulty];
    }
    return 'from-orange-500 to-red-500'; // Default color
  };

  const handleClick = () => {
    console.log('🎯 Article card clicked:', article);

    // Extract article number from the article string
    let articleNumber = '';

    if (article.article === 'Preamble') {
      articleNumber = '0';
    } else {
      // Extract number from "Article X" format
      const match = article.article.match(/Article\s+(\d+[A-Za-z]*)/);

      if (match) {
        articleNumber = match[1];
      } else {
        // If article.id format is "article-X", extract X
        const idMatch = article.id.match(/article-(\d+[A-Za-z]*)/);
        if (idMatch) {
          articleNumber = idMatch[1];
        }
      }
    }

    console.log('🔢 Extracted article number:', articleNumber);

    if (articleNumber) {
      onNavigate('article', { articleNumber });
    } else {
      console.error('❌ Could not extract article number from:', article);
      alert('Unable to load this article. Please try again.');
    }
  };

  return (
    <Card
      hover
      className="group cursor-pointer h-full flex flex-col"
      onClick={handleClick}
    >
      {/* Icon - Dynamic Color Based on Difficulty */}
      <div className={`w-12 h-12 bg-gradient-to-br ${getIconColor()} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
        <BookOpen className="w-6 h-6 text-white" />
      </div>

      {/* Article Number - Fixed Height */}
      <div className="text-sm font-bold text-orange-400 mb-2 flex-shrink-0">
        {article.article}
      </div>

      {/* Article Title - Fixed Height with 2 lines */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2 h-14 flex-shrink-0">
        {article.title}
      </h3>

      {/* Summary - Fixed Height with 3 lines, flex-grow to push footer down */}
      <p className="text-slate-400 text-sm mb-4 line-clamp-3 h-16 flex-grow">
        {article.summary}
      </p>

      {/* Footer - Fixed at bottom */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700 mt-auto flex-shrink-0">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>{article.readTime} min read</span>
        </div>
        <button className="flex items-center gap-1 text-orange-400 font-semibold text-sm group-hover:gap-2 transition-all">
          Read <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};