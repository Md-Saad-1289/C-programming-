import React from 'react';
import { motion } from 'motion/react';

interface SceneProps {
  isSolved: boolean;
  isRunning: boolean;
}

export const AncientTerminalScene: React.FC<SceneProps> = ({ isSolved, isRunning }) => {
  return (
    <div className="relative w-full h-44 sm:h-56 lg:h-64 rounded-xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-[#070b14] border border-cyan-900/40 shadow-inner flex items-center justify-center select-none">
      {/* Background stone texture & digital matrix grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Stone Chamber Columns */}
      <div className="absolute left-4 top-2 bottom-2 w-8 bg-gradient-to-r from-slate-800 to-slate-900 border-r border-slate-700/50 rounded flex flex-col justify-between py-3 opacity-60">
        <div className="w-full h-1 bg-cyan-500/40" />
        <div className="text-[9px] text-cyan-400 font-mono text-center tracking-widest rotate-90">§ARCHON</div>
        <div className="w-full h-1 bg-cyan-500/40" />
      </div>

      <div className="absolute right-4 top-2 bottom-2 w-8 bg-gradient-to-l from-slate-800 to-slate-900 border-l border-slate-700/50 rounded flex flex-col justify-between py-3 opacity-60">
        <div className="w-full h-1 bg-cyan-500/40" />
        <div className="text-[9px] text-cyan-400 font-mono text-center tracking-widest -rotate-90">§KEEPER</div>
        <div className="w-full h-1 bg-cyan-500/40" />
      </div>

      {/* Hydraulic Door Mechanism Behind Terminal */}
      <div className="absolute top-4 bottom-4 w-52 sm:w-64 border-x-2 border-slate-700/60 overflow-hidden flex items-center justify-center">
        {/* Left Door Leaf */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-r border-cyan-500/30 flex flex-col justify-center items-end pr-2"
          animate={{ x: isSolved ? -110 : 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-4 h-16 border-y border-l border-slate-600/60 rounded-l" />
        </motion.div>

        {/* Right Door Leaf */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 border-l border-cyan-500/30 flex flex-col justify-center items-start pl-2"
          animate={{ x: isSolved ? 110 : 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-4 h-16 border-y border-r border-slate-600/60 rounded-r" />
        </motion.div>

        {/* Revealed Portal Interior when Door Opens */}
        {isSolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="w-full h-full flex flex-col items-center justify-center bg-cyan-950/40"
          >
            <div className="w-24 h-24 rounded-full bg-cyan-500/20 blur-xl absolute" />
            <span className="text-cyan-300 font-mono text-xs tracking-widest font-semibold uppercase animate-pulse">
              WAY OPEN
            </span>
            <span className="text-[10px] text-cyan-400/80 mt-1">CHAMBER UNSEALED</span>
          </motion.div>
        )}
      </div>

      {/* Terminal Pedestal in Foreground */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Holographic Console Screen */}
        <motion.div
          animate={
            isSolved
              ? { borderColor: 'rgba(6, 182, 212, 0.9)', boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }
              : isRunning
              ? { borderColor: 'rgba(234, 179, 8, 0.8)', boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }
              : { borderColor: 'rgba(71, 85, 105, 0.6)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }
          }
          className="w-56 sm:w-64 h-28 bg-slate-950/90 rounded-lg border-2 p-3 flex flex-col justify-between backdrop-blur-md transition-colors"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSolved ? 'bg-cyan-400 animate-ping' : isRunning ? 'bg-amber-400 animate-pulse' : 'bg-rose-500'
                }`}
              />
              TERMINAL // 01
            </span>
            <span className="text-cyan-400/80 font-semibold">
              {isSolved ? 'ACTIVE' : isRunning ? 'COMPILING' : 'DORMANT'}
            </span>
          </div>

          {/* CRT Screen Display */}
          <div className="font-mono text-center my-auto py-1">
            {isSolved ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-cyan-300 font-bold text-xs sm:text-sm tracking-wider glow-cyan"
              >
                &gt; WELCOME CODE KEEPER &lt;
              </motion.div>
            ) : isRunning ? (
              <div className="text-amber-400 text-xs flex items-center justify-center gap-1 animate-pulse">
                <span>[ TRANSMITTING BYTECODE... ]</span>
              </div>
            ) : (
              <div className="text-slate-500 text-xs flex flex-col items-center gap-0.5">
                <span className="text-rose-400/90 font-medium">[ LOCKED // AWAITING GREETING ]</span>
                <span className="text-[10px] text-slate-600 font-sans">Execute printf() greeting</span>
              </div>
            )}
          </div>

          {/* Bottom Telemetry */}
          <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
            <span>BAUD: 9600</span>
            <span>HEX: 0x7E3A</span>
          </div>
        </motion.div>

        {/* Pedestal Stand & Power Conduit */}
        <div className="w-16 h-8 bg-gradient-to-b from-slate-800 to-slate-950 border-x border-slate-700/80" />
        <div className="w-28 h-3 bg-slate-900 border-t border-slate-700/80 rounded-t-sm flex justify-center gap-4">
          <div className={`w-2 h-1 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-slate-700'}`} />
          <div className={`w-2 h-1 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-slate-700'}`} />
          <div className={`w-2 h-1 rounded-full ${isSolved ? 'bg-cyan-400 glow-cyan' : 'bg-slate-700'}`} />
        </div>
      </div>
    </div>
  );
};
