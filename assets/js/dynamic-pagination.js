/**
 * Dynamic pagination for both French and English articles
 * Handles client-side pagination without creating multiple index.html files
 */

class DynamicPagination {
  constructor() {
    this.postsPerPage = 6;
    this.currentPage = 1;
    this.allPosts = [];
    this.totalPages = 0;
    
    this.init();
  }
  
  init() {
    // Check if this is a home page (French or English)
    const path = window.location.pathname;
    const isEnglishHome = path.startsWith('/en/') || path.startsWith('/en') || path === '/en';
    const isFrenchHome = path === '/' || path.startsWith('/page');
    
    if (!isEnglishHome && !isFrenchHome) {
      return;
    }
    
    // Determine language
    this.language = isEnglishHome ? 'en' : 'fr';
    
    // Check if there are posts to paginate
    const postElements = document.querySelectorAll('.post-preview');
    if (postElements.length === 0) {
      return;
    }
    
    // Extract page number from URL for both languages
    let pageMatch;
    if (this.language === 'en') {
      pageMatch = path.match(/\/en\/page(\d+)\/?$/);
      if (pageMatch) {
        this.currentPage = parseInt(pageMatch[1]);
        // Redirect pagination URLs to main page with hash
        const newUrl = `/en/#page=${this.currentPage}`;
        if (window.location.pathname + window.location.search + window.location.hash !== newUrl) {
          window.history.replaceState({}, '', newUrl);
        }
      }
    } else {
      pageMatch = path.match(/\/page(\d+)\/?$/);
      if (pageMatch) {
        this.currentPage = parseInt(pageMatch[1]);
        // Redirect pagination URLs to main page with hash
        const newUrl = `/#page=${this.currentPage}`;
        if (window.location.pathname + window.location.search + window.location.hash !== newUrl) {
          window.history.replaceState({}, '', newUrl);
        }
      }
    }
    
    // Check for page parameter in hash (both languages)
    const hashMatch = window.location.hash.match(/page=(\d+)/);
    if (hashMatch) {
      this.currentPage = parseInt(hashMatch[1]);
    }
    
    this.setupPagination();
    this.handleUrlChanges();
  }
  
  setupPagination() {
    // Get all English posts data from the page
    const postElements = document.querySelectorAll('.post-preview');
    this.allPosts = Array.from(postElements).map(element => {
      return {
        element: element.cloneNode(true),
        html: element.outerHTML
      };
    });
    
    this.totalPages = Math.ceil(this.allPosts.length / this.postsPerPage);
    
    if (this.totalPages <= 1) {
      return; // No pagination needed
    }
    
    this.renderPage();
    this.renderPaginationControls();
  }
  
  renderPage() {
    const container = document.querySelector('.posts-list');
    if (!container) return;
    
    // Clear current posts
    container.innerHTML = '';
    
    // Calculate offset
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = Math.min(startIndex + this.postsPerPage, this.allPosts.length);
    
    // Add posts for current page
    for (let i = startIndex; i < endIndex; i++) {
      if (this.allPosts[i]) {
        container.appendChild(this.allPosts[i].element.cloneNode(true));
      }
    }
  }
  
  renderPaginationControls() {
    // Remove existing pagination
    const existingPagination = document.querySelector('.pagination.main-pager');
    if (existingPagination) {
      existingPagination.remove();
    }
    
    if (this.totalPages <= 1) return;
    
    const labels = this.language === 'fr' ? {
      navLabel: 'Navigation de pagination',
      prevLabel: 'Page précédente - Articles les plus récents',
      nextLabel: 'Page suivante - Articles les plus anciens',
      prevText: 'Articles les plus récents',
      nextText: 'Articles les plus anciens'
    } : {
      navLabel: 'Pagination navigation',
      prevLabel: 'Previous page - Latest articles',
      nextLabel: 'Next page - Older articles',
      prevText: 'Latest articles',
      nextText: 'Older articles'
    };

    const paginationHtml = `
      <ul class="pagination main-pager" role="navigation" aria-label="${labels.navLabel}">
        ${this.currentPage > 1 ? `
          <li class="page-item previous" role="none">
            <a class="page-link" href="#page=${this.currentPage - 1}" aria-label="${labels.prevLabel}" data-page="${this.currentPage - 1}">
              <i class="fas fa-arrow-left" aria-hidden="true"></i>
              <span class="d-none d-sm-inline-block">${labels.prevText}</span>
            </a>
          </li>
        ` : ''}
        
        ${this.currentPage < this.totalPages ? `
          <li class="page-item next" role="none">
            <a class="page-link" href="#page=${this.currentPage + 1}" aria-label="${labels.nextLabel}" data-page="${this.currentPage + 1}">
              <span class="d-none d-sm-inline-block">${labels.nextText}</span>
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </li>
        ` : ''}
      </ul>
    `;
    
    // Insert pagination after posts list
    const postsContainer = document.querySelector('.posts-list');
    if (postsContainer) {
      postsContainer.insertAdjacentHTML('afterend', paginationHtml);
      
      // Add click handlers
      document.querySelectorAll('.pagination .page-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const page = parseInt(e.currentTarget.dataset.page);
          this.goToPage(page);
        });
      });
    }
  }
  
  goToPage(page) {
    if (page < 1 || page > this.totalPages) return;
    
    this.currentPage = page;
    window.location.hash = `page=${page}`;
    this.renderPage();
    this.renderPaginationControls();
    
    // Scroll to top of page
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }
  
  handleUrlChanges() {
    window.addEventListener('hashchange', () => {
      const hashMatch = window.location.hash.match(/page=(\d+)/);
      if (hashMatch) {
        const page = parseInt(hashMatch[1]);
        if (page !== this.currentPage) {
          this.currentPage = page;
          this.renderPage();
          this.renderPaginationControls();
        }
      } else if (this.currentPage !== 1) {
        this.currentPage = 1;
        this.renderPage();
        this.renderPaginationControls();
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DynamicPagination();
});