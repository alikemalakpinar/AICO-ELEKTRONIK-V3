/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            // ===========================================
            // AICO Elektronik - Ultra Premium Design System
            // "Yıllık cirosu 100M$ olan Mühendislik Firması"
            // ===========================================

            // Brand Colors - Deep Luxury Palette
            colors: {
                // Semantic Colors (CSS Variables)
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',

                // ==========================================
                // PREMIUM PALETTE - Deep Onyx Foundation
                // ==========================================

                // Deep Onyx Scale (Zemin Renkleri)
                onyx: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#1A1A1A',
                    400: '#141414',
                    500: '#0F0F0F',
                    600: '#0A0A0A',
                    700: '#080808',
                    800: '#060606',
                    900: '#050505', // Deep Onyx - Ana Zemin
                    950: '#030303',
                },

                // Off-White Scale (Metin Renkleri)
                offwhite: {
                    50: '#FFFFFF',
                    100: '#FEFEFE',
                    200: '#FCFCFC',
                    300: '#FAFAFA',
                    400: '#F8FAFC', // Primary Off-White
                    500: '#F1F5F9',
                    600: '#E2E8F0',
                    700: '#CBD5E1',
                    800: '#94A3B8',
                    900: '#64748B',
                },

                // Engineer Orange (Accent - Sadece aktif state ve ince çizgiler)
                engineer: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#F97316', // Engineer Orange - Ana Accent
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12',
                    950: '#431407',
                },

                // Legacy Brand Colors
                brand: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#F97316',
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12',
                    950: '#431407',
                },

                // Navy Blue Scale (Secondary)
                navy: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                    950: '#020617',
                },

                // Industrial Grays
                industrial: {
                    50: '#FAFAFA',
                    100: '#F4F4F5',
                    200: '#E4E4E7',
                    300: '#D4D4D8',
                    400: '#A1A1AA',
                    500: '#71717A',
                    600: '#52525B',
                    700: '#3F3F46',
                    800: '#27272A',
                    900: '#18181B',
                },

                // Status Colors
                success: {
                    50: '#F0FDF4',
                    100: '#DCFCE7',
                    500: '#22C55E',
                    600: '#16A34A',
                    700: '#15803D',
                },
                warning: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                },
                error: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    500: '#EF4444',
                    600: '#DC2626',
                    700: '#B91C1C',
                },

                // Chart Colors
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },

            // ==========================================
            // TYPOGRAPHY - Premium Engineering
            // ==========================================
            fontFamily: {
                // Ana Font - Başlıklar ve Gövde
                sans: ['Inter', 'SF Pro Display', 'system-ui', '-apple-system', 'sans-serif'],
                // Teknik Veri Fontu - Mühendislik Hissi
                mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', 'monospace'],
                // Display Fontları
                heading: ['Inter', 'SF Pro Display', 'sans-serif'],
                display: ['Inter', 'SF Pro Display', 'sans-serif'],
            },

            // Premium Font Sizes
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1.1' }],
                '6xl': ['3.75rem', { lineHeight: '1.05' }],
                '7xl': ['4.5rem', { lineHeight: '1' }],
                '8xl': ['6rem', { lineHeight: '1' }],
                '9xl': ['8rem', { lineHeight: '1' }],

                // Hero Display Sizes
                'hero-sm': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'hero-md': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
                'hero-lg': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
                'hero-xl': ['6rem', { lineHeight: '0.95', letterSpacing: '-0.03em' }],

                // Data Display Sizes (Mono font için)
                'data-sm': ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
                'data-md': ['0.9375rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
                'data-lg': ['1.0625rem', { lineHeight: '1.75rem', letterSpacing: '0.01em' }],

                // Technical Specs
                'spec-sm': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
                'spec-md': ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.04em' }],
            },

            // Letter Spacing - Tight for Premium Feel
            letterSpacing: {
                'tighter': '-0.04em',
                'tight': '-0.02em',
                'normal': '0',
                'wide': '0.02em',
                'wider': '0.04em',
                'widest': '0.1em',
                'tech': '0.15em', // For small technical text
            },

            // Border Radius - Minimal & Clean
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                DEFAULT: '0.25rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                'full': '9999px',
            },

            // Spacing
            spacing: {
                '4.5': '1.125rem',
                '13': '3.25rem',
                '15': '3.75rem',
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
                // Screen Heights
                'screen-90': '90vh',
                'screen-80': '80vh',
                'screen-75': '75vh',
            },

            // Premium Box Shadows
            boxShadow: {
                'none': 'none',
                'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'industrial': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'industrial-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'industrial-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                // Premium Glow Effects
                'glow-orange': '0 0 20px rgba(249, 115, 22, 0.15)',
                'glow-orange-lg': '0 0 40px rgba(249, 115, 22, 0.2)',
                'glow-white': '0 0 30px rgba(255, 255, 255, 0.1)',
                // Card Shadows
                'card': '0 1px 3px 0 rgb(0 0 0 / 0.08)',
                'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.12)',
                'card-premium': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                // Focus States
                'input-focus': '0 0 0 2px hsl(var(--ring) / 0.2)',
                'button-hover': '0 2px 4px 0 rgb(0 0 0 / 0.1)',
            },

            // Backdrop Blur
            backdropBlur: {
                'xs': '2px',
                'sm': '4px',
                DEFAULT: '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '24px',
                '2xl': '40px',
                '3xl': '64px',
            },

            // Transitions
            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '1000': '1000ms',
            },

            transitionTimingFunction: {
                'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                'bounce-subtle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            },

            // Keyframes
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                'fade-out': {
                    from: { opacity: '1' },
                    to: { opacity: '0' }
                },
                'fade-in-up': {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-in-down': {
                    from: { opacity: '0', transform: 'translateY(-30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'slide-in-right': {
                    from: { transform: 'translateX(100%)' },
                    to: { transform: 'translateX(0)' }
                },
                'slide-in-bottom': {
                    from: { transform: 'translateY(10px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' }
                },
                'scale-in': {
                    from: { transform: 'scale(0.95)', opacity: '0' },
                    to: { transform: 'scale(1)', opacity: '1' }
                },
                'pulse-subtle': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' }
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.1)' },
                    '50%': { boxShadow: '0 0 40px rgba(249, 115, 22, 0.25)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'skeleton': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' }
                },
                'line-draw': {
                    from: { strokeDashoffset: '1000' },
                    to: { strokeDashoffset: '0' }
                },
                'reveal-text': {
                    from: { clipPath: 'inset(0 100% 0 0)' },
                    to: { clipPath: 'inset(0 0 0 0)' }
                },
                'parallax-slow': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-20%)' }
                },
            },

            // Animations
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out',
                'fade-out': 'fade-out 0.5s ease-out',
                'fade-in-up': 'fade-in-up 0.6s ease-out',
                'fade-in-down': 'fade-in-down 0.6s ease-out',
                'slide-in-right': 'slide-in-right 0.3s ease-out',
                'slide-in-bottom': 'slide-in-bottom 0.3s ease-out',
                'scale-in': 'scale-in 0.4s ease-out',
                'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'skeleton': 'skeleton 1.5s ease-in-out infinite',
                'line-draw': 'line-draw 2s ease-out forwards',
                'reveal-text': 'reveal-text 1s ease-out forwards',
            },

            // Background Images & Gradients
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-industrial': 'linear-gradient(135deg, var(--tw-gradient-stops))',
                'gradient-premium': 'linear-gradient(180deg, #050505 0%, #0A0A0A 50%, #050505 100%)',
                'gradient-hero': 'linear-gradient(180deg, transparent 0%, #050505 100%)',
                'gradient-fade-up': 'linear-gradient(0deg, #050505 0%, transparent 100%)',
                'gradient-fade-down': 'linear-gradient(180deg, #050505 0%, transparent 100%)',
                'gradient-orange-glow': 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
                'skeleton-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                // Premium Mesh Gradients
                'mesh-dark': 'radial-gradient(at 0% 0%, #0F0F0F 0px, transparent 50%), radial-gradient(at 100% 0%, #141414 0px, transparent 50%), radial-gradient(at 100% 100%, #0A0A0A 0px, transparent 50%)',
            },

            // Z-Index Scale
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },

            // Aspect Ratios
            aspectRatio: {
                'video': '16 / 9',
                'cinema': '21 / 9',
                'square': '1 / 1',
                'portrait': '3 / 4',
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};
