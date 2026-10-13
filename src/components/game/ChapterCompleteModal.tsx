import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, BookOpen, Key, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { PlayerProgress } from '../../types/game';

interface ChapterCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: PlayerProgress;
  onReplayChapter: () => void;
}

export const ChapterCompleteModal: React.FC<ChapterCompleteModalProps> = ({
  isOpen,
  onClose,
  progress,
  onReplayChapter,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Big celebration fireworks
      const end = Date.now() + 2.5 * 1000;
      const interval: NodeJS.Timeout = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#06b6d4', '#10b981', '#f59e0b', '#8b5cf6'],
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-2xl bg-gradient-to-b from-[#0a142e] via-[#070e22] to-[#040814] border-2 border-cyan-400 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden"
        >
          {/* Cosmic aura burst */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 blur-3xl pointer-events-none" />

          {/* Crown badge */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-cyan-400 flex items-center justify-center mx-auto shadow-2xl shadow-cyan-500/40 border-2 border-white/50 mb-4">
            <Key className="w-10 h-10 text-slate-950" />
          </div>

          <div className="text-center">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              CITADEL GATE SEAL BREACHED
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-wide">
              Chapter 1: The Silent Gate Conquered!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
              অভিনন্দন! তুমি প্রাচীন সি সিনট্যাক্স সফলভাবে আয়ত্ত করেছ, ডেড পাওয়ার কোরে শক্তি জুগিয়েছ, টারবাইন চালু করেছ, সেন্টিনেল রোবটকে জাগ্রত করেছ এবং আসল সি কোড এক্সিকিউট করে সাইলেন্ট গেট ভেঙেছ!
            </p>
          </div>

          {/* Mastered Concepts Grid */}
          <div className="my-6 bg-slate-950/80 rounded-2xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Chapter 1 Syllabus Mastered (5 / 5)</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">100% COMPLETE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>লেভেল ১: সি প্রোগ্রামের গঠন ও printf()</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>লেভেল ২: ইন্টিজার ভ্যারিয়েবল ও %d স্পেসিফায়ার</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>লেভেল ৩: গাণিতিক অপারেটর (+) ও যোগফল</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>লেভেল ৪: তুলনামূলক শর্ত (&gt;=) ও if-else ব্রাঞ্চিং</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 sm:col-span-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>লেভেল ৫: scanf() দিয়ে ইনপুট ও মেমরি অ্যাড্রেস (&amp;)</span>
              </div>
            </div>
          </div>

          {/* Chapter 2 Teaser Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950 border border-indigo-700/50 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                COMING SOON
              </span>
              <h4 className="text-sm font-bold text-white">Chapter 2: The Sunken Archives</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                পয়েন্টার (Pointers), অ্যারে (Arrays), ডাইনামিক মেমরি (malloc) এবং স্ট্রাকচার (Structs) আয়ত্ত করে নিমজ্জিত লাইব্রেরি অন্বেষণ করো।
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono text-xs font-semibold">
                Preview Unlocked
              </span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                onReplayChapter();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Chapter 1</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/30 cursor-pointer"
            >
              <span>Explore Citadel & Free Coding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
