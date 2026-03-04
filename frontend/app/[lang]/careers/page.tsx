import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, type Locale } from '@/lib/i18n';
import {
  ArrowRight,
  Briefcase,
  Code,
  Cpu,
  Rocket,
  Users,
  Zap,
  Heart,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title:
      params.lang === 'tr'
        ? 'Kariyer | AICO Elektronik'
        : 'Careers | AICO Elektronik',
    description:
      params.lang === 'tr'
        ? 'AICO Elektronik ekibine katılın. Mühendislik tutkusuyla dolu bir ekipte yerinizi alın.'
        : 'Join the AICO Elektronik team. Take your place in a team full of engineering passion.',
  };
}

export default function CareersPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const lang = params.lang;
  const t = getTranslations(lang);

  const perks = [
    {
      icon: Rocket,
      title: lang === 'tr' ? 'İnovasyon Kültürü' : 'Innovation Culture',
      desc:
        lang === 'tr'
          ? 'Son teknoloji IoT projelerde yer alın.'
          : 'Work on cutting-edge IoT projects.',
    },
    {
      icon: Users,
      title: lang === 'tr' ? 'Güçlü Ekip' : 'Strong Team',
      desc:
        lang === 'tr'
          ? 'Deneyimli mühendislerle birlikte büyüyün.'
          : 'Grow alongside experienced engineers.',
    },
    {
      icon: Code,
      title: lang === 'tr' ? 'Teknik Gelişim' : 'Technical Growth',
      desc:
        lang === 'tr'
          ? 'Sürekli öğrenme ve gelişim imkânı.'
          : 'Continuous learning and development opportunities.',
    },
    {
      icon: Heart,
      title: lang === 'tr' ? 'İş-Yaşam Dengesi' : 'Work-Life Balance',
      desc:
        lang === 'tr'
          ? 'Esnek çalışma saatleri ve uzaktan çalışma.'
          : 'Flexible working hours and remote work options.',
    },
  ];

  const departments = [
    {
      icon: Cpu,
      name: lang === 'tr' ? 'Donanım Mühendisliği' : 'Hardware Engineering',
      desc:
        lang === 'tr'
          ? 'PCB tasarımı, gömülü sistemler, IoT cihaz geliştirme'
          : 'PCB design, embedded systems, IoT device development',
    },
    {
      icon: Code,
      name: lang === 'tr' ? 'Yazılım Geliştirme' : 'Software Development',
      desc:
        lang === 'tr'
          ? 'Frontend, backend, mobil uygulama ve bulut çözümleri'
          : 'Frontend, backend, mobile apps and cloud solutions',
    },
    {
      icon: Zap,
      name: lang === 'tr' ? 'Proje Yönetimi' : 'Project Management',
      desc:
        lang === 'tr'
          ? 'Mühendislik projelerinin planlanması ve yürütülmesi'
          : 'Planning and execution of engineering projects',
    },
  ];

  return (
    <div className="min-h-screen bg-onyx-900 pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
          <span className="w-8 h-px bg-engineer-500" />
          {lang === 'tr' ? 'KARİYER' : 'CAREERS'}
        </span>
        <h1 className="text-fluid-3xl font-bold text-offwhite-400 mb-4 heading-flex">
          {lang === 'tr' ? 'Ekibimize Katılın' : 'Join Our Team'}
        </h1>
        <p className="text-lg text-offwhite-700 mb-16 max-w-2xl">
          {lang === 'tr'
            ? 'Mühendislik tutkusuyla dolu bir ekipte, geleceğin teknolojilerini birlikte inşa edin.'
            : 'Build the technologies of the future together in a team full of engineering passion.'}
        </p>

        {/* Perks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {perks.map((perk, i) => (
            <div
              key={i}
              className="p-5 bg-onyx-800/30 border border-white/5 rounded-2xl hover:border-engineer-500/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-engineer-500/10 flex items-center justify-center mb-4">
                <perk.icon size={20} className="text-engineer-500" />
              </div>
              <h3 className="text-offwhite-400 font-semibold mb-1 text-sm">
                {perk.title}
              </h3>
              <p className="text-offwhite-700 text-xs leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Departments */}
        <h2 className="text-sm font-mono text-offwhite-700 uppercase tracking-widest mb-6">
          {lang === 'tr' ? 'Departmanlar' : 'Departments'}
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {departments.map((dept, i) => (
            <div
              key={i}
              className="p-6 bg-onyx-800/50 border border-white/5 rounded-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-engineer-500/10 flex items-center justify-center mb-4">
                <dept.icon size={24} className="text-engineer-500" />
              </div>
              <h3 className="text-offwhite-400 font-bold mb-2">{dept.name}</h3>
              <p className="text-offwhite-700 text-sm">{dept.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions CTA */}
        <div className="relative p-8 md:p-12 bg-onyx-800/50 border border-white/5 rounded-3xl text-center overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(249,115,22,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-engineer-500/5 via-transparent to-transparent" />

          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-engineer-500/10 flex items-center justify-center">
              <Briefcase size={32} className="text-engineer-500" />
            </div>
            <h2 className="text-2xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Açık Pozisyonlar' : 'Open Positions'}
            </h2>
            <p className="text-offwhite-700 mb-8 max-w-lg mx-auto">
              {lang === 'tr'
                ? "Şu an aktif açık pozisyonumuz bulunmamaktadır. Ancak yetenekli mühendislere her zaman kapımız açıktır. CV'nizi göndermek için bize ulaşın."
                : 'We currently have no active open positions. However, our doors are always open to talented engineers. Contact us to send your CV.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-engineer-500/25"
            >
              <span>{t.nav.contact}</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
