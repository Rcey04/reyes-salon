'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';

const contacts = [
	{
		label: 'WhatsApp',
		value: '+41 21 123 45 67',
		href: 'https://wa.me/41211234567',
		cta: 'Écrire sur WhatsApp',
	},
	{
		label: 'Email',
		value: 'contact@reyessalon.ch',
		href: 'mailto:contact@reyessalon.ch',
		cta: 'Envoyer un email',
	},
	{
		label: 'Téléphone',
		value: '+41 21 123 45 67',
		href: 'tel:+41211234567',
		cta: 'Appeler l\'atelier',
	},
];

export default function BookingPage() {
	return (
		<>
			<CustomCursor />
			<div className="min-h-screen bg-background text-foreground">
				{/* Header */}
				<header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 py-5 border-b border-foreground/10 bg-background/95 backdrop-blur-sm">
					<Link
						href="/"
						className="underline-draw text-[10px] tracking-[0.2em] uppercase text-mid hover:text-foreground transition-colors duration-300"
					>
						← REYES
					</Link>
					<span className="font-serif text-sm tracking-[0.2em] uppercase">Réservation</span>
				</header>

				<main className="pt-32 pb-24 px-6 md:px-10 max-w-4xl mx-auto">
					{/* Heading */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
						className="mb-20"
					>
						<p className="text-[9px] tracking-[0.3em] uppercase text-mid mb-6">— Prendre rendez-vous</p>
						<h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.01em]">
							Réservez<br />
							<span className="italic">votre rendez-vous.</span>
						</h1>
						<p className="mt-8 text-sm leading-relaxed text-foreground/60 max-w-md">
							La réservation en ligne arrive prochainement. En attendant,
							contactez-nous directement — nous vous confirmons sous 24h.
						</p>
					</motion.div>

					{/* Contact options */}
					<div className="flex flex-col divide-y divide-foreground/10">
						{contacts.map((c, i) => (
							<motion.div
								key={c.label}
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
								className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-7"
							>
								<div className="flex flex-col gap-1">
									<span className="text-[9px] tracking-[0.25em] uppercase text-mid">{c.label}</span>
									<span className="font-serif text-xl md:text-2xl">{c.value}</span>
								</div>
								<a
									href={c.href}
									target={c.label !== 'Téléphone' ? '_blank' : undefined}
									rel="noopener noreferrer"
									data-cursor="→"
									className="inline-block text-[10px] tracking-[0.25em] uppercase border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-colors duration-300 self-start md:self-auto"
								>
									{c.cta}
								</a>
							</motion.div>
						))}
					</div>

					{/* Horaires */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.7, delay: 0.6 }}
						className="mt-16 pt-10 border-t border-foreground/10"
					>
						<p className="text-[9px] tracking-[0.3em] uppercase text-mid mb-5">— Disponibilités</p>
						<div className="flex flex-col gap-2">
							<p className="text-sm text-foreground/70">Mardi au Samedi &nbsp;·&nbsp; 09h00 – 19h00</p>
							<p className="text-sm text-foreground/70">Rue de la Paix 12, 1003 Lausanne</p>
						</div>
					</motion.div>
				</main>
			</div>
		</>
	);
}
