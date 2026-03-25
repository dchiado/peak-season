'use client';

import { useState } from 'react';
import { orderAndNormalizeMonthScores } from '@/lib/scoring';
import { MonthScore } from '@/lib/scoring';
import { writeToClipboard } from '@/lib/utils';

interface ShareModalProps {
  scores: MonthScore[];
  onClose: () => void;
}

export default function ShareModal({ scores, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyFullLink = async () => {
    const ordered = scores.sort((a, b) => a.month - b.month);
    const m = ordered.map(s => s.score).join(',');
    const url = `${window.location.origin}/share?m=${m}`;
    await writeToClipboard(url);
    setCopied('Full Link');
    setTimeout(() => setCopied(null), 1500);
  };

  const copySnapshot = async () => {
    const snapshot = orderAndNormalizeMonthScores(scores)
      .map(item => {
        const pct = item.normalizedScore;
        let squares = '';
        if (pct >= 75) squares = '🟩🟩🟩🟩';
        else if (pct >= 50) squares = '🟨🟨🟨';
        else if (pct >= 25) squares = '⬜⬜';
        else squares = '🟥';
        return `${'JFMAMJJASOND'[item.month]} ${squares}`;
      })
      .join('\n');
    await writeToClipboard(snapshot);
    setCopied('Snapshot');
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#515151',
          borderRadius: 12,
          padding: 24,
          minWidth: 280,
          maxWidth: 360,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onClick={e => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2 style={{ marginTop: 0, marginBottom: 16 }}>Share Your Results</h2>
        {/* <button
          onClick={copyFullLink}
          style={buttonStyle}
        >
          {copied === 'Full Link' ? 'Copied!' : 'Copy Full Results Link'}
        </button> */}
        <button
          onClick={copySnapshot}
          style={buttonStyle}
        >
          {copied === 'Snapshot' ? 'Copied!' : 'Copy Snapshot'}
        </button>
        <button
          onClick={onClose}
          style={{ ...buttonStyle, background: '#ccc', color: '#111' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: '100%',
  padding: '10px 16px',
  marginBottom: 12,
  borderRadius: 6,
  background: '#2C2C2C',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontSize: 16,
};
