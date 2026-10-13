import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { runCInterpreter, analyzeCErrorBn } from './src/services/cInterpreter.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '1mb' }));

interface ExecutionResult {
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

// Helper to decode base64 if Judge0 returns base64
function decodeBase64(str: string | null | undefined): string {
  if (!str) return '';
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch {
    return str;
  }
}

// Judge0 API Execution (Official CE instance or RapidAPI)
async function executeViaJudge0(sourceCode: string, stdin: string = ''): Promise<ExecutionResult> {
  const apiKey = process.env.JUDGE0_API_KEY;
  const apiHost = process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com';
  const customUrl = process.env.JUDGE0_URL;

  const baseUrl = customUrl || (apiKey ? `https://${apiHost}` : 'https://ce.judge0.com');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['X-RapidAPI-Key'] = apiKey;
    headers['X-RapidAPI-Host'] = apiHost;
  }

  const startTime = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s max

  try {
    const submissionUrl = `${baseUrl}/submissions?wait=true`;

    const payload = {
      language_id: 50, // C (GCC 9.2.0)
      source_code: sourceCode,
      stdin: stdin || '',
      cpu_time_limit: 4,
      wall_time_limit: 6,
      memory_limit: 128000,
    };

    const res = await fetch(submissionUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Judge0 HTTP ${res.status}: ${res.statusText}`);
    }

    let result = await res.json();
    const token = result.token;

    // If status is in queue (1) or processing (2), poll quickly
    let statusId = result.status?.id || 0;
    let attempts = 0;
    while ((statusId === 1 || statusId === 2) && token && attempts < 5) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      attempts++;
      try {
        const pollRes = await fetch(`${baseUrl}/submissions/${token}`, { headers });
        if (pollRes.ok) {
          result = await pollRes.json();
          statusId = result.status?.id || 0;
        }
      } catch {
        break;
      }
    }

    const duration = Date.now() - startTime;
    // Judge0 returns plain text strings when base64_encoded=true is not set
    const stdout = (result.stdout ?? '').toString();
    const stderr = (result.stderr ?? '').toString();
    const compileOutput = (result.compile_output ?? '').toString();

    let status: ExecutionResult['status'] = 'success';
    if (statusId === 6) {
      status = 'compile_error';
    } else if (statusId === 5) {
      status = 'timeout';
    } else if (statusId > 3 && statusId !== 4) {
      status = 'runtime_error';
    } else if (statusId === 3 || result.exit_code === 0) {
      status = 'success';
    }

    const effectiveStderr = status === 'compile_error' ? (compileOutput || stderr) : stderr;

    return {
      stdout,
      stderr: effectiveStderr,
      compileOutput,
      exitCode: result.exit_code ?? (status === 'success' ? 0 : 1),
      timedOut: statusId === 5,
      status,
      executionTimeMs: duration,
      provider: 'Judge0 CE (GCC 9.2)',
      errorExplanation: status !== 'success' ? analyzeCErrorBn(stderr, compileOutput) : undefined,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// Compiler execute endpoint
app.post('/api/compiler/execute', async (req, res) => {
  const { code, stdin = '' } = req.body;

  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({
      stdout: '',
      stderr: 'Error: Source code is empty.',
      exitCode: 1,
      timedOut: false,
      status: 'error',
      provider: 'Codebound Gateway',
      errorExplanation: 'কোড লেখার জায়গাটি খালি রয়েছে। কোড লিখে আবার চেষ্টা করো।',
    });
  }

  // Safety filter against hazardous system-level operations in educational sandbox
  const bannedKeywords = ['system(', 'fork()', 'socket(', 'popen('];
  for (const banned of bannedKeywords) {
    if (code.includes(banned)) {
      return res.status(400).json({
        stdout: '',
        stderr: `Security restriction: Call to "${banned}" is disabled in this adventure sandbox.`,
        exitCode: 1,
        timedOut: false,
        status: 'compile_error',
        provider: 'Security Gate',
        errorExplanation: 'নিরাপত্তা সতর্কতা: এডভেঞ্চার স্যান্ডবক্সে শুধুমাত্র প্রমিত সি লাইব্রেরি (stdio.h) সমর্থিত।',
      });
    }
  }

  try {
    let result: ExecutionResult;

    // Try Judge0 CE first
    try {
      result = await executeViaJudge0(code, stdin);
    } catch (judgeErr) {
      // Fast, resilient in-memory C execution fallback
      result = runCInterpreter(code, stdin);
    }

    return res.json(result);
  } catch (error: unknown) {
    // Guaranteed fallback
    const fallback = runCInterpreter(code, stdin);
    return res.json(fallback);
  }
});

// Compiler status check endpoint
app.get('/api/compiler/status', async (_req, res) => {
  return res.json({
    status: 'online',
    activeProvider: 'Judge0 CE / Codebound GCC 9.2',
    supportedLanguages: ['C (GCC 9.2 C99)'],
    message: 'Sandboxed C compiler ready.',
    limits: {
      cpuTimeLimitSeconds: 4,
      memoryLimitMb: 128,
      sourceCodeSizeLimitKb: 64,
    },
  });
});

// Production static serving vs Dev Vite middleware
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Dev mode: Mount Vite dev server middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    // Fallback all routes to index.html for SPA
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Codebound] Adventure Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Codebound] Fatal Server Startup Error:', err);
  process.exit(1);
});
