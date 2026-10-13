import React from 'react';
import { Shield, BookOpen, Trophy, Map, RefreshCw, Cpu } from 'lucide-react';
import { PlayerProgress } from '../../types/game';
import { CompilerStatusResponse } from '../../services/compilerService';

interface GameHeaderProps {
  progress: PlayerProgress;
  compilerStatus: CompilerStatusResponse | null;
  onOpenMap: () => void;
  onOpenCodex: () => void;
  onOpenAchievements: () => void;
  onResetProgress: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  progress,
  compilerStatus,
  onOpenMap,
  onOpenCodex,
  onOpenAchievements,
  onResetProgress,
}) => {
  const getRank = (xp: number): string => {
    if (xp >= 1000) return 'Archon Gatebreaker';
    if (xp >= 700) return 'Flux Sentinel';
    if (xp >= 450) return 'Circuit Adept';
    if (xp >= 200) return 'Byte Apprentice';
    return 'Novice Keeper';
  };

  const completedCount = progress.completedLevelIds.length;
  const rank = getRank(progress.xp);

  return (
    <header className="w-full bg-[#070d1c]/95 backdrop-blur-md border-b border-cyan-950/80 px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sticky top-0 z-40">
      {/* Brand & Chapter Tag */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-300/30 flex-shrink-0">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-wider glow-cyan truncate">
              CODEBOUND
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 hidden xs:inline-block">
              CH.1
            </span>
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1.5 truncate">
            <span className="truncate">{rank}</span>
            <span aria-hidden="true">·</span>
            <span className="flex-shrink-0">{completedCount}/5 Cleared</span>
          </div>
        </div>
      </div>

      {/* Progress & Stats Bar */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* XP Counter */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono text-cyan-300 font-bold">
            <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
            <span>{progress.xp} XP</span>
          </div>
          <div className="w-16 sm:w-28 h-1.5 bg-slate-900 rounded-full mt-0.5 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (progress.xp / 1050) * 100)}%` }}
            />
          </div>
        </div>

        {/* Compiler Status Indicator (Tablet & Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <span
            className={`w-2 h-2 rounded-full ${
              compilerStatus?.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="text-[11px] text-slate-300">
            {compilerStatus?.status === 'online' ? 'C Sandbox Online' : 'Connecting...'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={onOpenMap}
            aria-label="Level Map"
            className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-700 border border-slate-800 hover:border-cyan-600 text-xs text-slate-200 transition-colors shadow-sm cursor-pointer min-h-[38px] min-w-[38px] justify-center"
          >
            <Map className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline font-medium">Map</span>
          </button>

          <button
            onClick={onOpenCodex}
            aria-label="C Codex Manual"
            className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-700 border border-slate-800 hover:border-cyan-600 text-xs text-slate-200 transition-colors shadow-sm cursor-pointer min-h-[38px] min-w-[38px] justify-center"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline font-medium">Codex</span>
          </button>

          <button
            onClick={onOpenAchievements}
            aria-label="Achievements"
            className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-700 border border-slate-800 hover:border-amber-500 text-xs text-slate-200 transition-colors shadow-sm cursor-pointer min-h-[38px] min-w-[38px] justify-center"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400">
              {progress.unlockedAchievements.length}
            </span>
          </button>

          <button
            onClick={onResetProgress}
            title="Reset Game Progress"
            className="p-2 sm:p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-700 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
