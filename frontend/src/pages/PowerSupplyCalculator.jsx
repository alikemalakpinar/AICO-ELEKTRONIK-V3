import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calculator, Download, Mail } from 'lucide-react';
import { toast } from 'sonner';

const PowerSupplyCalculator = ({ lang }) => {
  const [inputs, setInputs] = useState({
    inputVoltage: '',
    outputVoltage: '',
    outputCurrent: '',
    efficiency: '90',
    ambientTemp: '25',
    ipRating: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    if (!inputs.outputVoltage || !inputs.outputCurrent) {
      toast.error(lang === 'tr' ? 'Lütfen tüm zorunlu alanları doldurun' : 'Please fill all required fields');
      return;
    }

    const outputPower = parseFloat(inputs.outputVoltage) * parseFloat(inputs.outputCurrent);
    const efficiency = parseFloat(inputs.efficiency) / 100;
    const inputPower = outputPower / efficiency;
    const safetyMargin = inputPower * 1.2; // 20% safety margin

    setResult({
      outputPower: outputPower.toFixed(2),
      inputPower: inputPower.toFixed(2),
      recommendedPower: Math.ceil(safetyMargin / 10) * 10, // Round up to nearest 10W
      efficiency: inputs.efficiency
    });
  };

  const reset = () => {
    setInputs({
      inputVoltage: '',
      outputVoltage: '',
      outputCurrent: '',
      efficiency: '90',
      ambientTemp: '25',
      ipRating: ''
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
            {lang === 'tr' ? 'Güç Kaynağı Seçim Sihirbazı' : 'Power Supply Selection Wizard'}
          </h1>
          <p className="text-[#374151]">
            {lang === 'tr' ? 'Uygulamanız için uygun güç kaynağı seçimi yapın' : 'Select the appropriate power supply for your application'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 h-fit">
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="text-[#1554F6]" size={24} />
              <h2 className="text-xl font-semibold text-[#0E1A2B]">
                {lang === 'tr' ? 'Parametreler' : 'Parameters'}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Input Voltage */}
              <div>
                <Label htmlFor="inputVoltage">{lang === 'tr' ? 'Giriş Gerilimi (V AC)' : 'Input Voltage (V AC)'}</Label>
                <Select value={inputs.inputVoltage} onValueChange={(val) => handleChange('inputVoltage', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={lang === 'tr' ? 'Seçiniz' : 'Select'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="110-120">110-120V</SelectItem>
                    <SelectItem value="220-240">220-240V</SelectItem>
                    <SelectItem value="100-240">100-240V (Universal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Output Voltage */}
              <div>
                <Label htmlFor="outputVoltage">{lang === 'tr' ? 'Çıkış Gerilimi (V DC) *' : 'Output Voltage (V DC) *'}</Label>
                <Input
                  id="outputVoltage"
                  type="number"
                  placeholder="24"
                  value={inputs.outputVoltage}
                  onChange={(e) => handleChange('outputVoltage', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Output Current */}
              <div>
                <Label htmlFor="outputCurrent">{lang === 'tr' ? 'Çıkış Akımı (A) *' : 'Output Current (A) *'}</Label>
                <Input
                  id="outputCurrent"
                  type="number"
                  step="0.1"
                  placeholder="10"
                  value={inputs.outputCurrent}
                  onChange={(e) => handleChange('outputCurrent', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Efficiency */}
              <div>
                <Label htmlFor="efficiency">{lang === 'tr' ? 'Hedef Verim (%)' : 'Target Efficiency (%)'}</Label>
                <Select value={inputs.efficiency} onValueChange={(val) => handleChange('efficiency', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="85">85%</SelectItem>
                    <SelectItem value="90">90%</SelectItem>
                    <SelectItem value="94">94%</SelectItem>
                    <SelectItem value="95">95%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ambient Temperature */}
              <div>
                <Label htmlFor="ambientTemp">{lang === 'tr' ? 'Ortam Sıcaklığı (°C)' : 'Ambient Temperature (°C)'}</Label>
                <Input
                  id="ambientTemp"
                  type="number"
                  value={inputs.ambientTemp}
                  onChange={(e) => handleChange('ambientTemp', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* IP Rating */}
              <div>
                <Label htmlFor="ipRating">{lang === 'tr' ? 'Koruma Sınıfı' : 'IP Rating'}</Label>
                <Select value={inputs.ipRating} onValueChange={(val) => handleChange('ipRating', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={lang === 'tr' ? 'Seçiniz' : 'Select'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IP20">IP20</SelectItem>
                    <SelectItem value="IP65">IP65</SelectItem>
                    <SelectItem value="IP67">IP67</SelectItem>
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
                <div className="bg-[#1554F6] bg-opacity-10 rounded-xl p-4 border-2 border-[#1554F6]">
                  <div className="text-sm text-[#1554F6] mb-1">{lang === 'tr' ? 'Önerilen Güç' : 'Recommended Power'}</div>
                  <div className="text-3xl font-bold text-[#0E1A2B]">{result.recommendedPower}W</div>
                  <div className="text-xs text-[#374151] mt-2">{lang === 'tr' ? '(%20 güvenlik payı ile)' : '(with 20% safety margin)'}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Çıkış Gücü' : 'Output Power'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.outputPower}W</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Giriş Gücü' : 'Input Power'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.inputPower}W</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Verim' : 'Efficiency'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.efficiency}%</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-[#0E1A2B] mb-3">{lang === 'tr' ? 'Önerilen Modeller' : 'Recommended Models'}</h3>
                  <div className="space-y-2">
                    <Link
                      to={`/${lang}/products/power-supplies/ps-240w-24v`}
                      className="block text-sm text-[#1554F6] hover:underline"
                    >
                      AIC-PS-240W-24V
                    </Link>
                    <Link
                      to={`/${lang}/products/power-supplies/ps-480w-48v`}
                      className="block text-sm text-[#1554F6] hover:underline"
                    >
                      AIC-PS-480W-48V
                    </Link>
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
            {lang === 'tr' ? 'Notlar ve Varsayımlar' : 'Notes and Assumptions'}
          </h3>
          <ul className="space-y-2 text-sm text-[#374151]">
            <li>• {lang === 'tr' ? 'Güvenlik payı olarak %20 eklenmektedir' : 'A 20% safety margin is included'}</li>
            <li>• {lang === 'tr' ? 'Yüksek sıcaklık ortamlarında derating gerekebilir' : 'Derating may be required in high-temperature environments'}</li>
            <li>• {lang === 'tr' ? 'Başlatma akımları dikkate alınmalıdır' : 'Inrush currents should be considered'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PowerSupplyCalculator;
