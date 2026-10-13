import React, { useState } from 'react';
import {
  Terminal,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Cpu,
  Layers,
  HelpCircle,
  Play,
} from 'lucide-react';
import { ExecutionResponse, TestCaseResult } from '../../types/game';

interface TerminalPanelProps {
  lastExecution: ExecutionResponse | null;
  testResults: TestCaseResult[] | null;
  customStdin: string;
  onStdinChange: (val: string) => void;
  isRunning: boolean;
  onRunCustom: () => void;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  lastExecution,
  testResults,
  customStdin,
  onStdinChange,
  isRunning,
  onRunCustom,
}) => {
  const [activeTab, setActiveTab] = useState<'console' | 'tests' | 'diagnostics'>('console');

  const hasDiagnostics = Boolean(
    lastExecution?.errorExplanation || (lastExecution && lastExecution.status !== 'success')
  );
  const allTestsPassed =
    testResults && testResults.length > 0 && testResults.every((t) => t.passed);

  return (
    <div className="w-full bg-[#080d19] border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
      {/* Panel Tab Navigation */}
      <div className="bg-[#050811] border-b border-slate-800 px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'console'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'tests'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Test Cases</span>
            {testResults && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  allTestsPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {testResults.filter((r) => r.passed).length}/{testResults.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'diagnostics'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Diagnostics</span>
            {hasDiagnostics && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>
        </div>

        {/* Telemetry info */}
        {lastExecution && (
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            {lastExecution.executionTimeMs !== undefined && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{lastExecution.executionTimeMs}ms</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>{lastExecution.provider}</span>
            </span>
          </div>
        )}
      </div>

      {/* Panel Body */}
      <div className="p-3 font-mono text-xs min-h-[140px] max-h-[220px] overflow-y-auto">
        {/* TAB 1: CONSOLE */}
        {activeTab === 'console' && (
          <div className="space-y-2">
            {lastExecution ? (
              <>
                {/* Standard Output */}
                {lastExecution.stdout ? (
                  <div>
                    <div className="text-[10px] uppercase text-cyan-500 font-bold mb-1">
                      [ Standard Output ]
                    </div>
                    <pre className="p-2.5 rounded bg-slate-950 text-emerald-300 border border-slate-900 whitespace-pre-wrap leading-relaxed select-text font-mono">
                      {lastExecution.stdout}
                    </pre>
                  </div>
                ) : null}

                {/* Compiler / Runtime Errors */}
                {lastExecution.stderr ? (
                  <div>
                    <div className="text-[10px] uppercase text-rose-400 font-bold mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>[ Compiler / Stderr Output ]</span>
                    </div>
                    <pre className="p-2.5 rounded bg-rose-950/30 text-rose-300 border border-rose-900/40 whitespace-pre-wrap leading-relaxed select-text font-mono">
                      {lastExecution.stderr}
                    </pre>
                  </div>
                ) : null}

                {!lastExecution.stdout && !lastExecution.stderr && (
                  <div className="text-slate-400 italic p-3 text-center font-sans">
                    প্রোগ্রামটি সফলভাবে সম্পন্ন হয়েছে (exit code {lastExecution.exitCode}), কিন্তু কোনো টেক্সট আউটপুট তৈরি করেনি। স্ক্রিনে ফলাফল দেখতে <code>printf()</code> ব্যবহার করো।
                  </div>
                )}
              </>
            ) : (
              <div className="text-slate-400 flex flex-col items-center justify-center py-6 text-center font-sans">
                <Terminal className="w-6 h-6 text-cyan-500/70 mb-1.5" />
                <span className="text-xs">কনসোল প্রস্তুত। সি কোড এক্সিকিউট করতে "Run" বা "Submit" বাটনে ক্লিক করো।</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TEST CASES */}
        {activeTab === 'tests' && (
          <div className="space-y-2.5 font-sans">
            {testResults && testResults.length > 0 ? (
              testResults.map((res, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border flex flex-col gap-1.5 transition-colors ${
                    res.passed
                      ? 'bg-emerald-950/20 border-emerald-800/40'
                      : 'bg-rose-950/20 border-rose-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {res.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      )}
                      <span className="font-bold text-slate-200">
                        {res.testCase.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        res.passed
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {res.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-normal">
                    {res.testCase.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 text-[11px] font-mono">
                    {res.testCase.stdin && (
                      <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[9px] uppercase font-sans">Input (stdin)</span>
                        <span className="text-cyan-300 font-semibold">{res.testCase.stdin}</span>
                      </div>
                    )}
                    <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[9px] uppercase font-sans">Expected Output</span>
                      <span className="text-emerald-300 font-semibold">{res.expectedOutput}</span>
                    </div>
                    <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800 sm:col-span-2">
                      <span className="text-slate-500 block text-[9px] uppercase font-sans">Your Program Output</span>
                      <span className={res.passed ? 'text-emerald-300' : 'text-rose-300'}>
                        {res.actualOutput}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-center py-6">
                তোমার কোড সবগুলো টেস্ট কেসে যাচাই করতে <span className="text-cyan-300 font-semibold">"Submit"</span> বাটনে ক্লিক করো।
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DIAGNOSTICS */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-3 font-sans">
            {lastExecution?.errorExplanation ? (
              <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>কোডেক্স সিনট্যাক্স বিশ্লেষণ (Diagnostics)</span>
                </div>
                <p className="text-amber-200 text-xs leading-relaxed">
                  {lastExecution.errorExplanation}
                </p>
              </div>
            ) : lastExecution?.status === 'success' ? (
              <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>কোড সফলভাবে কম্পাইল ও এক্সিকিউট হয়েছে! কোনো সিনট্যাক্স ত্রুটি পাওয়া যায়নি।</span>
              </div>
            ) : (
              <div className="text-slate-400 text-center py-6">
                এখনো কোনো ডায়াগনস্টিক রিপোর্ট নেই। কোড চালালে স্বয়ংক্রিয় সিনট্যাক্স পরামর্শ এখানে দেখা যাবে।
              </div>
            )}

            {/* Quick C tips in Bengali */}
            <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <span className="text-cyan-400 font-bold block text-xs">কিপারের গুরুত্বপূর্ণ সি টিপস:</span>
              <p>• প্রতিটি সি স্টেটমেন্টের শেষে অবশ্যই সেমিকোলন <code>;</code> দিতে হবে।</p>
              <p>• ইনপুট-আউটপুট ফাংশনের জন্য ফাইলের শুরুতে <code>#include &lt;stdio.h&gt;</code> আবশ্যক।</p>
              <p>• <code>scanf("%d", &amp;var)</code> দিয়ে সংখ্যা পড়ার সময় ভ্যারিয়েবলের আগে অ্যান্ড <code>&amp;</code> চিহ্ন দিতে ভুলবে না।</p>
              <p>• টেক্সট প্রিন্ট করতে <code>printf("text\\n");</code> এবং ভ্যারিয়েবল প্রিন্ট করতে <code>printf("%d\\n", val);</code> ব্যবহার করো।</p>
            </div>
          </div>
        )}
      </div>

      {/* Manual STDIN tester tray */}
      <div className="bg-[#050812] border-t border-slate-800/80 px-3 py-2 flex items-center gap-2">
        <span className="text-[11px] font-mono text-slate-400 flex-shrink-0 hidden xs:inline">Input (stdin):</span>
        <input
          type="text"
          value={customStdin}
          onChange={(e) => onStdinChange(e.target.value)}
          placeholder="Custom stdin (e.g. 1289)"
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded px-2.5 py-1 text-xs font-mono text-slate-200 outline-none transition-colors"
        />
        <button
          onClick={onRunCustom}
          disabled={isRunning}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Play className="w-3 h-3 text-cyan-400" />
          <span>Test Input</span>
        </button>
      </div>
    </div>
  );
};
