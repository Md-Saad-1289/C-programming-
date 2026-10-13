import React, { useState, useRef } from 'react';
import Editor, { BeforeMount } from '@monaco-editor/react';
import { Play, CheckCircle, RotateCcw, Copy, Check, Terminal, Loader2, Code2 } from 'lucide-react';
import { MobileKeyBar } from './MobileKeyBar';

interface CodeWorkspaceProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
}

// Lightweight syntax highlighter for touch mode
function highlightCTokens(text: string): React.ReactNode[] {
  // Regex tokenizing C syntax elements
  const tokenRegex =
    /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(#include\s*<[^>]+>|#[a-zA-Z_]+)|("(?:\\.|[^"\\])*")|(\b(?:int|void|char|float|double|return|if|else|while|for|break|continue|struct|sizeof)\b)|(\b(?:printf|scanf|main)\b)|(\b\d+\b)|([+\-*/%=!&|<>:;(){}\[\]])|(\s+)|([a-zA-Z_][a-zA-Z0-9_]*)|(.)/g;

  const elements: React.ReactNode[] = [];
  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    const [
      full,
      comment,
      directive,
      stringLit,
      keyword,
      funcName,
      numberLit,
      operator,
      whitespace,
      ident,
      other,
    ] = match;

    if (comment) {
      elements.push(
        <span key={keyIndex++} className="text-slate-500 italic">
          {comment}
        </span>
      );
    } else if (directive) {
      elements.push(
        <span key={keyIndex++} className="text-sky-400 font-bold">
          {directive}
        </span>
      );
    } else if (stringLit) {
      elements.push(
        <span key={keyIndex++} className="text-emerald-400 font-medium">
          {stringLit}
        </span>
      );
    } else if (keyword) {
      elements.push(
        <span key={keyIndex++} className="text-purple-400 font-bold">
          {keyword}
        </span>
      );
    } else if (funcName) {
      elements.push(
        <span key={keyIndex++} className="text-cyan-300 font-semibold">
          {funcName}
        </span>
      );
    } else if (numberLit) {
      elements.push(
        <span key={keyIndex++} className="text-amber-400 font-semibold">
          {numberLit}
        </span>
      );
    } else if (operator) {
      elements.push(
        <span key={keyIndex++} className="text-slate-300 font-bold">
          {operator}
        </span>
      );
    } else if (whitespace) {
      elements.push(
        <span key={keyIndex++}>{whitespace}</span>
      );
    } else if (ident) {
      elements.push(
        <span key={keyIndex++} className="text-cyan-100">
          {ident}
        </span>
      );
    } else {
      elements.push(
        <span key={keyIndex++} className="text-slate-300">
          {other}
        </span>
      );
    }
  }

  return elements;
}

export const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({
  code,
  onChange,
  onRun,
  onSubmit,
  onReset,
  isRunning,
  isSubmitting,
}) => {
  const [copied, setCopied] = useState(false);
  const [useSimpleEditor, setUseSimpleEditor] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preOverlayRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleInsertToken = (token: string) => {
    if (useSimpleEditor && textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + token + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + token.length;
      }, 0);
    } else {
      onChange(code + (token.endsWith(';') ? token + '\n' : token));
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preOverlayRef.current) {
      preOverlayRef.current.scrollTop = e.currentTarget.scrollTop;
      preOverlayRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  // Define custom vibrant theme for Monaco Editor
  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('codebound-vibrant', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c084fc', fontStyle: 'bold' },
        { token: 'keyword.directive', foreground: '38bdf8', fontStyle: 'bold' },
        { token: 'keyword.directive.include', foreground: '38bdf8', fontStyle: 'bold' },
        { token: 'string', foreground: '4ade80' },
        { token: 'string.escape', foreground: 'fbbf24' },
        { token: 'number', foreground: 'fb923c', fontStyle: 'bold' },
        { token: 'type', foreground: 'f472b6', fontStyle: 'bold' },
        { token: 'identifier', foreground: '67e8f9' },
        { token: 'delimiter', foreground: 'cbd5e1' },
      ],
      colors: {
        'editor.background': '#0a1020',
        'editor.foreground': '#f8fafc',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#38bdf8',
        'editorCursor.foreground': '#06b6d4',
        'editor.selectionBackground': '#0e749066',
        'editor.lineHighlightBackground': '#111e3860',
      },
    });
  };

  return (
    <div className="w-full flex flex-col bg-[#0b1220] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Editor Header Bar */}
      <div className="bg-[#070d18] border-b border-slate-800 px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 px-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5 ml-1">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>main.c</span>
          </span>
          <span className="text-[10px] text-cyan-400/80 font-mono hidden sm:inline font-semibold">
            (C99 / GCC 9.2)
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setUseSimpleEditor((prev) => !prev)}
            title="Toggle between Monaco and Touch Editor"
            className="px-2 py-1 rounded-md hover:bg-slate-800 active:bg-slate-700 text-slate-400 hover:text-cyan-300 transition-colors text-xs flex items-center gap-1 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden xs:inline">
              {useSimpleEditor ? 'Monaco' : 'Touch'}
            </span>
          </button>

          <button
            onClick={handleCopy}
            title="Copy Code"
            className="p-1 sm:px-2 sm:py-1 rounded-md hover:bg-slate-800 active:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors text-xs flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="text-[10px] hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={onReset}
            title="Reset to chamber template"
            className="p-1 sm:px-2 sm:py-1 rounded-md hover:bg-slate-800 active:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors text-xs flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline">Reset</span>
          </button>

          {/* Quick Run Code */}
          <button
            onClick={onRun}
            disabled={isRunning || isSubmitting}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 disabled:opacity-50 text-cyan-300 text-xs font-medium border border-cyan-800/60 hover:border-cyan-500 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer min-h-[34px]"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            )}
            <span className="text-xs font-semibold">Run</span>
          </button>

          {/* Submit Solution */}
          <button
            onClick={onSubmit}
            disabled={isRunning || isSubmitting}
            className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:from-cyan-700 active:to-blue-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-900/30 cursor-pointer min-h-[34px]"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5" />
            )}
            <span className="text-xs font-semibold">Submit</span>
          </button>
        </div>
      </div>

      {/* Mobile C Key Access Bar */}
      <MobileKeyBar onInsert={handleInsertToken} />

      {/* Editor Body */}
      <div className="h-64 sm:h-72 lg:h-84 w-full relative bg-[#0a1020]">
        {useSimpleEditor ? (
          <div className="w-full h-full flex bg-[#0a1020] font-mono text-xs relative overflow-hidden">
            {/* Line Numbers */}
            <div className="w-10 bg-[#070c18] text-slate-500 select-none text-right pr-2 pt-3 font-mono leading-relaxed border-r border-slate-800/80 text-[11px] sm:text-xs">
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Syntax Highlighted Overlay Layer */}
            <pre
              ref={preOverlayRef}
              aria-hidden="true"
              className="absolute inset-y-0 left-10 right-0 p-3 m-0 bg-transparent font-mono text-xs sm:text-sm leading-relaxed pointer-events-none overflow-hidden whitespace-pre-wrap break-words select-none z-0"
            >
              {highlightCTokens(code)}
            </pre>

            {/* Transparent Interactive Textarea on top */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              onScroll={handleScroll}
              spellCheck={false}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              className="relative z-10 flex-1 p-3 bg-transparent text-transparent caret-cyan-400 font-mono text-xs sm:text-sm leading-relaxed outline-none resize-none selection:bg-cyan-600/40 overflow-y-auto whitespace-pre-wrap break-words"
            />
          </div>
        ) : (
          <Editor
            height="100%"
            defaultLanguage="c"
            language="c"
            value={code}
            onChange={(val) => onChange(val || '')}
            beforeMount={handleEditorWillMount}
            theme="codebound-vibrant"
            options={{
              fontSize: 13.5,
              fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              insertSpaces: true,
              lineNumbers: 'on',
              lineDecorationsWidth: 8,
              renderLineHighlight: 'line',
              wordWrap: 'on',
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              cursorWidth: 2,
              padding: { top: 12, bottom: 12 },
            }}
            loading={
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a1020] text-slate-400 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                <span className="text-xs font-mono text-cyan-300">Loading Colorful C Editor...</span>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};
