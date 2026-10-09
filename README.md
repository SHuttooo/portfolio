https://matthieu-vinet.fr/


## Refonte de la version de base

Le parcours avec ses colonnes Formations / Expériences, les compétences par domaine et le formulaire Formspree d’origine sont conservés. Les contenus des 18 fiches projets ont été rétablis depuis la version Git d’origine (5f733f1), y compris leurs chapitres, galeries et vidéos. La refonte conserve la présentation et les aperçus vidéo, sans remplacer les textes des projets. La typographie utilise désormais Segoe UI / Arial sans empattement, des tailles plus lisibles et aucune police externe. Les fiches alternent colonnes de lecture, compositions texte/média et médias larges, avec navigation précédent/suivant.

### Modifier les projets à la une

Dans `src/data/projects/<id>.json`, régler `"featured": true` pour mettre un projet à la une, ou `false` pour le remettre dans les autres projets. Aucun composant ou tableau d’identifiants à modifier. L’ordre reste celui des dates décroissantes, la taille et le badge suivent ce champ. Quatre projets sont actuellement à la une. `featuredLayout` choisit leur format : `standard` (paysage), `portrait` (image plus haute) ou `wide` (carte sur toute la largeur, image et texte côte à côte). Les autres projets utilisent toute la largeur de leur grille. `descFr` / `descEn` et les blocs conservent le contenu d’origine. `preview` désigne la vidéo locale utilisée au survol (muette, chargée à la demande, commande clavier/tactile, respect du mouvement réduit).

L’accueil affiche tous les projets à la une puis six autres projets, avant de proposer « Voir tous les projets ». Filtres et tri s’appliquent à tout le catalogue. Les cartes sans photo sont textuelles. Les CV publics v7 vérifiés sans téléphone sont conservés dans les fichiers `*-2026-v7-light.pdf` ; le script `cv-alias.mjs` maintient leurs URL stables.

Compilation : `npm run build`. Aperçu : `npm run preview -- --host 127.0.0.1 --port 4326`. La V4 expérimentale reste séparée. Aucun déploiement effectué.

Validation : compilation des 19 pages, contrôle des 359 références locales et ancres (`python scripts/check-site.py`), syntaxe du script client, affichage de 6 puis 18 projets, filtres, lecture muette/pause, navigation entre fiches, bascule FR/EN (titre et métadonnées compris), thème sombre et viewport mobile à 390 px sans débordement sur les vues examinées. Formulaire conservé avec ses champs obligatoires et son endpoint original ; aucun message de test envoyé. Empreintes des CV v7 identiques aux copies vérifiées de la V4.


### Styles et votes

Le bouton fixe « Styles » propose Atelier (bleu), Studio (vert clair / ardoise sombre), Éditorial (violet) et Solaire (jaune / graphite). `data-visual-style` définit les variantes CSS ; elles partagent les contenus FR/EN. La première visite tire un style au hasard parmi quatre, puis `portfolio-visual-style` conserve le choix dans le navigateur, indépendamment du mode clair/sombre.

Une petite invitation apparaît après 25 secondes, sans fond bloquant ni prise de focus. Elle attend si la page est masquée ou si un champ de formulaire est actif. Fermer, ouvrir le sélecteur ou appuyer sur Échap la masque. `portfolio-style-invitation-v1` empêche son retour aux visites suivantes ; le sélecteur reste accessible.

Les votes ne passent plus par Formspree : son quota est réservé au contact. Le sondage gratuit Tally est publié dans le compte de Matthieu : https://tally.so/r/QKg1Op. Il contient une question obligatoire, les quatre styles et aucune collecte de nom/email. Le lien public est configuré dans `src/data/voting.json`, champ `surveyUrl`. Pour changer de sondage, modifier ce champ puis recompiler. Le bouton de vote ouvre ce sondage. Tant que le lien est absent, le site indique honnêtement que le sondage ouvrira bientôt et n’envoie aucun vote. Les réponses se consultent dans https://tally.so/forms/QKg1Op/submissions et leur synthèse dans l’onglet Insights de ce formulaire. Aucun abonnement souscrit ni vote réel envoyé.

Vérification locale : `node scripts/check-style-votes.mjs` contrôle l’attribution parmi quatre styles et les règles de l’invitation ; `python scripts/check-site.py` contrôle les pages statiques.


### Compétences et vidéos des fiches

Chaque domaine affiche ses outils essentiels, définis par `essentialSkills` dans `src/data/skills.json` (indices à partir de zéro). Trois par défaut ; un domaine peut en garder quatre ou cinq visibles lorsqu’ils sont importants. « Détails + » déplie les autres puis disparaît ; « Réduire » referme la liste. `projects` contient la liste des identifiants affichés après clic sur « Projets liés à ce domaine » ; l’édition de cette liste ne modifie pas les textes des fiches.

Les 27 vidéos des fiches possèdent une image d’aperçu et leurs dimensions, via `src/data/video-posters.json`. Génération locale avec FFmpeg/ffprobe installés : `node scripts/video-posters.mjs`. Les images générées dans `public/video-posters` sont des fichiers statiques : le déploiement n’a pas besoin de FFmpeg. Les métadonnées vidéo ne sont chargées qu’à l’approche de la zone visible ; aucun lancement automatique sur les fiches.

Les trois technologies et les éventuels libellés de statut des vignettes se configurent dans `src/data/project-cards.json`. Les indices renvoient au tableau `stack` du projet : aucun texte de fiche n’est réécrit. Sans statut particulier, les champs `concept` / `wip` déterminent le statut affiché.

Les rubriques d’apprentissage occupent les dernières cases de la grille, à côté d’Automatique & Maths ; leur bordure pointillée les distingue des compétences acquises. Les listes de projets sont des exemples par domaine, pas une preuve pour chaque outil. Le sondage Tally est présenté comme un recueil indicatif, sans garantie contre les votes répétés.

Les fiches utilisent un conteneur de 1280 px maximum. `ProjectStory.astro` définit explicitement les associations texte/média par projet et par index de bloc ; tous les blocs restent rendus. La démonstration en tête utilise `preview` (également conservée à son emplacement dans le récit). Les chapitres sont placés avant le récit et le sommaire suit le chapitre actif. Sur petits écrans, les compositions repassent sur une colonne.
