import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, ArrowLeft, Shield, Package, Truck, Clock, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

const CheckoutPage = ({ lang = 'tr' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get order data from navigation state or use defaults
  const orderData = location.state?.orderData || {
    pcb: { quantity: 50, layers: 4, finish: 'HASL', color: 'green' },
    leadTime: '7-10',
    pricing: { pcb: 1250.00, smt: 0, shipping: 150.00, total: 1400.00 }
  };

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
  const [cardValid, setCardValid] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const content = {
    tr: {
      title: 'Ödeme',
      pageTitle: 'Güvenli Ödeme | Aico Elektronik',
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
      backToHome: 'Ana Sayfaya Dön',
      orderSummary: 'Sipariş Özeti',
      quantity: 'Adet',
      layers: 'Katman',
      finish: 'Kaplama',
      leadTime: 'Termin',
      workDays: 'iş günü',
      pcbCost: 'PCB Üretim',
      smtCost: 'Dizgi (SMT)',
      shipping: 'Kargo',
      total: 'Toplam',
      securePayment: 'Güvenli Ödeme',
      secureInfo: 'Ödeme bilgileriniz 256-bit SSL ile şifrelenir',
      trustBadges: 'Güvenli Ödeme Ortağı'
    },
    en: {
      title: 'Payment',
      pageTitle: 'Secure Payment | Aico Electronics',
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
      backToHome: 'Back to Home',
      orderSummary: 'Order Summary',
      quantity: 'Quantity',
      layers: 'Layers',
      finish: 'Finish',
      leadTime: 'Lead Time',
      workDays: 'business days',
      pcbCost: 'PCB Manufacturing',
      smtCost: 'Assembly (SMT)',
      shipping: 'Shipping',
      total: 'Total',
      securePayment: 'Secure Payment',
      secureInfo: 'Your payment information is encrypted with 256-bit SSL',
      trustBadges: 'Secure Payment Partner'
    }
  };

  const t = content[lang] || content.tr;

  // Luhn Algorithm for card validation
  const validateCardNumber = (number) => {
    const digits = number.replace(/\s/g, '');
    if (digits.length < 13) return null;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

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

      // Validate card number
      const isValid = validateCardNumber(value);
      setCardValid(isValid);
    }
    if (field === 'cvv' && value.length > 3) return;
    if (field === 'expiryMonth' && (value.length > 2 || parseInt(value) > 12)) return;
    if (field === 'expiryYear' && value.length > 2) return;

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2500);
  };

  const getCardType = (number) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    return 'default';
  };

  if (paymentSuccess) {
    return (
      <>
        <Helmet>
          <title>{t.successTitle} | Aico Elektronik</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center p-6">
          <AnimatedSection animation="scaleIn">
            <GlassCard className="p-12 max-w-lg text-center" gradient="blue">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.successTitle}</h2>
              <p className="text-gray-600 mb-8">{t.successMessage}</p>
              <Link to={`/${lang}`}>
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-slate-700">
                  {t.backToHome}
                </Button>
              </Link>
            </GlassCard>
          </AnimatedSection>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta name="description" content="Aico Elektronik güvenli ödeme sayfası. SSL şifreli ödeme ile PCB siparişinizi tamamlayın." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: 3D Card + Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* 3D Credit Card */}
              <AnimatedSection animation="fadeInLeft">
                <div className="perspective-1000">
                  <motion.div
                    className="relative w-full max-w-md aspect-[1.586/1] cursor-pointer mx-auto"
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
                          <div className="flex items-center gap-2 mb-6">
                            <motion.div
                              className="text-2xl md:text-3xl font-mono tracking-wider"
                              key={formData.cardNumber}
                              initial={{ opacity: 0.5, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {formData.cardNumber || '•••• •••• •••• ••••'}
                            </motion.div>
                            {cardValid !== null && formData.cardNumber.replace(/\s/g, '').length >= 13 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={cardValid ? 'text-green-400' : 'text-red-400'}
                              >
                                {cardValid ? <CheckCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                              </motion.div>
                            )}
                          </div>

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
              </AnimatedSection>

              {/* Payment Form */}
              <AnimatedSection animation="fadeInUp">
                <GlassCard className="p-8" gradient="blue">
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
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              className={`mt-2 pr-10 ${cardValid === true ? 'border-green-500 focus:border-green-500' : cardValid === false ? 'border-red-500 focus:border-red-500' : ''}`}
                              required
                            />
                            {cardValid !== null && formData.cardNumber.replace(/\s/g, '').length >= 13 && (
                              <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 mt-1 ${cardValid ? 'text-green-500' : 'text-red-500'}`}>
                                <CheckCircle className="w-5 h-5" />
                              </div>
                            )}
                          </div>
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

                    {/* Trust Badges */}
                    <div className="border-t pt-6">
                      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">256-bit SSL</span>
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-lg">
                          <img src="/assets/payment/visa.svg" alt="Visa" className="h-6" onError={(e) => e.target.style.display = 'none'} />
                          <span className="text-sm font-medium text-gray-700">Visa</span>
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-lg">
                          <img src="/assets/payment/mastercard.svg" alt="Mastercard" className="h-6" onError={(e) => e.target.style.display = 'none'} />
                          <span className="text-sm font-medium text-gray-700">Mastercard</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                          <Lock className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">3D Secure</span>
                        </div>
                      </div>
                      <p className="text-xs text-center text-gray-500">{t.secureInfo}</p>
                    </div>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 text-white shadow-xl rounded-2xl disabled:opacity-70"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>İşleniyor...</span>
                          </div>
                        ) : (
                          <>
                            <Lock className="mr-2 w-5 h-5" />
                            {t.pay}
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </GlassCard>
              </AnimatedSection>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <AnimatedSection animation="fadeInRight">
                <div className="sticky top-24">
                  <GlassCard className="p-6" gradient="blue">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      {t.orderSummary}
                    </h3>

                    {/* Order Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">{t.quantity}</span>
                        <span className="font-semibold">{orderData.pcb?.quantity || 50} adet</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">{t.layers}</span>
                        <span className="font-semibold">{orderData.pcb?.layers || 4} katman</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">{t.finish}</span>
                        <span className="font-semibold">{orderData.pcb?.finish || 'HASL'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{t.leadTime}</span>
                        </div>
                        <span className="font-semibold">{orderData.leadTime || '7-10'} {t.workDays}</span>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.pcbCost}</span>
                        <span className="font-medium">₺{(orderData.pricing?.pcb || 1250).toFixed(2)}</span>
                      </div>
                      {orderData.pricing?.smt > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.smtCost}</span>
                          <span className="font-medium">₺{orderData.pricing.smt.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Truck className="w-4 h-4" />
                          <span>{t.shipping}</span>
                        </div>
                        <span className="font-medium">₺{(orderData.pricing?.shipping || 150).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-4 border-t-2 border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">{t.total}</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ₺{(orderData.pricing?.total || 1400).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-blue-900 text-sm">{t.securePayment}</p>
                          <p className="text-xs text-blue-700 mt-1">{t.secureInfo}</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
