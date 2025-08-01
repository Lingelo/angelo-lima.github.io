// CV Dropdown Menu - Mobile & Desktop Support
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.cv-dropdown');
    
    dropdowns.forEach(function(dropdown) {
        const button = dropdown.querySelector('.cv-dropdown-btn');
        const content = dropdown.querySelector('.cv-dropdown-content');
        
        if (!button || !content) return;
        
        // Handle click/tap events for mobile
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns first
            dropdowns.forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('open');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
        
        // Close dropdown when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('open');
            }
        });
        
        // Handle keyboard navigation
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
        
        // Close dropdown when selecting an option
        const links = content.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                dropdown.classList.remove('open');
            });
        });
    });
    
    // Detect touch devices and add class
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
});