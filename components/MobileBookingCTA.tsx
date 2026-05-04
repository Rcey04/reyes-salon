'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileBookingCTA() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 80);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ y: 80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 80, opacity: 0 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
					className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] md:hidden"
				>
					<motion.div whileTap={{ scale: 0.96 }}>
						<Link
							href="/booking"
							className="flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[10px] tracking-[0.25em] uppercase shadow-lg"
							style={{ backdropFilter: 'blur(12px)' }}
						>
							Réserver
							<span className="text-background/60">→</span>
						</Link>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
