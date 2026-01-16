import { create } from 'zustand';

// ===========================================
// Scene Store - Apple-Style 3D Scroll Engine
// Manages active sections and 3D scene transitions
// ===========================================

export type VillaSceneType =
  | 'intro'       // Initial view - house overview
  | 'lighting'    // Lighting control showcase
  | 'climate'     // Climate control demonstration
  | 'security'    // Security system features
  | 'integrated'; // All systems working together

export type ResidenceSceneType =
  | 'intro'       // Building overview
  | 'platform'    // Platform layers
  | 'mobile'      // Mobile app showcase
  | 'access'      // Access control
  | 'dashboard';  // Management dashboard

export type ServiceSceneType =
  | 'schematic'   // Schematic design
  | 'pcb'         // PCB layout
  | 'firmware'    // Embedded software
  | 'prototype'   // Prototyping
  | 'consulting'; // Technical consulting

interface SceneState {
  // Villa Scene State
  villaScene: VillaSceneType;
  villaProgress: number; // 0-1 progress within current scene
  setVillaScene: (scene: VillaSceneType) => void;
  setVillaProgress: (progress: number) => void;

  // Residence Scene State
  residenceScene: ResidenceSceneType;
  residenceProgress: number;
  setResidenceScene: (scene: ResidenceSceneType) => void;
  setResidenceProgress: (progress: number) => void;

  // Service Scene State
  serviceScene: ServiceSceneType | null;
  serviceModalOpen: boolean;
  setServiceScene: (scene: ServiceSceneType | null) => void;
  openServiceModal: (scene: ServiceSceneType) => void;
  closeServiceModal: () => void;

  // Global scroll position (0-1)
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Active page for scene context
  activePage: 'villa' | 'residence' | 'services' | null;
  setActivePage: (page: 'villa' | 'residence' | 'services' | null) => void;

  // 3D scene visibility
  is3DVisible: boolean;
  set3DVisible: (visible: boolean) => void;

  // Animation states
  isTransitioning: boolean;
  setTransitioning: (transitioning: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  // Villa Scene State
  villaScene: 'intro',
  villaProgress: 0,
  setVillaScene: (scene) => set({ villaScene: scene }),
  setVillaProgress: (progress) => set({ villaProgress: Math.max(0, Math.min(1, progress)) }),

  // Residence Scene State
  residenceScene: 'intro',
  residenceProgress: 0,
  setResidenceScene: (scene) => set({ residenceScene: scene }),
  setResidenceProgress: (progress) => set({ residenceProgress: Math.max(0, Math.min(1, progress)) }),

  // Service Scene State
  serviceScene: null,
  serviceModalOpen: false,
  setServiceScene: (scene) => set({ serviceScene: scene }),
  openServiceModal: (scene) => set({ serviceScene: scene, serviceModalOpen: true }),
  closeServiceModal: () => set({ serviceModalOpen: false }),

  // Global scroll position
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: Math.max(0, Math.min(1, progress)) }),

  // Active page
  activePage: null,
  setActivePage: (page) => set({ activePage: page }),

  // 3D scene visibility
  is3DVisible: true,
  set3DVisible: (visible) => set({ is3DVisible: visible }),

  // Animation states
  isTransitioning: false,
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
}));

// ===========================================
// Scene Configuration
// Defines scroll thresholds and transitions
// ===========================================

export const VILLA_SCENES: { scene: VillaSceneType; threshold: number }[] = [
  { scene: 'intro', threshold: 0 },
  { scene: 'lighting', threshold: 0.2 },
  { scene: 'climate', threshold: 0.4 },
  { scene: 'security', threshold: 0.6 },
  { scene: 'integrated', threshold: 0.8 },
];

export const RESIDENCE_SCENES: { scene: ResidenceSceneType; threshold: number }[] = [
  { scene: 'intro', threshold: 0 },
  { scene: 'platform', threshold: 0.2 },
  { scene: 'mobile', threshold: 0.4 },
  { scene: 'access', threshold: 0.6 },
  { scene: 'dashboard', threshold: 0.8 },
];

// Helper to determine scene from scroll progress
export function getVillaSceneFromProgress(progress: number): VillaSceneType {
  for (let i = VILLA_SCENES.length - 1; i >= 0; i--) {
    if (progress >= VILLA_SCENES[i].threshold) {
      return VILLA_SCENES[i].scene;
    }
  }
  return 'intro';
}

export function getResidenceSceneFromProgress(progress: number): ResidenceSceneType {
  for (let i = RESIDENCE_SCENES.length - 1; i >= 0; i--) {
    if (progress >= RESIDENCE_SCENES[i].threshold) {
      return RESIDENCE_SCENES[i].scene;
    }
  }
  return 'intro';
}

// Camera positions for each villa scene
export const VILLA_CAMERA_POSITIONS: Record<VillaSceneType, [number, number, number]> = {
  intro: [5, 4, 5],
  lighting: [3, 2, 4],
  climate: [4, 3, 3],
  security: [2, 5, 4],
  integrated: [4, 3, 4],
};

// Camera positions for each residence scene
export const RESIDENCE_CAMERA_POSITIONS: Record<ResidenceSceneType, [number, number, number]> = {
  intro: [0, 0, 12],
  platform: [3, 5, 10],
  mobile: [-4, 2, 8],
  access: [0, 3, 9],
  dashboard: [0, 0, 7],
};

// Color themes for scenes
export const VILLA_SCENE_COLORS: Record<VillaSceneType, string> = {
  intro: '#F97316',      // Orange - brand color
  lighting: '#FCD34D',   // Yellow - light
  climate: '#60A5FA',    // Blue - cool
  security: '#EF4444',   // Red - alert
  integrated: '#10B981', // Green - harmony
};

export const RESIDENCE_SCENE_COLORS: Record<ResidenceSceneType, string> = {
  intro: '#F97316',      // Orange - brand color
  platform: '#8B5CF6',   // Purple - platform
  mobile: '#06B6D4',     // Cyan - digital
  access: '#22C55E',     // Green - access
  dashboard: '#3B82F6',  // Blue - data
};
