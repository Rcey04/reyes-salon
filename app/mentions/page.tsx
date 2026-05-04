import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Mentions légales — REYES SALON',
	description: 'Mentions légales et informations juridiques de REYES SALON, atelier de coiffure à Lausanne.',
};

const sections = [
	{
		title: 'Éditeur du site',
		content: [
			'REYES SALON Sàrl',
			'Rue de la Paix 12, 1003 Lausanne',
			'Suisse',
			'Tél. : +41 21 123 45 67',
			'Email : contact@reyessalon.ch',
			'IDE : CHE-123.456.789',
		],
	},
	{
		title: 'Responsable de publication',
		content: ['Leonardo Reyes & Guillermo Reyes, co-fondateurs'],
	},
	{
		title: 'Hébergement',
		content: ['Vercel Inc.', '440 N Barranca Ave #4133', 'Covina, CA 91723, USA'],
	},
	{
		title: 'Propriété intellectuelle',
		content: [
			"L'ensemble des éléments constituant ce site (textes, photographies, visuels, logo) est protégé par le droit d'auteur. Toute reproduction, même partielle, est soumise à autorisation préalable et écrite de REYES SALON Sàrl.",
		],
	},
	{
		title: 'Protection des données (RGPD / LPD)',
		content: [
			'REYES SALON respecte la loi fédérale suisse sur la protection des données (LPD) ainsi que le Règlement Général sur la Protection des Données (RGPD) pour ses clients européens.',
			'Les données collectées via le formulaire de réservation sont utilisées uniquement dans le cadre de la gestion des rendez-vous et ne sont jamais transmises à des tiers.',
			"Pour toute demande relative à vos données (accès, rectification, suppression), contactez-nous à contact@reyessalon.ch.",
		],
	},
	{
		title: 'Cookies',
		content: [
			"Ce site n'utilise pas de cookies à des fins publicitaires ou de traçage. Des cookies techniques essentiels peuvent être déposés pour le bon fonctionnement du site.",
		],
	},
	{
		title: 'Droit applicable',
		content: [
			'Le présent site est soumis au droit suisse. Tout litige relatif à son utilisation relève de la compétence exclusive des tribunaux de Lausanne.',
		],
	},
];

export default function MentionsPage() {
	return (
		<main className="pt-32 pb-24 px-6 md:px-10">
			<div className="max-w-3xl mx-auto">
				{/* Header */}
				<div className="mb-16">
					<p className="text-[9px] tracking-[0.3em] uppercase text-mid mb-4">— Informations légales</p>
					<h1 className="font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
						Mentions<br />
						<span className="italic">légales.</span>
					</h1>
				</div>

				{/* Sections */}
				<div className="flex flex-col divide-y divide-foreground/10">
					{sections.map((section) => (
						<div key={section.title} className="py-8 grid md:grid-cols-[200px_1fr] gap-6">
							<h2 className="text-[9px] tracking-[0.2em] uppercase text-mid pt-1">{section.title}</h2>
							<div className="flex flex-col gap-2">
								{section.content.map((line, i) => (
									<p key={i} className="text-sm leading-relaxed text-foreground/75">{line}</p>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Footer nav */}
				<div className="mt-16 pt-12 border-t border-foreground/10 flex items-center justify-between">
					<Link
						href="/"
						className="text-[10px] tracking-[0.2em] uppercase text-mid hover:text-foreground transition-colors duration-300 underline-draw"
					>
						← Accueil
					</Link>
					<p className="text-[9px] text-mid">
						© {new Date().getFullYear()} REYES SALON
					</p>
				</div>
			</div>
		</main>
	);
}
