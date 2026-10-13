import React from 'react';
import { motion } from 'motion/react';

interface SceneProps {
  isSolved: boolean;
  isRunning: boolean;
}

export const SleepingGuardianScene: React.FC<SceneProps> = ({ isSolved, isRunning }) => {
  return (
    <div className="relative w-full h-44 sm:h-56 lg:h-64 rounded-xl overflow-hidden bg-gradient-to-b from-[#020510] via-[#071020] to-[#030612] border border-cyan-900/40 shadow-inner flex items-center justify-center select-none">
      {/* Background radial glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isSolved
            ? 'opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 via-cyan-900/20 to-transparent'
            : 'opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/20 via-slate-900/20 to-transparent'
        }`}
      />

      {/* Corridor archways */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Left Wall Armor Plate */}
      <div className="absolute left-6 top-8 bottom-8 w-12 border-r-2 border-slate-700/60 flex flex-col justify-between py-2 text-[8px] font-mono text-slate-500">
        <span>SECTOR 04</span>
        <span>DEFENSE</span>
        <span>GOLEM-MK1</span>
      </div>

      {/* Right Wall Diagnostics */}
      <div className="absolute right-6 top-8 bottom-8 w-28 border-l-2 border-slate-700/60 p-2 flex flex-col justify-center text-[9px] font-mono gap-1">
        <span className="text-slate-400">THRESHOLD:</span>
        <span className="text-emerald-400 font-bold">&gt;= 50 UNITS</span>
        <div className="w-full h-1 bg-slate-800 rounded mt-1 overflow-hidden">
          <div className={`h-full ${isSolved ? 'w-full bg-emerald-400 glow-emerald' : 'w-1/3 bg-rose-500'}`} />
        </div>
        <span className="text-[8px] text-slate-500 mt-1">
          {isSolved ? 'LOCK: DISENGAGED' : 'LOCK: ENGAGED'}
        </span>
      </div>

      {/* CENTRAL SENTINEL GOLEM ROBOT */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Head / Visor */}
        <motion.div
          animate={
            isSolved
              ? { y: [0, -3, 0] }
              : isRunning
              ? { y: [-1, 1, -1] }
              : { y: 0 }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-20 h-16 bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-2xl border-t-2 border-x-2 border-slate-700 flex flex-col items-center justify-center p-2 shadow-xl"
        >
          {/* Crest / Antenna */}
          <div className="absolute -top-3 w-4 h-3 bg-slate-700 rounded-t border-t border-x border-slate-600 flex justify-center">
            <div className={`w-1 h-2 ${isSolved ? 'bg-emerald-400 glow-emerald' : 'bg-slate-600'}`} />
          </div>

          {/* Optical Visor Eye */}
          <div className="w-14 h-4 bg-slate-950 rounded border border-slate-700 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={
                isSolved
                  ? {
                      width: ['60%', '90%', '60%'],
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 15px rgba(16, 185, 129, 0.9)',
                    }
                  : isRunning
                  ? {
                      width: ['20%', '60%', '20%'],
                      backgroundColor: '#f59e0b',
                      boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)',
                    }
                  : {
                      width: '10%',
                      backgroundColor: '#ef4444',
                    }
              }
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 rounded-full"
            />
          </div>

          {/* Chin vent */}
          <div className="flex gap-1 mt-1.5">
            <div className="w-1.5 h-1 bg-slate-800 rounded-sm" />
            <div className="w-1.5 h-1 bg-slate-800 rounded-sm" />
            <div className="w-1.5 h-1 bg-slate-800 rounded-sm" />
          </div>
        </motion.div>

        {/* Torso Chassis */}
        <div className="relative w-32 sm:w-36 h-20 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-2 border-slate-700 rounded-b-xl flex flex-col items-center justify-between p-2 shadow-2xl">
          {/* Shoulder Pauldrons */}
          <div className="absolute -left-5 top-0 w-5 h-10 bg-slate-800 rounded-l-lg border-y border-l border-slate-700 flex items-center justify-center">
            <div className={`w-1 h-4 ${isSolved ? 'bg-emerald-400 glow-emerald' : 'bg-slate-700'}`} />
          </div>
          <div className="absolute -right-5 top-0 w-5 h-10 bg-slate-800 rounded-r-lg border-y border-r border-slate-700 flex items-center justify-center">
            <div className={`w-1 h-4 ${isSolved ? 'bg-emerald-400 glow-emerald' : 'bg-slate-700'}`} />
          </div>

          {/* Power Core Heart */}
          <div className="w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center relative">
            <motion.div
              className={`w-6 h-6 rounded-full transition-colors ${
                isSolved
                  ? 'bg-emerald-400 glow-emerald'
                  : isRunning
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-rose-900/60'
              }`}
              animate={{
                scale: isSolved ? [0.9, 1.15, 0.9] : 1,
              }}
              transition={{ duration: 1.5, repeat: isSolved ? Infinity : 0 }}
            />
          </div>

          {/* Chassis Status Badge */}
          <div className="text-center font-mono">
            <span
              className={`text-[10px] font-bold tracking-wider ${
                isSolved ? 'text-emerald-300 glow-emerald' : isRunning ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              {isSolved ? 'GUARDIAN ONLINE' : isRunning ? 'EVALUATING...' : 'OFFLINE // SLEEPING'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
