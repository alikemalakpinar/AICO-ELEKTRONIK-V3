import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import ContactPageClient from './ContactPageClient';

interface ContactPageProps {
  params: { lang: Locale };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const lang = params.lang;
  const isTR = lang === 'tr';

  return {
    title: isTR ? 'İletişim | AICO Elektronik' : 'Contact | AICO Elektronik',
    description: isTR
      ? 'AICO Elektronik ile iletisime gecin. Proje danismanligi, demo talebi ve teknik destek.'
      : 'Get in touch with AICO Elektronik. Project consultation, demo requests, and technical support.',
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  return <ContactPageClient lang={params.lang} />;
}
