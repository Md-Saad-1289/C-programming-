import React from 'react';
import { motion } from 'motion/react';

interface SceneProps {
  isSolved: boolean;
  isRunning: boolean;
}

export const PowerCoreScene: React.FC<SceneProps> = ({ isSolved, isRunning }) => {
  return (
    <div className="relative w-full h-44 sm:h-56 lg:h-64 rounded-xl overflow-hidden bg-gradient-to-b from-[#030712] via-[#091122] to-[#040814] border border-cyan-900/40 shadow-inner flex items-center justify-center select-none">
      {/* Background radial glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isSolved
            ? 'opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/50 via-blue-900/20 to-transparent'
            : 'opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-slate-900/20 to-transparent'
        }`}
      />

      {/* Grid line overlay */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Left & Right Conduit Tubes */}
      <div className="absolute left-8 top-12 bottom-12 w-3 bg-slate-900 border-x border-slate-800 rounded-full overflow-hidden flex flex-col justify-end">
        <motion.div
          className="w-full bg-cyan-400"
          animate={{ height: isSolved ? '100%' : isRunning ? '40%' : '5%' }}
          transition={{ duration: 1.2 }}
        />
      </div>
      <div className="absolute right-8 top-12 bottom-12 w-3 bg-slate-900 border-x border-slate-800 rounded-full overflow-hidden flex flex-col justify-end">
        <motion.div
          className="w-full bg-cyan-400"
          animate={{ height: isSolved ? '100%' : isRunning ? '40%' : '5%' }}
          transition={{ duration: 1.2 }}
        />
      </div>

      {/* Central Containment Cylinder */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Upper Stabilizer Clamp */}
        <div className="w-40 sm:w-48 h-6 bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-lg border-t border-x border-slate-700 flex items-center justify-between px-3">
          <div className="flex gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-rose-500'}`} />
            <span className={`w-2 h-2 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-slate-700'}`} />
          </div>
          <span className="text-[9px] font-mono tracking-wider text-slate-400">
            {isSolved ? 'STATUS: STABLE' : 'WARN: DEPLETED'}
          </span>
          <div className="w-4 h-2 bg-slate-700 rounded-sm" />
        </div>

        {/* Crystalline Core Glass Chamber */}
        <div className="relative w-36 sm:w-44 h-36 bg-slate-950/80 border-x-2 border-slate-700/80 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          {/* Glass reflections */}
          <div className="absolute top-0 left-2 bottom-0 w-3 bg-white/5 -skew-x-12 pointer-events-none" />

          {/* Magnetic Stabilizer Ring 1 */}
          <motion.div
            className={`absolute w-28 h-28 rounded-full border-2 border-dashed ${
              isSolved ? 'border-cyan-400/70' : isRunning ? 'border-amber-400/50' : 'border-slate-800'
            }`}
            animate={{ rotate: isSolved ? 360 : isRunning ? 180 : 0 }}
            transition={{ duration: isSolved ? 6 : 14, repeat: Infinity, ease: 'linear' }}
          />

          {/* Magnetic Stabilizer Ring 2 */}
          <motion.div
            className={`absolute w-20 h-20 rounded-full border border-cyan-500/40 ${
              isSolved ? 'opacity-80' : 'opacity-20'
            }`}
            animate={{ rotate: isSolved ? -360 : 0, scale: isSolved ? [0.95, 1.05, 0.95] : 1 }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          {/* Floating Crystalline Fuel Core */}
          <motion.div
            animate={
              isSolved
                ? {
                    scale: [1, 1.12, 1],
                    boxShadow: [
                      '0 0 30px rgba(6, 182, 212, 0.6)',
                      '0 0 50px rgba(6, 182, 212, 0.9)',
                      '0 0 30px rgba(6, 182, 212, 0.6)',
                    ],
                  }
                : isRunning
                ? { scale: [0.85, 0.95, 0.85] }
                : { scale: 0.8 }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-12 h-16 rotate-45 rounded-sm transition-all duration-700 flex items-center justify-center ${
              isSolved
                ? 'bg-gradient-to-tr from-cyan-400 via-sky-300 to-white'
                : isRunning
                ? 'bg-amber-600/60'
                : 'bg-slate-800 border border-slate-700'
            }`}
          >
            {isSolved && (
              <span className="-rotate-45 text-[11px] font-bold font-mono text-slate-950">
                100
              </span>
            )}
          </motion.div>

          {/* Floating sparks if solved */}
          {isSolved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-24 h-24 bg-cyan-400/20 blur-md rounded-full" />
            </motion.div>
          )}
        </div>

        {/* Lower Base & Gauge Readout */}
        <div className="w-40 sm:w-48 h-10 bg-gradient-to-t from-slate-900 to-slate-800 rounded-b-lg border-b border-x border-slate-700 p-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-slate-400 uppercase">TELEMETRY</span>
            <span
              className={`text-xs font-mono font-bold ${
                isSolved ? 'text-cyan-300 glow-cyan' : isRunning ? 'text-amber-400' : 'text-slate-500'
              }`}
            >
              {isSolved ? '100 UNITS' : isRunning ? 'SYNCING...' : '0 / 100'}
            </span>
          </div>

          {/* Power Bar */}
          <div className="w-20 h-2.5 bg-slate-950 rounded-full p-0.5 border border-slate-700">
            <motion.div
              className={`h-full rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-slate-700'}`}
              animate={{ width: isSolved ? '100%' : isRunning ? '50%' : '0%' }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
