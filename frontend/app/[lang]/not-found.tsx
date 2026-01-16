import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-onyx-900 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-mono text-8xl font-bold text-engineer-500 mb-6">
          404
        </div>
        <h1 className="text-3xl font-bold text-offwhite-400 mb-4">
          Sayfa Bulunamadi
        </h1>
        <p className="text-offwhite-700 mb-8 max-w-md mx-auto">
          Aradiginiz sayfa mevcut degil veya tasindi.
        </p>
        <Link
          href="/tr"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-engineer-500 hover:bg-engineer-600 text-white font-medium rounded-lg transition-colors"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Ana Sayfaya Don</span>
        </Link>
      </div>
    </div>
  );
}
