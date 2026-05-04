'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import RevealLine from '@/components/RevealLine';
import ImageWithFallback from '@/components/ImageWithFallback';

const content = {
	fr: {
		label: 'Les Frères',
		brothers: [
			{
				name: 'Leonardo Reyes',
				title: 'Co-fondateur & Coiffeur',
				quote: '« Bientôt. »',
				bio: "Grandi entre Santiago et Lausanne. La coiffure, Leonardo l'a dans le sang depuis l'enfance — c'est à Lausanne qu'il a forgé son geste et tout construit.",
				image: '/brother-1.jpg',
			},
			{
				name: 'Guillermo Reyes',
				title: 'Co-fondateur & Directeur Artistique',
				quote: '« Bientôt. »',
				bio: "L'aîné des deux. Grandi entre Santiago et Lausanne, c'est lui qui, le premier, a tenu un ciseau — et entraîné son frère dans l'aventure.",
				image: '/brother-2.jpg',
			},
		],
	},
	en: {
		label: 'The Brothers',
		brothers: [
			{
				name: 'Leonardo Reyes',
				title: 'Co-founder & Stylist',
				quote: '"Coming soon."',
				bio: 'Raised between Santiago and Lausanne. Leonardo has had hairdressing in his blood since childhood — it is in Lausanne that he forged his craft and built everything.',
				image: '/brother-1.jpg',
			},
			{
				name: 'Guillermo Reyes',
				title: 'Co-founder & Art Director',
				quote: '"Coming soon."',
				bio: 'The elder of the two. Raised between Santiago and Lausanne, he was the first to pick up the scissors — and the one who brought his brother along.',
				image: '/brother-2.jpg',
			},
		],
	},
};

interface BrothersSectionProps {
	lang: 'fr' | 'en';
}

export default function BrothersSection({ lang }: BrothersSectionProps) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: '-8%' });
	const c = content[lang];

	return (
		<section
			id="freres"
			ref={ref}
			className="px-6 md:px-10 py-28 md:py-40 border-t border-foreground/10"
			aria-label={c.label}
		>
			<div className="max-w-6xl mx-auto">
				{/* Section label */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6 }}
					className="text-[9px] tracking-[0.3em] uppercase text-mid mb-16"
				>
					— {c.label}
				</motion.p>

				{/* Brothers grid */}
				<div className="grid md:grid-cols-2 gap-16 md:gap-24">
					{c.brothers.map((brother, i) => (
						<motion.article
							key={brother.name}
							initial={{ opacity: 0, y: 40 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 1, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
							className="flex flex-col gap-6"
						>
							{/* Portrait avec grain et vignette */}
							<div
								className="relative overflow-hidden aspect-[3/4] bg-foreground/5 img-grain group"
								data-cursor="VOIR"
							>
							<ImageWithFallback
								src={brother.image}
								alt={`Portrait de ${brother.name}`}
								fill
								className="object-cover grayscale contrast-[1.15] brightness-[0.88] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
								{/* Vignette */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />
							</div>

							{/* Name & title */}
							<div className="flex flex-col gap-1">
								<h3 className="font-serif text-2xl">{brother.name}</h3>
								<p className="text-[9px] tracking-[0.2em] uppercase text-mid">{brother.title}</p>
							</div>

							{/* Divider */}
							<div className="h-px bg-foreground/10" />

							{/* Quote */}
							<blockquote className="font-serif italic text-lg leading-snug text-foreground/90">
								{brother.quote}
							</blockquote>

							{/* Bio */}
							<p className="text-sm leading-relaxed text-foreground/60">
								{brother.bio}
							</p>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
