'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, ArrowRight, Shield, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * LoginModal - Premium Customer Portal Login
 *
 * Features:
 * - Sleek modal design with backdrop blur
 * - Demo login functionality
 * - Form validation and error states
 * - Redirect to dashboard on success
 */

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'demo@aico.com',
  password: 'demo123',
};

export default function LoginModal({ isOpen, onClose, lang }: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check demo credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      // Store demo session
      localStorage.setItem('aico-demo-session', JSON.stringify({
        user: 'Demo User',
        email: email,
        loginTime: new Date().toISOString(),
      }));
      // Redirect to dashboard
      router.push(`/${lang}/dashboard`);
      onClose();
    } else {
      setError(lang === 'tr'
        ? 'Gecersiz kimlik bilgileri. Demo: demo@aico.com / demo123'
        : 'Invalid credentials. Demo: demo@aico.com / demo123'
      );
    }

    setIsLoading(false);
  };

  const handleDemoFill = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-onyx-900/90 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101]
                       w-full max-w-md"
          >
            <div className="bg-onyx-800/95 backdrop-blur-xl border border-white/10 rounded-2xl
                          shadow-2xl shadow-black/50 overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 border-b border-white/5">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-offwhite-700 hover:text-offwhite-400
                           hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-engineer-500/10 border border-engineer-500/20
                                flex items-center justify-center">
                    <Shield size={20} className="text-engineer-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-offwhite-400">
                      {lang === 'tr' ? 'Musteri Portali' : 'Customer Portal'}
                    </h2>
                    <p className="text-xs text-offwhite-800">
                      {lang === 'tr' ? 'Guvenli giris' : 'Secure login'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-offwhite-700 uppercase tracking-wide">
                    {lang === 'tr' ? 'E-posta' : 'Email'}
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-offwhite-800" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'tr' ? 'ornek@firma.com' : 'example@company.com'}
                      className="w-full pl-10 pr-4 py-3 bg-onyx-900/50 border border-white/10 rounded-lg
                               text-offwhite-400 placeholder-offwhite-800 text-sm
                               focus:outline-none focus:border-engineer-500/50 focus:ring-1 focus:ring-engineer-500/20
                               transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-offwhite-700 uppercase tracking-wide">
                    {lang === 'tr' ? 'Sifre' : 'Password'}
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-offwhite-800" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className="w-full pl-10 pr-4 py-3 bg-onyx-900/50 border border-white/10 rounded-lg
                               text-offwhite-400 placeholder-offwhite-800 text-sm
                               focus:outline-none focus:border-engineer-500/50 focus:ring-1 focus:ring-engineer-500/20
                               transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                      <p className="text-xs text-red-400">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4
                           bg-engineer-500 hover:bg-engineer-600 disabled:bg-engineer-500/50
                           text-white font-medium rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <span>{lang === 'tr' ? 'Giris Yap' : 'Sign In'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* Demo Button */}
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10
                           text-offwhite-600 text-sm font-medium rounded-lg
                           border border-white/10 hover:border-white/20 transition-all"
                >
                  {lang === 'tr' ? 'Demo Hesabi Kullan' : 'Use Demo Account'}
                </button>
              </form>

              {/* Footer */}
              <div className="px-6 py-4 bg-onyx-900/50 border-t border-white/5">
                <p className="text-xs text-center text-offwhite-800">
                  {lang === 'tr'
                    ? 'Bu bir demo portaldir. Gercek musteri verileri icermez.'
                    : 'This is a demo portal. Does not contain real customer data.'}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
