// Helpers de rendu — reproduisent fidèlement l'ancien main.js (renderBlocks).

/** Échappe le HTML (utilisé pour les blocs de code). */
export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Convertit le mini-markup des blocs texte en HTML — identique à l'ancien site :
 *   "## Titre"  -> <h3 class="block-section-title">
 *   "**gras**"  -> <strong>
 *   "\n"        -> <br>
 *   "\n\n"      -> nouveau paragraphe
 */
export function renderText(content: string): string {
  return content
    .split('\n\n')
    .filter(Boolean)
    .map((p) => {
      if (p.startsWith('## ')) {
        const h = p.slice(3).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return `<h3 class="block-section-title">${h}</h3>`;
      }
      const html = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
      return `<p>${html}</p>`;
    })
    .join('');
}

/** Préfixe un chemin de média (les données stockent "serre/images/x.png"). */
export function media(path: string | null | undefined): string {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('/')) return path;
  return '/' + path;
}
