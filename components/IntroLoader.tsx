'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onDone }: { onDone: () => void }) {
	const [visible, setVisible] = useState(true);
	const done = useCallback(onDone, [onDone]);

	useEffect(() => {
		const hide = setTimeout(() => setVisible(false), 2400);
		const finish = setTimeout(done, 3200);
		return () => { clearTimeout(hide); clearTimeout(finish); };
	}, [done]);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					exit={{ opacity: 0 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="fixed inset-0 z-[99999] bg-[#0c0b09] flex items-center justify-center"
				>
					<div className="flex">
						{'REYES'.split('').map((letter, i) => (
							<div key={i} className="overflow-hidden">
								<motion.span
									initial={{ y: '110%' }}
									animate={{ y: 0 }}
									transition={{ duration: 1.1, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
									className="block font-serif text-[clamp(3.5rem,14vw,12rem)] text-[#F5F3EE] tracking-[0.08em] leading-none select-none"
								>
									{letter}
								</motion.span>
							</div>
						))}
					</div>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 1.1 }}
						className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] uppercase text-[#F5F3EE]/40 whitespace-nowrap"
					>
						Atelier de Coiffure — Lausanne
					</motion.p>
					<motion.div
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 2.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
						className="absolute bottom-0 left-0 h-px w-full bg-[#F5F3EE]/10 origin-left"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
