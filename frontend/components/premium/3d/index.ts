// 3D Components for AICO Engineering
// All components use react-three-fiber with performance optimizations

// Regular exports (use for critical above-fold content only)
export { default as HolographicGrid } from './HolographicGrid';
export { default as FloatingModules } from './FloatingModules';
export { default as NetworkGlobe } from './NetworkGlobe';
export { default as InteractiveWireframeHouse } from './InteractiveWireframeHouse';

// Apple-style scroll-reactive 3D scenes
export { default as VillaScene } from './VillaScene';
export { default as ResidenceScene } from './ResidenceScene';

// Lazy loaded versions (RECOMMENDED for better performance)
// These components are loaded only when they enter the viewport
// Use these for below-fold content and non-critical 3D elements
export {
  LazyFloatingModules,
  LazyHolographicGrid,
  LazyInteractiveWireframeHouse,
  LazyNetworkGlobe,
  LazyResidenceScene,
  LazyVillaScene,
  LazyScene3D,
  Scene3DLoader,
} from './LazyComponents';
