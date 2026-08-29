/**
 * Maintient une URL de CV stable par langue.
 *
 * Les fichiers versionnés (cv-matthieu-vinet-{fr|en}-AAAA-vN-light.pdf) changent
 * à chaque révision. Les liens déjà partagés — candidatures, LinkedIn, mails —
 * pointent eux vers une URL qui ne doit jamais bouger :
 *
 *     /cv-matthieu-vinet-fr.pdf     /cv-matthieu-vinet-en.pdf
 *
 * Ce script recopie, pour chaque langue, la version LIGHT la plus récente sur
 * cette URL stable. Seule la version light est publiée : la version complète
 * porte un numéro de téléphone et n'a rien à faire sur un site public.
 *
 * Lancé automatiquement par `npm run dev` et `npm run build` (hooks pre*).
 */
import fs from 'node:fs';
import path from 'node:path';

const PUBLIC = path.join(import.meta.dirname, '..', 'public');

/** Trie par année puis numéro de version, la plus récente en tête. */
const rank = (name) => {
  const m = name.match(/-(\d{4})-v(\d+)-light\.pdf$/);
  return m ? Number(m[1]) * 1000 + Number(m[2]) : -1;
};

for (const lang of ['fr', 'en']) {
  const versions = fs
    .readdirSync(PUBLIC)
    .filter((f) => new RegExp(`^cv-matthieu-vinet-${lang}-\\d{4}-v\\d+-light\\.pdf$`).test(f))
    .sort((a, b) => rank(b) - rank(a));

  if (!versions.length) {
    console.warn(`  ! aucun CV light trouvé pour "${lang}" — alias inchangé`);
    continue;
  }

  const latest = versions[0];
  const alias = `cv-matthieu-vinet-${lang}.pdf`;
  fs.copyFileSync(path.join(PUBLIC, latest), path.join(PUBLIC, alias));
  console.log(`  ${alias}  ->  ${latest}`);

  // Une version complète publiée exposerait le numéro de téléphone.
  const full = latest.replace('-light.pdf', '.pdf');
  if (fs.existsSync(path.join(PUBLIC, full)))
    console.warn(`  ! ${full} est dans public/ : version complète, à retirer`);
}
