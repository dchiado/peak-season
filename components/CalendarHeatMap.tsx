import { MonthScore } from '@/lib/scoring';
import { orderAndNormalizeMonthScores } from '@/lib/scoring';
import { monthNumberToLabel } from '@/lib/months';

export default function CalendarHeatmap({
  data,
}: {
  data: MonthScore[];
}) {
  function getHeatmapColor(score: number) {
    // clamp to 0–100
    const s = Math.max(0, Math.min(100, score)) / 100;

    // start (very light)
    const start = { r: 244, g: 244, b: 244 }; // #F4F4F4
    // end (dark gold)
    const end = { r: 237, g: 178, b: 48 };   // #EDB230

    const r = Math.round(start.r + (end.r - start.r) * s);
    const g = Math.round(start.g + (end.g - start.g) * s);
    const b = Math.round(start.b + (end.b - start.b) * s);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const scores = orderAndNormalizeMonthScores(data);
  
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginTop: 24,
      }}
    >
      {scores.map(({ month, rawScore, normalizedScore }) => (
        <div
          key={month}
          style={{
            background: getHeatmapColor(normalizedScore),
            height: 70,
            width: 50,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: 'black',
            borderRadius: 10,
          }}
        >
          <div 
            style={{
              fontSize: 14,
              fontWeight: 600,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              textAlign: 'center',
              borderBottom: '1px solid rgba(69, 68, 68, 0.63)',
              height: '35%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {monthNumberToLabel(month)}
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              height: '65%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {Math.trunc(rawScore)}
          </div>
        </div>
      ))}
    </div>
  );
}
