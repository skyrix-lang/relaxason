# Relaxa'Son — Notes projet

Site vitrine de **Relaxa'Son** (Denis Bensoussan), sonothérapeute. Présente les soins
(massages sonores, voyages sonores, drainage, massage suédois, séminaire de reconnexion) et
permet la prise de contact. Site public en production sur `https://relaxason.com`.

> Ce fichier (`CLAUDE.md`, racine) est la **source de vérité** de la documentation projet et
> est chargé automatiquement à chaque lancement de Claude Code. Tenir à jour ici.

## Stack technique

- **React 19** + **TypeScript** (strict), bundler **Vite 7** (`vite.config.mts`).
- **Mantine 8** (`@mantine/core`, `@mantine/form`, `@mantine/hooks`) pour l'UI.
- **react-router-dom 7** (`createBrowserRouter`) pour le routage.
- **@tabler/icons-react** pour les icônes.
- **react-helmet-async** pour le SEO par page (`SEOMetaData`).
- Polices via **@fontsource** (Source Sans 3 = corps, Josefin Sans = titres/nom du site, Lora).
- **Déploiement Netlify** (`netlify.toml`) + une **fonction serverless** d'envoi d'email.
  Un `Dockerfile` + `nginx.conf` existent en alternative (build statique servi par nginx).
- **Brevo** (`@getbrevo/brevo`) pour l'envoi transactionnel des emails de contact.
- **Google Analytics** (mesure via `VITE_GA_MEASUREMENT_ID`, hook `usePageTracking`, consentement cookies).
- Gestionnaire de paquets : **yarn 4** (Berry, `packageManager: yarn@4.13.0`). Node 22 (cf. `.idea`/nvm).
- Pas de tests automatisés dans le repo. Pas de state manager (état local uniquement).

## Scripts (package.json — gestionnaire : yarn)

- `yarn build` → `vite build` (front uniquement, sortie `dist/`)
- `yarn check` → `tsc --noEmit` (**vérif types, à lancer après chaque modif**)
- `yarn start` / `yarn netlify:dev` → dev avec fonctions Netlify (front port **8888**, functions **9999**)
- `vite` seul → dev front simple (sans les fonctions serverless ; le formulaire de contact échouera)
- `yarn netlify:build` → build front + fonctions (`tsc -p tsconfig.functions.json` → `functions-build/`)
- `yarn build:functions` → compile seulement les fonctions Netlify
- `yarn docker:build` → build l'image Docker `relaxason:<version>` (sert le `dist/` via nginx)
- `yarn clean` → supprime les `dist|lib|coverage|node_modules` des sous-dossiers

## Variables d'environnement

Définies dans `.env` (local) **et** dans l'UI Netlify (prod). Sans elles, l'envoi d'email échoue.

- `BREVO_API_KEY` — clé API Brevo (fonction serverless).
- `BREVO_SENDER_EMAIL` — email expéditeur déclaré chez Brevo.
- `RECIPIENT_EMAIL` — destinataire des messages du formulaire de contact.
- `VITE_GA_MEASUREMENT_ID` — ID Google Analytics (exposé au front via le préfixe `VITE_`).

⚠️ Seules les variables préfixées `VITE_` sont accessibles côté front ; les autres ne vivent
que dans la fonction Netlify (jamais exposées au navigateur). Ne jamais commiter `.env`.

## Architecture

- `src/index.tsx` — point d'entrée : définit le **thème Mantine** (couleurs, spacing,
  breakpoints, overrides de composants) et le **routeur**. Toutes les routes sont enfants de
  `<App>`. `errorElement` du routeur = `Error404` (sert de page 404).
- `src/App.tsx` — layout global : `AppShell` (header **56px** = `Navbar`), `<Outlet>`, bandeau
  cookies (`CookieConsent`), `HelmetProvider`, `usePageTracking`. La home (`/`) s'affiche pleine
  largeur ; les autres pages sont enveloppées dans un `Container size="xl"` + `.hero`/`.container`.
- `src/routes/` — une page par route :
  - `/` → `Home.tsx`
  - `/mon-parcours` → `About.tsx`
  - `/sonotherapie` → `Sonotherapy.tsx`
  - `/soins` → `Treatments.tsx`
  - `/contact` → `Contact.tsx`
  - 404 (route inconnue) → `Error404.tsx` (via `errorElement`)
- `src/components/` regroupé par domaine : `care/` (soins, + sous-dossier `pricing/`), `home/`
  (+ `testimonial/`), `sonotherapy/`, `contact/`, `navbar/`, `google/` (SEO + cookies), `common/`.
- `src/hooks/` :
  - `useScrollToHash` — scroll vers l'ancre `#...` à l'arrivée / changement de hash.
  - `useScrollVisibility([ids])` — renvoie `{ id: boolean }` ; passe à `true` quand la section
    entre dans ~80% du viewport (anim fade-in). Dépend de `[sectionIds, location.hash]`.
  - `usePageTracking` — envoie les page views à Google Analytics sur changement de route.
- `src/styles/` : CSS Modules. `Global.module.css` contient les classes partagées :
  `sectionTitle`, `titleUnderline`, `fadeInSection`/`visible`, `roundedImage`, `fullWidthImage`,
  `serviceCard`, `ctaButton`, `quote`, `aboutWrapper`, `contentWrapper`/`contentWrapperAlt`,
  `textCenter`, `flexCenter`/`flexBetween`/`flexColumn`, `grid`, `sonoSection`, helpers
  `mt1..mt5` / `mb1..mb5`, et `firefox` (ciblage navigateur). Importé en `import global from ...`.
- `src/assets/` : images bundlées par Vite (portraits, bols, logos). `public/images/...` : assets
  servis tels quels (URL absolue), à utiliser pour les visuels référencés par chemin en dur.
- `public/` : `sitemap.xml` (à tenir à jour quand on ajoute/renomme une ancre de section) + `robots.txt`.
- `netlify/functions/send-email.ts` : envoi des messages du formulaire de contact via l'API
  **Brevo**. Endpoint appelé : `/.netlify/functions/send-email` (POST). Voir « Flux de contact ».

## Build & déploiement

- **Netlify** (principal) — `netlify.toml` :
  - `command = yarn netlify:build`, `publish = dist`, `functions = functions-build`.
  - Redirection SPA : tout `/*` → `/index.html` (status 200) pour le routage client.
  - Dev : `command = vite`, `port = 8888`, `functionsPort = 9999`.
- **Vite** (`vite.config.mts`) optimisations prod :
  - Compression **gzip** (`vite-plugin-compression`, seuil 10 Ko, garde l'original).
  - Optimisation d'images (`vite-plugin-image-optimizer`, qualité 80 png/jpg, webp lossless).
  - Minification **terser** : `drop_console` + `drop_debugger` en prod.
  - `manualChunks` : `vendor` (react/react-dom), `mantine` (@mantine/core, @mantine/hooks).
  - Alias de chemins via `vite-tsconfig-paths` (résout les `paths` de `tsconfig.json`).
- **Docker** (alternatif) — `Dockerfile` build l'app puis sert `dist/` via `nginx` (`nginx.conf`).

## Flux de contact (formulaire → email)

1. `src/routes/Contact.tsx` gère l'état (loading / submitted / error) et `POST` les valeurs à
   `/.netlify/functions/send-email`.
2. `src/components/contact/ContactForm.tsx` — formulaire `@mantine/form`. Champs : `name`,
   `email`, `phone`, `subject`, `message`, `reason`. Validation : `name`/`message`/`reason`
   requis, `email` valide. `reason` via `BrowserAwareSelect` (`common/`, fallback `<select>` natif).
3. `netlify/functions/send-email.ts` : valide les champs obligatoires, mappe `reason` vers un
   libellé (`getReasonLabel`), envoie l'email via Brevo (`replyTo` = email du visiteur).
   - Valeurs de `reason` ↔ libellés : `information` → « Demande d'information », `session` →
     « Prise de rendez-vous », `workshop` → « Information sur les ateliers », `other` → « Autre sujet ».
   - ⚠️ Garder ces clés **synchronisées** entre le `<Select>` du front et la map de la fonction.
4. Succès → `SuccessAnimation` + `Confetti`. `contact/FaqSection` et `contact/ContactInfo`
   complètent la page.

## SEO (par page)

- Chaque route rend `<SEOMetadata ... />` (`src/components/google/SEOMetaData.tsx`).
- Props : `title`, `description`, `image?` (défaut = logo), `url?`, `type?` (`website`/`article`),
  `locale?` (`fr_FR`), `siteName?`. Génère `<title>`, meta description, balises **Open Graph**
  + **Twitter Card**, et `<link rel="canonical">`. Les URLs d'image sont rendues absolues.
- À l'ajout/renommage d'une page ou d'une ancre : penser aussi à `public/sitemap.xml`.

## Conventions de la page Soins (`/soins`)

C'est la zone la plus susceptible d'évoluer. Pattern à respecter pour chaque soin :

1. **Un composant par soin** dans `src/components/care/` (ex. `SoundMassageSection`,
   `CollectiveSoundJourneySection`, `BodyReconnectionSeminarSection`…). Props :
   `{ isVisible: boolean }`.
2. Le composant englobe son contenu dans `<div id="<ancre>" style={{ scrollMarginTop: "100px" }}
   className={isVisible ? \`${global.fadeInSection} ${global.visible}\` : global.fadeInSection}>`.
3. Titre via `<Title order={2} className={global.sectionTitle}>` avec
   `<Box component="span" className={global.titleUnderline} />` + une icône Tabler en `#1EB19E`.
4. Mise en page fréquente : `<Grid gutter="xl">` à 2 colonnes (`base:12, md:6`). Encarts
   d'infos en `<Paper>` (fonds récurrents `#E6F9F7` et `#F8FDFC`).
5. Ajouter le soin **aux endroits cohérents** :
   - `src/routes/Treatments.tsx` : import du composant, ajout de l'ancre dans
     `useScrollVisibility([...])`, et rendu `<XSection isVisible={visibleSections.<ancre>} />`
     (séparé par `<Space h={60} />`).
   - `src/components/navbar/Navbar.tsx` : entrée du sous-menu « Soins proposés »
     (`{ link: "/soins#<ancre>", label: "..." }`).
   - `public/sitemap.xml` : `<loc>https://relaxason.com/soins#<ancre></loc>`.
   - Si pertinent : tarif dans `src/components/care/PricingSection.tsx` (via `PriceCard` /
     `PriceItem` du sous-dossier `pricing/`, supporte `options[]`, `duration`, `note`, `icon`).
   - Ancres existantes : `massage`, `voyage`, `seminaire`, `drainage`, `suedois`, `tarifs`.

### Piège connu (icônes dans un Group `wrap="nowrap"`)
Une icône SVG Tabler placée à côté d'un texte long dans un `<Group wrap="nowrap">` se
**rétrécit** (flex-shrink) et désaligne le contenu. Toujours ajouter
`style={{ flexShrink: 0 }}` sur l'icône dans ce cas.

### Ordre des colonnes sur mobile
Sur `<Grid>`, les colonnes s'empilent dans l'ordre du DOM sur mobile. Ne pas utiliser
`order={{ base: ... }}` pour inverser image/texte : on veut le **texte (titre + description)
avant l'image** sur mobile. Laisser l'ordre naturel (colonne texte en premier).

## Charte / thème (défini dans `src/index.tsx`)

- `primaryColor: "brand"` (teal), `primaryShade: { light: 5, dark: 7 }`, `defaultRadius: "md"`.
- Police corps : `'Source Sans 3', Helvetica, sans-serif`. Nom du site/titres décoratifs : Josefin Sans.
- **Palettes** (`theme.colors`, index 0→9 clair→foncé) :
  - `brand` (teal) : `#E6F9F7 #B0EAE4 #7ADFD2 #4FD1C0 #30C1AE #1EB19E #0D9D8A #008577 #00705F #005C4B`.
    Repères en dur fréquents : `#1EB19E` (primaire/icônes), `#0D9D8A`, `#008577` (titres/icônes foncés),
    `#E6F9F7` (fond clair), `#F8FDFC`/`#F5FFFA` (fonds secondaires).
  - `accent` (violet), `nature` (vert), `neutral` (gris ; texte courant `neutral.7` = `#495057`).
- **Overrides composants** : `Title` → `color: brand.8` ; `Text` → `color: neutral.7` ;
  `Button` → `fontWeight: 500` ; `Card` → `shadow sm / padding md / radius md`.
- **`theme.other`** (valeurs custom) : `containerMaxWidth: 1200px`, `headerHeight: 70px`,
  `mainBackground: #F5FFFA` (mintcream), `secondaryBackground: #F8FDFC`,
  `standardTransition: all 0.3s ease`, `headingLineHeight: 1.3`, `bodyLineHeight: 1.6`,
  et `breakpoints` (xs 576 / sm 768 / md 992 / lg 1200 / xl 1400).
- **Spacing** : `xs 12px / sm 16px / md 24px / lg 32px / xl 48px`.
- Langue : **français** (textes, labels, libellés UI).

## État actuel & contexte métier

- La rubrique **« Atelier d'Expansion de Conscience »** (animée avec Michelle Resse) a été
  **remplacée** par **« Séminaire de Reconnexion au Corps et aux Émotions »**
  (`BodyReconnectionSeminarSection.tsx`, ancre `#seminaire`).
- **On ne travaille plus avec Michelle Resse** : son nom ne doit apparaître nulle part.
- Le séminaire (raccourci interne « Breathwork ») est animé par **Laura Ricciardelli**
  (thérapeute psycho-corporelle, Instagram @lauraeneveil) et **Denis Bensoussan**.
- 1ʳᵉ session : **9 → 12 juillet 2026**, **600€ tout compris** (hébergement, repas, séminaire).
- 3 lieux d'accueil des séminaires : **La Ferme du Ravin Bleu** (7 Rue Turgot, 77520
  Montigny-Lencoup), **Le Pont d'Ostara** (9 Chem. des Villerons, 77820 Le Châtelet-en-Brie),
  **La Vallée Rose** (1 chemin de la marnière, 28410 Goussainville).
- Image du séminaire : **placeholder** en attendant le visuel — déposer le fichier dans
  `public/images/seminaire-reconnexion.jpg` (un `fallbackSrc` placehold.co est en place).

## Dette technique / pièges à connaître

- **`Navbar.tsx`** : le `MobileNavbarItems` reçoit `currentPath={location.pathname}` mais
  `location` n'est **pas importé** dans `Navbar` (s'appuie sur le global `window.location`).
  Fonctionne mais fragile — préférer `useLocation()` de react-router si on y retouche.
- **`useScrollVisibility`** : le tableau d'ids est recréé à chaque render (passé inline depuis
  `Treatments`) ; ça reste OK fonctionnellement mais c'est une dépendance d'effet instable.
- Mantine 8 : `color` en `defaultProps` de `Title`/`Text` est l'ancienne API ; la prop moderne
  est `c`. Ne pas mélanger les deux sans raison.
- Pas de tests : valider **manuellement** (rendu + `yarn check`) après chaque modif.

## Préférences de travail observées

- Décisions UI/contenu validées via questions ciblées avant implémentation.
- Lancer `yarn check` (tsc) après chaque modification.
- Garder les fiches/sections sobres : éviter de surcharger (ex. ne pas dupliquer email +
  téléphone d'un intervenant alors que le formulaire de contact existe déjà).
