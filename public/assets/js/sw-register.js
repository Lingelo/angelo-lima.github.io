// Enregistrement du Service Worker pour la performance.
// Les mises à jour sont silencieuses : sw.js appelle skipWaiting() + clients.claim(),
// la nouvelle version s'applique donc d'elle-même au prochain chargement de page.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.log('Erreur Service Worker:', error);
    });
  });
}
