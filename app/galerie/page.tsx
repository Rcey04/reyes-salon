'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const images = [
	{ src: '/g1.jpg', alt: 'Coupe de cheveux en gros plan', caption: 'Coupe Signature', num: '01' },
	{ src: '/g2.jpg', alt: 'Portrait éditorial coiffure architecturale', caption: 'Éditorial', num: '02' },
	{ src: '/g3.jpg', alt: 'Coiffure masculine de précision', caption: 'Leonardo Reyes', num: '03' },
	{ src: '/g4.jpg', alt: 'Ciseaux et rasoir sur béton', caption: 'Les Outils', num: '04' },
	{ src: '/g5.jpg', alt: 'Cascade de cheveux éditorial', caption: 'Guillermo Reyes', num: '05' },
	{ src: '/g6.jpg', alt: 'Mains coiffant avec précision', caption: 'Le Geste', num: '06' },
	{ src: '/g7.jpg', alt: "Intérieur minimaliste de l'atelier", caption: "L'Atelier", num: '07' },
	{ src: '/g8.jpg', alt: 'Carré géométrique parfait', caption: 'Coupe Signature', num: '08' },
];

const layouts = [
	{ aspect: '3/4', colSpan: '' },
	{ aspect: '4/5', colSpan: '' },
	{ aspect: '1/1', colSpan: 'md:col-span-2' },
	{ aspect: '4/5', colSpan: '' },
	{ aspect: '3/4', colSpan: '' },
	{ aspect: '4/3', colSpan: 'md:col-span-2' },
	{ aspect: '4/5', colSpan: '' },
	{ aspect: '3/4', colSpan: '' },
];

function GalleryItem({
	image,
	index,
	onClick,
}: {
	image: typeof images[0];
	index: number;
	onClick: (index: number) => void;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-8%' });
	const layout = layouts[index] ?? { aspect: '4/5', colSpan: '' };

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 48 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 1.1, delay: 0.05 * (index % 3), ease: [0.16, 1, 0.3, 1] }}
			className={`group relative overflow-hidden bg-foreground/5 cursor-pointer ${layout.colSpan}`}
			style={{ aspectRatio: layout.aspect }}
			data-cursor="VOIR"
			onClick={() => onClick(index)}
		>
			<Image
				src={image.src}
				alt={image.alt}
				fill
				className="object-cover grayscale contrast-[1.12] brightness-[0.9] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
				sizes="(max-width: 768px) 100vw, 50vw"
			/>
			{/* Vignette */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			{/* Caption */}
			<div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
				<div className="flex items-end justify-between">
					<p className="text-[9px] tracking-[0.25em] uppercase text-[#F5F3EE]/80">{image.caption}</p>
					<p className="text-[9px] tracking-[0.15em] text-[#F5F3EE]/40">{image.num}</p>
				</div>
			</div>
		</motion.div>
	);
}

function Lightbox({
	images,
	index,
	onClose,
}: {
	images: typeof import('./../galerie/page').default extends never ? never : typeof images;
	index: number;
	onClose: () => void;
}) {
	const [current, setCurrent] = useState(index);

	const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
	const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowLeft') prev();
			if (e.key === 'ArrowRight') next();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose, prev, next]);

	const img = images[current];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fixed inset-0 z-[200] bg-[#0c0b09]/97 flex flex-col"
			onClick={onClose}
		>
			{/* Top bar */}
			<div className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0" onClick={(e) => e.stopPropagation()}>
				<p className="text-[9px] tracking-[0.25em] uppercase text-[#F5F3EE]/40">
					{img.caption} &nbsp;·&nbsp; {img.num} / {String(images.length).padStart(2, '0')}
				</p>
				<button
					onClick={onClose}
					className="text-[9px] tracking-[0.2em] uppercase text-[#F5F3EE]/40 hover:text-[#F5F3EE] transition-colors duration-200"
					data-cursor="FERMER"
				>
					Fermer
				</button>
			</div>

			{/* Image */}
			<div className="flex-1 relative flex items-center justify-center px-6 md:px-20 pb-16" onClick={(e) => e.stopPropagation()}>
				<AnimatePresence mode="wait">
					<motion.div
						key={current}
						initial={{ opacity: 0, scale: 0.97 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.97 }}
						transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
						className="relative w-full h-full max-h-[75vh]"
					>
						<Image
							src={img.src}
							alt={img.alt}
							fill
							className="object-contain grayscale contrast-[1.12]"
							sizes="100vw"
							priority
						/>
					</motion.div>
				</AnimatePresence>

				{/* Nav arrows */}
				<button
					onClick={prev}
					className="absolute left-6 md:left-10 text-[9px] tracking-[0.2em] uppercase text-[#F5F3EE]/40 hover:text-[#F5F3EE] transition-colors duration-200"
					data-cursor="←"
				>
					←
				</button>
				<button
					onClick={next}
					className="absolute right-6 md:right-10 text-[9px] tracking-[0.2em] uppercase text-[#F5F3EE]/40 hover:text-[#F5F3EE] transition-colors duration-200"
					data-cursor="→"
				>
					→
				</button>
			</div>
		</motion.div>
	);
}

export default function GaleriePage() {
	const [lang, setLang] = useState<'fr' | 'en'>('fr');
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const headerInView = useInView(headerRef, { once: true });

	useEffect(() => {
		document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	}, [lightboxIndex]);

	return (
		<>
			<CustomCursor />
			<Navbar lang={lang} onLangToggle={() => setLang((l) => (l === 'fr' ? 'en' : 'fr'))} />
			<main className="pt-32 pb-24 px-6 md:px-10">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div ref={headerRef} className="mb-20 flex flex-col gap-4">
						<motion.p
							initial={{ opacity: 0 }}
							animate={headerInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.6 }}
							className="text-[9px] tracking-[0.3em] uppercase text-mid"
						>
							— Galerie
						</motion.p>
						<h1 className="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[1.02] tracking-[-0.01em]">
							<span className="block overflow-hidden">
								<motion.span
									initial={{ y: '105%' }}
									animate={headerInView ? { y: 0 } : {}}
									transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
									className="block"
								>
									Le travail
								</motion.span>
							</span>
							<span className="block overflow-hidden">
								<motion.span
									initial={{ y: '105%' }}
									animate={headerInView ? { y: 0 } : {}}
									transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
									className="block italic"
								>
									en images.
								</motion.span>
							</span>
						</h1>
					</div>

					{/* Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{images.map((img, i) => (
							<GalleryItem key={img.src} image={img} index={i} onClick={setLightboxIndex} />
						))}
					</div>

					{/* CTA booking */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
						className="mt-24 pt-16 border-t border-foreground/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
					>
						<div>
							<p className="text-[9px] tracking-[0.3em] uppercase text-mid mb-4">— Prendre rendez-vous</p>
							<p className="font-serif italic text-2xl text-foreground/70">
								Votre geste vous attend.
							</p>
						</div>
						<Link
							href="/booking"
							className="inline-block text-[10px] tracking-[0.25em] uppercase border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
							data-cursor="RÉSERVER"
						>
							Réserver un rendez-vous
						</Link>
					</motion.div>
				</div>
			</main>
			<Footer />

			{/* Lightbox */}
			<AnimatePresence>
				{lightboxIndex !== null && (
					<Lightbox
						images={images}
						index={lightboxIndex}
						onClose={() => setLightboxIndex(null)}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
