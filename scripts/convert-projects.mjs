// ════════════════════════════════════════════════════════════════
//  Script de migration — projects.js  →  fichiers de données séparés
//
//  Réutilise TES données existantes (aucune retranscription manuelle).
//  Lance-le une seule fois : npm run convert
//
//  Produit :
//    src/data/projects/<id>.json   (1 fichier par projet)
//    src/data/skills.json          (groupes de compétences)
//    src/data/sources.json         (types de source)
// ════════════════════════════════════════════════════════════════
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// 1. On lit l'ancien projects.js et on l'exporte temporairement en module ES.
const legacy = await readFile(join(root, 'projects.js'), 'utf8');
const tmp = join(root, 'scripts', '_legacy.mjs');
await writeFile(tmp, legacy + '\nexport { PROJECTS, SKILL_GROUPS, SOURCES };\n');

// 2. On importe les données (cache-bust pour relance).
const { PROJECTS, SKILL_GROUPS, SOURCES } = await import('./_legacy.mjs?t=' + Date.now());
await rm(tmp);

// 3. On (ré)écrit un fichier de données par projet.
const outDir = join(root, 'src', 'data', 'projects');
if (existsSync(outDir)) await rm(outDir, { recursive: true });
await mkdir(outDir, { recursive: true });

for (const p of PROJECTS) {
  await writeFile(join(outDir, `${p.id}.json`), JSON.stringify(p, null, 2) + '\n');
}

// 4. Compétences + sources dans leurs propres fichiers.
const dataDir = join(root, 'src', 'data');
await writeFile(join(dataDir, 'skills.json'), JSON.stringify(SKILL_GROUPS, null, 2) + '\n');
await writeFile(join(dataDir, 'sources.json'), JSON.stringify(SOURCES, null, 2) + '\n');

console.log(`✓ ${PROJECTS.length} projets écrits dans src/data/projects/`);
console.log(`✓ ${SKILL_GROUPS.length} groupes de compétences + ${Object.keys(SOURCES).length} sources`);
