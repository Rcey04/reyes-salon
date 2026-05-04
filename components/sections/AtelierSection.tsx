'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import RevealLine from '@/components/RevealLine';

const content = {
	fr: {
		label: "L'Atelier",
		headline: "Un lieu pensé\npour le silence.",
		body: "Nichée au cœur de Lausanne, notre atelier de 90 m² a été conçu par l'architecte Rosa Ferri. Béton brut, chêne massif, luminaires en laiton forgé. L'espace comme extension du geste.",
		details: [
			{ key: 'Adresse', val: 'Rue de la Paix 12, 1003 Lausanne' },
			{ key: 'Horaires', val: 'Mar–Sam 09h00–19h00' },
			{ key: 'Contact', val: 'contact@reyessalon.ch' },
			{ key: 'Réservation', val: 'En ligne, 48h à l\'avance' },
		],
		cta: 'Réserver un rendez-vous',
	},
	en: {
		label: 'The Atelier',
		headline: "A space conceived\nfor silence.",
		body: "Nestled in the heart of Lausanne, our 90 m² atelier was designed by architect Rosa Ferri. Raw concrete, solid oak, forged brass lighting. The space as an extension of the gesture.",
		details: [
			{ key: 'Address', val: '12 Rue de la Paix, 1003 Lausanne' },
			{ key: 'Hours', val: 'Tue–Sat 09:00–19:00' },
			{ key: 'Contact', val: 'contact@reyessalon.ch' },
			{ key: 'Booking', val: 'Online, 48h in advance' },
		],
		cta: 'Book an appointment',
	},
};

const images = [
	{ src: '/atelier-1.jpg', alt: "Vue architecturale de l'atelier" },
	{ src: '/atelier-2.jpg', alt: 'Fauteuil de barbier vintage' },
	{ src: '/atelier-3.jpg', alt: 'Outils de coiffure' },
];

interface AtelierSectionProps {
	lang: 'fr' | 'en';
}

export default function AtelierSection({ lang }: AtelierSectionProps) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: '-8%' });
	const c = content[lang];

	return (
		<section
			id="atelier"
			ref={ref}
			className="px-6 md:px-10 py-28 md:py-40 border-t border-foreground/10"
			aria-label={c.label}
		>
			<div className="max-w-6xl mx-auto flex flex-col gap-20">
				{/* Top row */}
				<div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-24 items-start">
					<div className="flex flex-col gap-6">
						<motion.p
							initial={{ opacity: 0 }}
							animate={inView ? { opacity: 1 } : {}}
							transition={{ duration: 0.6 }}
							className="text-[9px] tracking-[0.3em] uppercase text-mid"
						>
							— {c.label}
						</motion.p>

						<h2 className="font-serif text-[clamp(2rem,4vw,3.8rem)] leading-[1.08] tracking-[-0.01em]">
							{c.headline.split('\n').map((line, i) => (
								<RevealLine key={i} inView={inView} delay={i * 0.14} className={i === 1 ? 'italic' : ''}>
									{line}
								</RevealLine>
							))}
						</h2>
					</div>

					<div className="flex flex-col gap-8 md:pt-16">
						<motion.p
							initial={{ opacity: 0, y: 16 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
							className="text-sm leading-relaxed text-foreground/75"
						>
							{c.body}
						</motion.p>

						{/* Details */}
						<ul className="flex flex-col divide-y divide-foreground/10">
							{c.details.map((item, i) => (
								<motion.li
									key={item.key}
									initial={{ opacity: 0 }}
									animate={inView ? { opacity: 1 } : {}}
									transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
									className="flex items-baseline justify-between gap-4 py-3"
								>
									<span className="text-[9px] tracking-[0.2em] uppercase text-mid">{item.key}</span>
									<span className="text-[11px] text-right">{item.val}</span>
								</motion.li>
							))}
						</ul>

						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: 0.9 }}
							whileTap={{ scale: 0.97 }}
						>
							<Link
								href="/booking"
								className="inline-block text-[10px] tracking-[0.25em] uppercase border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
								data-cursor="RÉSERVER"
							>
								{c.cta}
							</Link>
						</motion.div>
					</div>
				</div>

				{/* Image grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
					{images.map((img, i) => (
						<motion.div
							key={img.src}
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.9, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
							className={`relative overflow-hidden bg-foreground/5 img-grain group ${i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''}`}
							style={{ aspectRatio: i === 0 ? '3/4' : '4/3' }}
							data-cursor="VOIR"
						>
							<Image
								src={img.src}
								alt={img.alt}
								fill
								className="object-cover grayscale contrast-[1.12] brightness-[0.9] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
								sizes="(max-width: 768px) 50vw, 33vw"
							/>
							<div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/8 transition-colors duration-500 pointer-events-none" />
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
