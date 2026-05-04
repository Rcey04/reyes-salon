'use client';
import { useEffect, useState } from 'react';

export function useActiveSection(ids: string[]) {
	const [active, setActive] = useState('');

	useEffect(() => {
		const observers = ids
			.map((id) => {
				const el = document.getElementById(id);
				if (!el) return null;
				const obs = new IntersectionObserver(
					([entry]) => { if (entry.isIntersecting) setActive(id); },
					{ rootMargin: '-35% 0px -35% 0px', threshold: 0 }
				);
				obs.observe(el);
				return obs;
			})
			.filter(Boolean) as IntersectionObserver[];

		return () => observers.forEach((o) => o.disconnect());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return active;
}
