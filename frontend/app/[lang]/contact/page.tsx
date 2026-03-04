import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { LocalBusinessSchema } from '@/components/seo';
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
      ? 'AICO Elektronik ile iletişime geçin. Proje danışmanlığı, demo talebi ve teknik destek.'
      : 'Get in touch with AICO Elektronik. Project consultation, demo requests, and technical support.',
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  return (
    <>
      <LocalBusinessSchema lang={params.lang} />
      <ContactPageClient lang={params.lang} />
    </>
  );
}
