'use client';

import Results from '@/components/Results';

interface ResultsPageProps {
  isShare?: boolean; // true if viewing someone else's shared page
}

export default function ResultsPage({ isShare=false }: ResultsPageProps) {

  return (
    <Results isShare={false} />
  );
}
