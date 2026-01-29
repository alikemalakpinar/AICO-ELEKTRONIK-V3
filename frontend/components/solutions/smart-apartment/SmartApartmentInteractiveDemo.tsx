'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Shield, Zap, Flame, Wind, Monitor, Thermometer, Droplets, Cpu, BatteryCharging } from 'lucide-react'

type Lang = 'tr' | 'en'

const scenes = [
  { icon: Shield, badge: { tr: 'Giriş & Güvenlik', en: 'Entry & Security' }, title: { tr: 'Akıllı Erişim Kontrolü', en: 'Smart Access Control' }, desc: { tr: 'Yüz tanıma, parmak izi, kart, mobil ve şifre ile giriş. Tüm hareketler kayıt altında.', en: 'Face recognition, fingerprint, card, mobile and PIN entry. All movements logged.' }, stats: [{ tr: '5+ erişim yöntemi', en: '5+ access methods' }, { tr: '%100 giriş kaydı', en: '100% entry log' }] },
  { icon: Zap, badge: { tr: 'Enerji & Tasarruf', en: 'Energy & Savings' }, title: { tr: 'Gerçek Zamanlı Enerji Yönetimi', en: 'Real-Time Energy Management' }, desc: { tr: 'Tüketimi anlık izleyin, otomatik senaryolarla tasarruf edin.', en: 'Monitor consumption in real time, save with automated scenarios.' }, stats: [{ tr: '%40 tasarruf', en: '40% savings' }, { tr: 'Gerçek zamanlı izleme', en: 'Real-time monitoring' }] },
  { icon: Flame, badge: { tr: 'Yangın Algılama', en: 'Fire Detection' }, title: { tr: 'Erken Uyarı Sistemi', en: 'Early Warning System' }, desc: { tr: 'Duman, ısı ve gaz sensörleriyle anında müdahale.', en: 'Instant response with smoke, heat and gas sensors.' }, stats: [{ tr: '<3sn algılama', en: '<3s detection' }, { tr: '7/24 izleme', en: '24/7 monitoring' }] },
  { icon: Wind, badge: { tr: 'Hava Kalitesi', en: 'Air Quality' }, title: { tr: 'İç Ortam Hava Analizi', en: 'Indoor Air Analysis' }, desc: { tr: 'CO₂, PM2.5 ve TVOC seviyelerini sürekli ölçün.', en: 'Continuously measure CO₂, PM2.5 and TVOC levels.' }, stats: [{ tr: 'CO₂, PM2.5, TVOC ölçüm', en: 'CO₂, PM2.5, TVOC measurement' }, { tr: 'Otomatik havalandırma', en: 'Auto ventilation' }] },
  { icon: Monitor, badge: { tr: 'Kontrol Merkezi', en: 'Control Center' }, title: { tr: 'Tek Ekran Yönetim', en: 'Single-Screen Management' }, desc: { tr: 'Tüm sistemleri tek panelden veya mobil uygulamadan yönetin.', en: 'Manage all systems from one panel or mobile app.' }, stats: [{ tr: 'Tek ekran yönetim', en: 'Single screen management' }, { tr: 'Mobil uygulama', en: 'Mobile app' }] },
]

const hotspots = [
  { id: 'living', label: { tr: 'Salon', en: 'Living Room' }, x: 50, y: 55, metrics: { temp: 23, humidity: 45, devices: 6, energy: 1.2 } },
  { id: 'kitchen', label: { tr: 'Mutfak', en: 'Kitchen' }, x: 80, y: 55, metrics: { temp: 25, humidity: 55, devices: 4, energy: 2.1 } },
  { id: 'hallway', label: { tr: 'Koridor', en: 'Hallway' }, x: 50, y: 85, metrics: { temp: 22, humidity: 40, devices: 2, energy: 0.3 } },
  { id: 'bedroom', label: { tr: 'Yatak Odası', en: 'Bedroom' }, x: 25, y: 25, metrics: { temp: 21, humidity: 50, devices: 3, energy: 0.8 } },
  { id: 'bathroom', label: { tr: 'Banyo', en: 'Bathroom' }, x: 78, y: 25, metrics: { temp: 24, humidity: 65, devices: 2, energy: 0.5 } },
]

function Scene({ scene, index, lang }: { scene: typeof scenes[0]; index: number; lang: Lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.6 })
  const Icon = scene.icon

  return (
    <div ref={ref} className="min-h-[60vh] flex items-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-8 items-center w-full"
      >
        <div className="space-y-4">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316]">
            {String(index + 1).padStart(2, '0')} — {scene.badge[lang]}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">{scene.title[lang]}</h3>
          <p className="text-muted-foreground leading-relaxed">{scene.desc[lang]}</p>
          <div className="flex gap-3 flex-wrap">
            {scene.stats.map((s, i) => (
              <span key={i} className="text-sm font-medium px-3 py-1.5 rounded-lg border border-border bg-background text-foreground">
                {s[lang]}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <motion.div
            animate={inView ? { scale: [0.9, 1], rotate: [0, 3, 0] } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center shadow-lg"
          >
            <Icon className="w-14 h-14 md:w-20 md:h-20 text-[#F97316]" strokeWidth={1.5} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function PulsingDot({ x, y, active, onClick, label }: { x: number; y: number; active: boolean; onClick: () => void; label: string }) {
  return (
    <g onClick={onClick} className="cursor-pointer" role="button" aria-label={label}>
      <motion.circle cx={x} cy={y} r={active ? 10 : 7} fill="#F97316" fillOpacity={0.25}
        animate={{ r: active ? [10, 14, 10] : [7, 10, 7] }} transition={{ duration: 2, repeat: Infinity }} />
      <circle cx={x} cy={y} r={4} fill="#F97316" className="hover:drop-shadow-[0_0_6px_#F97316]" />
      <text x={x} y={y - 14} textAnchor="middle" className="fill-foreground text-[3.5px] font-medium select-none pointer-events-none">{label}</text>
    </g>
  )
}

function DetailPanel({ spot, lang, onClose }: { spot: typeof hotspots[0]; lang: Lang; onClose: () => void }) {
  const metrics = [
    { icon: Thermometer, label: { tr: 'Sıcaklık', en: 'Temperature' }, value: `${spot.metrics.temp}°C` },
    { icon: Droplets, label: { tr: 'Nem', en: 'Humidity' }, value: `${spot.metrics.humidity}%` },
    { icon: Cpu, label: { tr: 'Aktif Cihaz', en: 'Active Devices' }, value: spot.metrics.devices },
    { icon: BatteryCharging, label: { tr: 'Enerji', en: 'Energy' }, value: `${spot.metrics.energy} kW` },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="bg-card border border-border rounded-xl p-5 shadow-lg space-y-4"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">{spot.label[lang]}</h4>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-sm">✕</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="bg-background rounded-lg p-3 border border-border space-y-1">
            <m.icon className="w-4 h-4 text-[#F97316]" />
            <p className="text-xs text-muted-foreground">{m.label[lang]}</p>
            <p className="text-sm font-semibold text-foreground">{m.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function SmartApartmentInteractiveDemo({ lang }: { lang: Lang }) {
  const [activeSpot, setActiveSpot] = useState<string | null>(null)
  const selected = hotspots.find(h => h.id === activeSpot)

  return (
    <section className="space-y-24">
      {/* Part 1: Scroll Storytelling */}
      <div className="space-y-0">
        {scenes.map((s, i) => <Scene key={i} scene={s} index={i} lang={lang} />)}
      </div>

      {/* Part 2: Interactive Apartment Map */}
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center">
          {lang === 'tr' ? 'İnteraktif Daire Haritası' : 'Interactive Apartment Map'}
        </h3>

        {/* Desktop: SVG Map + Detail */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 items-start">
          <div className="col-span-3 bg-card border border-border rounded-xl p-4 shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full aspect-[4/3]">
              {/* Floor plan wireframe */}
              <rect x={2} y={2} width={96} height={96} rx={3} className="fill-background stroke-border" strokeWidth={0.5} />
              {/* Rooms */}
              <rect x={5} y={5} width={40} height={40} rx={2} className="fill-background stroke-border" strokeWidth={0.3} />
              <rect x={55} y={5} width={40} height={40} rx={2} className="fill-background stroke-border" strokeWidth={0.3} />
              <rect x={5} y={48} width={55} height={25} rx={2} className="fill-background stroke-border" strokeWidth={0.3} />
              <rect x={65} y={48} width={30} height={25} rx={2} className="fill-background stroke-border" strokeWidth={0.3} />
              <rect x={20} y={76} width={60} height={20} rx={2} className="fill-background stroke-border" strokeWidth={0.3} />
              {hotspots.map(h => (
                <PulsingDot key={h.id} x={h.x} y={h.y} active={activeSpot === h.id} onClick={() => setActiveSpot(activeSpot === h.id ? null : h.id)} label={h.label[lang]} />
              ))}
            </svg>
          </div>
          <div className="col-span-2">
            <AnimatePresence mode="wait">
              {selected && <DetailPanel key={selected.id} spot={selected} lang={lang} onClose={() => setActiveSpot(null)} />}
            </AnimatePresence>
            {!selected && (
              <p className="text-muted-foreground text-sm text-center pt-8">
                {lang === 'tr' ? 'Bir oda seçin' : 'Select a room'}
              </p>
            )}
          </div>
        </div>

        {/* Mobile: Vertical list */}
        <div className="md:hidden space-y-3">
          {hotspots.map(h => (
            <div key={h.id}>
              <button
                onClick={() => setActiveSpot(activeSpot === h.id ? null : h.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${activeSpot === h.id ? 'border-[#F97316] bg-[#F97316]/5' : 'border-border bg-card'}`}
              >
                <span className="w-3 h-3 rounded-full bg-[#F97316] shrink-0" />
                <span className="font-medium text-foreground">{h.label[lang]}</span>
              </button>
              <AnimatePresence>
                {activeSpot === h.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="pt-2">
                      <DetailPanel spot={h} lang={lang} onClose={() => setActiveSpot(null)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
