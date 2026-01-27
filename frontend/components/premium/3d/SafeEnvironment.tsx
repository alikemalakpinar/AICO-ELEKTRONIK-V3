'use client';

import { Environment } from '@react-three/drei';
import React, { Suspense } from 'react';

// Yerel HDR dosya yolu
const LOCAL_HDR_PATH = 'hdri/dikhololo_night_1k.hdr';

/**
 * FallbackLights - HDR yüklenemezse sahneyi aydınlatır
 */
function FallbackLights() {
  return (
    <group name="fallback-lights">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4466aa" />
    </group>
  );
}

/**
 * Hata Sınırı (Error Boundary)
 * HDR yüklenemezse hatayı yutar ve sahnenin çökmesini engeller.
 */
class EnvironmentLoaderBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('[SafeEnvironment] HDR yükleme hatası (Yedek ışıklar devrede):', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

/**
 * Ana Bileşen
 */
export function SafeEnvironment({
  background = false,
  fallbackOnly = false
}: { background?: boolean; fallbackOnly?: boolean }) {
  return (
    <>
      <FallbackLights />
      {!fallbackOnly && (
        <EnvironmentLoaderBoundary>
          <Suspense fallback={null}>
            {/* path="/" parametresi KRİTİK. Bu olmadan internete gider. */}
            <Environment 
              files={LOCAL_HDR_PATH} 
              path="/" 
              background={background} 
            />
          </Suspense>
        </EnvironmentLoaderBoundary>
      )}
    </>
  );
}

export default SafeEnvironment;