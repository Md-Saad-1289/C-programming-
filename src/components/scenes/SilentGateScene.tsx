import React from 'react';
import { motion } from 'motion/react';

interface SceneProps {
  isSolved: boolean;
  isRunning: boolean;
}

export const SilentGateScene: React.FC<SceneProps> = ({ isSolved, isRunning }) => {
  return (
    <div className="relative w-full h-44 sm:h-56 lg:h-64 rounded-xl overflow-hidden bg-gradient-to-b from-[#02040d] via-[#060c1c] to-[#010309] border border-cyan-800/50 shadow-inner flex items-center justify-center select-none">
      {/* Background radial vortex */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isSolved
            ? 'opacity-60 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 via-indigo-950/40 to-transparent'
            : 'opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/20 via-slate-900/30 to-transparent'
        }`}
      />

      {/* Ancient rune pillars on flanks */}
      <div className="absolute left-3 top-3 bottom-3 w-10 sm:w-12 bg-slate-950 border-r border-slate-700/60 rounded flex flex-col justify-between py-2 items-center z-20">
        <div className={`w-2 h-2 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-rose-500'}`} />
        <div className="text-[8px] font-mono text-cyan-500/70 rotate-90 tracking-widest uppercase">
          VAULT-I
        </div>
        <div className={`w-2 h-2 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-slate-700'}`} />
      </div>

      <div className="absolute right-3 top-3 bottom-3 w-10 sm:w-12 bg-slate-950 border-l border-slate-700/60 rounded flex flex-col justify-between py-2 items-center z-20">
        <div className={`w-2 h-2 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-rose-500'}`} />
        <div className="text-[8px] font-mono text-cyan-500/70 -rotate-90 tracking-widest uppercase">
          SEAL-IV
        </div>
        <div className={`w-2 h-2 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-slate-700'}`} />
      </div>

      {/* REVEALED RIFT BEHIND THE GATE (Visible when gate opens!) */}
      {isSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/30 via-indigo-900/50 to-slate-950"
        >
          <div className="w-48 h-48 rounded-full bg-cyan-400/20 blur-2xl animate-pulse absolute" />
          <div className="text-cyan-200 font-display text-sm sm:text-base font-bold tracking-widest uppercase text-center glow-cyan">
            CHAPTER 2 REVEALED
          </div>
          <span className="text-[10px] text-cyan-300/80 font-mono mt-1 tracking-wider">
            THE SUNKEN ARCHIVES AWAIT
          </span>
        </motion.div>
      )}

      {/* DOUBLE BLAST DOORS */}
      <div className="absolute inset-x-12 sm:inset-x-20 top-2 bottom-2 overflow-hidden flex z-10">
        {/* Left Heavy Vault Door */}
        <motion.div
          className="w-1/2 h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-r-2 border-cyan-500/30 flex flex-col justify-center items-end pr-3 relative shadow-2xl"
          animate={{ x: isSolved ? -220 : 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Hydraulic Locking Bolt: Top */}
          <motion.div
            className="w-8 h-3 bg-amber-500/80 rounded-l border border-amber-300 absolute top-8 -right-4"
            animate={{ x: isSolved ? -20 : 0 }}
          />
          {/* Hydraulic Locking Bolt: Bottom */}
          <motion.div
            className="w-8 h-3 bg-amber-500/80 rounded-l border border-amber-300 absolute bottom-8 -right-4"
            animate={{ x: isSolved ? -20 : 0 }}
          />
          {/* Surface runes */}
          <div className="w-16 h-28 border border-slate-700/80 rounded flex flex-col justify-between p-2">
            <span className="text-[8px] font-mono text-slate-500">BOLT_L</span>
            <span className="text-[7px] font-mono text-cyan-400/50">0x04F1</span>
          </div>
        </motion.div>

        {/* Right Heavy Vault Door */}
        <motion.div
          className="w-1/2 h-full bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 border-l-2 border-cyan-500/30 flex flex-col justify-center items-start pl-3 relative shadow-2xl"
          animate={{ x: isSolved ? 220 : 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Surface runes */}
          <div className="w-16 h-28 border border-slate-700/80 rounded flex flex-col justify-between p-2">
            <span className="text-[8px] font-mono text-slate-500">BOLT_R</span>
            <span className="text-[7px] font-mono text-cyan-400/50">0x04F2</span>
          </div>
        </motion.div>
      </div>

      {/* CENTRAL CONCENTRIC CIPHER LOCK (Stands in the center) */}
      <motion.div
        animate={{ opacity: isSolved ? 0 : 1, scale: isSolved ? 1.4 : 1 }}
        transition={{ duration: 1 }}
        className="relative z-15 flex flex-col items-center pointer-events-none"
      >
        <div className="relative w-32 sm:w-36 h-32 sm:h-36 flex items-center justify-center">
          {/* Outer Ring */}
          <motion.div
            className={`absolute inset-0 rounded-full border-4 border-dashed transition-colors ${
              isSolved ? 'border-cyan-400' : isRunning ? 'border-amber-400' : 'border-slate-600'
            }`}
            animate={{ rotate: isRunning ? 360 : 0 }}
            transition={{ duration: 3, repeat: isRunning ? Infinity : 0, ease: 'linear' }}
          />

          {/* Middle Ring */}
          <motion.div
            className={`absolute w-24 h-24 rounded-full border-2 border-dotted ${
              isSolved ? 'border-cyan-300' : 'border-slate-500'
            }`}
            animate={{ rotate: isRunning ? -360 : 0 }}
            transition={{ duration: 4, repeat: isRunning ? Infinity : 0, ease: 'linear' }}
          />

          {/* Central Cipher Core Display */}
          <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-slate-700 flex flex-col items-center justify-center shadow-2xl">
            <span className="text-[8px] font-mono text-slate-400 uppercase">CIPHER</span>
            <span
              className={`text-xs font-mono font-bold ${
                isSolved
                  ? 'text-cyan-300'
                  : isRunning
                  ? 'text-amber-400 animate-pulse'
                  : 'text-rose-400'
              }`}
            >
              {isSolved ? '1289' : isRunning ? 'SCAN' : 'LOCKED'}
            </span>
          </div>
        </div>

        {/* Status Kicker */}
        <div className="mt-1 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-[9px] font-mono">
          <span className={isSolved ? 'text-cyan-400' : isRunning ? 'text-amber-400' : 'text-slate-400'}>
            {isSolved ? 'GATE OPENED' : isRunning ? 'CHECKING CIPHER...' : 'AWAITING KEY: 1289'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
