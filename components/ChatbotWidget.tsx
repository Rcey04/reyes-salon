'use client';

import { useEffect } from 'react';

export default function ChatbotWidget() {
	useEffect(() => {
		// Évite d'injecter le script plusieurs fois en dev (StrictMode)
		const existing = document.querySelector('script[data-chatbot="reyes"]');
		if (existing) return;

		const s = document.createElement('script');
		s.src = 'https://creafix-chatbot-platform.vercel.app/embed.js?botId=clarissa-v1-copy-1777483734221';
		s.async = true;
		s.setAttribute('data-chatbot', 'reyes');
		document.head.appendChild(s);
	}, []);

	return null;
}
