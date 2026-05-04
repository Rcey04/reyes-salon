'use client';

import { useState } from 'react';
import CustomCursor from '@/components/CustomCursor';
import IntroLoader from '@/components/IntroLoader';
import MobileBookingCTA from '@/components/MobileBookingCTA';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ManifestoSection from '@/components/sections/ManifestoSection';
import BrothersSection from '@/components/sections/BrothersSection';
import CraftSection from '@/components/sections/CraftSection';
import AtelierSection from '@/components/sections/AtelierSection';

export default function Home() {
	const [lang, setLang] = useState<'fr' | 'en'>('fr');

	const toggleLang = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'));

	return (
		<>
			<IntroLoader onDone={() => {}} />
			<CustomCursor />
			<MobileBookingCTA />
			<Navbar lang={lang} onLangToggle={toggleLang} />
			<main>
				<HeroSection />
				<ManifestoSection lang={lang} />
				<BrothersSection lang={lang} />
				<CraftSection lang={lang} />
				<AtelierSection lang={lang} />
			</main>
			<Footer />
		</>
	);
}
