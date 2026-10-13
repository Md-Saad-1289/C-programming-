import React from 'react';
import { motion } from 'motion/react';

interface SceneProps {
  isSolved: boolean;
  isRunning: boolean;
}

export const BrokenGeneratorScene: React.FC<SceneProps> = ({ isSolved, isRunning }) => {
  return (
    <div className="relative w-full h-44 sm:h-56 lg:h-64 rounded-xl overflow-hidden bg-gradient-to-b from-[#030611] via-[#091224] to-[#040716] border border-cyan-900/40 shadow-inner flex items-center justify-between px-3 sm:px-6 lg:px-10 select-none">
      {/* Background machinery pipes & grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* SUB-CELL ALPHA (40 Units) */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[10px] font-mono font-semibold text-slate-400 mb-1">CELL ALPHA</span>
        <div className="w-14 sm:w-16 h-28 bg-slate-950 rounded-lg border border-slate-700 p-1 flex flex-col justify-end relative shadow-lg">
          <div className="absolute top-1 left-0 right-0 text-center text-[9px] font-mono text-cyan-400">
            40u
          </div>
          <motion.div
            className={`w-full rounded transition-all duration-700 ${
              isSolved ? 'bg-cyan-500 glow-cyan' : isRunning ? 'bg-amber-500' : 'bg-cyan-900/60'
            }`}
            animate={{ height: '40%' }}
          />
        </div>
        <span className="text-[9px] font-mono text-slate-500 mt-1">VAL: 40</span>
      </div>

      {/* CONDUIT A -> CENTER */}
      <div className="flex-1 h-3 bg-slate-900 mx-2 relative rounded overflow-hidden border border-slate-800">
        <motion.div
          className="h-full bg-cyan-400"
          animate={{
            x: isSolved ? ['-100%', '100%'] : isRunning ? ['-100%', '0%'] : '-100%',
          }}
          transition={{ duration: 1.5, repeat: isSolved ? Infinity : 0, ease: 'linear' }}
        />
      </div>

      {/* CENTRAL TURBINE / GENERATOR FLYWHEEL */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center">
          {/* Outer Gear Ring */}
          <motion.div
            className={`absolute inset-0 rounded-full border-4 border-dashed transition-colors ${
              isSolved ? 'border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.6)]' : 'border-slate-700'
            }`}
            animate={{ rotate: isSolved ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner Cog Turbine */}
          <motion.div
            className={`w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-slate-900 border-2 flex items-center justify-center ${
              isSolved ? 'border-cyan-300' : 'border-slate-800'
            }`}
            animate={{ rotate: isSolved ? -360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            {/* Turbine blades */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-full h-1 bg-slate-700" />
              <div className="absolute w-1 h-full bg-slate-700" />
              <div className="absolute w-full h-1 bg-slate-700 rotate-45" />
              <div className="absolute w-1 h-full bg-slate-700 rotate-45" />

              {/* Central Core Display */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-slate-950 border border-slate-700 flex flex-col items-center justify-center">
                <span
                  className={`text-[10px] font-mono font-bold ${
                    isSolved ? 'text-cyan-300 animate-pulse' : 'text-slate-500'
                  }`}
                >
                  {isSolved ? '100u' : 'STALL'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Generator Base Label */}
        <div className="mt-2 text-center">
          <div
            className={`text-xs font-mono font-semibold tracking-wider ${
              isSolved ? 'text-cyan-300' : isRunning ? 'text-amber-400' : 'text-slate-500'
            }`}
          >
            {isSolved ? 'TURBINES ACTIVE (40 + 60 = 100)' : isRunning ? 'COUPLING FLUX...' : 'GENERATOR OFFLINE'}
          </div>
        </div>
      </div>

      {/* CONDUIT B -> CENTER */}
      <div className="flex-1 h-3 bg-slate-900 mx-2 relative rounded overflow-hidden border border-slate-800">
        <motion.div
          className="h-full bg-cyan-400"
          animate={{
            x: isSolved ? ['100%', '-100%'] : isRunning ? ['100%', '0%'] : '100%',
          }}
          transition={{ duration: 1.5, repeat: isSolved ? Infinity : 0, ease: 'linear' }}
        />
      </div>

      {/* SUB-CELL BETA (60 Units) */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[10px] font-mono font-semibold text-slate-400 mb-1">CELL BETA</span>
        <div className="w-14 sm:w-16 h-28 bg-slate-950 rounded-lg border border-slate-700 p-1 flex flex-col justify-end relative shadow-lg">
          <div className="absolute top-1 left-0 right-0 text-center text-[9px] font-mono text-cyan-400">
            60u
          </div>
          <motion.div
            className={`w-full rounded transition-all duration-700 ${
              isSolved ? 'bg-cyan-500 glow-cyan' : isRunning ? 'bg-amber-500' : 'bg-cyan-900/60'
            }`}
            animate={{ height: '60%' }}
          />
        </div>
        <span className="text-[9px] font-mono text-slate-500 mt-1">VAL: 60</span>
      </div>
    </div>
  );
};
