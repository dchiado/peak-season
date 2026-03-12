'use client';

import { MonthScore } from '@/lib/scoring';
import { MONTH_NAMES } from '@/lib/months';

interface BarChartProps {
  scores: MonthScore[]; // descending by score
}

export default function BarChart({ scores }: BarChartProps) {
  if (!scores || scores.length === 0) return null;

  const maxScore = Math.max(...scores.map(s => s.score));

  return (
    <div style={{ marginTop: 32, width: '100%', maxWidth: 450 }}>
      {scores.map((item, index) => {
        const widthPct = (item.score / maxScore) * 100;

        return (
          <div key={item.month} style={{ marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              <strong>{MONTH_NAMES[item.month]}</strong>
              <span>{item.score}</span>
            </div>

            <div
              style={{
                height: 12,
                background: '#eee',
                borderRadius: 6,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${widthPct}%`,
                  background: '#EDB230',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
