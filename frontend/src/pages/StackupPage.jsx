import React from 'react';
import { Layers, Download } from 'lucide-react';
import { Button } from '../components/ui/button';

const StackupPage = ({ lang }) => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{lang === 'tr' ? 'Malzeme & Stackup' : 'Materials & Stackup'}</h1>
          <p className="text-xl text-gray-600 mb-8">{lang === 'tr' ? 'FR-4, Rogers, Polyimide malzemeler' : 'FR-4, Rogers, Polyimide materials'}</p>
          <Button className="bg-[#1554F6] text-white px-8 py-6 rounded-xl">
            <Download className="mr-2" size={20} />
            {lang === 'tr' ? 'Stackup PDF İndir' : 'Download Stackup PDF'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default StackupPage;