export interface TestCase {
  id: string;
  name: string;
  description: string;
  stdin?: string;
  expectedOutput: string | RegExp;
  displayExpected: string;
  isSecret?: boolean;
}

export interface Hint {
  id: number;
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface DialogueLine {
  speaker: string;
  role: 'aria' | 'player' | 'narrator' | 'terminal';
  text: string;
}

export interface Level {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  chapter: number;
  xpReward: number;
  conceptName: string;
  conceptSummary: string;
  storyIntro: DialogueLine[];
  storySuccess: DialogueLine[];
  objective: string;
  requirements: string[];
  starterCode: string;
  hints: Hint[];
  testCases: TestCase[];
  solutionExample: string;
}

export interface PlayerProgress {
  currentLevelId: number;
  unlockedLevelIds: number[];
  completedLevelIds: number[];
  xp: number;
  codeByLevel: Record<number, string>;
  unlockedAchievements: string[];
  solvedAt: Record<number, string>;
}

export interface ExecutionResponse {
  stdout: string;
  stderr: string;
  compileOutput?: string;
  exitCode: number;
  timedOut: boolean;
  status: 'success' | 'compile_error' | 'runtime_error' | 'timeout' | 'error';
  executionTimeMs?: number;
  provider: string;
  errorExplanation?: string;
}

export interface TestCaseResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  error?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
