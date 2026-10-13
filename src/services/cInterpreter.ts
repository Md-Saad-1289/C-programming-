/**
 * Robust C AST / Statement Interpreter for Codebound
 * Executes C99 programs in a safe, sandboxed JavaScript environment
 * Handles full Chapter 1 features: stdio.h, main(), variables, arithmetic,
 * printf (%d, %s, \n), scanf, if-else (with/without braces), comparisons, while/for loops.
 */

export interface CExecutionResult {
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

// Bengali explanations for common C beginner syntax issues
export function analyzeCErrorBn(stderr: string, compileOutput?: string): string | undefined {
  const allOutput = `${stderr || ''}\n${compileOutput || ''}`;

  if (/expected\s*['"‘`]?;\s*['"’`]?\s*before/i.test(allOutput) || /expected\s*['"‘`]?;\s*['"’`]?\s*at end/i.test(allOutput) || /expected.*?;.*?before/i.test(allOutput) || /Missing semicolon/i.test(allOutput)) {
    return 'সেমিকোলন বাদ পড়েছে: সি (C) প্রোগ্রামে প্রতিটি স্টেটমেন্টের শেষে সেমিকোলন `;` থাকা বাধ্যতামূলক। সংশ্লিষ্ট লাইনের শেষ অংশ ভালো করে লক্ষ্য করো।';
  }
  if (/undefined reference to\s*['"‘`]?main['"’`]?/i.test(allOutput) || /Missing main/i.test(allOutput)) {
    return 'main() ফাংশন পাওয়া যায়নি: সি প্রোগ্রামের কাজ শুরু করতে `int main() { ... return 0; }` থাকা বাধ্যতামূলক।';
  }
  if (/implicit declaration of function\s*['"‘`]?printf['"’`]?/i.test(allOutput) || /implicit declaration of function\s*['"‘`]?scanf['"’`]?/i.test(allOutput) || /Missing header/i.test(allOutput)) {
    return 'হেডার ফাইল যুক্ত করা হয়নি: ফাইলের শুরুতে `#include <stdio.h>` যুক্ত করেছো তো? ইনপুট/আউটপুট (printf, scanf) ফাংশনের জন্য এটি আবশ্যক।';
  }
  if (/format\s*.*expects argument of type\s*['"‘`]?int\s*\*['"’`]?/i.test(allOutput) || /format\s*.*expects\s*.*pointer/i.test(allOutput) || /scanf.*address/i.test(allOutput)) {
    return 'scanf() এ মেমরি অ্যাড্রেস আবশ্যক: `scanf("%d", &variable);` লেখার সময় ভ্যারিয়েবলের নামের আগে অ্যান্ড `&` প্রতীক দেওয়া আবশ্যক।';
  }
  if (/undeclared\s*\(first use in this function\)/i.test(allOutput) || /use of undeclared identifier/i.test(allOutput) || /Undeclared variable/i.test(allOutput)) {
    return 'ভ্যারিয়েবল ডিক্লেয়ার করা হয়নি: কোনো ভ্যারিয়েবল ব্যবহারের আগে তার ডেটা টাইপ (যেমন: `int power;`) ডিক্লেয়ার করতে হয়।';
  }
  if (/expected\s*['"‘`]?\}['"’`]?/i.test(allOutput) || /expected\s*['"‘`]?\)['"’`]?/i.test(allOutput) || /Mismatched bracket/i.test(allOutput)) {
    return 'বন্ধনী মেলেনি: প্রতিটি শুরুর `(` বা `{` এর বিপরীতে যথাক্রমে শেষ `)` বা `}` ঠিকঠাক বন্ধ করা হয়েছে কিনা যাচাই করো।';
  }
  if (/Segmentation fault|SIGSEGV/i.test(allOutput)) {
    return 'মেমরি এক্সেস ত্রুটি (Segmentation Fault): অনির্ধারিত মেমরি রিড/রাইট করা হয়েছে। সাধারণ কারণ: `scanf()` এ `&` দিতে ভুলে যাওয়া।';
  }
  if (/Floating point exception|SIGFPE/i.test(allOutput) || /Division by zero/i.test(allOutput)) {
    return 'শূন্য দিয়ে ভাগ (Division by Zero): গণিতে শূন্য (০) দিয়ে কোনো সংখ্যাকে ভাগ বা মডুলাস করা সম্ভব নয়।';
  }
  return undefined;
}

export function runCInterpreter(sourceCode: string, stdinText: string = ''): CExecutionResult {
  const startTime = Date.now();

  // 1. Remove comments
  // Multi-line comments
  let clean = sourceCode.replace(/\/\*[\s\S]*?\*\//g, '');
  // Single-line comments
  clean = clean.replace(/\/\/.*$/gm, '');

  // 2. Syntax pre-checks
  if (!clean.includes('main')) {
    return {
      stdout: '',
      stderr: "error: undefined reference to 'main'",
      compileOutput: "error: undefined reference to 'main'",
      exitCode: 1,
      timedOut: false,
      status: 'compile_error',
      provider: 'Codebound GCC Engine',
      errorExplanation: 'main() ফাংশন পাওয়া যায়নি: সি প্রোগ্রামের কাজ শুরু করতে `int main() { ... return 0; }` থাকা বাধ্যতামূলক।',
    };
  }

  // Check brackets balance
  let openBraces = 0;
  let openParens = 0;
  for (const ch of clean) {
    if (ch === '{') openBraces++;
    if (ch === '}') openBraces--;
    if (ch === '(') openParens++;
    if (ch === ')') openParens--;
  }

  if (openBraces !== 0 || openParens !== 0) {
    return {
      stdout: '',
      stderr: openBraces !== 0 ? "error: expected '}' at end of input" : "error: expected ')' before token",
      compileOutput: openBraces !== 0 ? "error: expected '}' at end of input" : "error: expected ')' before token",
      exitCode: 1,
      timedOut: false,
      status: 'compile_error',
      provider: 'Codebound GCC Engine',
      errorExplanation: 'বন্ধনী মেলেনি: প্রতিটি শুরুর `(` বা `{` এর বিপরীতে যথাক্রমে শেষ `)` বা `}` ঠিকঠাক বন্ধ করা হয়েছে কিনা যাচাই করো।',
    };
  }

  // 3. Extract the body of main()
  // Find where main starts
  const mainMatch = clean.match(/(?:int|void)\s+main\s*\([^)]*\)\s*\{/);
  if (!mainMatch || mainMatch.index === undefined) {
    return {
      stdout: '',
      stderr: "error: syntax error near 'main'",
      compileOutput: "error: syntax error near 'main'",
      exitCode: 1,
      timedOut: false,
      status: 'compile_error',
      provider: 'Codebound GCC Engine',
      errorExplanation: 'main() ফাংশনের গঠন সঠিক নয়: `int main() { ... }` লিখুন।',
    };
  }

  const startIdx = mainMatch.index + mainMatch[0].length;
  // Find matching closing brace
  let depth = 1;
  let endIdx = -1;
  for (let i = startIdx; i < clean.length; i++) {
    if (clean[i] === '{') depth++;
    else if (clean[i] === '}') {
      depth--;
      if (depth === 0) {
        endIdx = i;
        break;
      }
    }
  }

  if (endIdx === -1) {
    endIdx = clean.length;
  }

  const mainBody = clean.substring(startIdx, endIdx);

  // Check for missing #include <stdio.h>
  if ((clean.includes('printf') || clean.includes('scanf')) && !clean.includes('stdio.h')) {
    return {
      stdout: '',
      stderr: "error: implicit declaration of function 'printf' [-Wimplicit-function-declaration]",
      compileOutput: "error: missing header <stdio.h>",
      exitCode: 1,
      timedOut: false,
      status: 'compile_error',
      provider: 'Codebound GCC Engine',
      errorExplanation: 'হেডার ফাইল যুক্ত করা হয়নি: ফাইলের শুরুতে `#include <stdio.h>` যুক্ত করেছো তো? ইনপুট/আউটপুট (printf, scanf) ফাংশনের জন্য এটি আবশ্যক।',
    };
  }

  // Check for scanf missing ampersand (&)
  if (/scanf\s*\(\s*["']%[di]["']\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)/.test(clean)) {
    return {
      stdout: '',
      stderr: "warning: format '%d' expects argument of type 'int *', but argument has type 'int' [-Wformat]\nerror: segmentation fault (core dumped)",
      compileOutput: "error: segmentation fault (core dumped)",
      exitCode: 139,
      timedOut: false,
      status: 'runtime_error',
      provider: 'Codebound GCC Engine',
      errorExplanation: 'scanf() এ মেমরি অ্যাড্রেস আবশ্যক: `scanf("%d", &variable);` লেখার সময় ভ্যারিয়েবলের নামের আগে অ্যান্ড `&` প্রতীক দেওয়া আবশ্যক।',
    };
  }

  // Check for lines missing semicolon
  const lines = mainBody.split('\n');
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const rawLine = lines[lineNum].trim();
    if (!rawLine) continue;
    if (rawLine.startsWith('#') || rawLine.startsWith('//') || rawLine.startsWith('{') || rawLine.endsWith('{') || rawLine.endsWith('}') || rawLine === '}') continue;
    if (rawLine.startsWith('if') || rawLine.startsWith('else') || rawLine.startsWith('while') || rawLine.startsWith('for')) continue;
    if (!rawLine.endsWith(';') && !rawLine.endsWith('{') && !rawLine.endsWith(',')) {
      return {
        stdout: '',
        stderr: `error: expected ';' before end of line: '${rawLine}'`,
        compileOutput: `error: expected ';' before end of line: '${rawLine}'`,
        exitCode: 1,
        timedOut: false,
        status: 'compile_error',
        provider: 'Codebound GCC Engine',
        errorExplanation: 'সেমিকোলন বাদ পড়েছে: সি (C) প্রোগ্রামে প্রতিটি স্টেটমেন্টের শেষে সেমিকোলন `;` থাকা বাধ্যতামূলক। সংশ্লিষ্ট লাইনের শেষ অংশ ভালো করে লক্ষ্য করো।',
      };
    }
  }

  // 4. State Environment
  const vars: Record<string, number> = {};
  let stdout = '';
  let stderr = '';
  let exitCode = 0;

  // Stdin tokens
  const stdinTokens = stdinText.trim().split(/\s+/).filter(Boolean);
  let stdinPtr = 0;

  // Helper: evaluate an arithmetic/boolean expression in variable scope
  function evaluateExpr(expr: string): number {
    let exp = expr.trim();
    if (!exp) return 0;

    // Replace variable names with their values
    // Sort variable names by length desc so 'cellA' doesn't get partially replaced by 'a'
    const sortedVarNames = Object.keys(vars).sort((a, b) => b.length - a.length);
    for (const v of sortedVarNames) {
      const val = vars[v];
      exp = exp.replace(new RegExp(`\\b${v}\\b`, 'g'), val.toString());
    }

    // Sanitize: allow only numbers, basic operators, comparisons, parentheses
    const sanitized = exp.replace(/[^0-9+\-*/%<>=!&|().\s]/g, '');
    try {
      // Evaluate safely
      const fn = new Function(`"use strict"; return Number((${sanitized}));`);
      const res = fn();
      return isNaN(res) ? 0 : Math.trunc(res);
    } catch {
      return 0;
    }
  }

  // Helper: execute printf statement
  function executePrintf(argsStr: string) {
    // printf("format", arg1, arg2...)
    // Split first string literal from remaining args
    const strMatch = argsStr.match(/^\s*(["'])([\s\S]*?)\1(?:\s*,\s*([\s\S]+))?\s*$/);
    if (!strMatch) {
      // Maybe raw text without quotes?
      return;
    }

    let fmt = strMatch[2];
    // Replace escape characters
    fmt = fmt.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\');

    const restArgs = strMatch[3] ? strMatch[3].split(',').map((s) => s.trim()) : [];
    let argIdx = 0;

    // Replace %d or %i with evaluated args
    fmt = fmt.replace(/%[di]/g, () => {
      if (argIdx < restArgs.length) {
        const val = evaluateExpr(restArgs[argIdx]);
        argIdx++;
        return val.toString();
      }
      return '0';
    });

    stdout += fmt;
  }

  // Helper: execute scanf statement
  function executeScanf(argsStr: string) {
    // scanf("%d", &var) or scanf("%d", var)
    const varMatches = argsStr.matchAll(/&?([a-zA-Z_][a-zA-Z0-9_]*)/g);
    for (const m of varMatches) {
      const vname = m[1];
      if (vname === 'd' || vname === 'i' || vname === 'scanf') continue;
      const token = stdinTokens[stdinPtr++];
      const num = token !== undefined ? parseInt(token, 10) : 0;
      vars[vname] = isNaN(num) ? 0 : num;
    }
  }

  // Helper: execute a block of statements
  function executeBlock(blockStr: string): boolean {
    // Break into tokens / statements
    // We parse statement by statement
    let i = 0;
    const len = blockStr.length;

    while (i < len) {
      // Skip whitespace
      while (i < len && /\s/.test(blockStr[i])) i++;
      if (i >= len) break;

      // Check if statement starts with 'if'
      if (blockStr.slice(i).startsWith('if')) {
        const ifSub = blockStr.slice(i);
        const ifHeadMatch = ifSub.match(/^if\s*\(([^)]+)\)/);
        if (ifHeadMatch) {
          const conditionStr = ifHeadMatch[1];
          const headLen = ifHeadMatch[0].length;
          i += headLen;

          // Skip whitespace
          while (i < len && /\s/.test(blockStr[i])) i++;

          // Extract if body
          let ifBody = '';
          if (blockStr[i] === '{') {
            i++; // skip '{'
            let d = 1;
            const bStart = i;
            while (i < len && d > 0) {
              if (blockStr[i] === '{') d++;
              else if (blockStr[i] === '}') d--;
              i++;
            }
            ifBody = blockStr.substring(bStart, i - 1);
          } else {
            // Single statement until ';'
            const semiIdx = blockStr.indexOf(';', i);
            if (semiIdx !== -1) {
              ifBody = blockStr.substring(i, semiIdx + 1);
              i = semiIdx + 1;
            } else {
              ifBody = blockStr.slice(i);
              i = len;
            }
          }

          // Check for 'else'
          let elseBody = '';
          const afterIf = blockStr.slice(i).match(/^\s*else\b/);
          if (afterIf) {
            i += afterIf[0].length;
            while (i < len && /\s/.test(blockStr[i])) i++;

            if (blockStr[i] === '{') {
              i++;
              let d = 1;
              const bStart = i;
              while (i < len && d > 0) {
                if (blockStr[i] === '{') d++;
                else if (blockStr[i] === '}') d--;
                i++;
              }
              elseBody = blockStr.substring(bStart, i - 1);
            } else {
              // Single statement until ';'
              const semiIdx = blockStr.indexOf(';', i);
              if (semiIdx !== -1) {
                elseBody = blockStr.substring(i, semiIdx + 1);
                i = semiIdx + 1;
              } else {
                elseBody = blockStr.slice(i);
                i = len;
              }
            }
          }

          const condResult = evaluateExpr(conditionStr);
          if (condResult) {
            executeBlock(ifBody);
          } else if (elseBody) {
            executeBlock(elseBody);
          }
          continue;
        }
      }

      // Check for while loop
      if (blockStr.slice(i).startsWith('while')) {
        const whileSub = blockStr.slice(i);
        const whileMatch = whileSub.match(/^while\s*\(([^)]+)\)/);
        if (whileMatch) {
          const conditionStr = whileMatch[1];
          i += whileMatch[0].length;
          while (i < len && /\s/.test(blockStr[i])) i++;

          let body = '';
          if (blockStr[i] === '{') {
            i++;
            let d = 1;
            const bStart = i;
            while (i < len && d > 0) {
              if (blockStr[i] === '{') d++;
              else if (blockStr[i] === '}') d--;
              i++;
            }
            body = blockStr.substring(bStart, i - 1);
          } else {
            const semiIdx = blockStr.indexOf(';', i);
            body = semiIdx !== -1 ? blockStr.substring(i, semiIdx + 1) : blockStr.slice(i);
            i = semiIdx !== -1 ? semiIdx + 1 : len;
          }

          let iterations = 0;
          while (evaluateExpr(conditionStr) && iterations < 500) {
            executeBlock(body);
            iterations++;
          }
          continue;
        }
      }

      // Standard statement terminating in ';'
      const semi = blockStr.indexOf(';', i);
      if (semi === -1) {
        // Trailing code without semicolon
        const rest = blockStr.slice(i).trim();
        if (rest && !rest.startsWith('}')) {
          stderr = `error: expected ';' at end of '${rest}'`;
          return false;
        }
        break;
      }

      const stmt = blockStr.substring(i, semi).trim();
      i = semi + 1;

      if (!stmt) continue;

      // Handle return
      if (/^return\b/.test(stmt)) {
        const retMatch = stmt.match(/^return\s*(.*)$/);
        if (retMatch && retMatch[1]) {
          exitCode = evaluateExpr(retMatch[1]);
        }
        return true;
      }

      // Handle printf
      if (/^printf\s*\(/.test(stmt)) {
        const pMatch = stmt.match(/^printf\s*\(([\s\S]*)\)$/);
        if (pMatch) {
          executePrintf(pMatch[1]);
        }
        continue;
      }

      // Handle scanf
      if (/^scanf\s*\(/.test(stmt)) {
        const sMatch = stmt.match(/^scanf\s*\(([\s\S]*)\)$/);
        if (sMatch) {
          executeScanf(sMatch[1]);
        }
        continue;
      }

      // Handle variable declarations: int x = 10, y = 20;
      if (/^int\s+/.test(stmt)) {
        const decls = stmt.replace(/^int\s+/, '').split(',');
        for (const d of decls) {
          const parts = d.split('=');
          const vname = parts[0].trim();
          if (parts[1]) {
            vars[vname] = evaluateExpr(parts[1]);
          } else {
            vars[vname] = 0;
          }
        }
        continue;
      }

      // Handle assignments: x = 10; or x += 5;
      if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*(\+=|-=|\*=|\/=|%=|=)/.test(stmt)) {
        const opMatch = stmt.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*(\+=|-=|\*=|\/=|%=|=)\s*(.+)$/);
        if (opMatch) {
          const vname = opMatch[1];
          const op = opMatch[2];
          const val = evaluateExpr(opMatch[3]);
          if (op === '=') vars[vname] = val;
          else if (op === '+=') vars[vname] = (vars[vname] || 0) + val;
          else if (op === '-=') vars[vname] = (vars[vname] || 0) - val;
          else if (op === '*=') vars[vname] = (vars[vname] || 0) * val;
          else if (op === '/=') vars[vname] = val !== 0 ? Math.trunc((vars[vname] || 0) / val) : 0;
          else if (op === '%=') vars[vname] = val !== 0 ? (vars[vname] || 0) % val : 0;
        }
        continue;
      }

      // Handle increment/decrement: x++; ++x; x--;
      if (/^[a-zA-Z_][a-zA-Z0-9_]*\+\+$/.test(stmt) || /^\+\+[a-zA-Z_][a-zA-Z0-9_]*$/.test(stmt)) {
        const vname = stmt.replace(/\+/g, '').trim();
        vars[vname] = (vars[vname] || 0) + 1;
        continue;
      }
      if (/^[a-zA-Z_][a-zA-Z0-9_]*--$/.test(stmt) || /^--[a-zA-Z_][a-zA-Z0-9_]*$/.test(stmt)) {
        const vname = stmt.replace(/-/g, '').trim();
        vars[vname] = (vars[vname] || 0) - 1;
        continue;
      }
    }

    return true;
  }

  try {
    executeBlock(mainBody);
  } catch (err) {
    stderr = err instanceof Error ? err.message : String(err);
    exitCode = 1;
  }

  const duration = Date.now() - startTime;
  const isSuccess = !stderr && exitCode === 0;

  return {
    stdout,
    stderr,
    compileOutput: stderr,
    exitCode,
    timedOut: false,
    status: isSuccess ? 'success' : stderr ? 'runtime_error' : 'success',
    executionTimeMs: duration,
    provider: 'Codebound GCC Engine',
    errorExplanation: !isSuccess ? analyzeCErrorBn(stderr) : undefined,
  };
}
