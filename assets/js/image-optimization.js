// Lazy loading et optimisation des images pour le SEO
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading natif si supporté, sinon fallback JavaScript
    if ('loading' in HTMLImageElement.prototype) {
        // Le navigateur supporte le lazy loading natif
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback pour les navigateurs plus anciens
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }

    // Ajouter des attributs alt manquants pour les images dans les articles
    const articleImages = document.querySelectorAll('article img:not([alt]), .post-content img:not([alt])');
    articleImages.forEach((img, index) => {
        if (!img.alt) {
            // Essayer d'extraire le texte du titre ou de la légende
            const figure = img.closest('figure');
            const figcaption = figure ? figure.querySelector('figcaption') : null;
            const title = img.title || img.getAttribute('title');
            
            if (figcaption && figcaption.textContent.trim()) {
                img.alt = figcaption.textContent.trim();
            } else if (title) {
                img.alt = title;
            } else {
                // Générer un alt basique basé sur le contexte
                const filename = img.src.split('/').pop().split('.')[0];
                const articleTitle = document.querySelector('h1') ? 
                    document.querySelector('h1').textContent.trim() : 'Article';
                img.alt = `Illustration pour ${articleTitle} - ${filename}`;
            }
        }
    });

    // Optimiser les images pour les Core Web Vitals
    const criticalImages = document.querySelectorAll('img[data-critical="true"], .cover-img img, .thumbnail-img');
    criticalImages.forEach(img => {
        img.loading = 'eager'; // Charger immédiatement les images critiques
        img.fetchpriority = 'high';
    });
});