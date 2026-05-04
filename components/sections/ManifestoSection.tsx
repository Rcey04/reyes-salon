'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import RevealLine from '@/components/RevealLine';

const content = {
	fr: {
		label: 'Manifeste',
		lines: [
			'Deux frères. Une lame.',
			"Un geste répété mille fois",
			"jusqu'à devenir signature.",
		],
		body: `Guillermo et Leonardo ont grandi entre le Chili et Lausanne. Deux cultures, deux rythmes, un même regard sur ce que la coiffure peut être quand on la prend au sérieux. REYES est né de cette évidence : le meilleur coiffeur de ta vie est celui qui t'écoute avant de toucher.`,
		aside: 'Fondé à Lausanne en 2018',
	},
	en: {
		label: 'Manifesto',
		lines: [
			'Two brothers. One blade.',
			'A gesture repeated a thousand times',
			'until it becomes a signature.',
		],
		body: `Guillermo and Leonardo grew up between Chile and Lausanne. Two cultures, two rhythms, one shared conviction about what hairdressing can be when taken seriously. REYES was born from this certainty: the best cut of your life starts with being heard.`,
		aside: 'Founded in Lausanne in 2018',
	},
};

interface ManifestoSectionProps {
	lang: 'fr' | 'en';
}

export default function ManifestoSection({ lang }: ManifestoSectionProps) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: '-10%' });
	const c = content[lang];

	return (
		<section
			id="manifeste"
			ref={ref}
			className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden"
			aria-label={c.label}
		>
			{/* Large background number */}
			<span
				aria-hidden="true"
				className="absolute right-4 top-1/2 -translate-y-1/2 font-serif text-[clamp(8rem,25vw,22rem)] leading-none text-foreground/[0.03] select-none pointer-events-none"
			>
				01
			</span>

			<div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1fr] gap-16 md:gap-24 items-start">
				{/* Left: headline */}
				<div>
					<motion.p
						initial={{ opacity: 0 }}
						animate={inView ? { opacity: 1 } : {}}
						transition={{ duration: 0.6 }}
						className="text-[9px] tracking-[0.3em] uppercase text-mid mb-8"
					>
						— {c.label}
					</motion.p>

					<h2 className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.01em]">
						<RevealLine inView={inView} delay={0.1}>{c.lines[0]}</RevealLine>
						<RevealLine inView={inView} delay={0.22}>{c.lines[1]}</RevealLine>
						<RevealLine inView={inView} delay={0.34} className="italic">{c.lines[2]}</RevealLine>
					</h2>
				</div>

				{/* Right: body + aside */}
				<div className="flex flex-col gap-8 md:pt-24">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
						className="drop-cap text-sm leading-relaxed text-foreground/80"
					>
						{c.body}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, scaleX: 0 }}
						animate={inView ? { opacity: 1, scaleX: 1 } : {}}
						transition={{ duration: 0.6, delay: 0.8 }}
						className="origin-left h-px bg-foreground/15"
					/>

					<motion.p
						initial={{ opacity: 0 }}
						animate={inView ? { opacity: 1 } : {}}
						transition={{ duration: 0.6, delay: 1 }}
						className="text-[10px] tracking-[0.2em] uppercase text-mid"
					>
						{c.aside}
					</motion.p>
				</div>
			</div>
		</section>
	);
}
