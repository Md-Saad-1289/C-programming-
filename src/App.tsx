import React, { useState, useEffect, useCallback } from 'react';
import { GameHeader } from './components/layout/GameHeader';
import { AncientTerminalScene } from './components/scenes/AncientTerminalScene';
import { PowerCoreScene } from './components/scenes/PowerCoreScene';
import { BrokenGeneratorScene } from './components/scenes/BrokenGeneratorScene';
import { SleepingGuardianScene } from './components/scenes/SleepingGuardianScene';
import { SilentGateScene } from './components/scenes/SilentGateScene';
import { DialogueBox } from './components/game/DialogueBox';
import { MissionBriefing } from './components/game/MissionBriefing';
import { CodeWorkspace } from './components/game/CodeWorkspace';
import { TerminalPanel } from './components/game/TerminalPanel';
import { HintDrawer } from './components/game/HintDrawer';
import { LevelMapModal } from './components/game/LevelMapModal';
import { CodexModal } from './components/game/CodexModal';
import { AchievementsModal } from './components/game/AchievementsModal';
import { VictoryModal } from './components/game/VictoryModal';
import { ChapterCompleteModal } from './components/game/ChapterCompleteModal';

import { CHAPTER_1_LEVELS } from './data/chapter1';
import { BookOpen, Play, CheckCircle2, Terminal, Code2, Loader2, Sparkles } from 'lucide-react';
import {
  PlayerProgress,
  ExecutionResponse,
  TestCaseResult,
} from './types/game';
import {
  loadPlayerProgress,
  savePlayerProgress,
  resetPlayerProgress,
} from './services/storageService';
import {
  executeCode,
  runTestSuite,
  fetchCompilerStatus,
  CompilerStatusResponse,
} from './services/compilerService';
import { sounds } from './services/soundService';

export default function App() {
  const [progress, setProgress] = useState<PlayerProgress>(loadPlayerProgress);
  const [compilerStatus, setCompilerStatus] = useState<CompilerStatusResponse | null>(null);

  // Active level state
  const currentLevel =
    CHAPTER_1_LEVELS.find((lvl) => lvl.id === progress.currentLevelId) ||
    CHAPTER_1_LEVELS[0];

  const currentCode =
    progress.codeByLevel[currentLevel.id] ?? currentLevel.starterCode;

  // Execution & Test states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastExecution, setLastExecution] = useState<ExecutionResponse | null>(null);
  const [testResults, setTestResults] = useState<TestCaseResult[] | null>(null);
  const [customStdin, setCustomStdin] = useState(currentLevel.testCases[0]?.stdin || '');

  // Modal open states
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isChapterCompleteOpen, setIsChapterCompleteOpen] = useState(false);

  // Track if current level was solved in this session or previously
  const isSolved = progress.completedLevelIds.includes(currentLevel.id);

  // Poll / check compiler status on mount
  useEffect(() => {
    fetchCompilerStatus().then((status) => {
      setCompilerStatus(status);
    });
  }, []);

  // Update custom stdin when level changes
  useEffect(() => {
    setCustomStdin(currentLevel.testCases[0]?.stdin || '');
    setLastExecution(null);
    setTestResults(null);
  }, [currentLevel.id]);

  // Sync progress to storage
  useEffect(() => {
    savePlayerProgress(progress);
  }, [progress]);

  // Code change handler
  const handleCodeChange = (newCode: string) => {
    setProgress((prev) => ({
      ...prev,
      codeByLevel: {
        ...prev.codeByLevel,
        [currentLevel.id]: newCode,
      },
    }));
  };

  // Reset code to starter template confirmation
  const [confirmResetTemplate, setConfirmResetTemplate] = useState(false);
  const [confirmResetProgress, setConfirmResetProgress] = useState(false);

  const handleResetCode = () => {
    sounds.playClick();
    setConfirmResetTemplate(true);
  };

  const executeResetCode = () => {
    sounds.playClick();
    handleCodeChange(currentLevel.starterCode);
    setLastExecution(null);
    setTestResults(null);
    setConfirmResetTemplate(false);
  };

  // Active mobile view tab
  const [mobileTab, setMobileTab] = useState<'mission' | 'editor' | 'terminal'>('editor');

  // Run single execution (with custom stdin or test 1 stdin)
  const handleRunCode = useCallback(async () => {
    sounds.playClick();
    setIsRunning(true);
    const stdinToUse = customStdin || currentLevel.testCases[0]?.stdin || '';
    const res = await executeCode(currentCode, stdinToUse);
    setLastExecution(res);
    setIsRunning(false);

    // On mobile, auto-switch to terminal tab to see output
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileTab('terminal');
    }

    if (res.status === 'success') {
      sounds.playPowerUp();
    } else {
      sounds.playFailure();
    }
  }, [currentCode, customStdin, currentLevel]);

  // Submit solution (validate all test cases)
  const handleSubmitSolution = useCallback(async () => {
    sounds.playClick();
    setIsSubmitting(true);
    const { allPassed, results, firstExecution } = await runTestSuite(
      currentLevel,
      currentCode
    );

    setLastExecution(firstExecution);
    setTestResults(results);
    setIsSubmitting(false);

    // On mobile, auto-switch to terminal tab to see test results
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileTab('terminal');
    }

    if (allPassed) {
      sounds.playSuccess();

      // Check achievements
      const newAchievements = [...progress.unlockedAchievements];
      if (currentLevel.id === 1 && !newAchievements.includes('first_spark')) {
        newAchievements.push('first_spark');
      }
      if (currentLevel.id === 2 && !newAchievements.includes('power_engineer')) {
        newAchievements.push('power_engineer');
      }
      if (currentLevel.id === 3 && !newAchievements.includes('plasma_synergy')) {
        newAchievements.push('plasma_synergy');
      }
      if (currentLevel.id === 4 && !newAchievements.includes('sentinel_whisperer')) {
        newAchievements.push('sentinel_whisperer');
      }
      if (currentLevel.id === 5 && !newAchievements.includes('gatebreaker')) {
        newAchievements.push('gatebreaker');
      }
      if (!firstExecution.stderr && !newAchievements.includes('clean_coder')) {
        newAchievements.push('clean_coder');
      }

      // Mark level completed & unlock next
      const wasAlreadyCompleted = progress.completedLevelIds.includes(currentLevel.id);
      const nextLevelId = currentLevel.id + 1;
      const updatedUnlocked = Array.from(
        new Set([
          ...progress.unlockedLevelIds,
          ...(nextLevelId <= 5 ? [nextLevelId] : []),
        ])
      );
      const updatedCompleted = Array.from(
        new Set([...progress.completedLevelIds, currentLevel.id])
      );
      const updatedXp = wasAlreadyCompleted
        ? progress.xp
        : progress.xp + currentLevel.xpReward;

      setProgress((prev) => ({
        ...prev,
        completedLevelIds: updatedCompleted,
        unlockedLevelIds: updatedUnlocked,
        xp: updatedXp,
        unlockedAchievements: newAchievements,
      }));

      // If Boss Level 5 is completed, show victory then prompt Chapter 1 Complete!
      setIsVictoryOpen(true);
    } else {
      sounds.playFailure();
    }
  }, [currentLevel, currentCode, progress]);

  // Switch to next level
  const handleNextLevel = () => {
    setIsVictoryOpen(false);
    const nextId = currentLevel.id + 1;
    if (nextId <= 5) {
      setProgress((prev) => ({
        ...prev,
        currentLevelId: nextId,
        unlockedLevelIds: Array.from(new Set([...prev.unlockedLevelIds, nextId])),
      }));
    }
  };

  // Replay chapter from level 1
  const handleReplayChapter = () => {
    setProgress((prev) => ({
      ...prev,
      currentLevelId: 1,
    }));
  };

  // Reset all game progress
  const handleResetProgress = () => {
    sounds.playClick();
    setConfirmResetProgress(true);
  };

  const executeResetProgress = () => {
    sounds.playClick();
    const reset = resetPlayerProgress();
    setProgress(reset);
    setLastExecution(null);
    setTestResults(null);
    setConfirmResetProgress(false);
  };

  // Render animated visual scene corresponding to level
  const renderVisualScene = () => {
    const isBusy = isRunning || isSubmitting;
    switch (currentLevel.id) {
      case 1:
        return <AncientTerminalScene isSolved={isSolved} isRunning={isBusy} />;
      case 2:
        return <PowerCoreScene isSolved={isSolved} isRunning={isBusy} />;
      case 3:
        return <BrokenGeneratorScene isSolved={isSolved} isRunning={isBusy} />;
      case 4:
        return <SleepingGuardianScene isSolved={isSolved} isRunning={isBusy} />;
      case 5:
        return <SilentGateScene isSolved={isSolved} isRunning={isBusy} />;
      default:
        return <AncientTerminalScene isSolved={isSolved} isRunning={isBusy} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col relative selection:bg-cyan-500 selection:text-slate-950">
      {/* Scanline CRT overlay */}
      <div className="scanlines fixed inset-0 z-30" />

      {/* Main Game HUD Header */}
      <GameHeader
        progress={progress}
        compilerStatus={compilerStatus}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenCodex={() => setIsCodexOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* Main Adventure Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 lg:p-5 flex flex-col gap-3 sm:gap-4 relative z-10 pb-20 lg:pb-6">
        {/* Mobile View Tab Switcher (Visible on mobile/tablet, hidden on desktop) */}
        <div className="lg:hidden flex items-center p-1 bg-[#091122] rounded-xl border border-slate-800 shadow-md">
          <button
            onClick={() => setMobileTab('mission')}
            className={`flex-1 py-2 px-1 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'mission'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>Story & Mission</span>
          </button>

          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-2 px-1 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'editor'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>Code Editor</span>
          </button>

          <button
            onClick={() => setMobileTab('terminal')}
            className={`flex-1 py-2 px-1 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              mobileTab === 'terminal'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>Terminal</span>
            {testResults && (
              <span
                className={`w-2 h-2 rounded-full ${
                  testResults.every((t) => t.passed) ? 'bg-emerald-400' : 'bg-rose-500 animate-ping'
                }`}
              />
            )}
          </button>
        </div>

        {/* Story Dialogue Panel with Aria (Shown on desktop always; on mobile shown in 'mission' tab) */}
        <div className={`w-full ${mobileTab === 'mission' ? 'block' : 'hidden lg:block'}`}>
          <DialogueBox dialogues={currentLevel.storyIntro} />
        </div>

        {/* DESKTOP VIEW: Dual-Column Responsive Grid (lg and above) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4">
          {/* LEFT COLUMN: Visual Scene & Mission Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {renderVisualScene()}
            <MissionBriefing
              level={currentLevel}
              onOpenHints={() => setIsHintOpen(true)}
              hintCount={currentLevel.hints.length}
            />
          </div>

          {/* RIGHT COLUMN: Monaco Editor & Output Terminal (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <CodeWorkspace
              code={currentCode}
              onChange={handleCodeChange}
              onRun={handleRunCode}
              onSubmit={handleSubmitSolution}
              onReset={handleResetCode}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
            />
            <TerminalPanel
              lastExecution={lastExecution}
              testResults={testResults}
              customStdin={customStdin}
              onStdinChange={setCustomStdin}
              isRunning={isRunning || isSubmitting}
              onRunCustom={handleRunCode}
            />
          </div>
        </div>

        {/* MOBILE VIEW: Single Focus Tab Content (< lg) */}
        <div className="lg:hidden flex flex-col gap-3">
          {mobileTab === 'mission' && (
            <div className="flex flex-col gap-3">
              {renderVisualScene()}
              <MissionBriefing
                level={currentLevel}
                onOpenHints={() => setIsHintOpen(true)}
                hintCount={currentLevel.hints.length}
              />
              <div className="pt-2">
                <button
                  onClick={() => setMobileTab('editor')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/30 cursor-pointer"
                >
                  <span>Open Code Editor</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {mobileTab === 'editor' && (
            <div className="flex flex-col gap-3">
              {/* Quick Objective Strip on Mobile Editor */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs">
                <span className="text-cyan-300 font-medium truncate pr-2">
                  Chamber 0{currentLevel.id}: {currentLevel.title}
                </span>
                <button
                  onClick={() => setIsHintOpen(true)}
                  className="text-amber-400 hover:text-amber-300 text-[11px] font-semibold flex-shrink-0 cursor-pointer"
                >
                  Hint ({currentLevel.hints.length})
                </button>
              </div>

              <CodeWorkspace
                code={currentCode}
                onChange={handleCodeChange}
                onRun={handleRunCode}
                onSubmit={handleSubmitSolution}
                onReset={handleResetCode}
                isRunning={isRunning}
                isSubmitting={isSubmitting}
              />
            </div>
          )}

          {mobileTab === 'terminal' && (
            <div className="flex flex-col gap-3">
              <TerminalPanel
                lastExecution={lastExecution}
                testResults={testResults}
                customStdin={customStdin}
                onStdinChange={setCustomStdin}
                isRunning={isRunning || isSubmitting}
                onRunCustom={handleRunCode}
              />
              <div className="pt-2">
                <button
                  onClick={() => setMobileTab('editor')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <span>← Back to Code Editor</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Mobile Bottom Quick Bar (< lg) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#060a16]/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-between gap-1.5 shadow-2xl">
        <button
          onClick={() => setMobileTab('mission')}
          className={`flex-1 py-1.5 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            mobileTab === 'mission' ? 'text-cyan-300 bg-slate-900 border border-cyan-800/60 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Mission</span>
        </button>

        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-1.5 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            mobileTab === 'editor' ? 'text-cyan-300 bg-slate-900 border border-cyan-800/60 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>

        <button
          onClick={handleRunCode}
          disabled={isRunning || isSubmitting}
          className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 disabled:opacity-50 text-cyan-300 text-xs font-semibold border border-cyan-800/80 flex items-center justify-center gap-1 cursor-pointer min-h-[38px] shadow-sm"
        >
          {isRunning ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
          )}
          <span>Run</span>
        </button>

        <button
          onClick={handleSubmitSolution}
          disabled={isRunning || isSubmitting}
          className="flex-1 py-1.5 px-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 active:from-cyan-700 active:to-blue-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-md shadow-cyan-900/40 cursor-pointer min-h-[38px]"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5" />
          )}
          <span>Submit</span>
        </button>

        <button
          onClick={() => setMobileTab('terminal')}
          className={`flex-1 py-1.5 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer relative ${
            mobileTab === 'terminal' ? 'text-cyan-300 bg-slate-900 border border-cyan-800/60 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Console</span>
          {testResults && (
            <span
              className={`absolute top-1 right-2 w-1.5 h-1.5 rounded-full ${
                testResults.every((t) => t.passed) ? 'bg-emerald-400' : 'bg-rose-500'
              }`}
            />
          )}
        </button>
      </div>

      {/* Footer info & keyboard shortcut indicator */}
      <footer className="w-full bg-[#050812] border-t border-slate-900 px-4 py-2.5 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2">
          <span>Codebound: The C Programming Adventure</span>
          <span>·</span>
          <span>C99 Standard / Sandboxed Compiler Engine</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Auto-saving to LocalStorage</span>
          <span>·</span>
          <span>Ready for Code Keepers</span>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <HintDrawer
        hints={currentLevel.hints}
        isOpen={isHintOpen}
        onClose={() => setIsHintOpen(false)}
      />

      <LevelMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        progress={progress}
        onSelectLevel={(lvlId) => {
          setProgress((prev) => ({ ...prev, currentLevelId: lvlId }));
        }}
      />

      <CodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        progress={progress}
      />

      <VictoryModal
        level={currentLevel}
        isOpen={isVictoryOpen}
        onNextLevel={handleNextLevel}
        onReplay={() => setIsVictoryOpen(false)}
        isLastLevelInChapter={currentLevel.id === 5}
        onOpenChapterComplete={() => {
          setIsVictoryOpen(false);
          setIsChapterCompleteOpen(true);
        }}
      />

      <ChapterCompleteModal
        isOpen={isChapterCompleteOpen}
        onClose={() => setIsChapterCompleteOpen(false)}
        progress={progress}
        onReplayChapter={handleReplayChapter}
      />

      {/* In-Game Reset Template Confirmation Modal */}
      {confirmResetTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#091020] border border-cyan-800/80 rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
            <h3 className="font-bold text-white text-base">টেমপ্লেট রিসেট করবেন?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              এটি চেম্বার 0{currentLevel.id} এর প্রাথমিক টেমপ্লেট কোডটি পুনরায় লোড করবে। তোমার বর্তমান পরিবর্তনগুলো মুছে যাবে।
            </p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setConfirmResetTemplate(false)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeResetCode}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs text-white font-semibold transition-colors shadow"
              >
                Reset Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-Game Reset Full Progress Confirmation Modal */}
      {confirmResetProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#091020] border border-rose-800/80 rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
            <h3 className="font-bold text-white text-base">সমস্ত প্রোগ্রেস মুছে ফেলবেন?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              আপনি কি নিশ্চিত? এটি আপনার আনলক করা সব চেম্বার, অর্জিত এক্সপি এবং মেডেল মুছে দিয়ে গেমটি লেভেল ১-এ ফেরত নিয়ে যাবে।
            </p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setConfirmResetProgress(false)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeResetProgress}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs text-white font-semibold transition-colors shadow"
              >
                Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
