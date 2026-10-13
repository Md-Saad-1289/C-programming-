import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Bot, ChevronRight, FastForward, Sparkles } from 'lucide-react';
import { DialogueLine } from '../../types/game';

interface DialogueBoxProps {
  dialogues: DialogueLine[];
  onComplete?: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ dialogues, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = dialogues[currentIndex] || dialogues[0];
  const isLast = currentIndex >= dialogues.length - 1;

  const handleNext = () => {
    if (isLast) {
      if (onComplete) onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (onComplete) onComplete();
  };

  const getRoleStyle = (role: DialogueLine['role']) => {
    switch (role) {
      case 'aria':
        return {
          border: 'border-cyan-500/40',
          bg: 'from-cyan-950/60 to-slate-950/90',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          avatarBg: 'bg-gradient-to-tr from-cyan-600 to-sky-400',
          avatarIcon: <Bot className="w-4 h-4 text-slate-950" />,
        };
      case 'terminal':
        return {
          border: 'border-emerald-500/40',
          bg: 'from-emerald-950/60 to-slate-950/90',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          avatarBg: 'bg-emerald-600',
          avatarIcon: <Terminal className="w-4 h-4 text-white" />,
        };
      default:
        return {
          border: 'border-indigo-500/40',
          bg: 'from-indigo-950/60 to-slate-950/90',
          badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          avatarBg: 'bg-indigo-600',
          avatarIcon: <Sparkles className="w-4 h-4 text-white" />,
        };
    }
  };

  const roleStyle = getRoleStyle(current.role);

  return (
    <div
      className={`w-full rounded-xl border ${roleStyle.border} bg-gradient-to-r ${roleStyle.bg} backdrop-blur-md p-3.5 sm:p-4 shadow-xl transition-colors duration-300`}
    >
      <div className="flex items-start gap-3">
        {/* Character Avatar */}
        <div className={`w-9 h-9 rounded-lg ${roleStyle.avatarBg} flex items-center justify-center shadow-md flex-shrink-0 mt-0.5`}>
          {roleStyle.avatarIcon}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${roleStyle.badge}`}>
              {current.speaker}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">
                {currentIndex + 1} / {dialogues.length}
              </span>
              <button
                onClick={handleSkip}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
              >
                <FastForward className="w-3 h-3" />
                <span className="hidden sm:inline">Skip</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18 }}
              className="text-slate-200 text-xs sm:text-sm leading-relaxed"
            >
              {current.text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="self-center px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-xs text-cyan-300 font-medium flex items-center gap-1 transition-colors shadow"
        >
          <span>{isLast ? 'Begin' : 'Next'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
