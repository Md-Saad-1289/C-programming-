import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Lock, Terminal, Zap, Cpu, Shield, Key, Sparkles } from 'lucide-react';
import { CHAPTER_1_LEVELS } from '../../data/chapter1';
import { PlayerProgress } from '../../types/game';

interface LevelMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: PlayerProgress;
  onSelectLevel: (levelId: number) => void;
}

export const LevelMapModal: React.FC<LevelMapModalProps> = ({
  isOpen,
  onClose,
  progress,
  onSelectLevel,
}) => {
  if (!isOpen) return null;

  const getLevelIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Terminal className="w-5 h-5" />;
      case 2:
        return <Zap className="w-5 h-5" />;
      case 3:
        return <Cpu className="w-5 h-5" />;
      case 4:
        return <Shield className="w-5 h-5" />;
      case 5:
        return <Key className="w-5 h-5" />;
      default:
        return <Terminal className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-[#09101f] border border-cyan-800/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#050914] border-b border-slate-800 px-5 py-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                CHAPTER 1
              </span>
              <h2 className="font-display text-lg font-bold text-white tracking-wide">
                Citadel Map: The Silent Gate
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Map Nodes Flow */}
          <div className="p-6 overflow-y-auto space-y-4">
            <p className="text-xs text-slate-400">
              যেকোনো আনলক করা চেম্বার বেছে নিয়ে কোড সমাধান করো বা পুনরায় প্র্যাকটিস করো। প্রতিটি লেভেলের টেস্ট কেস পাস করলেই গল্প এগিয়ে যাবে।
            </p>

            <div className="space-y-3 relative">
              {/* Connecting vertical path line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-800 z-0 opacity-40" />

              {CHAPTER_1_LEVELS.map((level) => {
                const isCompleted = progress.completedLevelIds.includes(level.id);
                const isUnlocked = progress.unlockedLevelIds.includes(level.id);
                const isCurrent = progress.currentLevelId === level.id;

                return (
                  <div
                    key={level.id}
                    onClick={() => {
                      if (isUnlocked) {
                        onSelectLevel(level.id);
                        onClose();
                      }
                    }}
                    className={`relative z-10 flex items-center gap-4 p-3.5 rounded-xl border transition-all ${
                      isUnlocked ? 'cursor-pointer hover:border-cyan-500/80' : 'cursor-not-allowed opacity-50'
                    } ${
                      isCurrent
                        ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-900/20'
                        : isCompleted
                        ? 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/80'
                        : 'bg-slate-950/60 border-slate-800/60'
                    }`}
                  >
                    {/* Node Icon Circle */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all ${
                        isCompleted
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                          : isCurrent
                          ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg glow-cyan font-bold'
                          : isUnlocked
                          ? 'bg-slate-800 border-slate-700 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isUnlocked ? (
                        getLevelIcon(level.id)
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>

                    {/* Level Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                          LEVEL 0{level.id} {level.id === 5 && '· BOSS'}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                            CURRENT
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                            CLEARED
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white tracking-wide truncate">
                        {level.title}
                      </h4>

                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {level.conceptName}
                      </p>
                    </div>

                    {/* XP Tag */}
                    <div className="text-right flex-shrink-0 font-mono text-xs">
                      <span className="text-cyan-300 font-bold">+{level.xpReward} XP</span>
                    </div>
                  </div>
                );
              })}

              {/* Locked Chapter 2 Node */}
              <div className="relative z-10 flex items-center gap-4 p-3.5 rounded-xl border border-dashed border-indigo-900/60 bg-indigo-950/10 opacity-70">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-900 border border-indigo-800/40 text-indigo-400 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">
                    CHAPTER 2 (PREVIEW)
                  </span>
                  <h4 className="text-sm font-bold text-indigo-200">The Sunken Archives</h4>
                  <p className="text-xs text-slate-500">
                    Pointers, Dynamic Memory, and Structs (Unlocks upon Chapter 1 victory)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
