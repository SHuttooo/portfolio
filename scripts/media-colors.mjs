/**
 * Extrait la couleur de bord de chaque image utilisée en vignette ou en galerie,
 * et l'écrit dans src/data/media-colors.json.
 *
 * Pourquoi : les images n'ont pas toutes le même format (7 photos sur 13 sont en
 * portrait, d'autres sont des aplats en 16/10). Elles sont affichées entières
 * (object-fit:contain) dans une boîte de ratio fixe, ce qui laisse des bandes.
 * En peignant ces bandes avec la couleur du bord de l'image, une image sur fond
 * uni se fond exactement dans sa carte, et une photo prolonge son décor.
 *
 * Lancé automatiquement par `npm run dev` et `npm run build` (hooks pre*).
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.join(import.meta.dirname, '..');
const PROJECTS = path.join(ROOT, 'src/data/projects');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(ROOT, 'src/data/media-colors.json');

/** Médiane d'un tableau de nombres (robuste aux pixels aberrants, contrairement à la moyenne). */
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[s.length >> 1];
};

const hex = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

/**
 * Couleur représentative du bord d'une image.
 * On réduit l'image, on lit l'anneau de pixels extérieur, et on en prend la
 * médiane par canal. On mesure aussi l'écart moyen à cette médiane : un écart
 * faible = bord uni (aplat), un écart fort = photo.
 */
async function edgeColor(file) {
  const { data, info } = await sharp(file)
    .resize(72, 72, { fit: 'inside' })
    .flatten({ background: '#ffffff' }) // aplatit la transparence éventuelle
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels: ch } = info;
  const ring = 3; // épaisseur de l'anneau échantillonné, en pixels
  const R = [], G = [], B = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const onEdge = x < ring || y < ring || x >= w - ring || y >= h - ring;
      if (!onEdge) continue;
      const i = (y * w + x) * ch;
      R.push(data[i]); G.push(data[i + 1]); B.push(data[i + 2]);
    }
  }

  const c = [median(R), median(G), median(B)];
  const spread =
    (R.reduce((a, v) => a + Math.abs(v - c[0]), 0) +
      G.reduce((a, v) => a + Math.abs(v - c[1]), 0) +
      B.reduce((a, v) => a + Math.abs(v - c[2]), 0)) /
    (3 * R.length);

  return { color: hex(...c), spread: Math.round(spread), flat: spread < 14, ratio: info.width / info.height };
}

// ── Collecte des images à traiter : vignettes + galeries ─────────────────────
const wanted = new Set();
for (const f of fs.readdirSync(PROJECTS).filter((f) => f.endsWith('.json'))) {
  const p = JSON.parse(fs.readFileSync(path.join(PROJECTS, f), 'utf8'));
  if (p.thumb) wanted.add(p.thumb);
  for (const b of p.blocks ?? []) {
    if (b.type === 'gallery') for (const src of b.images ?? []) wanted.add(src);
  }
}

const out = {};
let flatCount = 0;
for (const rel of [...wanted].sort()) {
  const file = path.join(PUBLIC, rel);
  if (!fs.existsSync(file)) {
    console.warn('  ! image absente, ignorée : ' + rel);
    continue;
  }
  const { color, spread, flat, ratio } = await edgeColor(file);
  out[rel] = color;
  if (flat) flatCount++;
  const kind = flat ? 'aplat ' : 'photo ';
  console.log(`  ${color}  ${kind} ecart=${String(spread).padStart(3)}  r=${ratio.toFixed(2)}  ${rel}`);
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`media-colors.json — ${Object.keys(out).length} images (${flatCount} sur fond uni)`);
