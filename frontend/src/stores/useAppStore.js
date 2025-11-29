import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Main App Store - Global state management
const useAppStore = create(
  devtools(
    persist(
      (set, get) => ({
        // ============================================
        // QUOTE STATE
        // ============================================
        quote: {
          // PCB Options
          pcbOptions: {
            quantity: 10,
            layers: 2,
            thickness: 1.6,
            copperWeight: 1,
            finish: 'HASL',
            maskColor: 'green',
            silkscreenColor: 'white',
            minTrack: 0.15,
            minSpace: 0.15,
            impedanceControl: false,
            eTest: true,
          },
          // SMT Options
          smtOptions: {
            assemblyRequired: false,
            sides: 'single',
            componentCount: 0,
            uniqueParts: 0,
            bgaCount: 0,
            stencilType: 'standard',
            inspection: 'visual',
            sourcingMode: 'turnkey',
          },
          // Files
          files: {
            gerber: null,
            bom: null,
            pickAndPlace: null,
          },
          // Analysis Results
          dfmResult: null,
          bomAnalysis: null,
          pricing: null,
          leadTime: 'standard',
        },

        // Quote Actions
        setPCBOption: (key, value) =>
          set((state) => ({
            quote: {
              ...state.quote,
              pcbOptions: { ...state.quote.pcbOptions, [key]: value },
            },
          })),

        setSMTOption: (key, value) =>
          set((state) => ({
            quote: {
              ...state.quote,
              smtOptions: { ...state.quote.smtOptions, [key]: value },
            },
          })),

        setFile: (type, file) =>
          set((state) => ({
            quote: {
              ...state.quote,
              files: { ...state.quote.files, [type]: file },
            },
          })),

        setDFMResult: (result) =>
          set((state) => ({
            quote: { ...state.quote, dfmResult: result },
          })),

        setBOMAnalysis: (analysis) =>
          set((state) => ({
            quote: { ...state.quote, bomAnalysis: analysis },
          })),

        setPricing: (pricing) =>
          set((state) => ({
            quote: { ...state.quote, pricing: pricing },
          })),

        setLeadTime: (leadTime) =>
          set((state) => ({
            quote: { ...state.quote, leadTime: leadTime },
          })),

        resetQuote: () =>
          set((state) => ({
            quote: {
              ...state.quote,
              pcbOptions: {
                quantity: 10,
                layers: 2,
                thickness: 1.6,
                copperWeight: 1,
                finish: 'HASL',
                maskColor: 'green',
                silkscreenColor: 'white',
                minTrack: 0.15,
                minSpace: 0.15,
                impedanceControl: false,
                eTest: true,
              },
              smtOptions: {
                assemblyRequired: false,
                sides: 'single',
                componentCount: 0,
                uniqueParts: 0,
                bgaCount: 0,
                stencilType: 'standard',
                inspection: 'visual',
                sourcingMode: 'turnkey',
              },
              files: { gerber: null, bom: null, pickAndPlace: null },
              dfmResult: null,
              bomAnalysis: null,
              pricing: null,
              leadTime: 'standard',
            },
          })),

        // ============================================
        // CART STATE
        // ============================================
        cart: {
          items: [],
          totalAmount: 0,
        },

        addToCart: (item) =>
          set((state) => {
            const existingIndex = state.cart.items.findIndex((i) => i.id === item.id);
            let newItems;

            if (existingIndex >= 0) {
              newItems = state.cart.items.map((i, index) =>
                index === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
              );
            } else {
              newItems = [...state.cart.items, { ...item, quantity: 1 }];
            }

            const totalAmount = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

            return { cart: { items: newItems, totalAmount } };
          }),

        removeFromCart: (itemId) =>
          set((state) => {
            const newItems = state.cart.items.filter((i) => i.id !== itemId);
            const totalAmount = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
            return { cart: { items: newItems, totalAmount } };
          }),

        updateCartQuantity: (itemId, quantity) =>
          set((state) => {
            const newItems = state.cart.items.map((i) =>
              i.id === itemId ? { ...i, quantity: Math.max(0, quantity) } : i
            ).filter((i) => i.quantity > 0);
            const totalAmount = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
            return { cart: { items: newItems, totalAmount } };
          }),

        clearCart: () => set({ cart: { items: [], totalAmount: 0 } }),

        // ============================================
        // USER STATE
        // ============================================
        user: {
          isLoggedIn: false,
          profile: null,
          preferences: {
            language: 'tr',
            currency: 'TRY',
            notifications: true,
          },
        },

        setUser: (profile) =>
          set((state) => ({
            user: { ...state.user, isLoggedIn: true, profile },
          })),

        logout: () =>
          set((state) => ({
            user: { ...state.user, isLoggedIn: false, profile: null },
          })),

        setPreference: (key, value) =>
          set((state) => ({
            user: {
              ...state.user,
              preferences: { ...state.user.preferences, [key]: value },
            },
          })),

        // ============================================
        // ORDER TRACKING STATE
        // ============================================
        orders: [],
        activeOrder: null,

        setOrders: (orders) => set({ orders }),

        setActiveOrder: (order) => set({ activeOrder: order }),

        updateOrderStatus: (orderId, status, details) =>
          set((state) => ({
            orders: state.orders.map((o) =>
              o.id === orderId ? { ...o, status, ...details } : o
            ),
            activeOrder:
              state.activeOrder?.id === orderId
                ? { ...state.activeOrder, status, ...details }
                : state.activeOrder,
          })),

        // ============================================
        // UI STATE
        // ============================================
        ui: {
          sidebarOpen: false,
          modalOpen: null,
          loading: false,
          notifications: [],
        },

        toggleSidebar: () =>
          set((state) => ({
            ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
          })),

        openModal: (modalId) =>
          set((state) => ({
            ui: { ...state.ui, modalOpen: modalId },
          })),

        closeModal: () =>
          set((state) => ({
            ui: { ...state.ui, modalOpen: null },
          })),

        setLoading: (loading) =>
          set((state) => ({
            ui: { ...state.ui, loading },
          })),

        addNotification: (notification) =>
          set((state) => ({
            ui: {
              ...state.ui,
              notifications: [
                ...state.ui.notifications,
                { id: Date.now(), ...notification },
              ],
            },
          })),

        removeNotification: (id) =>
          set((state) => ({
            ui: {
              ...state.ui,
              notifications: state.ui.notifications.filter((n) => n.id !== id),
            },
          })),

        // ============================================
        // BOM OPTIMIZER STATE
        // ============================================
        bomOptimizer: {
          alternatives: [],
          savings: 0,
          recommendations: [],
        },

        setBOMAlternatives: (alternatives) =>
          set((state) => ({
            bomOptimizer: { ...state.bomOptimizer, alternatives },
          })),

        setBOMSavings: (savings) =>
          set((state) => ({
            bomOptimizer: { ...state.bomOptimizer, savings },
          })),

        setBOMRecommendations: (recommendations) =>
          set((state) => ({
            bomOptimizer: { ...state.bomOptimizer, recommendations },
          })),

        // ============================================
        // LIVE TRACKING STATE (Pizza Tracker)
        // ============================================
        liveTracking: {
          currentStage: null,
          stages: [],
          lastUpdate: null,
          photos: [],
          estimatedCompletion: null,
        },

        setLiveTrackingStage: (stage) =>
          set((state) => ({
            liveTracking: {
              ...state.liveTracking,
              currentStage: stage,
              lastUpdate: new Date().toISOString(),
            },
          })),

        setLiveTrackingStages: (stages) =>
          set((state) => ({
            liveTracking: { ...state.liveTracking, stages },
          })),

        addLiveTrackingPhoto: (photo) =>
          set((state) => ({
            liveTracking: {
              ...state.liveTracking,
              photos: [...state.liveTracking.photos, photo],
            },
          })),

        setEstimatedCompletion: (date) =>
          set((state) => ({
            liveTracking: { ...state.liveTracking, estimatedCompletion: date },
          })),
      }),
      {
        name: 'aico-storage',
        partialize: (state) => ({
          cart: state.cart,
          user: state.user,
          quote: {
            pcbOptions: state.quote.pcbOptions,
            smtOptions: state.quote.smtOptions,
            leadTime: state.quote.leadTime,
          },
        }),
      }
    ),
    { name: 'AICO Store' }
  )
);

// Selectors for optimized re-renders
export const useQuoteSelector = () => useAppStore((state) => state.quote);
export const useCartSelector = () => useAppStore((state) => state.cart);
export const useUserSelector = () => useAppStore((state) => state.user);
export const useUISelector = () => useAppStore((state) => state.ui);
export const useBOMOptimizerSelector = () => useAppStore((state) => state.bomOptimizer);
export const useLiveTrackingSelector = () => useAppStore((state) => state.liveTracking);

export default useAppStore;
