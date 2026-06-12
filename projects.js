// ════════════════════════════════════════════════════════════════
//  PROJETS & COMPÉTENCES — projects.js
//
//  TYPES DE SOURCE (affiché sur la carte) :
//  source: 'industrial'  → Projet industriel
//  source: 'school'      → Projet de cours
//  source: 'robotech'    → Robotech (association)
//  source: 'perso'       → Projet personnel
// ════════════════════════════════════════════════════════════════

const SKILL_GROUPS = [
  {
    nameFr: 'Programmation',
    nameEn: 'Programming',
    icon: '💻',
    color: '#1a2fff',
    skills: ['C', 'C++', 'Python', 'JavaScript · HTML · CSS', 'Git · Linux · Makefile'],
    skillsEn: ['C', 'C++', 'Python', 'JavaScript · HTML · CSS', 'Git · Linux · Makefile'],
    levels: [3, 3, 3, 3, 2]
  },
  {
    nameFr: 'Robotique & Navigation',
    nameEn: 'Robotics & Navigation',
    icon: '🤖',
    color: '#1a2fff',
    skills: ['ROS2', 'Modélisation cinématique', 'SLAM', 'Odométrie', 'Suivi de trajectoire', 'PID · Correcteur P', 'Machine à états'],
    skillsEn: ['ROS2', 'Kinematic modelling', 'SLAM', 'Odometry', 'Path following', 'PID · P controller', 'State machine'],
    levels: [3, 2, 2, 2, 2, 3, 2]
  },
  {
    nameFr: 'Traitement du signal & Vision',
    nameEn: 'Signal Processing & Vision',
    icon: '👁️',
    color: '#1a2fff',
    skills: ['OpenCV', 'Image processing', 'Analyse de Fourier', 'Filtrage numérique', 'Reinforcement Learning', 'Apprentissage par imitation'],
    skillsEn: ['OpenCV', 'Image processing', 'Fourier analysis', 'Digital filtering', 'Reinforcement Learning', 'Imitation learning'],
    levels: [2, 2, 2, 2, 2, 1]
  },
  {
    nameFr: 'Mécanique & CAO',
    nameEn: 'Mechanics & CAD',
    icon: '⚙️',
    color: '#1a2fff',
    skills: ['SolidWorks', 'Éléments finis', 'Laser cutting', '3D printing', 'Mécanique des solides', 'Conception de mécanismes'],
    skillsEn: ['SolidWorks', 'Finite elements', 'Laser cutting', '3D printing', 'Solid mechanics', 'Mechanism design'],
    levels: [3, 1, 3, 2, 2, 3]
  },
  {
    nameFr: 'Électronique & Embarqué',
    nameEn: 'Electronics & Embedded',
    icon: '⚡',
    color: '#1a2fff',
    skills: ['Analog electronics', 'Électronique de puissance', 'Arduino · ESP32', 'Capteurs · Actionneurs', 'CAN Bus · PWM', 'Servomoteurs · Brushless'],
    skillsEn: ['Analog electronics', 'Power electronics', 'Arduino · ESP32', 'Sensors · Actuators', 'CAN Bus · PWM', 'Servomotors · Brushless'],
    levels: [2, 2, 3, 3, 2, 2]
  },
  {
    nameFr: 'Automatique & Maths',
    nameEn: 'Control Theory & Maths',
    icon: '📊',
    color: '#1a2fff',
    skills: ['Matlab / Simulink', 'Systèmes linéaires', 'Identification paramétrique', 'Probabilités · Statistiques', 'Filtre de Kalman', 'Minimax · Monte Carlo'],
    skillsEn: ['Matlab / Simulink', 'Linear systems', 'Parameter identification', 'Probability · Statistics', 'Kalman filter', 'Minimax · Monte Carlo'],
    levels: [2, 2, 1, 2, 2, 2]
  },
];

const SOURCES = {
  industrial: { fr:'Projet industriel', en:'Industrial project', color:'#475569', bg:'#f1f5f9', icon:'🏭' },
  school:     { fr:'Projet de cours',   en:'Course project',     color:'#475569', bg:'#f1f5f9', icon:'🎓' },
  robotech:   { fr:'Robotech',          en:'Robotech',           color:'#475569', bg:'#f1f5f9', icon:'🔧' },
  perso:      { fr:'Projet perso',      en:'Personal project',   color:'#475569', bg:'#f1f5f9', icon:'⚡' },
};

const PROJECTS = [

  // ── PERSO : ROBOT SEGWAY ──────────────────────────────────────
  {
    id: 'segway',
    titleFr: 'Robot segway autonome',
    titleEn: 'Autonomous Segway Robot',
    category: 'robotics',
    source: 'robotech',
    descFr: 'Conception d\'un robot à deux roues auto-équilibré (type segway). Objectif futur : IA de suivi de personnes, caméra et chatbot embarqué.',
    descEn: 'Self-balancing two-wheel robot (segway-type). Future goal: person-tracking AI, camera and embedded chatbot.',
    stack: ['C++','Arduino','IMU','IA','Electronics'],
    thumb: null,
    link: null,
    wip: true,
    blocks: [
      {
        type: 'text',
        contentFr: `Projet personnel actuellement à ses tout débuts — j'ai réuni les composants et la phase de conception est en cours.\n\n**Concept**\nLe robot possèdera deux roues (gauche et droite, comme un Segway) et devra maintenir son équilibre par un contrôle actif de son centre de gravité (filtre de Kalman, PID, IMU).\n\n**Évolutions prévues**\nUne fois la base stabilisée et fonctionnelle, l'objectif est d'y intégrer une caméra, un micro et une enceinte. Cela permettra d'embarquer une IA de suivi de personnes (Computer Vision) ainsi qu'un Chatbot pour interagir vocalement avec son environnement.`,
        contentEn: `Personal project in its early stages — components gathered, design phase underway.\n\n**Concept**\nTwo-wheel self-balancing robot (like a Segway), maintaining balance via active control (Kalman filter, PID, IMU).\n\n**Planned features**\nOnce stable, the goal is to add a camera, microphone and speaker — enabling a person-tracking AI and a voice chatbot.`
      },
    ]
  },

  // ── PROJET INDUSTRIEL : SERRE ──────────────────────────────────
  {
    id: 'serre',
    titleFr: 'AGRI-BOT — Robot mobile de supervision agricole',
    titleEn: 'AGRI-BOT — Agricultural Supervision Mobile Robot',
    category: 'robotics',
    source: 'industrial',
    descFr: 'Projet industriel ROB4 — AGRI-BOT, robot mobile autonome pour la télésurveillance de la serre connectée de Polytech Sorbonne. Navigation GPS RTK, téléopération, flux vidéo temps réel. Soutenance avril 2026.',
    descEn: 'Industrial project ROB4 — AGRI-BOT, autonomous mobile robot for remote supervision of Polytech Sorbonne\'s connected greenhouse. GPS RTK navigation, teleoperation, real-time video. Defended April 2026.',
    stack: ['ROS2','Python','C++','HTML/CSS/JS','GPS RTK','LiDAR','Arduino','Gazebo','SolidWorks'],
    thumb: 'serre/images/ihm_dashboard.png',
    link: 'https://github.com/SHuttooo/ros2_ws',
    wip: false,
    blocks: [
      // ── EN BREF : Problème → Approche → Résultat ──
      {
        type: 'text',
        contentFr: `## En bref

**Problème —** Polytech Sorbonne exploite une serre connectée sur le campus de Saint-Cyr, distant de Jussieu. Besoin : un robot mobile autonome capable de surveiller visuellement les cultures et d'être téléopéré à distance, en intérieur comme en extérieur, sur terrain mixte (herbe/gravier) et par tous temps.

**Approche —** Base mobile étanche Curt Mini (IP68), localisation GPS RTK fusionnée par filtre de Kalman étendu (EKF), LiDAR reconverti en bouclier de sécurité, et simulation Gazebo fidèle au site réel. Mon périmètre personnel : l'IHM web de téléopération (conçue de A à Z) et la conception/fabrication du bras pantographe motorisé.

**Résultat —** Dashboard web fonctionnel (flux vidéo < 0,5 s de latence, téléopération + contrôle PTZ, missions de navigation sur carte 2D, galerie synchronisée hors-ligne, accès sécurisé Tailscale) ; bras pantographe (prototype MDF) asservi en position et piloté depuis l'IHM ; localisation GPS RTK vérifiée à 1–5 cm (40 points croisés). Structure finale en plexiglas découpée au laser (assemblage à venir). Projet open-source, 4 documentations livrées, défendu en avril 2026.`,
        contentEn: `## At a glance

**Problem —** Polytech Sorbonne runs a connected greenhouse on the Saint-Cyr campus, far from Jussieu. The need: an autonomous mobile robot able to visually monitor crops and be teleoperated remotely, indoors and outdoors, on mixed terrain (grass/gravel) and in any weather.

**Approach —** Waterproof Curt Mini mobile base (IP68), RTK GPS localization fused with an Extended Kalman Filter (EKF), LiDAR repurposed as a safety shield, and a Gazebo simulation faithful to the real site. My personal scope: the web teleoperation HMI (built from scratch) and the design/fabrication of the motorized pantograph arm.

**Result —** Functional web dashboard (video stream < 0.5 s latency, teleoperation + PTZ control, 2D-map navigation missions, offline-synced gallery, secure Tailscale access); pantograph arm (MDF prototype) under position control and driven from the HMI; RTK GPS localization verified at 1–5 cm (40 cross-checked points). Final plexiglass structure laser-cut (assembly pending). Open-source project, 4 documentations delivered, defended in April 2026.`
      },
      // ── INTRO ──
      {
        type: 'text',
        contentFr: `Projet industriel de 2ème année à Polytech Sorbonne, réalisé en équipe avec **Fatoumata Diallo** et **Pierre-Louis Pasutto**, encadré par Aline Baudry. Soutenance finale en avril 2026.

L'objectif : concevoir **AGRI-BOT**, un robot mobile capable de circuler à l'intérieur et à l'extérieur de la serre connectée du campus de Saint-Cyr, d'assurer le suivi visuel des cultures et de permettre une téléopération complète depuis Jussieu. Projet open-source, ROS2-compatible, documenté pour être repris par les futures promotions.

La base mobile retenue est le **Curt Mini (Fraunhofer IPA)** — moteurs IP68, garde au sol 15,5 cm, 30 kg de charge utile, compatibilité native ROS2 Jazzy. Après comparaison avec le Jackal (Clearpath) et le Scout Mini (Agilex), c'est le seul à répondre simultanément aux contraintes d'étanchéité (IP68), de terrain mixte herbe/gravier et de charge utile suffisante pour le bras et les équipements.`,
        contentEn: `Second-year industrial project at Polytech Sorbonne, carried out as a team with **Fatoumata Diallo** and **Pierre-Louis Pasutto**, supervised by Aline Baudry. Final presentation in April 2026.

The goal: design **AGRI-BOT**, a mobile robot able to navigate inside and outside the connected greenhouse on the Saint-Cyr campus, monitor crops visually, and enable full teleoperation from Jussieu. Open-source project, ROS2-compatible, fully documented for future teams.

The chosen mobile base is the **Curt Mini (Fraunhofer IPA)** — IP68 motors, 15.5 cm ground clearance, 30 kg payload, native ROS2 Jazzy support. After comparing it with the Jackal (Clearpath) and Scout Mini (Agilex), it was the only one meeting all constraints simultaneously: waterproofing (IP68), mixed terrain, and sufficient payload.`
      },
      {
        type: 'gallery',
        images: ['serre/images/photo_generer_ia_robot_pantographe.JPG', 'serre/images/CURT.jpg'],
        columns: 2,
        autoHeight: true,
        captionFr: 'Concept AGRI-BOT (image IA) — base mobile Curt Mini (Fraunhofer IPA)',
        captionEn: 'AGRI-BOT concept (AI image) — Curt Mini mobile base (Fraunhofer IPA)'
      },
      {
        type: 'image',
        src: 'serre/images/demo_serre.png',
        captionFr: 'La serre géodésique connectée du campus de Saint-Cyr',
        captionEn: 'The connected geodesic greenhouse on Saint-Cyr campus'
      },

      // ── IHM ──
      {
        type: 'text',
        contentFr: `## Mon rôle — Interface de supervision (IHM)

J'ai conçu et développé le **dashboard web de téléopération** de A à Z. Stack : HTML, CSS, JavaScript côté client — Python pour la passerelle ROS2/WebSocket.

Fonctionnalités intégrées :
- **Flux vidéo temps réel** (< 0,5 s de latence) via MediaMTX + caméra Reolink TrackMix 4K PTZ
- **Téléopération clavier** du robot et **contrôle PTZ** de la caméra (pan/tilt/zoom/focus)
- **Navigation par carte 2D** — composition de missions complexes point par point, zones interdites détectées automatiquement, vue intérieure/extérieure
- **Arrêt d'urgence**, réglages vitesse/bras/caméra
- **Galerie photos/vidéos** avec synchronisation automatique hors-ligne : le robot continue de capturer même sans réseau, puis synchronise au retour (purge automatique tous les 10 jours)
- Accès sécurisé via VPN **Tailscale** — IP fixe, pas d'ouverture de port, traverse les pare-feux du campus`,
        contentEn: `## My role — Supervision Interface (HMI)

I designed and built the full **web teleoperation dashboard** from scratch. Stack: HTML, CSS, JavaScript client-side — Python for the ROS2/WebSocket bridge.

Features:
- **Real-time video stream** (< 0.5 s latency) via MediaMTX + Reolink TrackMix 4K PTZ camera
- **Keyboard teleoperation** of the robot and **PTZ control** of the camera (pan/tilt/zoom/focus)
- **2D map navigation** — compose complex missions point by point, forbidden zones detected automatically, indoor/outdoor view
- **Emergency stop**, speed/arm/camera adjustments
- **Photo/video gallery** with automatic offline sync: the robot keeps capturing without network and syncs on reconnection (auto-purge every 10 days)
- Secure access via **Tailscale** VPN — fixed IP, no port forwarding, bypasses campus firewalls`
      },
      {
        type: 'image',
        src: 'serre/images/Ihm_page_principal.png',
        captionFr: 'Page principale — flux vidéo temps réel, téléopération clavier, contrôle PTZ et réglages du robot',
        captionEn: 'Main page — real-time video stream, keyboard teleoperation, PTZ control and robot settings'
      },
      {
        type: 'gallery',
        images: ['serre/images/ihm_page_navigation.png', 'serre/images/ihm_avec_simulation_navigation.png'],
        columns: 2,
        captionFr: 'Page navigation — carte 2D interactive et simulation de navigation avec le robot virtuel',
        captionEn: 'Navigation page — interactive 2D map and navigation simulation with virtual robot'
      },
      {
        type: 'image',
        src: 'serre/images/ihm_page_galerie.png',
        captionFr: 'Page galerie — synchronisation automatique des photos et vidéos du robot',
        captionEn: 'Gallery page — automatic photo and video sync from the robot'
      },

      // ── PANTOGRAPHE ──
      {
        type: 'text',
        contentFr: `## Mon rôle — Bras pantographe motorisé

J'ai conçu et fabriqué le **bras pantographe** permettant d'ajuster la hauteur de la caméra de 30 cm (replié) à 140 cm déployé (robot + caméra inclus), pour s'adapter à la hauteur variable des cultures.

**Deux prototypes en MDF** (fraiseuse) :
- Prototype 1 : 3 étages, tiges courtes
- Prototype 2 (final) : 2 étages, diagonales plus longues — moins de pertes aux rotations, contrainte de hauteur largement atteinte

**Actionnement :** vérin récupéré d'un ancien projet (étanche, 12 V) fixé entre la base et la première intersection — optimise l'espace occupé au repos.

**Architecture de contrôle (Arduino Mega + RoboClaw) :**
- Pont Python ROS2 ↔ série USB, filtré à 5 Hz max, reconnexion automatique
- Asservissement en position : correcteur proportionnel avec profil trapézoïdal (limites d'accélération et de vitesse min/max) — démarrage en douceur, pas de choc mécanique
- Relais 5 V commandé par Arduino : coupe le RoboClaw dès que la cible est atteinte (erreur < 2 % pendant 2 s) → économie de batterie. Possible car le vérin est irréversible (fort rapport de réduction)
- Fusible 2,5 A pour protéger le vérin (3 A max)

**→ Toutes les photos et vidéos ci-dessous montrent le prototype en MDF.**`,
        contentEn: `## My role — Motorized pantograph arm

I designed and built the **pantograph arm** to adjust camera height from 30 cm (folded) to 140 cm deployed (robot + camera), adapting to varying crop heights.

**Two MDF prototypes** (CNC router):
- Prototype 1: 3 stages, short rods
- Prototype 2 (final): 2 stages, longer diagonals — fewer rotation losses, height target easily met

**Actuation:** recycled linear actuator from a previous project (waterproof, 12 V), mounted between the base end and the first intersection — minimizes footprint at rest.

**Control architecture (Arduino Mega + RoboClaw):**
- Python bridge ROS2 ↔ USB serial, filtered to 5 Hz max, auto-reconnect
- Position control: proportional controller with trapezoidal profile (acceleration and min/max speed limits) — smooth start, no mechanical shock
- 5 V relay driven by Arduino: cuts the RoboClaw once target is reached (< 2% error for 2 s) → battery saving. Safe because the actuator is mechanically irreversible
- 2.5 A fuse to protect the actuator (3 A max)

**→ All photos and videos below show the MDF prototype.**`
      },
      {
        type: 'image',
        hero: true,
        src: 'serre/images/pantographe_ihm.jpg',
        captionFr: 'Commande du pantographe depuis l\'IHM — prototype MDF en mouvement via le dashboard web',
        captionEn: 'Pantograph controlled from the HMI — MDF prototype in motion via the web dashboard'
      },
      {
        type: 'image',
        size: 'medium',
        src: 'serre/images/simulation_solidworks_pantographe.gif',
        captionFr: 'Simulation SolidWorks — cinématique de déploiement du pantographe',
        captionEn: 'SolidWorks simulation — pantograph deployment kinematics'
      },
      {
        type: 'gallery',
        images: ['serre/images/pantographe.jpg', 'serre/images/box_electronique.jpg'],
        columns: 2,
        captionFr: 'Prototype MDF du bras (2 étages, vérin récupéré) — boîtier électronique (Arduino Mega, RoboClaw, relais 5 V, fusible 2,5 A)',
        captionEn: 'MDF arm prototype (2 stages, recycled actuator) — electronics box (Arduino Mega, RoboClaw, 5 V relay, 2.5 A fuse)'
      },
      {
        type: 'video',
        src: 'serre/videos/presentation_test_pantographe_ihm.mp4',
        captionFr: 'Démonstration du prototype MDF — déploiement du bras commandé depuis l\'IHM web',
        captionEn: 'MDF prototype demo — arm deployment controlled from the web HMI'
      },

      // ── NAVIGATION ──
      {
        type: 'text',
        contentFr: `## Navigation — travail d'équipe

- **Localisation :** GPS RTK (simpleRTK2B, précision 1–5 cm vérifiée à Saint-Cyr, 40 points croisés avec Google Maps) utilisé partout — y compris à l'intérieur de la serre dont la structure laisse passer le signal. Fusion GPS RTK + odométrie + IMU via filtre de Kalman étendu (EKF).
- **LiDAR Hokuyo :** rôle redéfini après test terrain — le SLAM était impossible (géométrie trop symétrique). Utilisé exclusivement comme bouclier de sécurité (270°, 40 Hz), zone d'arrêt d'urgence de 50 × 60 cm.
- **Simulation Gazebo :** réplique fidèle du site de Saint-Cyr (coordonnées GPS réelles, bâtiments, obstacles) — tout se transfère directement sur le robot réel sans réécriture.
- **Missions autonomes :** Nav2 (A* / DWA), retour automatique au point home, mode hors-ligne.
- **4 documentations** livrées sur GitHub : livret d'utilisation, configuration, problèmes récurrents, explication du code.`,
        contentEn: `## Navigation — team work

- **Localization:** RTK GPS (simpleRTK2B, 1–5 cm precision at Saint-Cyr, 40 points cross-checked with Google Maps) used everywhere — including inside the greenhouse. GPS RTK + odometry + IMU fusion via EKF.
- **Hokuyo LiDAR:** role redefined after field testing — SLAM was impossible (symmetric geometry). Used exclusively as a safety shield (270°, 40 Hz), 50 × 60 cm emergency stop zone.
- **Gazebo simulation:** faithful replica of the Saint-Cyr site (real GPS coordinates) — transfers directly to the real robot without rewriting.
- **Autonomous missions:** Nav2 (A* / DWA), automatic return to home point, offline mode.
- **4 documentations** on GitHub: user guide, configuration, recurring issues, code explanation.`
      },

      // ── PLEXIGLASS – EN FIN ──
      {
        type: 'video',
        src: 'serre/videos/decoupage_de_la_structure_en_plexiglass.mp4',
        captionFr: 'Découpe laser de la structure finale en plexiglas — toutes les pièces sont prêtes, l\'assemblage sera réalisé prochainement',
        captionEn: 'Laser cutting of the final plexiglass structure — all parts are ready, assembly coming soon'
      },

      // ── CREDITS ──
      {
        type: 'text',
        contentFr: `Crédits — **Matthieu Vinet** (IHM · bras pantographe) · **Pierre-Louis Pasutto** (navigation autonome · simulation Gazebo) · **Fatoumata Diallo** (caméra PTZ · intégration LiDAR) — Encadrant : Aline Baudry`,
        contentEn: `Credits — **Matthieu Vinet** (HMI · pantograph arm) · **Pierre-Louis Pasutto** (autonomous navigation · Gazebo simulation) · **Fatoumata Diallo** (PTZ camera · LiDAR integration) — Supervisor: Aline Baudry`
      },
    ]
  },

  // ── COURS : TP REINFORCEMENT LEARNING (EASY21) ───────────────
  {
    id: 'easy21-rl',
    titleFr: 'Apprentissage par renforcement — Easy21',
    titleEn: 'Reinforcement Learning — Easy21',
    category: 'software',
    source: 'school',
    descFr: 'TP de cours RL \u2014 impl\u00e9mentation de Sarsa(\u03bb) avec approximation lin\u00e9aire et Q-Learning sur le jeu de cartes Easy21. Comparaison des algorithmes de la famille TD.',
    descEn: 'RL course lab \u2014 implementation of Sarsa(\u03bb) with linear approximation and Q-Learning on the Easy21 card game. Comparison of TD-family algorithms.',
    stack: ['Python','NumPy','Reinforcement Learning','Sarsa','Q-Learning','Monte-Carlo'],
    thumb: null,
    link: null,
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `TP de cours d'apprentissage par renforcement \u00e0 Polytech Sorbonne, r\u00e9alis\u00e9 en bin\u00f4me.

**Le jeu Easy21**

Easy21 est une variante simplifi\u00e9e du Blackjack avec un jeu de cartes infini. Les cartes peuvent \u00eatre rouges (soustraites, prob. 1/3) ou noires (ajout\u00e9es, prob. 2/3). Le joueur peut tirer (hit) ou rester (stick), et est \u00e9limin\u00e9 si sa somme sort de [1, 21].

**Ce que j'ai impl\u00e9ment\u00e9**

- **Approximation lin\u00e9aire de la fonction de valeur** : plut\u00f4t que stocker une valeur par paire (\u00e9tat, action), on repr\u00e9sente Q(s,a) comme un produit scalaire entre un vecteur de caract\u00e9ristiques binaires \u03d5(s,a) \u2208 {0,1}^36 et un vecteur de param\u00e8tres \u03b8 \u2208 R^36. Le vecteur de caract\u00e9ristiques est construit par **codage grossier** (coarse coding) avec des intervalles qui se chevauchent sur la carte du croupier, la somme du joueur et l'action.

- **Sarsa(\u03bb) avec approximation lin\u00e9aire** : traces d'\u00e9ligibilit\u00e9 accumul\u00e9es (e_t \u2190 \u03b3\u03bbe_{t-1} + \u03d5), mise \u00e0 jour des param\u00e8tres \u03b8 \u2190 \u03b8 + \u03b1 \u00b7 \u03b4_t \u00b7 e_t. Test\u00e9 pour \u03bb \u2208 {0, 0.1, ..., 1} sur 1 000 \u00e9pisodes, avec comparaison de la MSE par rapport aux valeurs vraies Q* obtenues par Monte-Carlo.

- **Q-Learning** : algorithme hors-politique (off-policy). Contrairement \u00e0 Sarsa qui suit la politique courante, Q-Learning cible directement la politique greedy : Q(s,a) \u2190 Q(s,a) + \u03b1[r + max_a' Q(s',a') - Q(s,a)]. Taux d'exploration \u03b5-greedy variable avec N0 = 100.

**Ce que j'ai appris**

La diff\u00e9rence fondamentale entre algorithmes **on-policy** (Sarsa, qui apprend la politique qu'il suit) et **off-policy** (Q-Learning, qui apprend la politique optimale ind\u00e9pendamment de son comportement). Le codage grossier permet une g\u00e9n\u00e9ralisation entre les \u00e9tats voisins, mais au prix d'une pr\u00e9cision r\u00e9duite par rapport \u00e0 la repr\u00e9sentation tabulaire sur un espace d'\u00e9tats aussi petit qu'Easy21.`,
        contentEn: `Reinforcement learning course lab at Polytech Sorbonne, done in pairs.

**The Easy21 game**

Easy21 is a simplified Blackjack variant with an infinite deck. Cards can be red (subtracted, prob. 1/3) or black (added, prob. 2/3). The player can hit or stick, and busts if their sum leaves [1, 21].

**What I implemented**

- **Linear value function approximation**: instead of storing one value per (state, action) pair, Q(s,a) is represented as a dot product between a binary feature vector \u03d5(s,a) \u2208 {0,1}^36 and a parameter vector \u03b8 \u2208 R^36. The feature vector is built using **coarse coding** with overlapping intervals over the dealer card, player sum and action.

- **Sarsa(\u03bb) with linear approximation**: accumulated eligibility traces (e_t \u2190 \u03b3\u03bbe_{t-1} + \u03d5), parameter update \u03b8 \u2190 \u03b8 + \u03b1 \u00b7 \u03b4_t \u00b7 e_t. Tested for \u03bb \u2208 {0, 0.1, ..., 1} over 1,000 episodes, with MSE compared to the true Q* values from Monte-Carlo.

- **Q-Learning**: off-policy algorithm. Unlike Sarsa which follows the current policy, Q-Learning targets the greedy policy directly: Q(s,a) \u2190 Q(s,a) + \u03b1[r + max_a' Q(s',a') - Q(s,a)]. Variable \u03b5-greedy exploration with N0 = 100.

**What I learned**

The fundamental difference between **on-policy** (Sarsa, which learns the policy it follows) and **off-policy** (Q-Learning, which learns the optimal policy regardless of behavior). Coarse coding enables generalization between neighboring states, but at the cost of reduced precision compared to tabular representation on a state space as small as Easy21.`
      },
    ]
  },

  // ── ROBOTECH : AVION RC POLYSTYRÈNE ────────────────────────────
  {
    id: 'avion-rc',
    titleFr: 'Avion RC en polystyrène',
    titleEn: 'Polystyrene RC Plane',
    category: 'hardware',
    source: 'robotech',
    descFr: 'Avion radiocommandé en polystyrène — moteur brushless, batterie LiPo 3S, ESC 30A, ESP32. En cours de développement avec Maxime Bondil.',
    descEn: 'Polystyrene RC plane — brushless motor, 3S LiPo battery, 30A ESC, ESP32. In development with Maxime Bondil.',
    stack: ['Polystyrène','Brushless','ESC 30A','LiPo 3S','ESP32','Servomotors'],
    thumb: 'avion_rc_polystyrene/images/avion_1.jpg',
    link: 'https://www.youtube.com/watch?v=cA379JRswz8',
    linkLabel: '<span class="fr">Vidéo d\'inspiration (YouTube)</span><span class="en">Inspiration video (YouTube)</span>',
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Réalisation d'un avion radiocommandé en polystyrène, inspiré en partie d'un tutoriel YouTube, avec Maxime Bondil dans le cadre de Robotech.

La structure de l'avion est taillée dans du polystyrène expansé et renforcée au ruban adhésif. La chaîne de propulsion complète a été intégrée à l'intérieur du fuselage :

- **Moteur brushless** + hélice jaune pour la propulsion
- **Contrôleur brushless (ESC) 30A** pour piloter le moteur
- **Batterie LiPo 3S 2200 mAh** comme source d'énergie
- **ESP32** pour la réception des commandes RC
- **Réducteur de tension** pour alimenter l'électronique
- **Bouton on/off** pour la mise sous tension

Projet en cours — les essais moteur sont concluants, les vols test sont en préparation.`,
        contentEn: `Construction of a polystyrene RC plane, partly inspired by a YouTube tutorial, with Maxime Bondil at Robotech.

The airframe is carved from expanded polystyrene and reinforced with adhesive tape. The full propulsion chain is integrated inside the fuselage:

- **Brushless motor** + yellow propeller for thrust
- **30A Brushless ESC** to drive the motor
- **3S 2200 mAh LiPo battery** as power source
- **ESP32** for RC command reception
- **Voltage regulator** to power electronics
- **On/off switch** for power control

Project in progress — motor tests are successful, flight tests are in preparation.`
      },
      {
        type: 'gallery',
        images: ['avion_rc_polystyrene/images/avion_1.jpg', 'avion_rc_polystyrene/images/avion_2.jpg'],
        captionFr: 'L\'avion assemblé — structure polystyrène, moteur brushless et hélice',
        captionEn: 'Assembled plane — polystyrene structure, brushless motor and propeller'
      },
      {
        type: 'video-duo',
        videos: [
          { src: 'avion_rc_polystyrene/videos/test_moteur.mp4', captionFr: 'Test du moteur brushless', captionEn: 'Brushless motor test' },
          { src: 'avion_rc_polystyrene/videos/avion_2.mp4', captionFr: "Tour de l'avion — assemblage en cours", captionEn: 'Walk-around — assembly in progress' }
        ]
      },
      {
        type: 'video',
        src: 'avion_rc_polystyrene/videos/final.mp4',
        captionFr: 'Vidéo finale',
        captionEn: 'Final video'
      },
    ]
  },

  // ── ROBOTECH : VOITURE ESP32 ────────────────────────────────────
  {
    id: 'voitures-rc',
    titleFr: 'Robot mobile télécommandé via ESP-NOW',
    titleEn: 'ESP-NOW Remote-Controlled Robot',
    category: 'robotics',
    source: 'robotech',
    descFr: 'Véhicule robotique à 2 roues piloté par une manette personnalisée via le protocole ESP-NOW — communication directe P2P entre deux ESP32, sans Wi-Fi ni Bluetooth.',
    descEn: '2-wheel robotic vehicle controlled by a custom joystick via ESP-NOW — direct P2P communication between two ESP32s, no Wi-Fi or Bluetooth needed.',
    stack: ['ESP32','ESP-NOW','C++','DRV8833','PWM','Li-Ion'],
    thumb: 'petites_voitures_esp32/images/voiture.jpg',
    link: null,
    wip: false,
    blocks: [
      {
        type: 'image',
        src: 'petites_voitures_esp32/images/voiture.jpg',
        captionFr: 'Le robot — ESP32, driver DRV8833, batteries Li-Ion 18650',
        captionEn: 'The robot — ESP32, DRV8833 driver, Li-Ion 18650 batteries'
      },
      {
        type: 'text',
        contentFr: `**Concept**

L'idée était de créer un véhicule rapide et réactif en utilisant deux ESP32 qui communiquent en direct via le protocole ESP-NOW, sans avoir besoin de Wi-Fi ou de Bluetooth. Ce protocole Peer-to-Peer garantit une portée élevée et une latence quasi nulle, idéale pour le pilotage en temps réel.

**Matériel**

Le robot utilise deux moteurs DC avec réducteur (type "jaune TT", rapport 1:48), pilotés par un driver DRV8833 (double pont en H) — plus compact que le L298N classique, avec moins de chauffe. L'alimentation est assurée par 3 batteries Li-Ion 18650 en série (11,1V) abaissées à 5V par un régulateur L7805CV pour l'électronique.

La manette est un ESP32 avec un joystick analogique 2 axes + bouton (turbo).

**Pilotage différentiel (type tank)**

Le robot n'a pas de roues directrices — il tourne en créant une différence de vitesse entre les deux roues :
Vitesse moteur gauche = Avancement + Rotation
Vitesse moteur droit = Avancement - Rotation

**Sécurités intégrées**

Zone morte logicielle pour éviter le drift au repos, atténuation de la direction (60%) pour des virages plus fluides, PWM à 30 kHz (inaudible), et failsafe automatique : si la connexion est perdue plus d'1 seconde, le robot s'arrête immédiatement.

**Évolutions prévues**

Remplacer le régulateur linéaire L7805CV (qui chauffe) par un régulateur à découpage (Buck Converter) pour améliorer le rendement et l'autonomie.`,
        contentEn: `**Concept**

The goal was to build a fast, responsive vehicle using two ESP32s communicating directly via ESP-NOW — no Wi-Fi or Bluetooth required. This Peer-to-Peer protocol ensures high range and near-zero latency, ideal for real-time control.

**Hardware**

The robot uses two DC motors with gearbox (1:48 "yellow TT" type), driven by a DRV8833 module (dual H-bridge) — more compact than the classic L298N, with better thermal efficiency. Power comes from 3x Li-Ion 18650 cells in series (11.1V), stepped down to 5V by an L7805CV regulator for the electronics.

The controller is an ESP32 with a 2-axis analog joystick and push button (turbo).

**Differential drive (tank mode)**

No steering wheels — the robot turns by creating a speed difference between the two motors:
Left motor speed = Throttle + Steering
Right motor speed = Throttle - Steering

**Built-in safety features**

Software deadzone to prevent drift at rest, steering attenuation (60%) for smoother turns, 30 kHz PWM (silent to human ears), and automatic failsafe: if the connection is lost for more than 1 second, the robot cuts power immediately.

**Planned improvements**

Replace the linear L7805CV regulator (which overheats) with a switching Buck Converter for better efficiency and battery life.`
      },
      {
        type: 'video',
        src: 'petites_voitures_esp32/videos/demo.mp4',
        captionFr: 'Démonstration du robot télécommandé',
        captionEn: 'Remote-controlled robot demo'
      },
      {
        type: 'code',
        titleFr: '📡 Code Émetteur (Manette)',
        titleEn: '📡 Emitter Code (Controller)',
        language: 'cpp',
        content: `#include <esp_now.h>
#include <WiFi.h>

// --- PINS JOYSTICK ---
const int VRX_PIN = 34;
const int VRY_PIN = 35;
const int SW_PIN  = 32;

// --- ADRESSE MAC DU ROBOT ---
uint8_t broadcastAddress[] = {0x4C, 0xC3, 0x82, 0xDB, 0x0F, 0xC0};

typedef struct struct_message {
  int x;
  int y;
  bool switchPressed;
} struct_message;

struct_message myData;
esp_now_peer_info_t peerInfo;

void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {}

void setup() {
  Serial.begin(115200);
  pinMode(VRX_PIN, INPUT);
  pinMode(VRY_PIN, INPUT);
  pinMode(SW_PIN, INPUT_PULLUP);
  WiFi.mode(WIFI_STA);
  if (esp_now_init() != ESP_OK) return;
  esp_now_register_send_cb(OnDataSent);
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;
  esp_now_add_peer(&peerInfo);
}

void loop() {
  myData.x = map(analogRead(VRX_PIN), 0, 4095, 255, -255);
  myData.y = map(analogRead(VRY_PIN), 0, 4095, -255, 255);
  if (abs(myData.x) < 30) myData.x = 0;
  if (abs(myData.y) < 30) myData.y = 0;
  myData.switchPressed = (digitalRead(SW_PIN) == LOW);
  esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
  delay(20);
}`
      },
      {
        type: 'code',
        titleFr: '🤖 Code Récepteur (Robot)',
        titleEn: '🤖 Receiver Code (Robot)',
        language: 'cpp',
        content: `#include <esp_now.h>
#include <WiFi.h>

// --- PINS MOTEURS ---
const int IN1 = 13, IN2 = 12, IN3 = 14, IN4 = 27;
const int freq = 30000, resolution = 8;
const int ch_IN1 = 0, ch_IN2 = 1, ch_IN3 = 2, ch_IN4 = 3;

typedef struct struct_message {
  int x, y;
  bool switchPressed;
} struct_message;

struct_message myData;
unsigned long lastRecvTime = 0;

void driveMotor(int ch_A, int ch_B, int speed) {
  if (speed > 0)      { ledcWrite(ch_A, speed);  ledcWrite(ch_B, 0); }
  else if (speed < 0) { ledcWrite(ch_A, 0);      ledcWrite(ch_B, -speed); }
  else                { ledcWrite(ch_A, 0);      ledcWrite(ch_B, 0); }
}

void OnDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len) {
  memcpy(&myData, incomingData, sizeof(myData));
  lastRecvTime = millis();
  int throttle = myData.y, steering = myData.x;
  if (abs(throttle) < 30) throttle = 0;
  if (abs(steering) < 30) steering = 0;
  if (steering != 0) steering = steering * 0.6;
  int L = constrain(throttle + steering, -255, 255);
  int R = constrain(throttle - steering, -255, 255);
  driveMotor(ch_IN1, ch_IN2, L);
  driveMotor(ch_IN3, ch_IN4, R);
}

void setup() {
  ledcSetup(ch_IN1, freq, resolution); ledcAttachPin(IN1, ch_IN1);
  ledcSetup(ch_IN2, freq, resolution); ledcAttachPin(IN2, ch_IN2);
  ledcSetup(ch_IN3, freq, resolution); ledcAttachPin(IN3, ch_IN3);
  ledcSetup(ch_IN4, freq, resolution); ledcAttachPin(IN4, ch_IN4);
  driveMotor(ch_IN1, ch_IN2, 0);
  driveMotor(ch_IN3, ch_IN4, 0);
  WiFi.mode(WIFI_STA);
  if (esp_now_init() != ESP_OK) return;
  esp_now_register_recv_cb(OnDataRecv);
}

void loop() {
  if (millis() - lastRecvTime > 1000) {
    driveMotor(ch_IN1, ch_IN2, 0);
    driveMotor(ch_IN3, ch_IN4, 0);
  }
  delay(10);
}`
      },
    ]
  },

  // ── PERSO : SITES VITRINES (FREELANCE) ────────────────────────
  {
    id: 'sites-vitrines',
    titleFr: 'Sites web vitrines — conception & déploiement',
    titleEn: 'Showcase websites — design & deployment',
    category: 'web',
    source: 'perso',
    descFr: 'Projet personnel : je conçois, déploie et industrialise des sites vitrines de A à Z. Preuve concrète de compétences transférables — autonomie, livraison end-to-end et mise en production réelle.',
    descEn: 'Personal project: I design, deploy and industrialize showcase websites end-to-end. Concrete proof of transferable skills — autonomy, end-to-end delivery and real production deployment.',
    stack: ['HTML/CSS/JS','Cloudflare Pages','Git','Responsive','SEO'],
    thumb: null,
    link: 'https://demo.matthieu-vinet.fr',
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `## Objectif

En parallèle de mes études, je conçois des sites web vitrines complets — de la page blanche à la mise en production. L'intérêt ici n'est pas commercial : c'est une **preuve concrète de compétences transférables** utiles en ingénierie, qui montre que je sais **livrer un produit de A à Z, en autonomie et avec rigueur**.

## Ce que je gère de bout en bout

- **Conception** : structure, design responsive et accessible
- **Développement** : intégration HTML/CSS/JS, optimisation des performances (chargement, images, lazy-loading)
- **Mise en production** : déploiement sur **Cloudflare Pages**, configuration du domaine et du HTTPS, intégration continue via Git
- **Industrialisation** : structure réutilisable, déploiement automatisé, maintenance et itérations

## Compétences démontrées

Autonomie complète, sens du produit fini, rigueur et capacité à livrer dans un vrai cadre de production — les mêmes réflexes que ceux que j'applique à mes projets robotique. Ce portfolio en est lui-même un exemple.`,
        contentEn: `## Goal

Alongside my studies, I build complete showcase websites — from blank page to production. The point here is not commercial: it is **concrete proof of transferable skills** relevant to engineering, showing that I can **ship a product end-to-end, autonomously and rigorously**.

## What I handle end-to-end

- **Design**: structure, responsive and accessible design
- **Development**: HTML/CSS/JS integration, performance optimization (loading, images, lazy-loading)
- **Production deployment**: deployment on **Cloudflare Pages**, domain and HTTPS setup, continuous integration via Git
- **Industrialization**: reusable structure, automated deployment, maintenance and iterations

## Skills demonstrated

Full autonomy, a product mindset, rigor and the ability to deliver in a real production setting — the same reflexes I apply to my robotics projects. This very portfolio is one example.`
      },
    ]
  },

  // ── ROBOTECH : SO-101 (HUGGING FACE) ──────────────────────────
  {
    id: 'so101',
    titleFr: 'Robot SO-101 — Hugging Face',
    titleEn: 'SO-101 Robot — Hugging Face',
    category: 'robotics',
    source: 'robotech',
    descFr: "Impression 3D et assemblage du robot open-source SO-101 de Hugging Face — bras manipulateur 6 axes avec servomoteurs, conçu pour l'apprentissage par imitation (LeRobot).",
    descEn: 'Design and assembly of the open-source SO-101 robot from Hugging Face — 6-axis manipulator arm with servomotors, designed for imitation learning (LeRobot).',
    stack: ['3D printing','Servomotors','Python','LeRobot','Linux'],
    thumb: 'so101/images/so101_1.jpg',
    link: 'https://huggingface.co/docs/lerobot/so101',
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Impression 3D et assemblage complet du robot **SO-101** de Hugging Face, dans le cadre de l'association Robotech.

Le SO-101 est un bras manipulateur open-source à 6 degrés de liberté (DDL), conçu pour être utilisé avec le framework **LeRobot** de Hugging Face. L'objectif est d'entraîner le robot par **apprentissage par imitation** : on guide le bras manuellement pour lui apprendre des tâches, et il les reproduit ensuite de façon autonome.

L'ensemble des pièces structurelles a été imprimé en 3D au FabLab de Polytech. Deux robots ont été fabriqués simultanément (violet et noir) pour constituer un système maître-esclave : l'un sert de télécommande manuelle, l'autre exécute les mouvements.`,
        contentEn: `3D printing and full assembly of the **SO-101** robot by Hugging Face, at Robotech.

The SO-101 is an open-source 6-DOF manipulator arm, designed to work with Hugging Face's **LeRobot** framework. The goal is to train the robot through **imitation learning**: manually guiding the arm to teach it tasks, which it then reproduces autonomously.

All structural parts were 3D-printed at Polytech's FabLab. Two robots were built simultaneously (purple and black) to form a leader-follower system: one acts as the manual controller, the other executes the movements.`
      },
      {
        type: 'gallery',
        columns: 2,
        images: ['so101/images/so101_1.jpg', 'so101/images/so101_2.jpg', 'so101/images/so101_3.jpg', 'so101/images/so101_4.jpg'],
        captionFr: 'Les deux bras SO-101 assemblés — violet (leader) et noir (follower)',
        captionEn: 'Both SO-101 arms assembled — purple (leader) and black (follower)'
      },
      {
        type: 'video',
        src: 'so101/videos/demo.mp4',
        captionFr: 'Démonstration du robot SO-101',
        captionEn: 'SO-101 robot demo'
      },
      {
        type: 'text',
        contentFr: `**Crédits** : Design original par Hugging Face.`,
        contentEn: `**Credits**: Original design by Hugging Face.`
      },
    ]
  },

  // ── ROBOTECH : MOTEUR BRUSHLESS DIY ───────────────────────────
  {
    id: 'moteur-brushless',
    titleFr: 'Moteur brushless DIY',
    titleEn: 'DIY Brushless Motor',
    category: 'hardware',
    source: 'robotech',
    descFr: 'Fabrication d\'un moteur brushless entièrement à la main — bobinage, rotor, stator. Rendement limité mais très instructif pour comprendre le fonctionnement de ce type d\'actionneur.',
    descEn: 'Fully handmade brushless motor — winding, rotor, stator. Limited efficiency but very educational to understand how this type of actuator works.',
    stack: ['Electronics','Mechanics','Winding','3D printing'],
    thumb: 'moteur_brushless/images/moteur.jpg',
    link: 'https://www.youtube.com/watch?v=OZarwftUh8w',
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Dans le cadre de l'association Robotech, j'ai voulu comprendre les entrailles d'un des actionneurs les plus utilisés en robotique en le fabriquant de zéro.

Chaque composant a été conçu et assemblé manuellement : impression des supports de bobine en 3D, bobinage méthodique du stator en fils de cuivre émaillé, et assemblage des aimants permanents du rotor.

Le rendement du moteur n'est pas très bon — ce qui est attendu pour une première réalisation artisanale. Mais ce projet est surtout **très instructif** pour comprendre concrètement le fonctionnement d'un moteur brushless : les phases, la commutation, les forces magnétiques en jeu.`,
        contentEn: `At Robotech, I wanted to truly understand one of the most widely used actuators in robotics by building one from scratch.

Every component was hand-built: 3D-printed coil supports, methodical stator winding with enameled copper wire, and assembly of permanent rotor magnets.

The motor's efficiency is not great — which is expected for a first handmade attempt. But the real value of this project is how **educational** it is: you understand phases, commutation and magnetic forces in a very concrete way.`
      },
      {
        type: 'video',
        src: 'moteur_brushless/videos/demo.mp4',
        captionFr: 'Le moteur brushless DIY en fonctionnement',
        captionEn: 'DIY brushless motor running'
      },
      {
        type: 'text',
        contentFr: `**Crédits** : Inspiré de la vidéo YouTube ci-dessous.`,
        contentEn: `**Credits**: Inspired by the YouTube video below.`
      },
    ]
  },

  // ── ROBOTECH : BORNE D'ARCADE ──────────────────────────────────
  {
    id: 'arcade',
    titleFr: 'Borne d\'arcade',
    titleEn: 'Arcade Cabinet',
    category: 'hardware',
    source: 'robotech',
    descFr: 'Conception et fabrication d\'une borne d\'arcade complète en MDF — Raspberry Pi 4, boutons rétroéclairés, RetroPie. En attente de peinture.',
    descEn: 'Design and build of a full MDF arcade cabinet — Raspberry Pi 4, backlit buttons, RetroPie. Awaiting paint.',
    stack: ['MDF 6mm','Raspberry Pi 4','RetroPie','Electronics','Laser cutting'],
    thumb: 'borne_arcade/images/arcade_2.jpg',
    link: null,
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Conception et fabrication d'une borne d'arcade complète au sein de l'association Robotech, avec Maxence Santos — et l'aide de plusieurs membres dont les deux Maxime au cours de la construction.

La structure a été découpée au laser dans des plaques de MDF 6 mm et assemblée manuellement. L'interface de contrôle intègre deux joysticks et des boutons authentiques rétroéclairés, câblés via des drivers dédiés, ainsi qu'un bouton on/off et une multiprise intégrée.

Le système est piloté par une Raspberry Pi 4 sous RetroPie, configurée pour faire tourner une large sélection de jeux open-source classiques. L'écran provient des ressources de Polytech Sorbonne.

La borne est actuellement en attente de peinture, qui sera prise en charge par le Bureau des Arts (BdA).`,
        contentEn: `Design and build of a full arcade cabinet at Robotech, with Maxence Santos — and the help of several members including both Maximes during the build.

The structure was laser-cut from 6 mm MDF boards and assembled by hand. The control panel features two joysticks and authentic backlit arcade buttons wired through dedicated drivers, plus an on/off button and integrated power strip.

The system runs on a Raspberry Pi 4 with RetroPie, configured to play a wide selection of classic open-source games. The screen was provided by Polytech Sorbonne.

The cabinet is currently awaiting paint, to be handled by the Bureau des Arts (BdA).`
      },
      {
        type: 'image',
        src: 'borne_arcade/images/arcade_1.jpg',
      },
      {
        type: 'gallery',
        images: ['borne_arcade/images/arcade_2.jpg', 'borne_arcade/images/arcade_3.jpg', 'borne_arcade/images/arcade_4.jpg'],
        captionFr: 'Borne d\'arcade construite au FabLab de Polytech Sorbonne — MDF 6mm, Raspberry Pi 4, boutons rétroéclairés, RetroPie.',
        captionEn: 'Arcade cabinet built at Polytech Sorbonne FabLab — 6mm MDF, Raspberry Pi 4, backlit buttons, RetroPie.'
      },
    ]
  },

  // ── COURS : MINISHELL ─────────────────────────────────────────
  {
    id: 'minishell',
    titleFr: 'Mini Shell en C',
    titleEn: 'Mini Shell in C',
    category: 'software',
    source: 'school',
    descFr: 'Implémentation d\'un mini shell en C — gestion des pipes, redirections, exécution en arrière-plan et builtins (cd, pwd, exit). Projet de cours systèmes d\'information.',
    descEn: 'Mini shell implemented in C — pipes, redirections, background execution and builtins (cd, pwd, exit). Systems programming course project.',
    stack: ['C','Fork','Pipe','Dup2','Execvp','Linux'],
    thumb: null,
    link: 'https://github.com/SHuttooo/TP4-INFO-SYS',
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Projet de cours en systèmes d'information — implémentation d'un mini shell en C capable de lire et exécuter des commandes avec les fonctionnalités essentielles d'un vrai shell Unix.

**Fonctionnalités implémentées**

- **Pipe (\`|\`)** : fork double avec \`pipe()\` et \`dup2\` pour connecter le \`stdout\` de la commande 1 au \`stdin\` de la commande 2.
- **Redirection (\`>\`)** : fork + \`open()\` + \`dup2\` sur stdout vers un fichier.
- **Arrière-plan (\`&\`)** : exécution sans attendre la fin du processus enfant.
- **Séquences (\`;\`)** : découpage et exécution de plusieurs commandes en série.
- **Builtins** : \`cd\` exécuté dans le parent (nécessaire pour changer le répertoire courant), \`pwd\`, \`exit\`.

**Gestion mémoire**

Chaque token est dupliqué avec \`strdup\` et libéré après usage. La séparation entre analyse (\`parse_input\`), orchestration (\`execution_cmd\`) et exécution (\`executefork\`) évite les doubles libérations.

**Piste d'amélioration** : gérer plusieurs pipes chaînés (\`cmd1 | cmd2 | cmd3\`).`,
        contentEn: `Systems programming course project — implementation of a mini shell in C capable of reading and executing commands with the core features of a real Unix shell.

**Implemented features**

- **Pipe (\`|\`)** : double fork with \`pipe()\` and \`dup2\` to connect stdout of command 1 to stdin of command 2.
- **Redirection (\`>\`)** : fork + \`open()\` + \`dup2\` on stdout to a file.
- **Background (\`&\`)** : execution without waiting for the child process to finish.
- **Sequences (\`;\`)** : split and run multiple commands in series.
- **Builtins** : \`cd\` runs in the parent process (required to actually change the working directory), \`pwd\`, \`exit\`.

**Memory management**

Each token is duplicated with \`strdup\` and freed after use. Separation between parsing (\`parse_input\`), orchestration (\`execution_cmd\`) and execution (\`executefork\`) prevents double-free issues.

**Improvement path**: handle multiple chained pipes (\`cmd1 | cmd2 | cmd3\`).`
      },
    ]
  },

  // ── COURS : COMPTAGE VOITURES OPENCV ─────────────────────────
  {
    id: 'comptage-voitures',
    titleFr: 'Comptage de voitures par traitement d\'image',
    titleEn: 'Car Counting via Image Processing',
    category: 'software',
    source: 'school',
    descFr: 'Script C++ avec OpenCV pour d\u00e9tecter et compter en temps r\u00e9el les voitures passant sur une autoroute, par traitement de couleur et d\'image.',
    descEn: 'C++ script with OpenCV to detect and count in real time cars passing on a highway, using color and image processing.',
    stack: ['C++','OpenCV','Image processing','Vision'],
    thumb: 'comptage_voitures/images/thumb.jpg',
    link: null,
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `D\u00e9veloppement d'un script de vision par ordinateur en C++ avec OpenCV pour le suivi et le **comptage en temps r\u00e9el** du nombre de voitures passant sur une autoroute.

**Approche technique**

Le script utilise du traitement de couleur et d'image : d\u00e9tection par diff\u00e9rence de fond, filtrage morphologique pour r\u00e9duire le bruit, puis d\u00e9tection des contours et suivi des objets entre les frames pour comptabiliser les passages.

Projet r\u00e9alis\u00e9 dans le cadre du module ROS2 / syst\u00e8mes autonomes \u00e0 Polytech Sorbonne.`,
        contentEn: `Development of a computer vision script in C++ with OpenCV for real-time **tracking and counting** of cars on a highway.

**Technical approach**

The script uses color and image processing: background subtraction, morphological filtering to reduce noise, then contour detection and object tracking between frames to count passing vehicles.

Project carried out as part of the ROS2 / autonomous systems module at Polytech Sorbonne.`
      },
      {
        type: 'video',
        src: 'comptage_voitures/videos/demo.mp4',
        captionFr: 'D\u00e9monstration du comptage de voitures en temps r\u00e9el',
        captionEn: 'Real-time car counting demo'
      },
    ]
  },

  // ── COURS : ROBOT MOBILE AVEC BRAS (ROB3) ─────────────────────
  {
    id: 'robot-bras',
    titleFr: 'Robot mobile autonome avec bras et pince (ROB3)',
    titleEn: 'Autonomous Mobile Robot with Arm and Gripper (ROB3)',
    category: 'robotics',
    source: 'school',
    descFr: "Projet ROB3 — Robot mobile autonome capable de d\u00e9tecter, saisir et d\u00e9poser un objet dans une ar\u00e8ne. Suivi de mur, bras 1DDL en parall\u00e9logramme, pince pr\u00e9hensile. Plus gros projet de 1\u00e8re ann\u00e9e sp\u00e9cialit\u00e9 Robotique.",
    descEn: 'ROB3 Project — Autonomous mobile robot capable of detecting, grasping and placing an object in an arena. Wall following, 1-DOF parallelogram arm, gripper. Biggest project of 1st year Robotics specialty.',
    stack: ['C++','Arduino','SolidWorks','D\u00e9coupe laser','CAN Bus','Capteurs IR','Correcteur P'],
    thumb: 'robot_bras_rob3/images/robot.jpg',
    link: 'https://wiki.fablab.sorbonne-universite.fr/BookStack/books/projet-rob3-2025/page/projet-rob3-diyana-emile-rayan-matthieu-pierre-louis-esteban',
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Projet ROB3, le plus gros projet de premi\u00e8re ann\u00e9e sp\u00e9cialit\u00e9 Robotique \u00e0 Polytech Sorbonne (3\u00e8me ann\u00e9e post-bac), r\u00e9alis\u00e9 en \u00e9quipe de 6 : Diyana, \u00c9mile, Rayan, Matthieu, Pierre-Louis, Esteban.

**Objectif** : concevoir un robot mobile autonome capable de se d\u00e9placer dans une ar\u00e8ne, d\u00e9tecter un objet (totem) dont la position est inconnue \u00e0 l'avance, le saisir pr\u00e9cis\u00e9ment et le d\u00e9poser \u00e0 un emplacement d\u00e9fini, sans aucune interaction humaine.

Le robot est compos\u00e9 d'un chariot unicycle, d'un bras \u00e0 1 DDL en parall\u00e9logramme vertical et d'une pince mont\u00e9e \u00e0 l'avant.`,
        contentEn: `ROB3 Project, the biggest project of the first year Robotics specialty at Polytech Sorbonne (3rd year post-bac), carried out by a team of 6: Diyana, \u00c9mile, Rayan, Matthieu, Pierre-Louis, Esteban.

**Goal**: design an autonomous mobile robot capable of navigating an arena, detecting an object (totem) at an unknown position, grasping it precisely and dropping it at a defined location, with no human interaction.

The robot consists of a unicycle cart, a 1-DOF parallelogram vertical arm and a gripper mounted at the front.`
      },
      {
        type: 'image',
        src: 'robot_bras_rob3/images/robot.jpg',
        captionFr: 'Le robot assembl\u00e9 \u2014 ch\u00e2ssis bois, bras en arc, pince et Arduino CAN Bus',
        captionEn: 'Assembled robot \u2014 wood chassis, arc arm, gripper and Arduino CAN Bus'
      },
      {
        type: 'text',
        contentFr: `**Mon r\u00f4le : P\u00f4le m\u00e9canique (principal) + Informatique**

C\u00f4t\u00e9 m\u00e9canique, j'ai \u00e9t\u00e9 responsable de la conception et de la r\u00e9alisation de l'ensemble des pi\u00e8ces du robot :

- **Bras en parall\u00e9logramme** : 2 bielles align\u00e9es fix\u00e9es au ch\u00e2ssis via des supports et des cales. La bielle avant est viss\u00e9e au moteur, la bielle arri\u00e8re est maintenue entre deux supports \u00e0 serrage. J'ai r\u00e9solu le probl\u00e8me de collision bras/c\u00e2blage en adoptant une **forme arqu\u00e9e** pour la pi\u00e8ce supportant la pince.
- **Ch\u00e2ssis** : model\u00e9 sur SolidWorks, usin\u00e9 par d\u00e9coupe laser (bois 6 mm), avec d\u00e9coupes rectangulaires pour embo\u00eeter les supports par serrage avec cales \u2014 assemblage rigide mais d\u00e9montable.
- **Toutes les pi\u00e8ces** : bielle, pi\u00e8ce arqu\u00e9e, support moteur, support bielle, cales \u2014 model\u00e9es sur SolidWorks et d\u00e9coup\u00e9es laser.
- **\u00c9lastique de rappel** : ajout\u00e9 pour aider le moteur \u00e0 remonter le bras (couple insuffisant seul).

C\u00f4t\u00e9 informatique : correcteur proportionnel du bras, d\u00e9tection des balises, rotation \u00e0 90\u00b0, balayage pour d\u00e9tecter le totem, fonctions d'attrapage et de l\u00e2cher.`,
        contentEn: `**My role: Mechanical (lead) + Software**

On the mechanical side, I designed and manufactured all robot parts:

- **Parallelogram arm**: 2 aligned links fixed to the chassis via supports and wedges. Front link screwed to the motor, rear one held between two clamping supports. I solved the collision issue by using an **arc-shaped part** to hold the gripper.
- **Chassis**: modeled in SolidWorks, laser-cut (6 mm wood), with rectangular cutouts to slot the supports in with wedges \u2014 rigid but removable assembly.
- **All parts**: link, arc part, motor support, link support, wedges \u2014 modeled in SolidWorks and laser-cut.
- **Return spring**: added to help the motor lift the arm (insufficient torque alone).

On the software side: proportional controller for the arm, beacon detection, 90\u00b0 rotation, scanning to detect the totem, grasp and release functions.`
      },
      {
        type: 'gallery',
        columns: 2,
        images: [
          'robot_bras_rob3/images/pince.jpg',
          'robot_bras_rob3/images/support_mdf.jpg',
          'robot_bras_rob3/images/croquis_bras.jpg'
        ],
        captionFr: 'Pince SolidWorks \u00b7 Support MDF avec cales \u00b7 Croquis de conception du bras',
        captionEn: 'SolidWorks gripper \u00b7 MDF support with wedges \u00b7 Arm design sketch'
      },
      {
        type: 'video',
        src: 'robot_bras_rob3/videos/bras_proportionnel.mp4',
        captionFr: 'Bras contr\u00f4l\u00e9 en position par un correcteur proportionnel',
        captionEn: 'Arm controlled in position with a proportional controller'
      },
      {
        type: 'video',
        src: 'robot_bras_rob3/videos/robot_mur.mp4',
        captionFr: 'Robot suivant un mur avec un correcteur PID',
        captionEn: 'Robot following a wall with a PID controller'
      },
    ]
  },

  // ── COURS : PAN-TILT RECONNAISSANCE DE GESTES ─────────────────
  {
    id: 'pan-tilt-gestes',
    titleFr: 'Cam\u00e9ra pan-tilt avec reconnaissance de gestes',
    titleEn: 'Pan-Tilt Camera with Gesture Recognition',
    category: 'robotics',
    source: 'school',
    descFr: 'Syst\u00e8me pan-tilt motoris\u00e9 : une cam\u00e9ra suit la main en temps r\u00e9el par traitement d\'image (Python/OpenCV), et d\u00e9clenche des mouvements pr\u00e9enregistr\u00e9s si un geste est maintenu 3 secondes. Servomoteurs pilot\u00e9s via Arduino en C++.',
    descEn: 'Motorized pan-tilt system: a camera tracks the hand in real time via image processing (Python/OpenCV), and triggers pre-recorded movements if a gesture is held for 3 seconds. Servomotors controlled via Arduino in C++.',
    stack: ['Python','OpenCV','C++','Arduino','Servomotors','Vision'],
    thumb: 'pan_tilt_gestes/images/thumb.jpg',
    link: null,
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Projet de cours r\u00e9alis\u00e9 \u00e0 Polytech Sorbonne.

Le syst\u00e8me repose sur un **pan-tilt** (2 axes, horizontal et vertical) mont\u00e9 sur une cam\u00e9ra. Deux parties distinctes communiquent ensemble :

**Traitement d'image (Python / OpenCV)**
Reconnaissance des gestes de la main en temps r\u00e9el gr\u00e2ce \u00e0 un mod\u00e8le de d\u00e9tection de la main fourni par OpenCV. La cam\u00e9ra suit le centre de la main en continu (suivi pan-tilt).

**Contr\u00f4le des servomoteurs (C++ / Arduino)**
Les commandes de position sont envoy\u00e9es \u00e0 une Arduino qui pilote les deux servomoteurs du pan-tilt. Lorsqu'un geste sp\u00e9cifique est d\u00e9tect\u00e9 et maintenu pendant au moins **3 secondes**, le robot ex\u00e9cute un mouvement pr\u00e9enregistr\u00e9 correspondant.`,
        contentEn: `Course project at Polytech Sorbonne.

The system uses a **pan-tilt** (2 axes, horizontal and vertical) mounted on a camera. Two separate components work together:

**Image processing (Python / OpenCV)**
Real-time hand gesture recognition using an OpenCV hand detection model. The camera continuously tracks the center of the hand (pan-tilt tracking).

**Servo control (C++ / Arduino)**
Position commands are sent to an Arduino which drives the two pan-tilt servomotors. When a specific gesture is detected and held for at least **3 seconds**, the robot executes the corresponding pre-recorded movement.`
      },
      {
        type: 'video',
        src: 'pan_tilt_gestes/videos/demo.mp4',
        captionFr: 'D\u00e9monstration — suivi de main et d\u00e9clenchement sur geste',
        captionEn: 'Demo — hand tracking and gesture-triggered movement'
      },
    ]
  },

  // ── COURS : JEU D'ÉCHECS ──────────────────────────────────────
  {
    id: 'echecs',
    titleFr: "Jeu d'\u00e9checs en C avec IA",
    titleEn: 'Chess Game in C with AI',
    category: 'software',
    source: 'school',
    descFr: "Jeu d'\u00e9checs complet en C en terminal \u2014 toutes les r\u00e8gles impl\u00e9ment\u00e9es, promotion des pions, d\u00e9tection d'\u00e9chec, et une IA par exploration des coups sur 3 niveaux de profondeur.",
    descEn: 'Full chess game in C in terminal \u2014 all rules implemented, pawn promotion, check detection, and an AI exploring moves at 3 levels of depth.',
    stack: ['C','Algorithms','Minimax','Linux'],
    thumb: null,
    link: null,
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Projet de cours d'algorithmique et programmation bas niveau \u00e0 Polytech Sorbonne, r\u00e9alis\u00e9 en bin\u00f4me.

**Fonctionnalit\u00e9s impl\u00e9ment\u00e9es**

- Affichage du plateau en terminal avec notation standard (K, Q, B, N, R, P / k, q, b, n, r, p)
- Toutes les r\u00e8gles de d\u00e9placement l\u00e9gales : roque, prise en passant, promotion des pions
- D\u00e9tection des situations d'\u00e9chec
- Sauvegarde et chargement d'une partie
- Calcul et affichage de la valeur des pi\u00e8ces

**IA adversaire**

J'ai impl\u00e9ment\u00e9 une IA par exploration exhaustive de toutes les s\u00e9quences de coups possibles sur **3 niveaux de profondeur**. \u00c0 chaque position, je calcule une **moyenne du score des meilleurs coups** \u00e0 partir d'une fonction d'\u00e9valuation simple (valeur des pi\u00e8ces sur le plateau).

L'IA n'est pas tr\u00e8s forte \u2014 mais elle joue des coups l\u00e9gaux, elle a une strat\u00e9gie basique, et elle peut battre un joueur vraiment distrait. Un bon point de d\u00e9part pour comprendre concr\u00e8tement comment fonctionne une IA de jeu de plateau.`,
        contentEn: `Algorithms and low-level programming course project at Polytech Sorbonne, carried out in pairs.

**Implemented features**

- Terminal board display with standard notation (K, Q, B, N, R, P / k, q, b, n, r, p)
- All legal movement rules: castling, en passant, pawn promotion
- Check detection
- Save and load a game
- Piece value calculation and display

**Adversarial AI**

I implemented an AI by exhaustively exploring all possible move sequences at **3 levels of depth**. At each position, I compute an **average of the best move scores** from a simple evaluation function (piece values on the board).

The AI is not very strong \u2014 but it plays legal moves, has basic strategy, and can beat a distracted player. A solid starting point for concretely understanding how a board game AI works.`
      },
    ]
  },

  // ── COURS : POKER IA ──────────────────────────────────────────
  {
    id: 'poker',
    titleFr: 'Poker IA — Monte Carlo',
    titleEn: 'Poker AI — Monte Carlo',
    category: 'software',
    source: 'school',
    descFr: 'Jeu de poker Texas Hold\'em en Python avec une IA adversaire basée sur la méthode de Monte Carlo. (Polytech Tours, PEIP)',
    descEn: 'Python Texas Hold\'em game with an opponent AI based on the Monte Carlo method.',
    stack: ['Python','Monte Carlo','IA'],
    thumb: null,
    link: null,
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Projet développé lors de ma première année de cycle préparatoire (PEIP) à Polytech Tours.\n\nIl s'agit d'un jeu de poker (Texas Hold'em) codé en Python, implémentant une intelligence artificielle adversaire rudimentaire. L'IA utilise une méthode de Monte Carlo pour simuler aléatoirement de nombreuses fins de parties possibles et estimer statistiquement sa probabilité de victoire avant de prendre une décision (se coucher, suivre ou relancer).`,
        contentEn: `Project from my first preparatory year (PEIP) at Polytech Tours.\n\nTexas Hold'em poker game in Python with a basic adversarial AI using Monte Carlo simulation to estimate winning probability before deciding to fold, call or raise.`
      },
    ]
  },

  // ── COURS : ROBOT D'EXPLORATION MÉTÉO ────────────────────────
  {
    id: 'ros2-labs',
    titleFr: "Robot d'exploration avec capteurs m\u00e9t\u00e9o",
    titleEn: 'Weather Exploration Robot',
    category: 'robotics',
    source: 'school',
    descFr: "Petite base roulante autonome (2 roues + bille) qui collecte et stocke des donn\u00e9es m\u00e9t\u00e9orologiques tout en naviguant et esquivant les obstacles. Projet de cours \u00e0 Polytech Tours (PEIP).",
    descEn: 'Small autonomous wheeled base (2 wheels + caster) that collects and stores weather data while navigating and avoiding obstacles. Course project at Polytech Tours (PEIP).',
    stack: ['C','Arduino','Sensors','Navigation'],
    thumb: 'robot_meteo/images/robot_1.jpg',
    link: null,
    wip: false,
    blocks: [
      {
        type: 'text',
        contentFr: `Projet de cours \u00e0 Polytech Tours pendant la premi\u00e8re ann\u00e9e de PEIP (2022).

Conception et r\u00e9alisation d'une petite base roulante \u00e0 2 roues motrices et une bille folle, dont la mission \u00e9tait de **collecter et stocker des donn\u00e9es m\u00e9t\u00e9orologiques** (temp\u00e9rature, humidit\u00e9...) tout en naviguant de fa\u00e7on autonome et en \u00e9vitant les obstacles.

Le robot embarque des capteurs m\u00e9t\u00e9o et un capteur de distance pour la d\u00e9tection d'obstacles. Les donn\u00e9es collect\u00e9es sont enregistr\u00e9es au fil du d\u00e9placement. Le d\u00e9cor avec le ballon et le drapeau fran\u00e7ais \u00e9tait un clin d'\u0153il \u00e0 la Coupe du Monde 2022.`,
        contentEn: `Course project at Polytech Tours during the first year of PEIP (2022).

Design and build of a small 2-wheel + caster wheeled base, whose mission was to **collect and store weather data** (temperature, humidity...) while navigating autonomously and avoiding obstacles.

The robot carries weather sensors and a distance sensor for obstacle detection. The collected data is logged throughout the run. The balloon and French flag decoration was a nod to the 2022 FIFA World Cup.`
      },
      {
        type: 'gallery',
        columns: 2,
        images: ['robot_meteo/images/robot_1.jpg', 'robot_meteo/images/robot_2.jpg'],
        captionFr: "Le robot d'exploration m\u00e9t\u00e9o \u2014 base roulante avec ballon et drapeau fran\u00e7ais",
        captionEn: 'Weather exploration robot \u2014 wheeled base with balloon and French flag'
      },
      {
        type: 'video',
        src: 'robot_meteo/videos/demo.mp4',
        captionFr: 'D\u00e9monstration du robot en navigation autonome',
        captionEn: 'Robot autonomous navigation demo'
      },
    ]
  }

];