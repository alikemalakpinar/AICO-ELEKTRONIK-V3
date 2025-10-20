import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Cable, Download, Mail, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const CableCalculator = ({ lang }) => {
  const [inputs, setInputs] = useState({
    current: '',
    distance: '',
    voltage: '24',
    material: 'copper',
    maxDrop: '3'
  });
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    if (!inputs.current || !inputs.distance) {
      toast.error(lang === 'tr' ? 'Lütfen tüm zorunlu alanları doldurun' : 'Please fill all required fields');
      return;
    }

    const current = parseFloat(inputs.current);
    const distance = parseFloat(inputs.distance);
    const voltage = parseFloat(inputs.voltage);
    const maxDrop = parseFloat(inputs.maxDrop) / 100;
    const resistivity = inputs.material === 'copper' ? 0.0175 : 0.0282; // ohm.mm^2/m

    // Calculate minimum cross-section
    const maxDropVoltage = voltage * maxDrop;
    const totalDistance = distance * 2; // return path
    const minCrossSection = (resistivity * totalDistance * current) / maxDropVoltage;

    // Standard cable sizes
    const standardSizes = [0.5, 0.75, 1.0, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
    const recommendedSize = standardSizes.find(size => size >= minCrossSection) || standardSizes[standardSizes.length - 1];

    // Calculate actual drop with recommended size
    const actualResistance = (resistivity * totalDistance) / recommendedSize;
    const actualDrop = (actualResistance * current);
    const actualDropPercent = (actualDrop / voltage) * 100;

    setResult({
      minCrossSection: minCrossSection.toFixed(2),
      recommendedSize,
      actualDrop: actualDrop.toFixed(2),
      actualDropPercent: actualDropPercent.toFixed(2),
      maxAllowedDrop: maxDropVoltage.toFixed(2),
      warning: actualDropPercent > parseFloat(inputs.maxDrop)
    });
  };

  const reset = () => {
    setInputs({
      current: '',
      distance: '',
      voltage: '24',
      material: 'copper',
      maxDrop: '3'
    });
    setResult(null);
  };

  const exportPDF = () => {
    toast.success(lang === 'tr' ? 'PDF hazırlanıyor...' : 'Preparing PDF...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to={`/${lang}/calculators`} className="text-[#1554F6] hover:underline text-sm mb-2 inline-block">
            ← {lang === 'tr' ? 'Tüm Hesaplayıcılar' : 'All Calculators'}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0E1A2B] mb-2">
            {lang === 'tr' ? 'Kablo Kesiti & Gerilim Düşümü Hesaplayıcı' : 'Cable Cross-Section & Voltage Drop Calculator'}
          </h1>
          <p className="text-[#374151]">
            {lang === 'tr' ? 'Minimum kablo kesiti ve gerilim düşümü hesaplaması' : 'Calculate minimum cable cross-section and voltage drop'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 h-fit">
            <div className="flex items-center space-x-2 mb-6">
              <Cable className="text-[#1554F6]" size={24} />
              <h2 className="text-xl font-semibold text-[#0E1A2B]">
                {lang === 'tr' ? 'Kablo Parametreleri' : 'Cable Parameters'}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Current */}
              <div>
                <Label htmlFor="current">{lang === 'tr' ? 'Akım (A) *' : 'Current (A) *'}</Label>
                <Input
                  id="current"
                  type="number"
                  step="0.1"
                  placeholder="10"
                  value={inputs.current}
                  onChange={(e) => handleChange('current', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Distance */}
              <div>
                <Label htmlFor="distance">{lang === 'tr' ? 'Mesafe (m) *' : 'Distance (m) *'}</Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  placeholder="50"
                  value={inputs.distance}
                  onChange={(e) => handleChange('distance', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-[#9CA3AF] mt-1">{lang === 'tr' ? 'Tek yön mesafesi' : 'One-way distance'}</p>
              </div>

              {/* Voltage */}
              <div>
                <Label htmlFor="voltage">{lang === 'tr' ? 'Gerilim (V)' : 'Voltage (V)'}</Label>
                <Select value={inputs.voltage} onValueChange={(val) => handleChange('voltage', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12V DC</SelectItem>
                    <SelectItem value="24">24V DC</SelectItem>
                    <SelectItem value="48">48V DC</SelectItem>
                    <SelectItem value="230">230V AC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Material */}
              <div>
                <Label htmlFor="material">{lang === 'tr' ? 'Kablo Malzemesi' : 'Cable Material'}</Label>
                <Select value={inputs.material} onValueChange={(val) => handleChange('material', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copper">{lang === 'tr' ? 'Bakır' : 'Copper'}</SelectItem>
                    <SelectItem value="aluminum">{lang === 'tr' ? 'Alüminyum' : 'Aluminum'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Max Drop */}
              <div>
                <Label htmlFor="maxDrop">{lang === 'tr' ? 'İzin Verilen Maks. Düşüm (%)' : 'Max Allowed Drop (%)'}</Label>
                <Select value={inputs.maxDrop} onValueChange={(val) => handleChange('maxDrop', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1%</SelectItem>
                    <SelectItem value="2">2%</SelectItem>
                    <SelectItem value="3">3%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={calculate} className="flex-1 bg-[#1554F6] hover:bg-[#0E3CC7] text-white rounded-xl">
                {lang === 'tr' ? 'Hesapla' : 'Calculate'}
              </Button>
              <Button onClick={reset} variant="outline" className="rounded-xl">
                {lang === 'tr' ? 'Sıfırla' : 'Reset'}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-[#0E1A2B] mb-6">
              {lang === 'tr' ? 'Sonuçlar' : 'Results'}
            </h2>

            {result ? (
              <div className="space-y-6">
                {result.warning && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                    <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-red-800">
                      {lang === 'tr' ? 'Uyarı: Standart kesitle gerilim düşümü limitin üzerinde! Daha büyük kesit kullanın.' : 'Warning: Voltage drop exceeds limit with standard size! Use larger cross-section.'}
                    </div>
                  </div>
                )}

                <div className="bg-[#1554F6] bg-opacity-10 rounded-xl p-4 border-2 border-[#1554F6]">
                  <div className="text-sm text-[#1554F6] mb-1">{lang === 'tr' ? 'Önerilen Kablo Kesiti' : 'Recommended Cable Size'}</div>
                  <div className="text-3xl font-bold text-[#0E1A2B]">{result.recommendedSize} mm²</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Minimum Kesit' : 'Minimum Cross-Section'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.minCrossSection} mm²</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Gerilim Düşümü' : 'Voltage Drop'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.actualDrop}V</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Düşüm Yüzde' : 'Drop Percentage'}</span>
                    <span className={`font-semibold ${result.warning ? 'text-red-600' : 'text-[#0E9F6E]'}`}>
                      {result.actualDropPercent}%
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[#374151]">{lang === 'tr' ? 'İzin Verilen Maks.' : 'Max Allowed'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.maxAllowedDrop}V</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={exportPDF} variant="outline" className="flex-1 rounded-xl">
                    <Download size={18} className="mr-2" />
                    {lang === 'tr' ? 'PDF İndir' : 'Download PDF'}
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl">
                    <Mail size={18} className="mr-2" />
                    {lang === 'tr' ? 'E-posta Gönder' : 'Email'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#9CA3AF]">
                {lang === 'tr' ? 'Hesaplama yapmak için parametreleri girin' : 'Enter parameters to calculate'}
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-semibold text-[#0E1A2B] mb-3">
            {lang === 'tr' ? 'Önemli Notlar' : 'Important Notes'}
          </h3>
          <ul className="space-y-2 text-sm text-[#374151]">
            <li>• {lang === 'tr' ? 'Hesaplamalar 20°C ortam sıcaklığı için geçerlidir' : 'Calculations are valid for 20°C ambient temperature'}</li>
            <li>• {lang === 'tr' ? 'Yüksek sıcaklıklarda daha büyük kesit kullanın' : 'Use larger cross-sections at high temperatures'}</li>
            <li>• {lang === 'tr' ? 'Akım taşıma kapasitesini de kontrol edin' : 'Also check current carrying capacity'}</li>
            <li>• {lang === 'tr' ? 'Düşük gerilim sistemlerinde %3 limit önerilir' : '3% limit recommended for low voltage systems'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CableCalculator;
