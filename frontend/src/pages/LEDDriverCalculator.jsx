import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Lightbulb, Download, Mail } from 'lucide-react';
import { toast } from 'sonner';

const LEDDriverCalculator = ({ lang }) => {
  const [inputs, setInputs] = useState({
    ledCount: '',
    vf: '',
    ifCurrent: '',
    configuration: 'series',
    dimming: 'no'
  });
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    if (!inputs.ledCount || !inputs.vf || !inputs.ifCurrent) {
      toast.error(lang === 'tr' ? 'Lütfen tüm zorunlu alanları doldurun' : 'Please fill all required fields');
      return;
    }

    const ledCount = parseInt(inputs.ledCount);
    const vf = parseFloat(inputs.vf);
    const ifCurrent = parseFloat(inputs.ifCurrent);

    let totalVoltage, totalCurrent, power;

    if (inputs.configuration === 'series') {
      totalVoltage = vf * ledCount;
      totalCurrent = ifCurrent;
      power = totalVoltage * totalCurrent;
    } else { // parallel
      totalVoltage = vf;
      totalCurrent = ifCurrent * ledCount;
      power = totalVoltage * totalCurrent;
    }

    const recommendedPower = Math.ceil(power * 1.15 / 5) * 5; // 15% margin, round to 5W

    setResult({
      totalVoltage: totalVoltage.toFixed(2),
      totalCurrent: totalCurrent.toFixed(2),
      power: power.toFixed(2),
      recommendedPower,
      driverType: totalCurrent < 1 ? 'CC (Constant Current)' : 'CC/CV',
      configuration: inputs.configuration
    });
  };

  const reset = () => {
    setInputs({
      ledCount: '',
      vf: '',
      ifCurrent: '',
      configuration: 'series',
      dimming: 'no'
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
            {lang === 'tr' ? 'LED Sürücü Hesaplayıcı' : 'LED Driver Calculator'}
          </h1>
          <p className="text-[#374151]">
            {lang === 'tr' ? 'LED dizi tasarımı için uygun sürücü boyutlandırması' : 'Proper driver sizing for LED array design'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 h-fit">
            <div className="flex items-center space-x-2 mb-6">
              <Lightbulb className="text-[#1554F6]" size={24} />
              <h2 className="text-xl font-semibold text-[#0E1A2B]">
                {lang === 'tr' ? 'LED Parametreleri' : 'LED Parameters'}
              </h2>
            </div>

            <div className="space-y-4">
              {/* LED Count */}
              <div>
                <Label htmlFor="ledCount">{lang === 'tr' ? 'LED Sayısı *' : 'Number of LEDs *'}</Label>
                <Input
                  id="ledCount"
                  type="number"
                  placeholder="10"
                  value={inputs.ledCount}
                  onChange={(e) => handleChange('ledCount', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Forward Voltage */}
              <div>
                <Label htmlFor="vf">{lang === 'tr' ? 'İleri Gerilim (Vf) *' : 'Forward Voltage (Vf) *'}</Label>
                <Input
                  id="vf"
                  type="number"
                  step="0.1"
                  placeholder="3.2"
                  value={inputs.vf}
                  onChange={(e) => handleChange('vf', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-[#9CA3AF] mt-1">{lang === 'tr' ? 'Tipik: Beyaz LED 3.0-3.4V' : 'Typical: White LED 3.0-3.4V'}</p>
              </div>

              {/* Forward Current */}
              <div>
                <Label htmlFor="ifCurrent">{lang === 'tr' ? 'İleri Akım (If) - Amper *' : 'Forward Current (If) - Ampere *'}</Label>
                <Input
                  id="ifCurrent"
                  type="number"
                  step="0.01"
                  placeholder="0.35"
                  value={inputs.ifCurrent}
                  onChange={(e) => handleChange('ifCurrent', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-[#9CA3AF] mt-1">{lang === 'tr' ? 'Tipik: 0.02-1.0A' : 'Typical: 0.02-1.0A'}</p>
              </div>

              {/* Configuration */}
              <div>
                <Label htmlFor="configuration">{lang === 'tr' ? 'Bağlantı Yapısı' : 'Configuration'}</Label>
                <Select value={inputs.configuration} onValueChange={(val) => handleChange('configuration', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="series">{lang === 'tr' ? 'Seri' : 'Series'}</SelectItem>
                    <SelectItem value="parallel">{lang === 'tr' ? 'Paralel' : 'Parallel'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dimming */}
              <div>
                <Label htmlFor="dimming">{lang === 'tr' ? 'Dimleme Gereksimi' : 'Dimming Requirement'}</Label>
                <Select value={inputs.dimming} onValueChange={(val) => handleChange('dimming', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">{lang === 'tr' ? 'Yok' : 'None'}</SelectItem>
                    <SelectItem value="pwm">PWM</SelectItem>
                    <SelectItem value="0-10v">0-10V</SelectItem>
                    <SelectItem value="dali">DALI</SelectItem>
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
                  <div className="text-sm text-[#1554F6] mb-1">{lang === 'tr' ? 'Önerilen Sürücü Gücü' : 'Recommended Driver Power'}</div>
                  <div className="text-3xl font-bold text-[#0E1A2B]">{result.recommendedPower}W</div>
                  <div className="text-xs text-[#374151] mt-2">{lang === 'tr' ? '(%15 güvenlik payı ile)' : '(with 15% safety margin)'}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Toplam Gerilim' : 'Total Voltage'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.totalVoltage}V</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Toplam Akım' : 'Total Current'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.totalCurrent}A</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Hesaplanan Güç' : 'Calculated Power'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.power}W</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[#374151]">{lang === 'tr' ? 'Sürücü Tipi' : 'Driver Type'}</span>
                    <span className="font-semibold text-[#0E1A2B]">{result.driverType}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-[#0E1A2B] mb-3">{lang === 'tr' ? 'Önerilen Modeller' : 'Recommended Models'}</h3>
                  <div className="space-y-2">
                    <Link
                      to={`/${lang}/products/led-drivers/led-60w-cc`}
                      className="block text-sm text-[#1554F6] hover:underline"
                    >
                      AIC-LED-60W-CC
                    </Link>
                    <Link
                      to={`/${lang}/products/led-drivers/led-100w-dali`}
                      className="block text-sm text-[#1554F6] hover:underline"
                    >
                      AIC-LED-100W-DALI
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
            {lang === 'tr' ? 'Tasarım Notları' : 'Design Notes'}
          </h3>
          <ul className="space-y-2 text-sm text-[#374151]">
            <li>• {lang === 'tr' ? 'Seri bağlantıda gerilim artar, paralelde akım artar' : 'Series increases voltage, parallel increases current'}</li>
            <li>• {lang === 'tr' ? 'CC (Sabit Akım) sürücüler LED\'ler için önerilir' : 'CC (Constant Current) drivers are recommended for LEDs'}</li>
            <li>• {lang === 'tr' ? 'Termal yönetim LED ömür ve verimliliği için kritiktir' : 'Thermal management is critical for LED life and efficiency'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LEDDriverCalculator;
