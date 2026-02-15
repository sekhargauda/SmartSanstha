// // frontend/src/pages/HomePage.tsx
// import React from 'react';
// import { HeroSection } from '../components/home/HeroSection';
// import { AboutSection } from '../components/home/AboutSection';
// import { ConstitutionFacts } from '../components/home/ConstitutionFacts';
// // import { WhatIsSmartSanstha } from '../components/home/WhatIsSmartSanstha';
// import { FeaturesSection } from '../components/home/FeaturesSection';
// import { WhyLearnSection } from '../components/home/WhyLearnSection';
// import { FAQSection } from '../components/home/FAQSection';
// import { CTASection } from '../components/home/CTASection';
// import { UserData } from '@/App';

// interface HomePageProps {
//   onNavigate: (page: string) => void;
//   user: UserData | null;
// }

// export const HomePage: React.FC<HomePageProps> = ({ onNavigate, user }) => {
//   return (
//     <div className="w-full">
//       <HeroSection onNavigate={onNavigate} user={user} />
//       <AboutSection />
//       {/* <WhatIsSmartSanstha onNavigate={onNavigate} /> */}
//       <WhyLearnSection />
//       <FeaturesSection />
//       <ConstitutionFacts />
//       <FAQSection />
//       <CTASection onNavigate={onNavigate} />
//     </div>
//   );
// };









// frontend/src/pages/HomePage.tsx

import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ConstitutionFacts } from '../components/home/ConstitutionFacts';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { WhyLearnSection } from '../components/home/WhyLearnSection';
import { FAQSection } from '../components/home/FAQSection';
import { CTASection } from '../components/home/CTASection';
import { UserData } from '@/App';

interface HomePageProps {
  user: UserData | null;
}

export const HomePage: React.FC<HomePageProps> = ({ user }) => {
  return (
    <div className="w-full">
      <HeroSection user={user} />
      <AboutSection />
      <WhyLearnSection />
      <FeaturesSection />
      <ConstitutionFacts />
      <FAQSection />
      <CTASection />
    </div>
  );
};