import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  FileCheck,
  Cpu,
  Factory,
  Flame,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  Camera,
  RefreshCw,
  Bell,
  MapPin,
  Zap,
} from 'lucide-react';
import GlassCard from './GlassCard';
import { Button } from './ui/button';

// Production Stage Data
const PRODUCTION_STAGES = [
  {
    id: 'order_received',
    icon: Package,
    title: 'Sipariş Alındı',
    titleEn: 'Order Received',
    description: 'Siparişiniz sisteme kaydedildi',
    descriptionEn: 'Your order has been registered',
    duration: '< 1 saat',
    color: 'blue',
  },
  {
    id: 'dfm_check',
    icon: FileCheck,
    title: 'DFM Kontrolü',
    titleEn: 'DFM Check',
    description: 'Tasarım analizi yapılıyor',
    descriptionEn: 'Design analysis in progress',
    duration: '30 dk',
    color: 'cyan',
  },
  {
    id: 'pcb_manufacturing',
    icon: Factory,
    title: 'PCB Üretimi',
    titleEn: 'PCB Manufacturing',
    description: 'Çok katmanlı PCB üretiliyor',
    descriptionEn: 'Multi-layer PCB manufacturing',
    duration: '24-72 saat',
    color: 'green',
  },
  {
    id: 'smt_placement',
    icon: Cpu,
    title: 'SMT Yerleştirme',
    titleEn: 'SMT Placement',
    description: 'Bileşenler kartlara yerleştiriliyor',
    descriptionEn: 'Components being placed on boards',
    duration: '2-4 saat',
    color: 'purple',
  },
  {
    id: 'reflow_soldering',
    icon: Flame,
    title: 'Reflow Lehimleme',
    titleEn: 'Reflow Soldering',
    description: 'Fırında lehimleme işlemi',
    descriptionEn: 'Oven soldering process',
    duration: '30 dk',
    color: 'orange',
  },
  {
    id: 'aoi_inspection',
    icon: Eye,
    title: 'AOI Testi',
    titleEn: 'AOI Inspection',
    description: 'Otomatik optik inceleme',
    descriptionEn: 'Automated optical inspection',
    duration: '15 dk',
    color: 'cyan',
  },
  {
    id: 'quality_control',
    icon: CheckCircle,
    title: 'Kalite Kontrol',
    titleEn: 'Quality Control',
    description: 'Son kontroller yapılıyor',
    descriptionEn: 'Final inspections',
    duration: '1 saat',
    color: 'green',
  },
  {
    id: 'shipping',
    icon: Truck,
    title: 'Kargoya Verildi',
    titleEn: 'Shipped',
    description: 'Paketlenip kargoya teslim edildi',
    descriptionEn: 'Packaged and shipped',
    duration: '1-3 gün',
    color: 'blue',
  },
];

// Stage Progress Indicator
const StageIndicator = ({ stage, index, currentStage, isComplete, lang }) => {
  const isActive = index === currentStage;
  const isPast = index < currentStage;
  const Icon = stage.icon;

  const colorClasses = {
    blue: { active: 'bg-blue-500', glow: 'shadow-blue-500/50' },
    cyan: { active: 'bg-cyan-500', glow: 'shadow-cyan-500/50' },
    green: { active: 'bg-green-500', glow: 'shadow-green-500/50' },
    purple: { active: 'bg-purple-500', glow: 'shadow-purple-500/50' },
    orange: { active: 'bg-orange-500', glow: 'shadow-orange-500/50' },
  };

  const colors = colorClasses[stage.color] || colorClasses.blue;

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Connector Line */}
      {index > 0 && (
        <div className="absolute top-6 -left-1/2 w-full h-0.5">
          <motion.div
            className={`h-full ${isPast ? 'bg-green-500' : 'bg-gray-700'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isPast ? 1 : 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        </div>
      )}

      {/* Icon Circle */}
      <motion.div
        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isPast
            ? 'bg-green-500'
            : isActive
            ? `${colors.active} ${colors.glow} shadow-lg`
            : 'bg-gray-800 border border-gray-700'
        }`}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {isPast ? (
          <CheckCircle className="w-6 h-6 text-white" />
        ) : (
          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500'}`} />
        )}

        {/* Active Pulse */}
        {isActive && (
          <motion.div
            className={`absolute inset-0 rounded-full ${colors.active} opacity-50`}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Label */}
      <div className="mt-3 text-center">
        <p className={`text-sm font-medium ${isActive ? 'text-white' : isPast ? 'text-green-400' : 'text-gray-500'}`}>
          {lang === 'tr' ? stage.title : stage.titleEn}
        </p>
        <p className="text-xs text-gray-600 mt-0.5">{stage.duration}</p>
      </div>
    </motion.div>
  );
};

// Live Photo Feed Component
const LivePhotoFeed = ({ photos, lang }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">
          {lang === 'tr' ? 'Henüz fotoğraf yok' : 'No photos yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {photos.slice(0, 6).map((photo, idx) => (
          <motion.div
            key={idx}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.url || '/api/placeholder/150/150'}
              alt={photo.caption || `Production photo ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            {photo.isNew && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-3xl mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="rounded-lg max-h-[80vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
                <p className="text-white text-sm">{selectedPhoto.caption}</p>
                <p className="text-gray-400 text-xs mt-1">{selectedPhoto.timestamp}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Live Production Tracker Component
const LiveProductionTracker = ({ orderId, lang = 'tr' }) => {
  const [currentStage, setCurrentStage] = useState(3); // Demo: SMT Placement
  const [orderData, setOrderData] = useState({
    orderNumber: orderId || 'PCB-2024-001234',
    customerName: 'Demo Müşteri',
    estimatedCompletion: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    currentMachine: 'Pick & Place #2',
    operator: 'Mehmet Y.',
    completionPercent: 45,
    photos: [
      { url: '/api/placeholder/150/150', caption: 'PCB kartları hazır', timestamp: '10:30', isNew: true },
      { url: '/api/placeholder/150/150', caption: 'Lehim pastası uygulandı', timestamp: '10:15' },
      { url: '/api/placeholder/150/150', caption: 'Stencil hazırlığı', timestamp: '09:45' },
    ],
    updates: [
      { time: '10:30', message: 'SMT yerleştirme başladı', type: 'info' },
      { time: '10:15', message: 'DFM kontrolü tamamlandı - Skor: 96.5', type: 'success' },
      { time: '09:00', message: 'PCB üretimi tamamlandı', type: 'success' },
    ],
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderData((prev) => ({
        ...prev,
        completionPercent: Math.min(100, prev.completionPercent + Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const timeUntilCompletion = () => {
    const now = new Date();
    const completion = new Date(orderData.estimatedCompletion);
    const diff = completion - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return lang === 'tr' ? `${days} gün ${hours % 24} saat` : `${days}d ${hours % 24}h`;
    }
    return lang === 'tr' ? `${hours} saat` : `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {lang === 'tr' ? 'Canlı Üretim Takibi' : 'Live Production Tracking'}
            </h1>
            <p className="text-gray-400">
              {lang === 'tr' ? 'Sipariş No: ' : 'Order #: '}
              <span className="text-blue-400 font-mono">{orderData.orderNumber}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {lang === 'tr' ? 'Yenile' : 'Refresh'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Bell className="w-4 h-4 mr-2" />
              {lang === 'tr' ? 'Bildirimler' : 'Notifications'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tracker */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Timeline */}
            <GlassCard gradient="blue" glow className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                {lang === 'tr' ? 'Üretim Aşamaları' : 'Production Stages'}
              </h2>

              {/* Desktop Timeline */}
              <div className="hidden md:grid grid-cols-8 gap-2 mb-6">
                {PRODUCTION_STAGES.map((stage, idx) => (
                  <StageIndicator
                    key={stage.id}
                    stage={stage}
                    index={idx}
                    currentStage={currentStage}
                    lang={lang}
                  />
                ))}
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden space-y-4">
                {PRODUCTION_STAGES.map((stage, idx) => {
                  const isActive = idx === currentStage;
                  const isPast = idx < currentStage;
                  const Icon = stage.icon;

                  return (
                    <motion.div
                      key={stage.id}
                      className={`flex items-center gap-4 p-3 rounded-xl ${
                        isActive ? 'bg-blue-500/20 border border-blue-500/30' : ''
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isPast ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-800'
                        }`}
                      >
                        {isPast ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isActive ? 'text-white' : isPast ? 'text-green-400' : 'text-gray-500'}`}>
                          {lang === 'tr' ? stage.title : stage.titleEn}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lang === 'tr' ? stage.description : stage.descriptionEn}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Current Stage Details */}
              <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium">
                      {lang === 'tr' ? 'Şu Anda' : 'Currently'}
                    </p>
                    <p className="text-white text-lg font-semibold">
                      {lang === 'tr'
                        ? PRODUCTION_STAGES[currentStage].title
                        : PRODUCTION_STAGES[currentStage].titleEn}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">
                      {lang === 'tr' ? 'Makine' : 'Machine'}
                    </p>
                    <p className="text-white font-mono">{orderData.currentMachine}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">
                      {lang === 'tr' ? 'İlerleme' : 'Progress'}
                    </span>
                    <span className="text-blue-400">{Math.round(orderData.completionPercent)}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${orderData.completionPercent}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Activity Log */}
            <GlassCard gradient="green" className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {lang === 'tr' ? 'Son Güncellemeler' : 'Recent Updates'}
              </h2>

              <div className="space-y-3">
                {orderData.updates.map((update, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        update.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                    />
                    <div>
                      <p className="text-white text-sm">{update.message}</p>
                      <p className="text-gray-500 text-xs">{update.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <GlassCard gradient="purple" className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {lang === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {lang === 'tr' ? 'Tahmini Tamamlanma' : 'Est. Completion'}
                  </span>
                  <span className="text-white font-medium">{timeUntilCompletion()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {lang === 'tr' ? 'Operatör' : 'Operator'}
                  </span>
                  <span className="text-white">{orderData.operator}</span>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-green-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {lang === 'tr' ? 'Programa Uygun' : 'On Schedule'}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Live Photos */}
            <GlassCard gradient="cyan" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {lang === 'tr' ? 'Üretim Fotoğrafları' : 'Production Photos'}
                </h2>
                <Camera className="w-5 h-5 text-gray-400" />
              </div>

              <LivePhotoFeed photos={orderData.photos} lang={lang} />
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard gradient="orange" className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {lang === 'tr' ? 'Hızlı İşlemler' : 'Quick Actions'}
              </h2>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {lang === 'tr' ? 'Kargo Takibi' : 'Track Shipment'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <FileCheck className="w-4 h-4 mr-2" />
                  {lang === 'tr' ? 'DFM Raporu' : 'DFM Report'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {lang === 'tr' ? 'Süre Uzat' : 'Extend Deadline'}
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveProductionTracker;
