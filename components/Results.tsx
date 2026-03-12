'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TopMonthHighlight from '@/components/TopMonthHighlight';
import ShareControls from '@/components/ShareControls';
import { getAllMonthScores } from '@/lib/scoring';
import { InterestLevel } from '@/lib/preferences';
import CalendarHeatMap from './CalendarHeatMap';
import { MonthScore } from '@/lib/scoring';

interface ResultsProps {
  isShare?: boolean; // true if viewing someone else's shared page
}

export default function Results({ isShare = false }: ResultsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [scores, setScores] = useState<MonthScore[] | null>(null);

  useEffect(() => {
    if (isShare) {
      // read scores from query params
      const param = searchParams.get('m');
      if (!param) { setScores([]); return; }
      const values = param.split(',').map(v => parseFloat(v));
      if (values.length !== 12 || values.some(isNaN)) { setScores([]); return; }

      const max = Math.max(...values);
      const normalized = values.map((score, i) => ({ month: i, score: max === 0 ? 0 : score }));
      normalized.sort((a, b) => b.score - a.score);
      setScores(normalized);
    } else {
      // personal results from localStorage
      const saved = localStorage.getItem('sportPreferences');
      if (!saved) { setScores([]); return; }
      const prefs: Record<string, InterestLevel> = JSON.parse(saved);
      const ranked = getAllMonthScores(prefs);
      setScores(ranked);
    }
  }, [isShare, searchParams]);

  if (!scores) return <p>Loading…</p>;
  if (scores.length === 0) return <p>No results found.</p>;

  return (
    <section style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Highlight top month */}
      <TopMonthHighlight scores={scores} />

      {/* Calendar Heat Map */}
      <CalendarHeatMap data={scores} />

      {/* Bar chart */}
      {/* <BarChart scores={scores} /> */}

      {/* Share & adjust buttons */}
      {!isShare && <ShareControls scores={scores} />}
    </section>
  );
}
