import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
	variable: '--font-instrument',
	subsets: ['latin'],
	weight: '400',
	style: ['italic', 'normal'],
});

export const metadata: Metadata = {
	title: 'REYES SALON — Atelier de Coiffure, Lausanne',
	description:
		"Deux frères. Une lame. Un geste répété mille fois jusqu'à devenir signature. Atelier de coiffure fondé à Lausanne, Suisse.",
	keywords: ['coiffeur lausanne', 'atelier coiffure', 'coupe signature', 'rasage traditionnel', 'lausanne'],
	authors: [{ name: 'REYES SALON' }],
	openGraph: {
		title: 'REYES SALON — Atelier de Coiffure, Lausanne',
		description: "Deux frères. Une lame. Un geste répété mille fois jusqu'à devenir signature.",
		url: 'https://reyessalon.ch',
		siteName: 'REYES SALON',
		locale: 'fr_CH',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'REYES SALON — Atelier de Coiffure, Lausanne',
		description: "Deux frères. Une lame. Un geste répété mille fois jusqu'à devenir signature.",
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: '#F5F3EE',
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className="bg-background">
			<body
				className={`${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
			>
			{children}
			{/* Chatbot REYES — Cleo */}
			<Script
				src="https://creafix-chatbot-platform.vercel.app/embed.js?botId=clarissa-v1-copy-1777483734221"
				strategy="afterInteractive"
			/>
			{/* Fin Chatbot REYES — Cleo */}
			</body>
		</html>
	);
}
