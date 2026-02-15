// frontend/src/components/games/MemoryGame/MatchModal.tsx

import React from 'react';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { ArticleData } from '../../../types';
import { CheckCircle, Info } from 'lucide-react';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleData: ArticleData | null;
}

export const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, articleData }) => {
  if (!articleData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-left">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Match: {articleData.article}</h3>
            <p className="text-green-300 font-semibold">Perfect Match! 🎉</p>
          </div>
        </div>
        <p className="text-slate-400 leading-relaxed mb-6 bg-slate-700/50 p-4 rounded-lg border border-slate-600">{articleData.summary}</p>
        
        <div className="space-y-4 mb-8">
          {articleData.details.map((detail, index) => (
            <div key={index} className="flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white">{detail.title}</h4>
                <p className="text-slate-400 text-sm">{detail.text}</p>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={onClose} variant="primary" className="w-full">
          Continue
        </Button>
      </div>
    </Modal>
  );
};