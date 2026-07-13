// @ts-check
import { defineConfig } from 'astro/config';

// Site déployé sur domaine racine (matthieu-vinet.fr via GitHub/Cloudflare Pages).
// base reste '/' car ce n'est PAS un sous-chemin type user.github.io/repo.
export default defineConfig({
  site: 'https://matthieu-vinet.fr',
  base: '/',
  build: {
    // Chaque page projet dans son dossier -> /projets/serre/ (URLs propres)
    format: 'directory',
  },
});
