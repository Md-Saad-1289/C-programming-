import React from 'react';
import { Target, CheckCircle2, Lightbulb, Code2 } from 'lucide-react';
import { Level } from '../../types/game';

interface MissionBriefingProps {
  level: Level;
  onOpenHints: () => void;
  hintCount: number;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({
  level,
  onOpenHints,
  hintCount,
}) => {
  return (
    <div className="w-full bg-[#0a1122]/90 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg">
      {/* Level Title & Concept */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
              LEVEL 0{level.id}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono text-slate-400">{level.conceptName}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-wide mt-0.5">
            {level.title}
          </h2>
        </div>

        <button
          onClick={onOpenHints}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Need Hint ({hintCount})</span>
        </button>
      </div>

      {/* Primary Objective */}
      <div className="flex items-start gap-2.5 bg-cyan-950/30 border border-cyan-800/30 rounded-lg p-3">
        <Target className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed">
          {level.objective}
        </div>
      </div>

      {/* Concept Summary & Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Concept Lesson */}
        <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Concept</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {level.conceptSummary}
            </p>
          </div>
        </div>

        {/* Requirements List */}
        <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold mb-1.5">
            Requirements
          </div>
          <ul className="space-y-1">
            {level.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px] leading-tight">
                <CheckCircle2 className="w-3 h-3 text-cyan-500 flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
