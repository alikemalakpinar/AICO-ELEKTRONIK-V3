'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PageTransition from '@/components/premium/PageTransition';

// ===========================================
// Template v3.2 — Signal Dropout on Route Change
// 0.3s static noise + glitch flash on navigation
// ===========================================

interface TemplateProps {
  children: ReactNode;
}

function SignalDropout({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 z-[9995] pointer-events-none"
      style={{
        animation: 'signal-dropout 0.3s ease-out forwards',
      }}
    >
      {/* Static noise flash */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(249, 115, 22, 0.03) 2px,
            rgba(249, 115, 22, 0.03) 4px
          )`,
          mixBlendMode: 'overlay',
        }}
      />
      {/* Quick white flash */}
      <div
        className="absolute inset-0 bg-white/[0.02]"
        style={{ animation: 'signal-dropout 0.15s ease-out forwards' }}
      />
    </div>
  );
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const [showDropout, setShowDropout] = useState(false);

  useEffect(() => {
    setShowDropout(true);
    const timer = setTimeout(() => setShowDropout(false), 350);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <SignalDropout isActive={showDropout} />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
