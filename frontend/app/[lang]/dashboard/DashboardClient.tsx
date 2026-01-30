'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Settings, Bell, User, LayoutDashboard } from 'lucide-react';
import VillaStatus from '@/components/dashboard/VillaStatus';
import EnergyChart from '@/components/dashboard/EnergyChart';
import SystemMetrics from '@/components/dashboard/SystemMetrics';

/**
 * DashboardClient - Engineering Control Dashboard
 *
 * Full-featured dashboard showing:
 * - Villa status and controls
 * - Real-time energy consumption
 * - System health metrics
 *
 * Technical, dark mode, professional design
 */

interface DashboardClientProps {
  lang: string;
}

interface UserSession {
  user: string;
  email: string;
  loginTime: string;
}

export default function DashboardClient({ lang }: DashboardClientProps) {
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for valid session
  useEffect(() => {
    const storedSession = localStorage.getItem('aico-demo-session');
    if (storedSession) {
      try {
        setSession(JSON.parse(storedSession));
      } catch {
        router.push(`/${lang}`);
      }
    } else {
      router.push(`/${lang}`);
    }
    setIsLoading(false);
  }, [lang, router]);

  const handleLogout = () => {
    localStorage.removeItem('aico-demo-session');
    router.push(`/${lang}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-onyx-900 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-engineer-500/30 border-t-engineer-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-onyx-900">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-40 bg-onyx-900/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={20} className="text-engineer-500" />
                <span className="font-semibold text-offwhite-400">
                  {lang === 'tr' ? 'Kontrol Paneli' : 'Dashboard'}
                </span>
              </div>
              <div className="hidden md:block h-6 w-px bg-white/10" />
              <span className="hidden md:block text-xs text-offwhite-800">
                {lang === 'tr' ? 'AICO Muhendislik Sistemleri' : 'AICO Engineering Systems'}
              </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 text-offwhite-700 hover:text-offwhite-400
                               hover:bg-white/5 rounded-lg transition-colors">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-engineer-500 rounded-full" />
              </button>

              {/* Settings */}
              <button className="p-2 text-offwhite-700 hover:text-offwhite-400
                               hover:bg-white/5 rounded-lg transition-colors">
                <Settings size={18} />
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="text-right hidden sm:block">
                  <div className="text-sm text-offwhite-400">{session.user}</div>
                  <div className="text-xs text-offwhite-800">{session.email}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-engineer-500/10 border border-engineer-500/20
                              flex items-center justify-center">
                  <User size={18} className="text-engineer-500" />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-offwhite-700 hover:text-red-400
                           hover:bg-red-500/10 rounded-lg transition-colors"
                  title={lang === 'tr' ? 'Cikis Yap' : 'Logout'}
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-gradient-to-r from-engineer-500/10 via-engineer-500/5 to-transparent
                   border border-engineer-500/20 rounded-2xl"
        >
          <h1 className="text-2xl font-bold text-offwhite-400 mb-2">
            {lang === 'tr' ? `Hosgeldiniz, ${session.user}` : `Welcome, ${session.user}`}
          </h1>
          <p className="text-offwhite-700">
            {lang === 'tr'
              ? 'Villa AICO-01 sisteminiz optimal performansla calisiyor.'
              : 'Your Villa AICO-01 system is running at optimal performance.'}
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Villa Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4"
          >
            <VillaStatus lang={lang} />
          </motion.div>

          {/* Center Column - Energy Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <EnergyChart lang={lang} />
          </motion.div>

          {/* Right Column - System Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <SystemMetrics lang={lang} />
          </motion.div>
        </div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-offwhite-800">
            {lang === 'tr'
              ? 'Bu demo paneldir. Veriler simule edilmektedir.'
              : 'This is a demo dashboard. Data is simulated.'}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
