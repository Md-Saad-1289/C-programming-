import React from 'react';

interface MobileKeyBarProps {
  onInsert: (text: string) => void;
}

export const MobileKeyBar: React.FC<MobileKeyBarProps> = ({ onInsert }) => {
  const keys = [
    ';',
    '{',
    '}',
    '(',
    ')',
    '"',
    '&',
    '==',
    '>=',
    '+',
    '%d',
    '\\n',
    'int ',
    'scanf',
    'printf',
    'if ',
    'else ',
    'return 0;',
  ];

  return (
    <div className="w-full bg-[#050914] border-t border-b border-slate-800/90 px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar">
      <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase flex-shrink-0 px-1">
        C Snippets:
      </span>
      {keys.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onInsert(k)}
          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 active:bg-cyan-950 border border-slate-800 hover:border-cyan-500 active:border-cyan-400 text-xs font-mono text-cyan-300 font-semibold flex-shrink-0 shadow-sm transition-all cursor-pointer min-h-[30px]"
        >
          {k}
        </button>
      ))}
    </div>
  );
};
