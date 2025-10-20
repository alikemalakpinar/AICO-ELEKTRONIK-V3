import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts, productCategories } from '../mock';
import { getLocalizedValue } from '../utils/i18n';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const ProductListPage = ({ lang }) => {
  const { categoryId } = useParams();
  const [filters, setFilters] = useState({
    voltage: [],
    power: [],
    ip: [],
    certifications: []
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get category info
  const category = productCategories.find(c => c.id === categoryId) || productCategories[0];
  
  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      if (categoryId && product.category !== categoryId) return false;
      if (filters.voltage.length && !filters.voltage.includes(product.voltage)) return false;
      if (filters.power.length) {
        const powerRange = filters.power.find(range => {
          const [min, max] = range.split('-').map(Number);
          return product.power >= min && product.power <= (max || Infinity);
        });
        if (!powerRange) return false;
      }
      if (filters.ip.length && !filters.ip.includes(product.ip)) return false;
      if (filters.certifications.length) {
        const hasMatch = filters.certifications.some(cert => product.certifications.includes(cert));
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [categoryId, filters]);

  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setFilters({ voltage: [], power: [], ip: [], certifications: [] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0E1A2B] mb-2">
            {getLocalizedValue(category, 'title', lang)}
          </h1>
          <p className="text-[#374151]">{getLocalizedValue(category, 'desc', lang)}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#0E1A2B]">{lang === 'tr' ? 'Filtreler' : 'Filters'}</h3>
                <button onClick={clearFilters} className="text-sm text-[#1554F6] hover:underline">
                  {lang === 'tr' ? 'Temizle' : 'Clear'}
                </button>
              </div>

              {/* Voltage Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-sm text-[#0E1A2B] mb-3">{lang === 'tr' ? 'Gerilim (V)' : 'Voltage (V)'}</h4>
                {[12, 24, 48].map(voltage => (
                  <div key={voltage} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`voltage-${voltage}`}
                      checked={filters.voltage.includes(voltage)}
                      onCheckedChange={() => toggleFilter('voltage', voltage)}
                    />
                    <Label htmlFor={`voltage-${voltage}`} className="text-sm cursor-pointer">{voltage}V</Label>
                  </div>
                ))}
              </div>

              {/* Power Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-sm text-[#0E1A2B] mb-3">{lang === 'tr' ? 'Güç (W)' : 'Power (W)'}</h4>
                {['0-100', '100-250', '250-500'].map(range => (
                  <div key={range} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`power-${range}`}
                      checked={filters.power.includes(range)}
                      onCheckedChange={() => toggleFilter('power', range)}
                    />
                    <Label htmlFor={`power-${range}`} className="text-sm cursor-pointer">{range}W</Label>
                  </div>
                ))}
              </div>

              {/* IP Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-sm text-[#0E1A2B] mb-3">{lang === 'tr' ? 'Koruma Sınıfı' : 'IP Rating'}</h4>
                {['IP65', 'IP67'].map(ip => (
                  <div key={ip} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`ip-${ip}`}
                      checked={filters.ip.includes(ip)}
                      onCheckedChange={() => toggleFilter('ip', ip)}
                    />
                    <Label htmlFor={`ip-${ip}`} className="text-sm cursor-pointer">{ip}</Label>
                  </div>
                ))}
              </div>

              {/* Certifications Filter */}
              <div>
                <h4 className="font-medium text-sm text-[#0E1A2B] mb-3">{lang === 'tr' ? 'Sertifikalar' : 'Certifications'}</h4>
                {['CE', 'RoHS', 'UL'].map(cert => (
                  <div key={cert} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`cert-${cert}`}
                      checked={filters.certifications.includes(cert)}
                      onCheckedChange={() => toggleFilter('certifications', cert)}
                    />
                    <Label htmlFor={`cert-${cert}`} className="text-sm cursor-pointer">{cert}</Label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full"
              >
                <SlidersHorizontal size={18} className="mr-2" />
                {lang === 'tr' ? 'Filtreler' : 'Filters'}
              </Button>
            </div>

            {/* Results Header */}
            <div className="mb-6">
              <p className="text-[#374151]">
                {filteredProducts.length} {lang === 'tr' ? 'ürün bulundu' : 'products found'}
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/${lang}/products/${product.category}/${product.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#1554F6] hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={lang === 'tr' ? product.nameTr : product.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-[#1554F6] font-medium mb-1">{product.code}</div>
                    <h3 className="font-semibold text-[#0E1A2B] mb-2 line-clamp-2">
                      {lang === 'tr' ? product.nameTr : product.nameEn}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-gray-100 text-[#374151] px-2 py-1 rounded">{product.power}W</span>
                      <span className="text-xs bg-gray-100 text-[#374151] px-2 py-1 rounded">{product.voltage}V</span>
                      <span className="text-xs bg-gray-100 text-[#374151] px-2 py-1 rounded">{product.ip}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0E1A2B]">{product.price.toLocaleString('tr-TR')} ₺</span>
                      {product.stock && (
                        <span className="text-xs text-[#0E9F6E]">{lang === 'tr' ? 'Stokta' : 'In Stock'}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#9CA3AF]">{lang === 'tr' ? 'Ürün bulunamadı. Filtreleri değiştirmeyi deneyin.' : 'No products found. Try adjusting filters.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
