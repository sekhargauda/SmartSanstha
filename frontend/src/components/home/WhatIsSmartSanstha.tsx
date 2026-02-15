import React from 'react';
import { Sparkles, ArrowRight, FileText, BookOpen, Calendar, Users } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useInView } from 'react-intersection-observer';

interface WhatIsSmartSansthaProps {
  onNavigate: (page: string) => void;
}

export const WhatIsSmartSanstha: React.FC<WhatIsSmartSansthaProps> = ({ onNavigate }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '470+', label: 'Articles Covered', icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />, color: 'text-orange-400' },
    { number: '100%', label: 'Free Access', icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />, color: 'text-blue-400' },
    { number: '24/7', label: 'AI Assistance', icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />, color: 'text-purple-400' },
    { number: '10+', label: 'Interactive Games', icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />, color: 'text-green-400' }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
          <div 
            ref={ref}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            <div className={inView ? 'animate-fade-in-up' : 'opacity-0'}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4 sm:mb-6">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-semibold text-xs sm:text-sm">About Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                What is SmartSanstha?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                SmartSanstha is India's first <span className="text-orange-400 font-semibold">gamified constitutional learning platform</span> that makes understanding the Constitution of India fun, interactive, and accessible to everyone.
              </p>
              <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Whether you're a student, competitive exam aspirant, or a curious citizen, we provide simplified content, engaging games, and AI assistance to help you master constitutional knowledge.
              </p>
              <Button 
                onClick={() => onNavigate('about')} 
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Learn More About Us
              </Button>
            </div>
            <div 
              className={`grid grid-cols-2 gap-3 sm:gap-4 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-orange-500/50 transition-all transform hover:scale-105"
                >
                  <div className={`flex justify-center mb-2 sm:mb-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-slate-400 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};