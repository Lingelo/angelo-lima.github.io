/**
 * Automatic language detection and redirection
 * Detects browser language and redirects to appropriate language version
 */
(function() {
  'use strict';
  
  // Configuration
  const LANGUAGE_COOKIE = 'user_language_preference';
  const COOKIE_EXPIRY_DAYS = 365;
  
  /**
   * Get cookie value by name
   */
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  /**
   * Set cookie with expiry
   */
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
  
  /**
   * Get browser's preferred language (first 2 chars)
   */
  function getBrowserLanguage() {
    const language = navigator.language || navigator.userLanguage || 'fr';
    return language.toLowerCase().substr(0, 2);
  }
  
  /**
   * Get current page language based on URL
   */
  function getCurrentPageLanguage() {
    return window.location.pathname.startsWith('/en/') ? 'en' : 'fr';
  }
  
  /**
   * Check if we're on the homepage (French or English)
   */
  function isHomepage() {
    const path = window.location.pathname;
    return path === '/' || path === '/en/' || path === '/index.html' || path === '/en/index.html';
  }
  
  /**
   * Perform language redirection if needed
   */
  function performLanguageDetection() {
    // Skip if user has already made a language choice (cookie exists)
    const userPreference = getCookie(LANGUAGE_COOKIE);
    if (userPreference) {
      return; // User has already chosen a language
    }
    
    // Only redirect on homepage to avoid disrupting navigation
    if (!isHomepage()) {
      return;
    }
    
    const browserLang = getBrowserLanguage();
    const currentLang = getCurrentPageLanguage();
    
    // If browser is English and we're on French homepage, redirect to English
    if (browserLang === 'en' && currentLang === 'fr') {
      // Set cookie to remember this automatic redirection
      setCookie(LANGUAGE_COOKIE, 'en', COOKIE_EXPIRY_DAYS);
      
      // Add a small delay to avoid abrupt redirect
      setTimeout(() => {
        window.location.href = '/en/';
      }, 100);
    }
    // If browser is not English and we're on English homepage, redirect to French
    else if (browserLang !== 'en' && currentLang === 'en') {
      // Set cookie to remember this automatic redirection
      setCookie(LANGUAGE_COOKIE, 'fr', COOKIE_EXPIRY_DAYS);
      
      // Add a small delay to avoid abrupt redirect
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
    // If no redirect needed, set cookie to current language to avoid future checks
    else {
      setCookie(LANGUAGE_COOKIE, currentLang, COOKIE_EXPIRY_DAYS);
    }
  }
  
  /**
   * Update user language preference when using language switcher
   */
  function updateLanguagePreference() {
    const currentLang = getCurrentPageLanguage();
    setCookie(LANGUAGE_COOKIE, currentLang, COOKIE_EXPIRY_DAYS);
  }
  
  // Run language detection when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', performLanguageDetection);
  } else {
    performLanguageDetection();
  }
  
  // Update preference when language switcher is used
  document.addEventListener('click', function(e) {
    const langSwitcher = e.target.closest('.lang-switcher a, .language-selector a');
    if (langSwitcher) {
      // Small delay to let navigation start before setting cookie
      setTimeout(updateLanguagePreference, 50);
    }
  });
  
  // Expose function for manual preference updates
  window.updateLanguagePreference = updateLanguagePreference;
  
})();