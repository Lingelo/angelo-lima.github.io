// Canonical URL enforcement for GitHub Pages
// Since .htaccess doesn't work on GitHub Pages, we use client-side redirects
(function() {
  'use strict';
  
  // Only run on production domain
  if (!window.location.hostname.includes('angelo-lima.fr')) {
    return;
  }
  
  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    return;
  }
  
  var currentUrl = window.location.href;
  var canonicalUrl = canonical.href;
  
  // Don't redirect if already on canonical URL
  if (currentUrl === canonicalUrl) {
    return;
  }
  
  var currentUrlObj = new URL(currentUrl);
  var canonicalUrlObj = new URL(canonicalUrl);
  
  // Redirect www to non-www
  if (currentUrlObj.hostname === 'www.angelo-lima.fr' && 
      canonicalUrlObj.hostname === 'angelo-lima.fr') {
    window.location.replace(canonicalUrl);
    return;
  }
  
  // Handle trailing slash consistency
  if (currentUrlObj.hostname === canonicalUrlObj.hostname) {
    var currentPath = currentUrlObj.pathname;
    var canonicalPath = canonicalUrlObj.pathname;
    
    // If only difference is trailing slash, redirect
    if (currentPath + '/' === canonicalPath || currentPath === canonicalPath + '/') {
      window.location.replace(canonicalUrl);
      return;
    }
    
    // Handle index.html removal
    if (currentPath.endsWith('/index.html') && canonicalPath === currentPath.replace('/index.html', '/')) {
      window.location.replace(canonicalUrl);
      return;
    }
  }
})();