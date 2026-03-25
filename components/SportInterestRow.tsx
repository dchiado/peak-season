import { INTEREST_OPTIONS, InterestLevel } from '@/lib/preferences';

type Props = {
  sport: string;
  value: InterestLevel;
  onChange: (value: InterestLevel) => void;
};

export default function SportInterestRow({ sport, value, onChange }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #eee',
        gap: 12,
        overflow: 'hidden',
      }}
    >
      <strong style={{ minWidth: '6rem', flexShrink: 0 }}>{sport}</strong>

      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', // hides scrollbar on Firefox
          marginLeft: 'auto',  // ← add this
        }}
      >
        {INTEREST_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{
              flexShrink: 0, // prevent buttons from squishing
              padding: '6px 10px',
              borderRadius: 6,
              border: value === option.value ? '2px solid #EDB230' : '1px solid #ccc',
              background: value === option.value ? '#EDB230' : '#fff',
              color: value === option.value ? '#000000' : '#333',
              cursor: 'pointer',
              fontSize: 14,
              whiteSpace: 'nowrap',
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}