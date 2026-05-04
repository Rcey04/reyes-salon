'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';

interface NavbarProps {
	lang: 'fr' | 'en';
	onLangToggle: () => void;
}

const navLinks = {
	fr: [
		{ label: 'Manifeste', href: '#manifeste', id: 'manifeste', num: '01' },
		{ label: 'Les Frères', href: '#freres', id: 'freres', num: '02' },
		{ label: 'Le Geste', href: '#geste', id: 'geste', num: '03' },
		{ label: 'Galerie', href: '/galerie', id: '', num: '04' },
		{ label: "L'Atelier", href: '#atelier', id: 'atelier', num: '05' },
		{ label: 'Réserver', href: '/booking', id: '', num: '06' },
	],
	en: [
		{ label: 'Manifesto', href: '#manifeste', id: 'manifeste', num: '01' },
		{ label: 'The Brothers', href: '#freres', id: 'freres', num: '02' },
		{ label: 'The Craft', href: '#geste', id: 'geste', num: '03' },
		{ label: 'Gallery', href: '/galerie', id: '', num: '04' },
		{ label: 'The Atelier', href: '#atelier', id: 'atelier', num: '05' },
		{ label: 'Book', href: '/booking', id: '', num: '06' },
	],
};

export default function Navbar({ lang, onLangToggle }: NavbarProps) {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const links = navLinks[lang];
	const activeSection = useActiveSection(['manifeste', 'freres', 'geste', 'atelier']);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	}, [open]);

	const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (!href.startsWith('#')) return;
		e.preventDefault();
		const el = document.getElementById(href.slice(1));
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		setOpen(false);
	}, []);

	// Logo + hamburger color : blanc sur hero dark ou menu ouvert, noir sinon
	const isLight = open || !scrolled;
	const lineColor = isLight ? '#F5F3EE' : '#000000';
	const logoColor = isLight ? 'text-[#F5F3EE]' : 'text-foreground';

	const textColor = scrolled ? 'text-foreground/70' : 'text-[#F5F3EE]/70';
	const textColorActive = scrolled ? 'text-foreground' : 'text-[#F5F3EE]';

	return (
		<>
			{/* ── Header bar ── */}
			<header
				className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
					open
						? 'py-5 bg-transparent'
						: scrolled
						? 'py-5 bg-background/95 backdrop-blur-sm border-b border-foreground/10'
						: 'py-5 bg-transparent'
				}`}
			>
				{/* Logo */}
				<Link
					href="/"
					onClick={() => setOpen(false)}
					className={`font-serif text-sm tracking-[0.2em] uppercase transition-colors duration-300 relative z-[101] ${logoColor}`}
				>
					REYES
				</Link>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-7">
					{links.map((link) => {
						const isActive = link.id && activeSection === link.id;
						return (
							<Link
								key={link.label}
								href={link.href}
								onClick={(e) => handleAnchorClick(e, link.href)}
								className={`relative text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 group ${
									isActive ? textColorActive : textColor
								}`}
							>
								{link.label}
								<span
									className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
										scrolled ? 'bg-foreground' : 'bg-[#F5F3EE]'
									} ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
								/>
							</Link>
						);
					})}
					<button
						onClick={onLangToggle}
						className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 ml-2 ${
							scrolled ? 'text-mid hover:text-foreground' : 'text-[#F5F3EE]/50 hover:text-[#F5F3EE]'
						}`}
					>
						{lang === 'fr' ? 'EN' : 'FR'}
					</button>
				</nav>

				{/* Mobile hamburger */}
				<button
					className="md:hidden relative z-[101] flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2"
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? 'Fermer' : 'Menu'}
				>
					<motion.span
						className="block h-px w-6 mx-auto origin-center"
						animate={
							open
								? { rotate: 45, y: 5.5, backgroundColor: lineColor }
								: { rotate: 0, y: 0, backgroundColor: lineColor }
						}
						style={{ backgroundColor: lineColor }}
						transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
					/>
					<motion.span
						className="block h-px w-6 mx-auto"
						animate={
							open
								? { opacity: 0, backgroundColor: lineColor }
								: { opacity: 1, backgroundColor: lineColor }
						}
						style={{ backgroundColor: lineColor }}
						transition={{ duration: 0.2 }}
					/>
					<motion.span
						className="block h-px w-6 mx-auto origin-center"
						animate={
							open
								? { rotate: -45, y: -5.5, backgroundColor: lineColor }
								: { rotate: 0, y: 0, backgroundColor: lineColor }
						}
						style={{ backgroundColor: lineColor }}
						transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
					/>
				</button>
			</header>

			{/* ── Mobile menu full screen ── */}
			<AnimatePresence>
				{open && (
					<motion.div
						key="mobile-menu"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.35 }}
						className="fixed inset-0 z-[99] bg-[#0c0b09] md:hidden flex flex-col justify-between px-8 pt-24 pb-10 overflow-hidden"
					>
						{/* Bg decorative letter */}
						<span
							aria-hidden
							className="absolute right-4 bottom-16 font-serif text-[22rem] leading-none text-white/[0.025] select-none pointer-events-none"
						>
							R
						</span>

						{/* Links */}
						<nav className="flex flex-col mt-4">
							{links.map((link, i) => (
								<div key={link.label} className="overflow-hidden border-b border-white/10">
									<motion.div
										initial={{ y: '110%' }}
										animate={{ y: 0 }}
										exit={{ y: '110%' }}
										transition={{
											duration: 0.65,
											delay: 0.04 + i * 0.06,
											ease: [0.16, 1, 0.3, 1],
										}}
										className="flex items-end justify-between py-5"
									>
										<Link
											href={link.href}
											onClick={(e) => {
												handleAnchorClick(e, link.href);
												setOpen(false);
											}}
											className={`font-serif italic leading-none tracking-[-0.01em] text-[#F5F3EE] ${
												link.href === '/booking'
													? 'text-[clamp(2.4rem,10vw,3.8rem)] underline underline-offset-4 decoration-white/20'
													: 'text-[clamp(2rem,9vw,3.2rem)]'
											}`}
										>
											{link.label}
										</Link>
										<span className="text-[9px] tracking-[0.2em] text-white/25 mb-1 shrink-0 ml-4">
											{link.num}
										</span>
									</motion.div>
								</div>
							))}
						</nav>

						{/* Bottom bar */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4, delay: 0.45 }}
							className="flex items-end justify-between"
						>
							<div className="flex flex-col gap-1.5">
								<p className="text-[9px] tracking-[0.25em] uppercase text-white/30">
									Lausanne, Suisse
								</p>
								<p className="text-[9px] tracking-[0.25em] uppercase text-white/20">
									Mar – Sam &nbsp;09h – 19h
								</p>
							</div>
							<button
								onClick={() => { onLangToggle(); setOpen(false); }}
								className="text-[10px] tracking-[0.2em] uppercase text-white/35 hover:text-white/60 transition-colors pb-0.5"
							>
								{lang === 'fr' ? 'EN' : 'FR'}
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
