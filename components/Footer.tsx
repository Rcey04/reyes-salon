'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
	return (
		<footer className="border-t border-foreground/10">
			{/* Editorial quote */}
			<div className="px-6 md:px-10 py-20 border-b border-foreground/10">
				<div className="max-w-6xl mx-auto">
					<motion.blockquote
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-10%' }}
						transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
						className="font-serif italic text-[clamp(1.4rem,3.5vw,2.8rem)] leading-[1.2] tracking-[-0.01em] text-foreground/80 max-w-3xl"
					>
						&ldquo;Deux frères. Un atelier.
						<br />Lausanne depuis 2018.&rdquo;
					</motion.blockquote>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-[9px] tracking-[0.25em] uppercase text-mid mt-6"
					>
						— Reyes Salon
					</motion.p>
				</div>
			</div>

			{/* Info grid */}
			<div className="px-6 md:px-10 py-12">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
					{/* Left */}
					<div className="flex flex-col gap-3">
						<span className="font-serif italic text-2xl">Reyes Salon</span>
						<p className="text-[10px] tracking-[0.2em] uppercase text-mid">
							Maison fondée à Lausanne, 2018
						</p>
						<p className="text-[10px] text-mid mt-1 leading-relaxed">
							Rue de la Paix 12<br />
							1003 Lausanne, Suisse
						</p>
					</div>

					{/* Center */}
					<div className="flex flex-col gap-2 text-[10px] tracking-[0.15em] uppercase text-mid">
						<a href="mailto:contact@reyessalon.ch" className="underline-draw hover:text-foreground transition-colors duration-300">
							contact@reyessalon.ch
						</a>
						<a href="tel:+41211234567" className="underline-draw hover:text-foreground transition-colors duration-300">
							+41 21 123 45 67
						</a>
						<a href="https://instagram.com/reyessalon" target="_blank" rel="noopener noreferrer" className="underline-draw hover:text-foreground transition-colors duration-300">
							Instagram
						</a>
					</div>

					{/* Right */}
					<div className="flex flex-col gap-2 text-left md:text-right">
						<Link href="/galerie" className="text-[10px] tracking-[0.15em] uppercase text-mid hover:text-foreground transition-colors duration-300 underline-draw">
							Galerie
						</Link>
						<Link href="/booking" className="text-[10px] tracking-[0.15em] uppercase text-mid hover:text-foreground transition-colors duration-300 underline-draw">
							Réservation
						</Link>
						<Link href="/mentions" className="text-[10px] tracking-[0.15em] uppercase text-mid hover:text-foreground transition-colors duration-300 underline-draw">
							Mentions légales
						</Link>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-foreground/10 flex items-center justify-between">
					<p className="text-[9px] tracking-[0.1em] uppercase text-mid">
						&copy; {new Date().getFullYear()} REYES SALON Sàrl
					</p>
					<p className="font-serif italic text-xs text-foreground/30">
						Mar – Sam &nbsp;09h – 19h
					</p>
				</div>
			</div>
		</footer>
	);
}
