import React from 'react';
import { Scale, Sparkles, Users, Globe } from 'lucide-react';
import { Card } from '../common/Card';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-8 w-full max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">SmartSanstha?</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto">
          A revolutionary platform transforming how India learns its Constitution
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="text-slate-300 leading-relaxed text-lg">
            SmartSanstha is an <span className="text-orange-400 font-semibold">AI-powered, gamified learning platform</span> designed to simplify the Indian Constitution for everyone. It transforms complex legal concepts into easy-to-understand language, enriched with interactive games, courtroom simulations, quizzes, and visual dashboards.
          </p>
          <p className="text-slate-300 leading-relaxed text-lg">
            The platform not only helps users explore the <span className="text-orange-400 font-semibold">Legislature, Executive, and Judiciary</span> but also provides multilingual support and AI-driven insights to make learning engaging, inclusive, and impactful.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: Users, label: 'For All Ages', color: 'from-blue-500 to-cyan-500' },
              { icon: Globe, label: 'Multilingual', color: 'from-green-500 to-emerald-500' },
              { icon: Sparkles, label: 'AI-Powered', color: 'from-purple-500 to-pink-500' },
              { icon: Scale, label: 'Legal Accuracy', color: 'from-orange-500 to-red-500' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-200">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-3xl"></div>
          <Card className="relative bg-slate-800/80 backdrop-blur-sm p-8 text-center">
            <Scale className="w-32 h-32 text-orange-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Constitutional Literacy</h3>
            <p className="text-slate-400">
              Empowering every citizen with knowledge of their rights, duties, and the democratic framework that governs our nation.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};