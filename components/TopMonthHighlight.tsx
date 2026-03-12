'use client';

import { useState, useEffect } from 'react';
import { MonthScore, getMonthBreakdown, MonthBreakdownItem } from '@/lib/scoring';
import { MONTH_NAMES } from '@/lib/months';
import { InterestLevel } from '@/lib/preferences';
import { SportPhase, SPORT_PHASE_LABELS } from '@/lib/values';

interface TopMonthHighlightProps {
  scores: MonthScore[]; // assumed sorted descending
}

export default function TopMonthHighlight({ scores }: TopMonthHighlightProps) {
  const [expanded, setExpanded] = useState(false);
  const [breakdown, setBreakdown] = useState<MonthBreakdownItem[]>([]);

  if (!scores || scores.length === 0) return null;

  // pick the top month
  const topMonth = scores.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), scores[0]);

  useEffect(() => {
    if (expanded) {
      const saved = localStorage.getItem('sportPreferences');
      if (saved) {
        const prefs: Record<string, InterestLevel> = JSON.parse(saved);
        const bd = getMonthBreakdown(topMonth.month, prefs);
        setBreakdown(bd);
      }
    }
  }, [expanded, topMonth.month]);

  const phaseLabel = (phase: SportPhase) => {
    return SPORT_PHASE_LABELS[phase] || phase.charAt(0).toUpperCase() + phase.slice(1);
  };

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: '#111',
        color: '#fff',
        width: 300,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.8 }}>Top Month</div>
      <div style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>
        {MONTH_NAMES[topMonth.month]}
      </div>
      <div style={{ marginTop: 4, fontSize: 16, color: '#EDB230' }}>
        Score: {topMonth.score}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: 12,
          padding: '8px 16px',
          background: '#EDB230',
          color: '#111',
          border: 'none',
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {expanded ? 'Hide Contributors' : 'Why This Month?'}
      </button>

      {/* Breakdown section */}
      {expanded && breakdown.length > 0 && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #333' }}>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Biggest Contributors
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {breakdown.slice(0, 3).map((item, idx) => (
              <div
                key={item.sport}
                style={{
                  textAlign: 'left',
                  padding: 10,
                  background: 'rgba(237, 178, 48, 0.1)',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {idx + 1}. {item.sport}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                  {item.phases.map(p => phaseLabel(p)).join(' / ')}
                </div>
                {/* <div style={{ fontSize: 12, color: '#EDB230', marginTop: 2 }}>
                  +{item.score}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
