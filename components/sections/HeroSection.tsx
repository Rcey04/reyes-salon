'use client';

import { motion } from 'framer-motion';
import InfiniteGallery from '@/components/InfiniteGallery';
import Link from 'next/link';

const galleryImages = [
	{ src: '/g1.jpg', alt: 'Coupe de cheveux en gros plan' },
	{ src: '/g2.jpg', alt: 'Portrait éditorial coiffure architecturale' },
	{ src: '/g3.jpg', alt: 'Coiffure masculine de précision' },
	{ src: '/g4.jpg', alt: 'Ciseaux et rasoir sur béton' },
	{ src: '/g5.jpg', alt: 'Cascade de cheveux éditorial' },
	{ src: '/g6.jpg', alt: 'Mains coiffant avec précision' },
	{ src: '/g7.jpg', alt: "Intérieur minimaliste de l'atelier" },
	{ src: '/g8.jpg', alt: 'Carré géométrique parfait' },
];

export default function HeroSection() {
	return (
		<section className="relative h-screen w-full overflow-hidden bg-[#0c0b09]" aria-label="Hero">
			{/* 3D Gallery Background */}
			<div className="absolute inset-0">
				<InfiniteGallery
					images={galleryImages}
					speed={0.6}
					zSpacing={3}
					visibleCount={12}
					falloff={{ near: 0.8, far: 14 }}
					className="h-full w-full"
				/>
			</div>

			{/* Subtle dark overlay */}
			<div className="absolute inset-0 bg-black/20 pointer-events-none" />

			{/* Central heading */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
					className="font-serif text-[clamp(4rem,18vw,18rem)] leading-none tracking-[-0.02em] text-[#F5F3EE] mix-blend-exclusion text-center select-none"
				>
					REYES
				</motion.h1>
			</div>

			{/* Top-left metadata */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1 }}
				className="absolute top-24 left-6 md:left-10 flex flex-col gap-1 pointer-events-none"
			>
				<span className="text-[9px] tracking-[0.25em] uppercase text-[#F5F3EE]/50">
					46°31&prime;N 6°38&prime;E
				</span>
				<span className="text-[9px] tracking-[0.25em] uppercase text-[#F5F3EE]/50">
					Est. 2018
				</span>
				<span className="text-[9px] tracking-[0.25em] uppercase text-[#F5F3EE]/50">
					Atelier de Coiffure
				</span>
			</motion.div>

			{/* Bottom-right label */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1.2 }}
				className="absolute bottom-16 right-6 md:right-10 text-right pointer-events-none"
			>
				<p className="text-[9px] tracking-[0.2em] uppercase text-[#F5F3EE]/40">
					Lausanne, Suisse
				</p>
			</motion.div>

			{/* Booking CTA — bottom left */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1.4 }}
				whileTap={{ scale: 0.97 }}
				className="absolute bottom-8 left-6 md:left-10"
			>
				<Link
					href="/booking"
					className="inline-block text-[9px] tracking-[0.25em] uppercase border border-[#F5F3EE]/30 text-[#F5F3EE]/70 px-6 py-2.5 hover:border-[#F5F3EE] hover:text-[#F5F3EE] transition-all duration-400"
					data-cursor="RÉSERVER"
				>
					Réserver
				</Link>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 1.5 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
			>
				<span className="text-[8px] tracking-[0.3em] uppercase text-[#F5F3EE]/35">
					Défiler
				</span>
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
					className="w-px h-8 bg-[#F5F3EE]/25"
				/>
			</motion.div>
		</section>
	);
}
