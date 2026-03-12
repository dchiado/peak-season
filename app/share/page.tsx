'use client';

import Results from '@/components/Results';

interface SharePageProps {
  isShare?: boolean; // true if viewing someone else's shared page
}

export default function SharePage({ isShare=false }: SharePageProps) {

  return (
    <Results isShare={true} />
  );
}
