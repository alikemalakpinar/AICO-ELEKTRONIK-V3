import React from 'react';
import PremiumHero from '../components/Home/PremiumHero';
import Services from '../components/Home/Services';
import Categories from '../components/Home/Categories';
import Sectors from '../components/Home/Sectors';
import Calculators from '../components/Home/Calculators';
import References from '../components/Home/References';
import Newsletter from '../components/Home/Newsletter';

const HomePage = ({ lang }) => {
  return (
    <div>
      <PremiumHero lang={lang} />
      <Services lang={lang} />
      <Categories lang={lang} />
      <Calculators lang={lang} />
      <Sectors lang={lang} />
      <References lang={lang} />
      <Newsletter lang={lang} />
    </div>
  );
};

export default HomePage;
