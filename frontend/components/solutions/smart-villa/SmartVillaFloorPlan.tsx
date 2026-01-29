'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb, Thermometer, ShieldCheck, Home, BedDouble, CookingPot,
  Car, Trees, Baby, BookOpen, Bath, Sun, X, Plus, Minus, RotateCcw,
} from 'lucide-react';

type Lang = 'tr' | 'en';

interface Room {
  id: string;
  name: { tr: string; en: string };
  icon: React.ReactNode;
  x: number; y: number; w: number; h: number;
  temp: string; humidity: string; air: { tr: string; en: string };
}

const floors: Record<string, Room[]> = {
  ground: [
    { id: 'living', name: { tr: 'Salon', en: 'Living Room' }, icon: <Home size={18} />, x: 130, y: 80, w: 200, h: 140, temp: '22°C', humidity: '%45', air: { tr: 'İyi', en: 'Good' } },
    { id: 'kitchen', name: { tr: 'Mutfak', en: 'Kitchen' }, icon: <CookingPot size={18} />, x: 350, y: 80, w: 140, h: 140, temp: '24°C', humidity: '%40', air: { tr: 'İyi', en: 'Good' } },
    { id: 'hall', name: { tr: 'Giriş Holü', en: 'Entrance Hall' }, icon: <Home size={18} />, x: 190, y: 240, w: 180, h: 90, temp: '21°C', humidity: '%42', air: { tr: 'İyi', en: 'Good' } },
    { id: 'garage', name: { tr: 'Garaj', en: 'Garage' }, icon: <Car size={18} />, x: 20, y: 220, w: 150, h: 110, temp: '18°C', humidity: '%50', air: { tr: 'Normal', en: 'Normal' } },
    { id: 'garden', name: { tr: 'Bahçe Erişimi', en: 'Garden Access' }, icon: <Trees size={18} />, x: 80, y: 10, w: 360, h: 55, temp: '—', humidity: '—', air: { tr: '—', en: '—' } },
  ],
  first: [
    { id: 'master', name: { tr: 'Ana Yatak Odası', en: 'Master Bedroom' }, icon: <BedDouble size={18} />, x: 20, y: 60, w: 210, h: 150, temp: '22°C', humidity: '%48', air: { tr: 'İyi', en: 'Good' } },
    { id: 'kids', name: { tr: 'Çocuk Odası', en: "Kid's Room" }, icon: <Baby size={18} />, x: 290, y: 60, w: 170, h: 100, temp: '23°C', humidity: '%44', air: { tr: 'İyi', en: 'Good' } },
    { id: 'study', name: { tr: 'Çalışma Odası', en: 'Study' }, icon: <BookOpen size={18} />, x: 290, y: 175, w: 170, h: 100, temp: '21°C', humidity: '%43', air: { tr: 'İyi', en: 'Good' } },
    { id: 'bath', name: { tr: 'Banyo', en: 'Bathroom' }, icon: <Bath size={18} />, x: 140, y: 225, w: 130, h: 85, temp: '25°C', humidity: '%65', air: { tr: 'Normal', en: 'Normal' } },
    { id: 'balcony', name: { tr: 'Balkon', en: 'Balcony' }, icon: <Sun size={18} />, x: 80, y: 10, w: 340, h: 40, temp: '—', humidity: '—', air: { tr: '—', en: '—' } },
  ],
};

const t = {
  ground: { tr: 'Zemin Kat', en: 'Ground Floor' },
  first: { tr: '1. Kat', en: 'First Floor' },
  lighting: { tr: 'Aydınlatma', en: 'Lighting' },
  hvac: { tr: 'Klima Modu', en: 'HVAC Mode' },
  blinds: { tr: 'Panjur', en: 'Blinds' },
  smoke: { tr: 'Duman Sensörü', en: 'Smoke Sensor' },
  on: { tr: 'Açık', en: 'On' },
  off: { tr: 'Kapalı', en: 'Off' },
  auto: { tr: 'Oto', en: 'Auto' },
  cool: { tr: 'Soğutma', en: 'Cool' },
  heat: { tr: 'Isıtma', en: 'Heat' },
  normal: { tr: 'Normal', en: 'Normal' },
  temp: { tr: 'Sıcaklık', en: 'Temp' },
  hum: { tr: 'Nem', en: 'Humidity' },
  airQ: { tr: 'Hava Kalitesi', en: 'Air Quality' },
  toggleLight: { tr: 'Aydınlatma Aç/Kapat', en: 'Toggle Lighting' },
  hvacMode: { tr: 'Klima Modu', en: 'HVAC Mode' },
  blindsCtrl: { tr: 'Panjur', en: 'Blinds' },
  sensors: { tr: 'Sensörler & Cihazlar', en: 'Sensors & Devices' },
  actions: { tr: 'Hızlı İşlemler', en: 'Quick Actions' },
};

export default function SmartVillaFloorPlan({ lang }: { lang: Lang }) {
  const [floor, setFloor] = useState<'ground' | 'first'>('ground');
  const [selected, setSelected] = useState<Room | null>(null);
  const [zoom, setZoom] = useState(1);
  const [lightOn, setLightOn] = useState(true);
  const [hvacMode, setHvacMode] = useState<'auto' | 'cool' | 'heat'>('auto');
  const [blinds, setBlinds] = useState(70);

  const rooms = floors[floor];

  return (
    <div className="w-full">
      {/* Floor Toggle */}
      <div className="flex justify-center mb-6">
        <div className="relative inline-flex rounded-lg bg-black/40 border border-white/10 p-1">
          {(['ground', 'first'] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setFloor(f); setSelected(null); }}
              className="relative z-10 px-5 py-2 text-sm font-medium transition-colors duration-200"
              style={{ color: floor === f ? '#fff' : 'rgba(255,255,255,0.5)' }}
            >
              {t[f][lang]}
              {floor === f && (
                <motion.div
                  layoutId="floor-tab"
                  className="absolute inset-0 rounded-md bg-engineer-500"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Floor Plan */}
        <div className="flex-1 relative">
          {/* Zoom Controls (mobile-friendly) */}
          <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 lg:hidden">
            {[
              { icon: <Plus size={16} />, fn: () => setZoom((z) => Math.min(z + 0.2, 2)) },
              { icon: <Minus size={16} />, fn: () => setZoom((z) => Math.max(z - 0.2, 0.6)) },
              { icon: <RotateCcw size={16} />, fn: () => setZoom(1) },
            ].map((b, i) => (
              <button key={i} onClick={b.fn} className="w-8 h-8 flex items-center justify-center rounded-md bg-black/60 border border-white/10 text-white/70 hover:text-white transition-colors">
                {b.icon}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur">
            <AnimatePresence mode="wait">
              <motion.div
                key={floor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <svg
                  viewBox="0 0 510 350"
                  className="w-full h-auto"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s' }}
                >
                  {/* Outer wall */}
                  <rect x="10" y="5" width="490" height="335" rx="12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

                  {rooms.map((room) => {
                    const isSelected = selected?.id === room.id;
                    return (
                      <g
                        key={room.id}
                        onClick={() => setSelected(isSelected ? null : room)}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                      >
                        <rect
                          x={room.x} y={room.y} width={room.w} height={room.h}
                          rx="8"
                          fill={isSelected ? 'rgba(234,124,22,0.15)' : 'rgba(255,255,255,0.04)'}
                          stroke={isSelected ? '#ea7c16' : 'rgba(255,255,255,0.12)'}
                          strokeWidth={isSelected ? 2 : 1}
                          className="transition-all duration-200 hover:fill-[rgba(234,124,22,0.1)] hover:stroke-[#ea7c16]"
                          style={isSelected ? { filter: 'drop-shadow(0 0 8px rgba(234,124,22,0.4))' } : undefined}
                        />
                        <text
                          x={room.x + room.w / 2}
                          y={room.y + room.h / 2 - 6}
                          textAnchor="middle"
                          fill={isSelected ? '#ea7c16' : 'rgba(255,255,255,0.6)'}
                          fontSize="11"
                          fontWeight="500"
                          className="pointer-events-none select-none"
                        >
                          {room.name[lang]}
                        </text>
                        <text
                          x={room.x + room.w / 2}
                          y={room.y + room.h / 2 + 10}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.3)"
                          fontSize="9"
                          className="pointer-events-none select-none"
                        >
                          {room.temp !== '—' ? room.temp : ''}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile room list */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelected(selected?.id === room.id ? null : room)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                  selected?.id === room.id
                    ? 'border-engineer-500 bg-engineer-500/10 text-engineer-400'
                    : 'border-white/10 bg-black/20 text-white/60 hover:border-white/20'
                }`}
              >
                {room.icon}
                {room.name[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full lg:w-80 shrink-0 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-5 self-start"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-engineer-500/15 flex items-center justify-center text-engineer-400">
                    {selected.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm">{selected.name[lang]}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { label: t.temp[lang], value: selected.temp },
                  { label: t.hum[lang], value: selected.humidity },
                  { label: t.airQ[lang], value: selected.air[lang] },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg bg-white/5 p-2.5 text-center">
                    <div className="text-[10px] text-white/40 mb-0.5">{m.label}</div>
                    <div className="text-xs font-semibold text-white/80">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Devices */}
              <div className="mb-5">
                <div className="text-[10px] uppercase tracking-wider text-white/30 mb-3">{t.sensors[lang]}</div>
                <div className="space-y-2.5">
                  {/* Lighting */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Lightbulb size={14} className="text-yellow-400/70" />
                      {t.lighting[lang]}
                    </div>
                    <button
                      onClick={() => setLightOn(!lightOn)}
                      className={`w-9 h-5 rounded-full transition-colors relative ${lightOn ? 'bg-engineer-500' : 'bg-white/15'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${lightOn ? 'left-[18px]' : 'left-0.5'}`} />
                    </button>
                  </div>

                  {/* HVAC */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Thermometer size={14} className="text-blue-400/70" />
                      {t.hvac[lang]}
                    </div>
                    <div className="flex gap-1">
                      {(['auto', 'cool', 'heat'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setHvacMode(m)}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                            hvacMode === m ? 'bg-engineer-500 text-white' : 'bg-white/10 text-white/50'
                          }`}
                        >
                          {t[m][lang]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Blinds */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <Sun size={14} className="text-orange-400/70" />
                        {t.blinds[lang]}
                      </div>
                      <span className="text-[10px] text-white/40">{blinds}%</span>
                    </div>
                    <input
                      type="range" min={0} max={100} value={blinds}
                      onChange={(e) => setBlinds(Number(e.target.value))}
                      className="w-full h-1 rounded-full appearance-none bg-white/10 accent-engineer-500"
                    />
                  </div>

                  {/* Smoke */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <ShieldCheck size={14} className="text-green-400/70" />
                      {t.smoke[lang]}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">
                      {t.normal[lang]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/30 mb-3">{t.actions[lang]}</div>
                <div className="flex flex-wrap gap-2">
                  {[t.toggleLight[lang], t.hvacMode[lang], t.blindsCtrl[lang]].map((a) => (
                    <button
                      key={a}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 hover:bg-engineer-500/10 hover:border-engineer-500/30 hover:text-engineer-400 transition-all"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
