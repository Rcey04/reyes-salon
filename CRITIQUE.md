# CRITIQUE — REYES SALON
*Document d'autocritique honnête. Rédigé par celui qui a construit le site, relu par quelqu'un qui ne lui fait pas de cadeaux.*

---

## 1. Les 5 choses qui sonnent faux

### 1.1 — Le Manifeste raconte une histoire qui n'est pas la leur

**Composant :** `ManifestoSection.tsx:15`

Le corps du manifeste dit : *"Né d'un père barbier à Séville, formé dans les ateliers de Paris et de Tokyo."*

Leonardo et Guillermo Reyes sont deux frères chiliens de Lausanne. Pas de père à Séville. Pas de formation à Tokyo. Ce texte a été généré en piochant dans le stock de clichés du salon premium européen — le père artisan méditerranéen, le passage initiatique en Asie — sans aucun rapport avec l'identité réelle des fondateurs. Pire : il entre en contradiction directe avec les biographies dans `BrothersSection.tsx`, qui elles parlent du Chili et de Lausanne.

C'est le problème le plus grave parce que c'est le texte fondateur du site. Si le manifeste ment, tout le reste est de la décoration.

---

### 1.2 — La page /booking est un bureau de poste dans un Hermès

**Composant :** `app/booking/page.tsx`

L'ensemble du site construit une promesse : atelier artisanal, geste précis, silence, rituel. Quand l'utilisateur clique sur "Réserver" — l'acte de conversion le plus important du site — il atterrit sur un formulaire HTML avec :

- Un `<input type="date">` natif. Sur iOS Safari, il affiche un picker système. Sur macOS, un calendrier Chrome. Les deux sont totalement étrangers au design system.
- Trois `<select>` natifs avec `appearance-none` mais toujours le fond du système d'exploitation sous iOS.
- Un `onSubmit` qui fait `console.log(data)` et affiche un faux écran de confirmation. La réservation n'arrive nulle part.

Ce n'est pas un détail technique — c'est la rupture de la promesse au moment précis où l'utilisateur a décidé d'acheter. L'équivalent : un restaurant étoilé qui vous donne un reçu imprimante thermique.

---

### 1.3 — Les citations des frères sont une parodie de profondeur

**Composant :** `BrothersSection.tsx:15, 21`

> *"Je ne coupe pas les cheveux. Je construis un silence autour d'un visage."*
> *"La coupe parfaite est celle que le client ne remarque pas."*

Ces phrases sonnent comme une IA qui a été invitée à écrire "une citation de coiffeur artisanal premium inspirée de Haruki Murakami". Elles sont grammaticalement correctes, poétiquement plausibles, et totalement vides. Aucun être humain réel ne parle comme ça. Le problème n'est pas qu'elles soient fausses — c'est qu'elles sonnent fabriquées, et le visiteur le sent immédiatement. La confiance dans la marque s'effondre à la lecture.

Un directeur artistique senior les lirait et dirait : *"Qui a écrit ça, et est-ce qu'on peut les appeler ?"*

---

### 1.4 — La galerie annonce une expérience et livre une grille

**Composant :** `app/galerie/page.tsx`

La galerie dit "8 œuvres" avec l'article `œuvres`, qui implique de l'art, de la contemplation. Ce qu'elle livre : une grille CSS 2 colonnes avec des images qui font scale(1.04) au hover. Pas de lightbox. Pas de zoom. Pas de navigation clavier. Pas de fullscreen. Pas de transition entre les images. En 2026, une galerie sans lightbox sur un site qui se réclame du monde de la mode et du luxe, c'est anachronique.

Par ailleurs, `{images.length} œuvres` — hardcoder la longueur d'un tableau comme indicateur de qualité artistique est une blague involontaire.

---

### 1.5 — La citation du footer est copiée-collée du Manifeste

**Composants :** `Footer.tsx:19` et `ManifestoSection.tsx:15`

> *"Nous ne créons pas des coiffures. Nous sculptons du temps sur chaque tête."*

Cette phrase exacte apparaît deux fois sur le site : dans le corps du manifeste et dans la citation éditoriale du footer. Ce n'est pas une répétition intentionnelle pour renforcer la signature de marque — c'est un oubli. Mais l'effet est que si tu lis le site de haut en bas, tu arrives au footer et tu te souviens exactement d'où tu as déjà lu ça. Ça donne l'impression d'un site généré par blocs indépendants qui ne se connaissent pas.

---

## 2. Les clichés "site fait par une IA"

### 2.1 — `initial={{ opacity: 0, y: 20 }}` appliqué à tout

Compte le pattern dans les composants : ManifestoSection (5 fois), BrothersSection (2 fois), CraftSection (6 fois), AtelierSection (8 fois), Footer (2 fois), booking (2 fois), galerie (5 fois). C'est le seul pattern d'animation existant à part RevealLine. Fade + translateY sur tout. C'est l'équivalent animé du Arial size 12 — le choix par défaut quand on ne sait pas quoi décider.

### 2.2 — Le device `"— Label"` utilisé 7 fois

`— Manifeste`. `— Les Frères`. `— Le Geste`. `— L'Atelier`. `— Galerie`. `— Atelier de Coiffure Lausanne`. `— Leonardo & Guillermo Reyes, co-fondateurs`. Utilisé une fois, c'est un choix typographique. Utilisé 7 fois de la même façon dans 7 contextes différents, c'est un template copy-pasté. Un vrai directeur artistique aurait posé la règle d'utilisation : *ce device existe seulement ici, dans ce contexte précis*.

### 2.3 — La grille 2 colonnes MD systématique

ManifestoSection : `grid md:grid-cols-[1fr_1fr]`. BrothersSection : `grid md:grid-cols-2`. CraftSection : `grid md:grid-cols-2`. AtelierSection : `grid md:grid-cols-[1fr_1fr]`. Le site est structurellement une colonne de paires gauche-droite qui se succèdent. C'est la layout par défaut d'un développeur qui ne veut pas se tromper. Résultat : chaque section a le même poids visuel, le même rythme, le même souffle. Aucune surprise de composition.

### 2.4 — `text-[9px] tracking-[0.2em] uppercase text-mid` partout

Ce micro-texte monospace en small caps, espacement maximum, couleur atténuée — il apparaît en labels de section, captions, metadata, footer info, nav numbers. C'est le seul deuxième registre typographique du site. Le vrai design éditorial a une hiérarchie de 4-5 niveaux qui créent des rythmes imprévisibles. Ici il y a : titre serif, corps monospace, micro-label monospace. Trois niveaux. L'un d'eux revient si souvent qu'il perd sa valeur.

### 2.5 — Les phrases philosophiques performatives

*"Le geste juste ne s'apprend pas. Il se retrouve."* / *"Un lieu pensé pour le silence."* / *"Le travail en images."* Ces titres de section sont du lyrisme généré : ils ont la forme de l'aphorisme profond sans en avoir la substance. Chaque titre cherche à être mémorable — ce qui signifie qu'aucun ne l'est.

---

## 3. Ce qu'un vrai studio ferait différemment

### Locomotive (Montréal)
Ils auraient fait de la page /booking l'expérience la plus soignée du site, pas la plus négligée. Chez Locomotive, la conversion est un rituel, pas un formulaire. Les étapes auraient été divisées en une interface de sélection step-by-step — choisir le service d'abord (avec visuels), puis le coiffeur, puis la date avec un calendrier custom. Chaque étape serait une scène à part entière, pas sept champs sur une page.

### Bureau Borsche (Munich/Berlin)
Ils auraient trouvé une chose à dire typographiquement et l'auraient dite jusqu'au bout. Pas deux polices safe (Geist Mono + Instrument Serif) — qui sont le choix par défaut de tout site "premium artisanal" généré en 2024-2025. La paire est lisible et inoffensive. Elle ne dit rien sur REYES. Bureau Borsche aurait sûrement utilisé une police sur mesure ou au moins une combinaison inattendue qui serait reconnaissable dans une capture d'écran sans logo.

### Active Theory (LA)
Ils auraient construit un fil expérientiel continu du hero au footer. La Three.js gallery en hero est remarquable — et elle disparaît complètement après la première section. Le reste du site aurait pu utiliser WebGL de façon plus subtile : des textures, des distorsions légères sur les images au hover, une continuité visuelle entre le monde 3D du hero et le reste du site. Ici, c'est une coupure nette : cinématique → statique.

### Resn (Auckland/LA)
Ils auraient trouvé l'interaction signature. Le one thing mémorable que tu racontes à quelqu'un après avoir visité le site. Ici, il n'y en a pas. La InfiniteGallery est intéressante mais pas unique. Le custom cursor n'est pas unique — c'est une convention du secteur maintenant. Il manque le *moment* qui ferait dire "attends, t'as vu leur site ?"

---

## 4. Le décalage entre les pages

| Page | Niveau d'exécution | Problème |
|---|---|---|
| Hero | Excellent | Référence Three.js, cinématique, dark |
| Manifesto | Bon | Texte incohérent avec l'identité réelle |
| Brothers | Moyen | Portraits absents, quotes artificiels |
| Craft | Bon | Liste prix sans caractère |
| Atelier | Bon | Homogène avec le reste |
| /galerie | Médiocre | Grille CSS, pas d'expérience galerie |
| /booking | Mauvais | Formulaire HTML natif, non-fonctionnel |
| /mentions | Correct | Légal standard |

La chute de qualité est proportionnelle à l'éloignement de la homepage. C'est la signature d'un projet construit de haut en bas, en perdant de l'attention au fil de l'avancement. Le visiteur qui explore le site suit exactement ce chemin de dégradation.

---

## 5. Ce qui manque structurellement

### 5.1 — Pas de voix éditoriale unifiée

Les textes de section n'ont pas été écrits avec une voice & tone unique. ManifestoSection est lyrique et abstrait. CraftSection est factuel et pratico-pratique (durées en minutes, prix). BrothersSection est intimiste. AtelierSection est architectural. Ce ne sont pas des registres intentionnellement contrastés — c'est de l'incohérence. Une marque premium a une voix unique qui traverse tout le site, du titre principal à la validation du formulaire.

### 5.2 — Zéro preuve sociale

Pas un seul avis client. Pas une seule mention de presse. Pas un badge, pas une citation, pas un chiffre. Pour un salon qui prétend être l'atelier de référence lausannois depuis 2018, l'absence totale de validation externe est un signal d'alarme pour le visiteur. Les marques de luxe qui n'ont pas besoin de preuves sociales sont celles dont le nom suffit. REYES n'est pas encore là.

### 5.3 — L'expérience mobile et desktop ne partagent pas le même niveau de sophistication

Le custom cursor, les data-cursor labels, les micro-interactions au hover — tout ça n'existe que sur desktop. Plus de 50% des visiteurs arrivent sur mobile et ont une expérience significativement appauvrie. Ce n'est pas un bug — c'est une décision de design non assumée. Si le design mobile est différent, il doit être aussi réfléchi, pas une version dégradée par défaut.

### 5.4 — Le site n'existe que sur vercel.app

Un salon fondé en 2018, établi à Lausanne, sans domaine propre. C'est le seul signal qui compte pour un visiteur qui vérifie la légitimité d'un prestataire. Tout le travail visuel est construit sur une fondation qui dit "prototype".

### 5.5 — Aucune raison de revenir

Le site est une brochure. Il n'y a pas de contenu évolutif — pas de blog, pas de journal de l'atelier, pas de process éditorial, pas de stories. Les salons premium qui construisent une communauté fidèle le font via du contenu qui donne une raison de revenir. Un article sur le rasoir navaja toledo. Un portrait de client. Une saison, une couleur. Rien de tout ça n'existe ici.

---

*Ce document est un point de départ, pas une sentence. Les problèmes identifiés sont tous réparables. Certains en une heure (cohérence du texte), d'autres en une semaine (page booking), d'autres jamais sans les vrais fondateurs (voix éditoriale, vraies photos, vraies citations).*
