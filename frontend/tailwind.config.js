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
            // AICO Elektronik Design System - Clean Industrial
            // ===========================================

            // Brand Colors
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

                // Brand Colors - Industrial Design System
                brand: {
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#F97316', // Primary Orange
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12',
                    950: '#431407',
                },

                // Navy Blue Scale (Primary)
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
                    900: '#0F172A', // Primary Navy
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

                // Success/Warning/Error
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

            // Typography - Clean Industrial
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
                heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
                display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
            },

            // Font Sizes - Technical Precision
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                // Data Display Sizes
                'data-sm': ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
                'data-md': ['0.9375rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
                'data-lg': ['1.0625rem', { lineHeight: '1.75rem', letterSpacing: '0.01em' }],
                // Price Display
                'price-sm': ['1.25rem', { lineHeight: '1.5rem', fontWeight: '600' }],
                'price-md': ['1.5rem', { lineHeight: '1.75rem', fontWeight: '700' }],
                'price-lg': ['2rem', { lineHeight: '2.25rem', fontWeight: '700' }],
                'price-xl': ['2.5rem', { lineHeight: '2.75rem', fontWeight: '800' }],
            },

            // Border Radius - Clean Industrial (smaller)
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',    // 2px
                DEFAULT: '0.25rem', // 4px - Industrial standard
                'md': '0.375rem',    // 6px
                'lg': '0.5rem',      // 8px
                'xl': '0.75rem',     // 12px
                '2xl': '1rem',       // 16px
                'full': '9999px',
            },

            // Spacing - Technical Grid
            spacing: {
                '4.5': '1.125rem',
                '13': '3.25rem',
                '15': '3.75rem',
                '18': '4.5rem',
                '22': '5.5rem',
                '26': '6.5rem',
                '30': '7.5rem',
            },

            // Box Shadow - Subtle Industrial
            boxShadow: {
                'industrial-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'industrial': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'industrial-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'industrial-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'card': '0 1px 3px 0 rgb(0 0 0 / 0.08)',
                'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.12)',
                'input-focus': '0 0 0 2px hsl(var(--ring) / 0.2)',
                'button-hover': '0 2px 4px 0 rgb(0 0 0 / 0.1)',
            },

            // Transitions - Smooth Professional
            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
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
                'slide-in-right': {
                    from: { transform: 'translateX(100%)' },
                    to: { transform: 'translateX(0)' }
                },
                'slide-in-bottom': {
                    from: { transform: 'translateY(10px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' }
                },
                'pulse-subtle': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' }
                },
                'skeleton': {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' }
                }
            },

            // Animations
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.2s ease-out',
                'fade-out': 'fade-out 0.2s ease-out',
                'slide-in-right': 'slide-in-right 0.3s ease-out',
                'slide-in-bottom': 'slide-in-bottom 0.3s ease-out',
                'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
                'skeleton': 'skeleton 1.5s ease-in-out infinite',
            },

            // Background Images
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-industrial': 'linear-gradient(135deg, var(--tw-gradient-stops))',
                'skeleton-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};
