import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, ChevronRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { Level } from '../../types/game';

interface VictoryModalProps {
  level: Level;
  isOpen: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  isLastLevelInChapter: boolean;
  onOpenChapterComplete: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  isOpen,
  onNextLevel,
  onReplay,
  isLastLevelInChapter,
  onOpenChapterComplete,
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-lg bg-[#081022] border-2 border-cyan-500/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 text-center relative"
        >
          {/* Subtle glowing halo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-500/20 blur-2xl pointer-events-none" />

          {/* Success Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30 mb-4 border border-cyan-200">
            <CheckCircle2 className="w-9 h-9 text-slate-950" />
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            CHAMBER {level.id} DISENGAGED
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            {level.title} Cleared!
          </h2>

          {/* Story success resolution */}
          <div className="my-4 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-left space-y-2">
            {level.storySuccess.map((line, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-mono font-bold text-cyan-300 text-[11px] block">
                  {line.speaker}:
                </span>
                <p className="text-slate-200 mt-0.5 leading-relaxed">{line.text}</p>
              </div>
            ))}
          </div>

          {/* Rewards Card */}
          <div className="flex items-center justify-center gap-6 py-2 border-y border-slate-800/80 mb-5">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">XP Gained</span>
              <span className="text-sm font-mono font-bold text-cyan-300">+{level.xpReward} XP</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Concept Mastered</span>
              <span className="text-sm font-bold text-slate-200">{level.conceptName.split('&')[0]}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onReplay}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Review Code</span>
            </button>

            {isLastLevelInChapter ? (
              <button
                onClick={onOpenChapterComplete}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Chapter 1 Finale</span>
              </button>
            ) : (
              <button
                onClick={onNextLevel}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <span>Next Chamber</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
