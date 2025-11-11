import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

const CheckoutPage = ({ lang = 'tr' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    email: '',
    phone: ''
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const content = {
    tr: {
      title: 'Ödeme Bilgileri',
      cardInfo: 'Kart Bilgileri',
      cardNumber: 'Kart Numarası',
      cardName: 'Kart Üzerindeki İsim',
      expiry: 'Son Kullanma',
      cvv: 'CVV',
      contactInfo: 'İletişim Bilgileri',
      email: 'E-posta',
      phone: 'Telefon',
      pay: 'Ödemeyi Tamamla',
      back: 'Geri Dön',
      successTitle: 'Ödeme Başarılı!',
      successMessage: 'Siparişiniz alındı. E-posta adresinize onay gönderildi.',
      backToHome: 'Ana Sayfaya Dön'
    },
    en: {
      title: 'Payment Information',
      cardInfo: 'Card Information',
      cardNumber: 'Card Number',
      cardName: 'Cardholder Name',
      expiry: 'Expiry',
      cvv: 'CVV',
      contactInfo: 'Contact Information',
      email: 'Email',
      phone: 'Phone',
      pay: 'Complete Payment',
      back: 'Go Back',
      successTitle: 'Payment Successful!',
      successMessage: 'Your order has been received. Confirmation sent to your email.',
      backToHome: 'Back to Home'
    }
  };

  const t = content[lang] || content.tr;

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'cardNumber') {
      value = formatCardNumber(value);
      if (value.replace(/\s/g, '').length > 16) return;
    }
    if (field === 'cvv' && value.length > 3) return;
    if (field === 'expiryMonth' && (value.length > 2 || parseInt(value) > 12)) return;
    if (field === 'expiryYear' && value.length > 2) return;

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  const getCardType = (number) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    return 'default';
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 flex items-center justify-center p-6">
        <AnimatedSection animation="scaleIn">
          <GlassCard className="p-12 max-w-lg text-center" gradient="green">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.successTitle}</h2>
            <p className="text-gray-600 mb-8">{t.successMessage}</p>
            <Link to={`/${lang}`}>
              <Button size="lg" className="w-full">
                {t.backToHome}
              </Button>
            </Link>
          </GlassCard>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <AnimatedSection animation="fadeInLeft">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.back}</span>
          </button>
        </AnimatedSection>

        <AnimatedSection animation="fadeInDown">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">{t.title}</h1>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 3D Credit Card */}
          <div>
            <AnimatedSection animation="fadeInLeft">
              <div className="perspective-1000">
                <motion.div
                  className="relative w-full aspect-[1.586/1] cursor-pointer"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  onHoverStart={() => setIsFlipped(false)}
                >
                  {/* Front of Card */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-slate-700 to-blue-800">
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl" />
                      </div>
                    </div>

                    <div className="relative h-full p-6 md:p-8 flex flex-col justify-between text-white">
                      {/* Chip & Logo */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="text-right">
                          <div className="text-sm opacity-80">Aico Pay</div>
                        </div>
                      </div>

                      {/* Card Number */}
                      <div>
                        <motion.div
                          className="text-2xl md:text-3xl font-mono tracking-wider mb-6"
                          key={formData.cardNumber}
                          initial={{ opacity: 0.5, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {formData.cardNumber || '•••• •••• •••• ••••'}
                        </motion.div>

                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-xs opacity-70 mb-1">CARDHOLDER</div>
                            <motion.div
                              className="text-sm md:text-base font-medium uppercase"
                              key={formData.cardName}
                              initial={{ opacity: 0.5 }}
                              animate={{ opacity: 1 }}
                            >
                              {formData.cardName || 'YOUR NAME'}
                            </motion.div>
                          </div>
                          <div>
                            <div className="text-xs opacity-70 mb-1">EXPIRES</div>
                            <motion.div
                              className="text-sm md:text-base font-mono"
                              key={`${formData.expiryMonth}${formData.expiryYear}`}
                              initial={{ opacity: 0.5 }}
                              animate={{ opacity: 1 }}
                            >
                              {formData.expiryMonth || 'MM'}/{formData.expiryYear || 'YY'}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Back of Card */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900" />
                    
                    <div className="relative h-full">
                      {/* Magnetic Stripe */}
                      <div className="w-full h-12 bg-black mt-8" />
                      
                      {/* CVV Area */}
                      <div className="px-8 mt-6">
                        <div className="bg-white h-10 rounded flex items-center justify-end px-4">
                          <motion.span
                            className="text-gray-900 font-mono text-lg"
                            key={formData.cvv}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {formData.cvv || '•••'}
                          </motion.span>
                        </div>
                        <div className="text-white text-xs mt-2 opacity-70">CVV</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Security Badge */}
              <motion.div
                className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Lock className="w-4 h-4" />
                <span>256-bit SSL Şifreli Güvenli Ödeme</span>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Payment Form */}
          <div>
            <AnimatedSection animation="fadeInRight">
              <GlassCard className="p-8" gradient="purple">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      {t.cardInfo}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <Label>{t.cardNumber}</Label>
                        <Input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>

                      <div>
                        <Label>{t.cardName}</Label>
                        <Input
                          type="text"
                          placeholder="JOHN DOE"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                          className="mt-2"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>{t.expiry}</Label>
                          <Input
                            type="number"
                            placeholder="MM"
                            value={formData.expiryMonth}
                            onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                            className="mt-2"
                            min="1"
                            max="12"
                            required
                          />
                        </div>
                        <div>
                          <Label>&nbsp;</Label>
                          <Input
                            type="number"
                            placeholder="YY"
                            value={formData.expiryYear}
                            onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                            className="mt-2"
                            required
                          />
                        </div>
                        <div>
                          <Label>{t.cvv}</Label>
                          <Input
                            type="number"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            onFocus={() => setIsFlipped(true)}
                            onBlur={() => setIsFlipped(false)}
                            className="mt-2"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t.contactInfo}</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>{t.email}</Label>
                        <Input
                          type="email"
                          placeholder="ornek@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label>{t.phone}</Label>
                        <Input
                          type="tel"
                          placeholder="+90 555 123 4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl"
                    >
                      <Lock className="mr-2 w-5 h-5" />
                      {t.pay}
                    </Button>
                  </motion.div>
                </form>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
