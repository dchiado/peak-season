'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SPORTS } from '@/lib/sports';
import {
  defaultPreferences,
  InterestLevel,
} from '@/lib/preferences';
import SportInterestRow from '@/components/SportInterestRow';
import Button from '@/components/Button';

export default function SportsOnboardingPage() {
  const router = useRouter();

  const [preferences, setPreferences] = useState<
    Record<string, InterestLevel> | null
  >(null);

  // Load from localStorage if exists
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const saved = localStorage.getItem('sportPreferences');
  
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed) {
        setPreferences(parsed);
        return;
      }
    }
  
    setPreferences(defaultPreferences(SPORTS));
  }, []);
    
  // Persist on change
  useEffect(() => {
    if (!preferences) return;
  
    localStorage.setItem(
      'sportPreferences',
      JSON.stringify(preferences)
    );
  }, [preferences]);
  
  return preferences ? (
    <section>
      <h2 style={{ fontSize: 28, fontWeight: 600 }}>
        What sports do you care about?
      </h2>

      <p style={{ marginTop: 8, color: '#848484' }}>
        Don't overthink it, you can change this later.
      </p>

      <div style={{ marginTop: 24 }}>
        {SPORTS.map((sport) => (
          <SportInterestRow
            key={sport}
            sport={sport}
            value={preferences[sport]}
            onChange={(value) =>
              setPreferences((prev) => ({
                ...prev,
                [sport]: value,
              }))
            }
          />
        ))}
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="secondary" onClick={() => setPreferences(defaultPreferences(SPORTS))}>
          Reset
        </Button>

        <Button variant="primary" onClick={() => router.push('/results')}>
          See My Sports Year →
        </Button>
      </div>
    </section>
  ) : <p>Loading…</p>;
}
