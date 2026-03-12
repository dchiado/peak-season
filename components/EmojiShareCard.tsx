'use client';

import { useState } from 'react';
import { normalizeMonthScores } from '@/lib/scoring';
import { MonthScore } from '@/lib/scoring';

const MONTH_NAMES_SHORT = ['J','F','M','A','M','J','J','A','S','O','N','D'];


interface EmojiShareCardProps {
  scores: MonthScore[]; // descending or unsorted
  maxSquares?: number;  // default 4
}

export default function EmojiShareCard({ scores, maxSquares = 4 }: EmojiShareCardProps) {
  const [copied, setCopied] = useState(false);

  // Map score to 1–4 squares
  const getSquares = (score: number) => {
    if (score >= 75) return '🟩'.repeat(maxSquares);
    if (score >= 50) return '🟨'.repeat(maxSquares - 1);
    if (score >= 25) return '⬜'.repeat(maxSquares - 2);
    return '🟥';
  };

  // TODO: wrong order
  const emojiString = normalizeMonthScores(scores)
    .map(item => `${MONTH_NAMES_SHORT[item.month]} ${getSquares(item.score)}`)
    .join('\n');

  const copyEmoji = async () => {
    await navigator.clipboard.writeText(emojiString);
    setCopied(true);
    setTimeout(()=>setCopied(false),1500);
  };

  return (
    <div style={{ marginTop:24 }}>
      <pre style={{ fontSize:18, lineHeight:1.4 }}>{emojiString}</pre>
      <button
        onClick={copyEmoji}
        style={{
          marginTop:12,
          padding:'10px 16px',
          borderRadius:6,
          background:'#2C2C2C',
          color:'#fff',
          border:'none',
          cursor:'pointer'
        }}
      >
        {copied ? 'Copied!' : 'Copy Emoji'}
      </button>
    </div>
  );
}
