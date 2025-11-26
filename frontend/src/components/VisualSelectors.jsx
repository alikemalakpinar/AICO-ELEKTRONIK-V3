import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

// PCB Color Selector with visual circles
export const ColorSelector = ({ value, onChange, label }) => {
  const colors = [
    { id: 'green', name: 'Yeşil', hex: '#15803d', textColor: 'white' },
    { id: 'red', name: 'Kırmızı', hex: '#dc2626', textColor: 'white' },
    { id: 'blue', name: 'Mavi', hex: '#2563eb', textColor: 'white' },
    { id: 'black', name: 'Siyah', hex: '#1f2937', textColor: 'white' },
    { id: 'white', name: 'Beyaz', hex: '#f3f4f6', textColor: 'black' },
    { id: 'yellow', name: 'Sarı', hex: '#eab308', textColor: 'black' }
  ];

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>}
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <motion.button
            key={color.id}
            type="button"
            onClick={() => onChange(color.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative w-12 h-12 rounded-full border-2 transition-all shadow-md
              ${value === color.id
                ? 'border-blue-500 ring-2 ring-blue-200 ring-offset-2'
                : 'border-gray-300 hover:border-gray-400'}
            `}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {value === color.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Check className="w-5 h-5" style={{ color: color.textColor }} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Seçili: <span className="font-medium">{colors.find(c => c.id === value)?.name || 'Yeşil'}</span>
      </p>
    </div>
  );
};

// Surface Finish Selector with visual cards
export const FinishSelector = ({ value, onChange, label }) => {
  const finishes = [
    {
      id: 'HASL',
      name: 'HASL',
      desc: 'Hot Air Solder Leveling',
      price: 'Ekonomik',
      gradient: 'from-gray-400 to-gray-500',
      tooltip: 'Kurşunsuz lehim ile en ekonomik seçenek'
    },
    {
      id: 'ENIG',
      name: 'ENIG',
      desc: 'Electroless Nickel Gold',
      price: 'Premium',
      gradient: 'from-yellow-400 to-yellow-600',
      tooltip: 'Altın kaplama, fine-pitch BGA için ideal'
    },
    {
      id: 'OSP',
      name: 'OSP',
      desc: 'Organic Solderability',
      price: 'Orta',
      gradient: 'from-amber-300 to-amber-500',
      tooltip: 'Organik koruma, kısa ömürlü projeler için'
    }
  ];

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>}
      <div className="grid grid-cols-3 gap-3">
        {finishes.map((finish) => (
          <motion.button
            key={finish.id}
            type="button"
            onClick={() => onChange(finish.id)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-4 rounded-xl border-2 text-left transition-all
              ${value === finish.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}
            `}
          >
            {/* Finish Preview Bar */}
            <div className={`w-full h-2 rounded-full bg-gradient-to-r ${finish.gradient} mb-3`} />

            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-gray-900">{finish.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{finish.desc}</p>
              </div>
              {value === finish.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                finish.price === 'Ekonomik' ? 'bg-green-100 text-green-700' :
                finish.price === 'Premium' ? 'bg-amber-100 text-amber-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {finish.price}
              </span>
              <div className="group relative">
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  {finish.tooltip}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Quantity Selector with visual buttons
export const QuantitySelector = ({ value, onChange, label }) => {
  const quantities = [5, 10, 20, 50, 100, 250, 500, 1000];

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {quantities.map((qty) => (
          <motion.button
            key={qty}
            type="button"
            onClick={() => onChange(qty)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${value === qty
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {qty}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Layer Selector with visual representation
export const LayerSelector = ({ value, onChange, label }) => {
  const layers = [
    { id: 2, name: '2L', desc: 'İki Katman' },
    { id: 4, name: '4L', desc: 'Dört Katman' },
    { id: 6, name: '6L', desc: 'Altı Katman' },
    { id: 8, name: '8L', desc: 'Sekiz Katman' },
    { id: 10, name: '10L', desc: 'On Katman' }
  ];

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>}
      <div className="flex gap-2">
        {layers.map((layer) => (
          <motion.button
            key={layer.id}
            type="button"
            onClick={() => onChange(layer.id)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex-1 p-3 rounded-xl border-2 text-center transition-all
              ${value === layer.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'}
            `}
          >
            {/* Layer visualization */}
            <div className="flex flex-col items-center gap-0.5 mb-2">
              {[...Array(Math.min(layer.id, 4))].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1 rounded-full ${
                    value === layer.id ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
              {layer.id > 4 && (
                <span className="text-xs text-gray-400">+{layer.id - 4}</span>
              )}
            </div>
            <p className={`font-bold ${value === layer.id ? 'text-blue-600' : 'text-gray-700'}`}>
              {layer.name}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Lead Time Selector with visual cards
export const LeadTimeSelector = ({ value, onChange, label, content }) => {
  const options = [
    {
      id: 'economy',
      days: '12-15',
      label: content?.economy || 'Ekonomik',
      icon: '🚢',
      discount: '-15%'
    },
    {
      id: 'standard',
      days: '7-10',
      label: content?.standard || 'Standart',
      icon: '🚚',
      discount: null
    },
    {
      id: 'fast',
      days: '3-5',
      label: content?.fast || 'Hızlı',
      icon: '✈️',
      discount: '+25%'
    }
  ];

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>}
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative p-4 rounded-xl border-2 text-center transition-all
              ${value === option.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}
            `}
          >
            {option.discount && (
              <span className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full ${
                option.discount.startsWith('-') ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {option.discount}
              </span>
            )}

            <div className="text-2xl mb-2">{option.icon}</div>
            <p className="font-bold text-gray-900">{option.days} gün</p>
            <p className="text-xs text-gray-500">{option.label}</p>

            {value === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bottom-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Price Skeleton Loader
export const PriceSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex justify-between">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
    <div className="flex justify-between">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
    <div className="flex justify-between">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-4 bg-gray-200 rounded w-14"></div>
    </div>
    <div className="border-t pt-4 mt-4">
      <div className="flex justify-between">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-6 bg-blue-200 rounded w-28"></div>
      </div>
    </div>
  </div>
);

// Sticky Price Bar Skeleton
export const StickyPriceSkeleton = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-4 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-8">
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-blue-200 rounded w-28"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);
