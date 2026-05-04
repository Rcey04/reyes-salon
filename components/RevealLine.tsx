'use client';
import { motion } from 'framer-motion';

interface RevealLineProps {
	children: React.ReactNode;
	delay?: number;
	inView: boolean;
	className?: string;
}

export default function RevealLine({ children, delay = 0, inView, className = '' }: RevealLineProps) {
	return (
		<span className="block overflow-hidden" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
			<motion.span
				initial={{ y: '105%' }}
				animate={inView ? { y: 0 } : {}}
				transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
				className={`block ${className}`}
			>
				{children}
			</motion.span>
		</span>
	);
}
