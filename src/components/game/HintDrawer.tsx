import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, Lock, Unlock, Code } from 'lucide-react';
import { Hint } from '../../types/game';

interface HintDrawerProps {
  hints: Hint[];
  isOpen: boolean;
  onClose: () => void;
}

export const HintDrawer: React.FC<HintDrawerProps> = ({ hints, isOpen, onClose }) => {
  // By default, hint 1 is unlocked; hint 2 and 3 can be progressively unlocked
  const [unlockedHintIds, setUnlockedHintIds] = useState<number[]>([1]);

  const unlockNext = (hintId: number) => {
    if (!unlockedHintIds.includes(hintId)) {
      setUnlockedHintIds((prev) => [...prev, hintId]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-[#0a1122] border border-cyan-800/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-[#060c18] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Progressive Archive Hints</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Hint List */}
          <div className="p-4 space-y-3.5 overflow-y-auto">
            {hints.map((hint, index) => {
              const isUnlocked = unlockedHintIds.includes(hint.id);
              const isPriorUnlocked = index === 0 || unlockedHintIds.includes(hints[index - 1].id);

              return (
                <div
                  key={hint.id}
                  className={`rounded-xl border p-3.5 transition-all ${
                    isUnlocked
                      ? 'bg-slate-900/80 border-slate-700'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      Tier {hint.id}: {hint.title}
                    </span>
                    {isUnlocked ? (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Unlock className="w-3 h-3" />
                        <span>UNLOCKED</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>

                  {isUnlocked ? (
                    <div>
                      <p className="text-slate-300 text-xs leading-relaxed font-sans mb-2">
                        {hint.content}
                      </p>
                      {hint.codeSnippet && (
                        <div className="mt-2 bg-slate-950 rounded-lg p-2.5 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                            <Code className="w-3 h-3" />
                            <span>Snippet Reference</span>
                          </div>
                          <pre className="whitespace-pre">{hint.codeSnippet}</pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        প্রথমে নিজে নিজে চেষ্টা করে দেখো!
                      </span>
                      {isPriorUnlocked && (
                        <button
                          onClick={() => unlockNext(hint.id)}
                          className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-medium transition-colors"
                        >
                          Reveal Hint
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="bg-[#060c18] border-t border-slate-800 px-4 py-2.5 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition-colors"
            >
              Return to Code
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
