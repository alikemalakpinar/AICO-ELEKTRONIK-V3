import React from 'react';
import Hero from '../components/Home/Hero';
import Categories from '../components/Home/Categories';
import Sectors from '../components/Home/Sectors';
import Calculators from '../components/Home/Calculators';
import References from '../components/Home/References';
import Newsletter from '../components/Home/Newsletter';

const HomePage = ({ lang }) => {
  return (
    <div>
      <Hero lang={lang} />
      <Categories lang={lang} />
      <Sectors lang={lang} />
      <Calculators lang={lang} />
      <References lang={lang} />
      <Newsletter lang={lang} />
    </div>
  );
};

export default HomePage;
