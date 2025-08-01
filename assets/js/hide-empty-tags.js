// Hide empty or whitespace-only tags
document.addEventListener('DOMContentLoaded', function() {
    // Find all tag links in blog-tags sections
    const tagLinks = document.querySelectorAll('.blog-tags a');
    
    tagLinks.forEach(function(link) {
        // Get the text content and trim whitespace
        const textContent = link.textContent.trim();
        
        // Hide if completely empty or only whitespace
        if (!textContent || textContent.length === 0) {
            link.style.display = 'none';
        }
        
        // Also hide if it's just the article-link class without actual tag text
        if (link.classList.contains('article-link') && !textContent) {
            link.style.display = 'none';
        }
    });
});