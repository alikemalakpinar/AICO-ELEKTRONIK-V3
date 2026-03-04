import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import {
  FileText,
  Cpu,
  Flame,
  Activity,
  Snowflake,
  HardHat,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title:
      params.lang === 'tr'
        ? 'Blog | AICO Elektronik'
        : 'Blog | AICO Elektronik',
    description:
      params.lang === 'tr'
        ? 'Endüstriyel IoT, akıllı yaşam ve mühendislik çözümleri hakkında yazılar.'
        : 'Articles about Industrial IoT, smart living and engineering solutions.',
  };
}

export default function BlogPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;

  const upcomingTopics = [
    {
      icon: Flame,
      color: '#EF4444',
      title:
        lang === 'tr'
          ? 'Yangın Algılama Sistemleri'
          : 'Fire Detection Systems',
      desc:
        lang === 'tr'
          ? 'IoT tabanlı erken uyarı sistemleri nasıl çalışır?'
          : 'How do IoT-based early warning systems work?',
    },
    {
      icon: Activity,
      color: '#3B82F6',
      title:
        lang === 'tr'
          ? 'Kestirimci Bakım Rehberi'
          : 'Predictive Maintenance Guide',
      desc:
        lang === 'tr'
          ? 'Vibrasyon analizi ile arıza öncesi tespit yöntemleri.'
          : 'Pre-failure detection methods with vibration analysis.',
    },
    {
      icon: Snowflake,
      color: '#06B6D4',
      title:
        lang === 'tr' ? 'Soğuk Zincir Yönetimi' : 'Cold Chain Management',
      desc:
        lang === 'tr'
          ? 'Sıcaklık takibinde IoT çözümlerinin rolü.'
          : 'The role of IoT solutions in temperature tracking.',
    },
    {
      icon: HardHat,
      color: '#F59E0B',
      title:
        lang === 'tr'
          ? 'Maden Güvenlik Teknolojileri'
          : 'Mining Safety Technologies',
      desc:
        lang === 'tr'
          ? 'Yeraltı takip ve güvenlik sistemleri.'
          : 'Underground tracking and safety systems.',
    },
    {
      icon: Cpu,
      color: '#8B5CF6',
      title:
        lang === 'tr'
          ? 'Gömülü Sistem Tasarımı'
          : 'Embedded System Design',
      desc:
        lang === 'tr'
          ? 'PCB tasarımından üretime giden süreç.'
          : 'From PCB design to production process.',
    },
  ];

  return (
    <div className="min-h-screen bg-onyx-900 pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <span className="inline-flex items-center gap-2 text-engineer-500 font-mono text-xs tracking-widest uppercase mb-6">
          <span className="w-8 h-px bg-engineer-500" />
          BLOG
        </span>
        <h1 className="text-fluid-3xl font-bold text-offwhite-400 mb-4 heading-flex">
          {lang === 'tr' ? 'Mühendislik Yazıları' : 'Engineering Articles'}
        </h1>
        <p className="text-lg text-offwhite-700 mb-12 max-w-2xl">
          {lang === 'tr'
            ? 'Endüstriyel IoT, akıllı yaşam teknolojileri ve mühendislik çözümleri hakkında derinlemesine içerikler.'
            : 'In-depth content about Industrial IoT, smart living technologies and engineering solutions.'}
        </p>

        {/* Coming Soon Banner */}
        <div className="relative p-8 md:p-12 bg-onyx-800/50 border border-white/5 rounded-3xl mb-12 overflow-hidden">
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

          <div className="relative text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-engineer-500/10 flex items-center justify-center">
              <FileText size={40} className="text-engineer-500" />
            </div>
            <h2 className="text-2xl font-bold text-offwhite-400 mb-4">
              {lang === 'tr' ? 'Yakında Yayında' : 'Coming Soon'}
            </h2>
            <p className="text-offwhite-700 max-w-lg mx-auto mb-8">
              {lang === 'tr'
                ? 'Mühendislik ekibimiz, sektörel deneyimlerini ve teknik bilgi birikimini paylaşacak içerikler hazırlıyor.'
                : 'Our engineering team is preparing content to share industry experience and technical knowledge.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-xl transition-colors"
            >
              <span>
                {lang === 'tr' ? 'Haberdar Ol' : 'Get Notified'}
              </span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Upcoming Topics */}
        <h3 className="text-sm font-mono text-offwhite-700 uppercase tracking-widest mb-6">
          {lang === 'tr' ? 'Planlanan Konular' : 'Planned Topics'}
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingTopics.map((topic, i) => (
            <div
              key={i}
              className="group p-5 bg-onyx-800/30 border border-white/5 rounded-2xl hover:border-white/10 transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${topic.color}15` }}
              >
                <topic.icon size={20} style={{ color: topic.color }} />
              </div>
              <h4 className="text-offwhite-400 font-semibold mb-2 text-sm">
                {topic.title}
              </h4>
              <p className="text-offwhite-700 text-xs leading-relaxed">
                {topic.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
