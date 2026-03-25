'use client';

import { Suspense } from 'react';
import Results from '@/components/Results';

export default function SharePage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Results isShare={true} />
    </Suspense>
  );
}
