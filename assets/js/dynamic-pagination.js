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
    const existingPagination = document.querySelector('.pagination.main-pager');
    if (existingPagination) existingPagination.remove();

    if (this.totalPages <= 1) return;

    const prevLabel = this.language === 'fr' ? 'Page précédente' : 'Previous page';
    const nextLabel = this.language === 'fr' ? 'Page suivante' : 'Next page';

    // Build page number items with a sliding window of max 5 pages
    const buildPageNumbers = () => {
      let pages = '';
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

      if (start > 1) {
        pages += `<li class="page-item" role="none"><a class="page-link" href="#page=1" data-page="1" aria-label="Page 1">1</a></li>`;
        if (start > 2) pages += `<li class="page-item page-ellipsis" role="none"><span class="page-link">…</span></li>`;
      }

      for (let i = start; i <= end; i++) {
        if (i === this.currentPage) {
          pages += `<li class="page-item page-item-active" role="none"><span class="page-link" aria-current="page">${i}</span></li>`;
        } else {
          pages += `<li class="page-item" role="none"><a class="page-link" href="#page=${i}" data-page="${i}" aria-label="Page ${i}">${i}</a></li>`;
        }
      }

      if (end < this.totalPages) {
        if (end < this.totalPages - 1) pages += `<li class="page-item page-ellipsis" role="none"><span class="page-link">…</span></li>`;
        pages += `<li class="page-item" role="none"><a class="page-link" href="#page=${this.totalPages}" data-page="${this.totalPages}" aria-label="Page ${this.totalPages}">${this.totalPages}</a></li>`;
      }

      return pages;
    };

    const paginationHtml = `
      <nav class="pagination main-pager" role="navigation" aria-label="Pagination">
        <ul class="pagination-list">
          <li class="page-item page-item-prev" role="none">
            ${this.currentPage > 1
              ? `<a class="page-link" href="#page=${this.currentPage - 1}" data-page="${this.currentPage - 1}" aria-label="${prevLabel}">←</a>`
              : `<span class="page-link page-link-disabled">←</span>`}
          </li>
          ${buildPageNumbers()}
          <li class="page-item page-item-next" role="none">
            ${this.currentPage < this.totalPages
              ? `<a class="page-link" href="#page=${this.currentPage + 1}" data-page="${this.currentPage + 1}" aria-label="${nextLabel}">→</a>`
              : `<span class="page-link page-link-disabled">→</span>`}
          </li>
        </ul>
      </nav>
    `;

    const postsContainer = document.querySelector('.posts-list');
    if (postsContainer) {
      postsContainer.insertAdjacentHTML('afterend', paginationHtml);
      document.querySelectorAll('.pagination .page-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.goToPage(parseInt(e.currentTarget.dataset.page));
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