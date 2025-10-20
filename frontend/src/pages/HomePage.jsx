import React from 'react';
import PremiumHero from '../components/Home/PremiumHero';
import TrustBadges from '../components/Home/TrustBadges';
import Services from '../components/Home/Services';
import Categories from '../components/Home/Categories';
import ProcessTimeline from '../components/Home/ProcessTimeline';
import Calculators from '../components/Home/Calculators';
import Testimonials from '../components/Home/Testimonials';
import References from '../components/Home/References';
import Newsletter from '../components/Home/Newsletter';

const HomePage = ({ lang }) => {
  return (
    <div>
      <PremiumHero lang={lang} />
      <TrustBadges lang={lang} />
      <Services lang={lang} />
      <ProcessTimeline lang={lang} />
      <Categories lang={lang} />
      <Calculators lang={lang} />
      <Testimonials lang={lang} />
      <References lang={lang} />
      <Newsletter lang={lang} />
    </div>
  );
};

export default HomePage;
