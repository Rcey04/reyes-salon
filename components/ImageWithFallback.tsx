'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
	label?: string;
}

export default function ImageWithFallback({ label = 'REYES', className, ...props }: ImageWithFallbackProps) {
	const [failed, setFailed] = useState(false);

	if (failed) {
		return (
			<div className={`absolute inset-0 flex items-center justify-center bg-foreground/[0.04] ${className ?? ''}`}>
				<span className="font-serif italic text-foreground/10 text-[clamp(1.5rem,4vw,3rem)] tracking-widest select-none">
					{label}
				</span>
			</div>
		);
	}

	return (
		<Image
			{...props}
			className={className}
			onError={() => setFailed(true)}
		/>
	);
}
