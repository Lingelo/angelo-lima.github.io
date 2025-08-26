// Dark Theme Toggle with localStorage persistence
// Angelo Lima Blog - 2025

const DarkTheme = {
  // Configuration
  STORAGE_KEY: 'angelo-blog-theme',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark'
  },
  
  // Theme state
  currentTheme: null,
  
  // Initialize theme system
  init: function() {
    this.loadThemeFromStorage();
    this.bindEvents();
    this.updateUI();
    console.log('🎨 Dark theme system initialized');
  },
  
  // Load theme preference from localStorage
  loadThemeFromStorage: function() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    
    if (savedTheme && Object.values(this.THEMES).includes(savedTheme)) {
      this.currentTheme = savedTheme;
    } else {
      // Default to system preference or light theme
      this.currentTheme = this.getSystemPreference();
    }
    
    this.applyTheme(this.currentTheme);
  },
  
  // Get system preference for dark/light mode
  getSystemPreference: function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return this.THEMES.DARK;
    }
    return this.THEMES.LIGHT;
  },
  
  // Save theme preference to localStorage
  saveThemeToStorage: function(theme) {
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
      console.log(`💾 Theme saved: ${theme}`);
    } catch (error) {
      console.warn('❌ Could not save theme preference:', error);
    }
  },
  
  // Apply theme to document
  applyTheme: function(theme) {
    const body = document.body;
    
    if (theme === this.THEMES.DARK) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
    
    this.currentTheme = theme;
    console.log(`🎭 Theme applied: ${theme}`);
  },
  
  // Toggle between themes
  toggleTheme: function() {
    const newTheme = this.currentTheme === this.THEMES.DARK 
      ? this.THEMES.LIGHT 
      : this.THEMES.DARK;
    
    this.applyTheme(newTheme);
    this.saveThemeToStorage(newTheme);
    this.updateUI();
    
    // Add a subtle animation feedback
    this.animateToggle();
  },
  
  // Update UI elements (toggle button icon)
  updateUI: function() {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.textContent = this.currentTheme === this.THEMES.DARK ? '☀️' : '🌙';
      themeIcon.setAttribute('aria-label', 
        this.currentTheme === this.THEMES.DARK 
          ? 'Basculer vers le thème clair' 
          : 'Basculer vers le thème sombre'
      );
    }
  },
  
  // Bind event listeners
  bindEvents: function() {
    // Theme toggle button
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        if (!savedTheme) {
          const systemTheme = e.matches ? this.THEMES.DARK : this.THEMES.LIGHT;
          this.applyTheme(systemTheme);
          this.updateUI();
        }
      });
    }
    
    // Keyboard shortcut (Ctrl/Cmd + Shift + D)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  },
  
  // Add toggle animation
  animateToggle: function() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
        toggleButton.style.transform = 'scale(1)';
      }, 150);
    }
  },
  
  // Get current theme
  getCurrentTheme: function() {
    return this.currentTheme;
  },
  
  // Reset theme to system preference
  resetToSystemTheme: function() {
    localStorage.removeItem(this.STORAGE_KEY);
    const systemTheme = this.getSystemPreference();
    this.applyTheme(systemTheme);
    this.updateUI();
    console.log('🔄 Theme reset to system preference');
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  DarkTheme.init();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    DarkTheme.init();
  });
} else {
  DarkTheme.init();
}

// Export for console debugging
window.DarkTheme = DarkTheme;