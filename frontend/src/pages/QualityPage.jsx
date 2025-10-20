import React from 'react';
import { Award, CheckCircle2, Download } from 'lucide-react';
import { Button } from '../components/ui/button';

const QualityPage = ({ lang }) => {
  const certs = ['ISO 9001:2015', 'IPC-A-600', 'IPC-A-610', 'RoHS', 'REACH', 'UL'];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="mx-auto mb-6 text-[#1554F6]" size={64} />
          <h1 className="text-5xl font-bold text-[#0A0E27] mb-4">{lang === 'tr' ? 'Kalite & Sertifikalar' : 'Quality & Certifications'}</h1>
          <p className="text-xl text-gray-600">{lang === 'tr' ? 'Uluslararası standartlarda kalite güvencesi' : 'Quality assurance to international standards'}</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certs.map((cert, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 text-green-500" size={32} />
                <div className="font-bold text-[#0A0E27]">{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityPage;