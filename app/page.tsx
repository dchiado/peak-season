'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function LandingPage() {
  const router = useRouter();

  return (
    <section>
      <h1 style={{ fontSize: 36, fontWeight: 700 }}>
        What is your peak season?
      </h1>

      <p style={{ marginTop: 12, marginBottom: 24, fontSize: 18, color: '#A0A0A0' }}>
        We combine your interests with the sports calendar to rank every month of the year.
      </p>

      <Button variant="primary" onClick={() => router.push('/preferences')}>
        Get Started
      </Button>

      <div style={{ marginTop: 32 }}>
        <ul style={{ lineHeight: 1.8, color: '#A0A0A0' }}>
          <li>🎯  Personalized to your interests</li>
          <li>📅  See the whole sports year at a glance</li>
          <li>⚙️  Adjust anytime</li>
        </ul>
      </div>
    </section>
  );
}
