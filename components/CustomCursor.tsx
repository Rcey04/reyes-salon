'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
	const [pos, setPos] = useState({ x: -100, y: -100 });
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [label, setLabel] = useState('');
	const raf = useRef<number | null>(null);
	const target = useRef({ x: -100, y: -100 });
	const current = useRef({ x: -100, y: -100 });

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			target.current = { x: e.clientX, y: e.clientY };
			if (!isVisible) setIsVisible(true);
		};

		const animate = () => {
			const dx = target.current.x - current.current.x;
			const dy = target.current.y - current.current.y;
			current.current.x += dx * 0.12;
			current.current.y += dy * 0.12;
			setPos({ x: current.current.x, y: current.current.y });
			raf.current = requestAnimationFrame(animate);
		};

		const onEnter = (e: MouseEvent) => {
			const el = e.target as HTMLElement;
			const interactive =
				el.tagName === 'A' ||
				el.tagName === 'BUTTON' ||
				el.closest('a') ||
				el.closest('button') ||
				el.classList.contains('hoverable');

			if (interactive) setIsHovering(true);

			const cursorEl =
				el.closest('[data-cursor]') ||
				(el.getAttribute('data-cursor') ? el : null);
			const cursorLabel =
				el.getAttribute('data-cursor') ||
				el.closest('[data-cursor]')?.getAttribute('data-cursor') ||
				'';
			setLabel(cursorLabel);
		};

		const onLeave = () => {
			setIsHovering(false);
			setLabel('');
		};

		window.addEventListener('mousemove', onMove);
		document.addEventListener('mouseover', onEnter);
		document.addEventListener('mouseout', onLeave);
		raf.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseover', onEnter);
			document.removeEventListener('mouseout', onLeave);
			if (raf.current) cancelAnimationFrame(raf.current);
		};
	}, [isVisible]);

	if (!isVisible) return null;

	const ringSize = label ? 56 : isHovering ? 44 : 24;

	return (
		<>
			{/* Dot */}
			<div
				className="fixed z-[99999] pointer-events-none rounded-full bg-foreground"
				style={{
					width: 4,
					height: 4,
					left: pos.x - 2,
					top: pos.y - 2,
				}}
			/>
			{/* Ring */}
			<motion.div
				className="fixed z-[99998] pointer-events-none rounded-full border border-foreground"
				animate={{
					width: ringSize,
					height: ringSize,
					left: pos.x - ringSize / 2,
					top: pos.y - ringSize / 2,
					opacity: isHovering || label ? 0.7 : 0.35,
				}}
				transition={{ type: 'spring', stiffness: 220, damping: 28 }}
			/>
			{/* Contextual label */}
			<AnimatePresence>
				{label && (
					<motion.span
						key={label}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 4 }}
						transition={{ duration: 0.2 }}
						className="fixed z-[99997] pointer-events-none cursor-label text-foreground"
						style={{ left: pos.x + 20, top: pos.y - 8 }}
					>
						{label}
					</motion.span>
				)}
			</AnimatePresence>
		</>
	);
}
