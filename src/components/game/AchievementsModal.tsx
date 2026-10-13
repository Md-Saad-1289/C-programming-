import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, CheckCircle, Terminal, Zap, Cpu, Shield, Key, Award } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/chapter1';
import { PlayerProgress } from '../../types/game';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: PlayerProgress;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Key':
        return <Key className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl bg-[#091020] border border-cyan-800/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-[#050914] border-b border-slate-800 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider font-semibold">
                  HONOR ROLL
                </span>
                <h2 className="font-display text-lg font-bold text-white tracking-wide">
                  Keeper Achievements ({progress.unlockedAchievements.length} / {ACHIEVEMENTS.length})
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Achievement Grid */}
          <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((item) => {
              const isUnlocked = progress.unlockedAchievements.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {renderIcon(item.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.title}
                      </h4>
                      {isUnlocked && (
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
