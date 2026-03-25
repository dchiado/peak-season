'use client';

import { Suspense } from 'react';
import Results from '@/components/Results';

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Results isShare={false} />
    </Suspense>
  );
}