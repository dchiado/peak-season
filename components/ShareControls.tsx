'use client';

import { useState } from 'react';
import ShareModal from './ShareModal';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { MonthScore } from '@/lib/scoring';

interface Props{
  scores: MonthScore[];
}

export default function ShareControls({scores}:Props){
  const [showShareModal, setShowShareModal] = useState(false);
  const router = useRouter();

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', gap: 48 }}>
        <Button variant="secondary" onClick={() => router.push('/preferences')}>
          Adjust Preferences
        </Button>

        <Button variant="primary" onClick={() => setShowShareModal(true)}>
          Share
        </Button>
      </div>

      {/* Show modal if triggered */}
      {showShareModal && (
        <ShareModal scores={scores} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}
