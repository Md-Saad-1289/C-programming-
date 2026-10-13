import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Terminal, Code, Cpu, AlertCircle, HelpCircle } from 'lucide-react';

interface CodexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodexModal: React.FC<CodexModalProps> = ({ isOpen, onClose }) => {
  const [selectedSection, setSelectedSection] = useState<'basics' | 'io' | 'logic' | 'errors'>('basics');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-[#091020] border border-cyan-800/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="bg-[#050914] border-b border-slate-800 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                  ARCHIVAL REFERENCE
                </span>
                <h2 className="font-display text-lg font-bold text-white tracking-wide">
                  Codex of the First Keepers (C Reference)
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

          {/* Section Tabs */}
          <div className="flex border-b border-slate-800 px-5 gap-2 bg-slate-950/50">
            <button
              onClick={() => setSelectedSection('basics')}
              className={`py-2 px-3 text-xs font-mono border-b-2 transition-colors cursor-pointer ${
                selectedSection === 'basics'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              1. C Skeleton & Variables
            </button>
            <button
              onClick={() => setSelectedSection('io')}
              className={`py-2 px-3 text-xs font-mono border-b-2 transition-colors cursor-pointer ${
                selectedSection === 'io'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              2. printf & scanf
            </button>
            <button
              onClick={() => setSelectedSection('logic')}
              className={`py-2 px-3 text-xs font-mono border-b-2 transition-colors cursor-pointer ${
                selectedSection === 'logic'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Operators & if-else
            </button>
            <button
              onClick={() => setSelectedSection('errors')}
              className={`py-2 px-3 text-xs font-mono border-b-2 transition-colors cursor-pointer ${
                selectedSection === 'errors'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              4. Compiler Errors
            </button>
          </div>

          {/* Content Pane */}
          <div className="p-5 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm text-slate-300">
            {selectedSection === 'basics' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-cyan-400 font-mono font-bold text-sm mb-1">
                    The Essential C Skeleton
                  </h4>
                  <p className="text-slate-400 mb-2 leading-relaxed">
                    প্রতিটি সি (C) প্রোগ্রামের প্রধান প্রবেশদ্বার হলো <code>main()</code> ফাংশন এবং প্রমিত লাইব্রেরি যুক্ত করতে <code>#include</code> ব্যবহৃত হয়।
                  </p>
                  <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
{`#include <stdio.h> // স্ট্যান্ডার্ড ইনপুট/আউটপুট হেডার

int main() {
    // এখানে তোমার স্টেটমেন্টগুলো লেখো
    return 0; // সফলভাবে প্রোগ্রাম সমাপ্তি নির্দেশ করে
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-mono font-bold text-sm mb-1">
                    Declaring Integer Variables
                  </h4>
                  <p className="text-slate-400 mb-2 leading-relaxed">
                    পূর্ণসংখ্যা সংরক্ষণ করার জন্য <code>int</code> ভ্যারিয়েবল ব্যবহার করা হয়। সমান চিহ্ন <code>=</code> হলো অ্যাসাইনমেন্ট অপারেটর।
                  </p>
                  <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
{`int power = 100;    // ডিক্লেয়ার ও মান নির্ধারণ
int energy;         // শুধু ডিক্লেয়ার করা
energy = 50;        // পরবর্তীতে মান নির্ধারণ`}
                  </pre>
                </div>
              </div>
            )}

            {selectedSection === 'io' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-cyan-400 font-mono font-bold text-sm mb-1">
                    Output with printf()
                  </h4>
                  <p className="text-slate-400 mb-2 leading-relaxed">
                    <code>printf()</code> স্ক্রিনে টেক্সট প্রিন্ট করে। পূর্ণসংখ্যার মান প্রদর্শনের জন্য ফরম্যাট স্পেসিফায়ার হিসেবে <code>%d</code> ব্যবহৃত হয়।
                  </p>
                  <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
{`printf("WELCOME CODE KEEPER\\n"); // নতুন লাইনের জন্য \\n

int power = 100;
printf("%d\\n", power);          // আউটপুট: 100
printf("Power: %d units\\n", power); // আউটপুট: Power: 100 units`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-mono font-bold text-sm mb-1">
                    Input with scanf() and the Ampersand (&)
                  </h4>
                  <p className="text-slate-400 mb-2 leading-relaxed">
                    <code>scanf()</code> ব্যবহারকারীর ইনপুট পড়ে ভ্যারিয়েবলে সংরক্ষণ করে। ভ্যারিয়েবলের মেমরি অ্যাড্রেস বোঝাতে নামের আগে অ্যান্ড <code>&</code> দেওয়া আবশ্যক।
                  </p>
                  <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
{`int code;
scanf("%d", &code); // & চিহ্নটি ভ্যারিয়েবলের মেমরি অ্যাড্রেস পাঠায়`}
                  </pre>
                </div>
              </div>
            )}

            {selectedSection === 'logic' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-cyan-400 font-mono font-bold text-sm mb-1">
                    Arithmetic & Comparison Operators
                  </h4>
                  <p className="text-slate-400 mb-2 leading-relaxed">
                    গাণিতিক অপারেটর: <code>+</code> (যোগ), <code>-</code> (বিয়োগ), <code>*</code> (গুণ), <code>/</code> (ভাগ)।<br />
                    তুলনামূলক অপারেটর: <code>==</code> (সমান), <code>!=</code> (অসমান), <code>&gt;=</code> (কমপক্ষে/বড় বা সমান), <code>&lt;=</code> (ছোট বা সমান)।
                  </p>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-mono font-bold text-sm mb-1">
                    Decision Making: if-else
                  </h4>
                  <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
{`if (energy >= 50) {
    printf("Guardian Online\\n");
} else {
    printf("Insufficient Energy\\n");
}`}
                  </pre>
                  <p className="text-slate-400 mt-2 text-xs">
                    মনে রাখবে: সমতা পরীক্ষার জন্য দুটি সমান চিহ্ন <code>==</code> ব্যবহার করতে হয়। একটি সমান <code>=</code> মান নির্ধারণের জন্য ব্যবহৃত হয়।
                  </p>
                </div>
              </div>
            )}

            {selectedSection === 'errors' && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-rose-400 font-mono font-bold block mb-1">
                    error: expected ';' before '...'
                  </span>
                  <p className="text-slate-400 text-xs">
                    <strong>কারণ ও সমাধান:</strong> পূর্ববর্তী লাইনের শেষে সেমিকোলন <code>;</code> দিতে ভুলে গেছেন। লাইনের শেষে সেমিকোলন যুক্ত করুন।
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-rose-400 font-mono font-bold block mb-1">
                    undefined reference to 'main'
                  </span>
                  <p className="text-slate-400 text-xs">
                    <strong>কারণ ও সমাধান:</strong> প্রোগ্রামে <code>int main()</code> এন্ট্রি পয়েন্ট ফাংশনটি অনুপস্থিত। ফাংশনটি সঠিকভাবে লিখুন।
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-rose-400 font-mono font-bold block mb-1">
                    Segmentation Fault (SIGSEGV)
                  </span>
                  <p className="text-slate-400 text-xs">
                    <strong>কারণ ও সমাধান:</strong> ভুল মেমরি ঠিকানায় লেখার চেষ্টা করা হয়েছে। সাধারণত <code>scanf("%d", var)</code> লেখার কারণে ঘটে, ভ্যারিয়েবলের নামের আগে <code>&</code> যুক্ত করে <code>scanf("%d", &var)</code> লিখুন।
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
