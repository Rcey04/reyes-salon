'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import RevealLine from '@/components/RevealLine';

const content = {
	fr: {
		label: 'Le Geste',
		headline: ["Le geste juste", "ne s'apprend pas.", 'Il se retrouve.'],
		services: [
			{ name: 'Coupe Signature', desc: 'Diagnostic morphologique, coupe sculptée à la main, finitions au rasoir droit. 60 min.', price: '85 CHF' },
			{ name: 'Rasage Traditionnel', desc: 'Préparation à la vapeur, mousse artisanale, navaja toledo, massage crânien. 45 min.', price: '65 CHF' },
			{ name: 'Coupe & Rasage', desc: 'Le rituel complet — coupe signature suivie du rasage traditionnel. 100 min.', price: '130 CHF' },
			{ name: 'Teinture & Couleur', desc: 'Consultation chromatique, coloration naturelle, soins post-couleur. 90–150 min.', price: 'Sur devis' },
			{ name: 'Coupe Enfant', desc: 'Pour les moins de 12 ans. Patience garantie. 30 min.', price: '35 CHF' },
		],
	},
	en: {
		label: 'The Craft',
		headline: ['The right gesture', 'is not learned.', 'It is rediscovered.'],
		services: [
			{ name: 'Signature Cut', desc: 'Morphological analysis, hand-sculpted cut, straight razor finish. 60 min.', price: 'CHF 85' },
			{ name: 'Traditional Shave', desc: 'Steam preparation, artisan foam, Toledo navaja, scalp massage. 45 min.', price: 'CHF 65' },
			{ name: 'Cut & Shave', desc: 'The complete ritual — signature cut followed by traditional shave. 100 min.', price: 'CHF 130' },
			{ name: 'Colour & Tint', desc: 'Chromatic consultation, natural colouring, post-colour treatment. 90–150 min.', price: 'On request' },
			{ name: "Children's Cut", desc: 'For under 12s. Patience guaranteed. 30 min.', price: 'CHF 35' },
		],
	},
};

interface CraftSectionProps {
	lang: 'fr' | 'en';
}

export default function CraftSection({ lang }: CraftSectionProps) {
	const ref = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-8%' });

	const { scrollYProgress } = useScroll({
		target: imageRef,
		offset: ['start end', 'end start'],
	});
	const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

	const c = content[lang];

	return (
		<section
			id="geste"
			ref={ref}
			className="py-28 md:py-40 border-t border-foreground/10 overflow-hidden"
			aria-label={c.label}
		>
			<div className="max-w-6xl mx-auto px-6 md:px-10">
				<motion.p
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6 }}
					className="text-[9px] tracking-[0.3em] uppercase text-mid mb-16"
				>
					— {c.label}
				</motion.p>
			</div>

			{/* Full-bleed image + text split */}
			<div className="grid md:grid-cols-2 gap-0">
				{/* Parallax image */}
				<div
					ref={imageRef}
					className="relative overflow-hidden aspect-[4/5] md:aspect-auto md:min-h-[600px] img-grain"
					data-cursor="VOIR"
				>
					<motion.div className="absolute inset-0" style={{ y: imageY }}>
						<Image
							src="/craft.jpg"
							alt={lang === 'fr' ? 'Geste de coupe précis' : 'Precise cutting gesture'}
							fill
							className="object-cover grayscale contrast-[1.15] brightness-[0.88]"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
						{/* Vignette */}
						<div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
					</motion.div>
				</div>

				{/* Services list */}
				<div className="flex flex-col justify-center px-6 md:px-16 py-16 md:py-0 gap-10">
					<h2 className="font-serif text-[clamp(1.8rem,3.5vw,3.2rem)] leading-[1.1] tracking-[-0.01em]">
						<RevealLine inView={inView} delay={0.1}>{c.headline[0]}</RevealLine>
						<RevealLine inView={inView} delay={0.22}>{c.headline[1]}</RevealLine>
						<RevealLine inView={inView} delay={0.34} className="italic">{c.headline[2]}</RevealLine>
					</h2>

					<ul className="flex flex-col divide-y divide-foreground/10">
						{c.services.map((service, i) => (
							<motion.li
								key={service.name}
								initial={{ opacity: 0, x: 16 }}
								animate={inView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
								className="flex items-start justify-between gap-4 py-5"
							>
								<div className="flex flex-col gap-1">
									<span className="text-sm font-medium tracking-wide">{service.name}</span>
									<span className="text-[11px] text-mid leading-relaxed">{service.desc}</span>
								</div>
								<span className="text-[11px] tracking-[0.1em] uppercase text-mid whitespace-nowrap pt-0.5">
									{service.price}
								</span>
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
