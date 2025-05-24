// Product Catalog Management for TechShop
// Handles filtering, sorting, pagination, and product display

class ProductCatalog {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.currentFilters = {
            categories: [],
            brands: [],
            priceMin: 0,
            priceMax: 2000,
            search: ''
        };
        this.currentSort = 'newest';
        this.filteredProducts = [];

        this.init();
    }

    init() {
        // Only initialize on products page
        if (!window.location.pathname.includes('proizvodi.html')) return;

        // Initialize with all products
        this.filteredProducts = [...window.TechShop.PRODUCTS];

        this.setupFilters();
        this.setupSorting();
        this.setupPagination();
        this.handleURLParams();
        this.renderProducts();
        this.updateFilterCounts();
        this.updatePagination();
        this.updateResultsCount();
    }

    // Handle URL parameters (like search)
    handleURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');

        if (searchTerm) {
            this.currentFilters.search = searchTerm;
            const searchInput = document.querySelector('.search-form input');
            if (searchInput) {
                searchInput.value = searchTerm;
            }
        }
    }

    // Setup filter functionality
    setupFilters() {
        // Category filters
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateCategoryFilters();
                this.applyFilters();
            });
        });

        // Brand filters
        const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateBrandFilters();
                this.applyFilters();
            });
        });

        // Price range filter
        const priceMinInput = document.querySelector('input[name="price-min"]');
        const priceMaxInput = document.querySelector('input[name="price-max"]');
        const priceFilterBtn = document.querySelector('.price-filter .btn');

        if (priceFilterBtn) {
            priceFilterBtn.addEventListener('click', () => {
                this.currentFilters.priceMin = parseFloat(priceMinInput?.value || 0);
                this.currentFilters.priceMax = parseFloat(priceMaxInput?.value || 2000);
                this.applyFilters();
            });
        }
    }

    // Setup sorting functionality
    setupSorting() {
        const sortSelect = document.querySelector('select[name="sort"]');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.applyFilters();
            });
        }
    }

    // Setup pagination
    setupPagination() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.pagination a')) {
                e.preventDefault();
                const pageNum = parseInt(e.target.textContent);
                if (!isNaN(pageNum)) {
                    this.currentPage = pageNum;
                    this.renderProducts();
                    this.updatePagination();
                }
            }
        });
    }

    // Update category filters
    updateCategoryFilters() {
        const checkedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
            .map(cb => cb.value);
        this.currentFilters.categories = checkedCategories;
    }

    // Update brand filters
    updateBrandFilters() {
        const checkedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
            .map(cb => cb.value);
        this.currentFilters.brands = checkedBrands;
    }

    // Apply all filters and sorting
    applyFilters() {
        let products = [...window.TechShop.PRODUCTS];

        // Apply search filter
        if (this.currentFilters.search) {
            const searchTerm = this.currentFilters.search.toLowerCase();
            products = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.features.some(feature => feature.toLowerCase().includes(searchTerm))
            );
        }

        // Apply category filter
        if (this.currentFilters.categories.length > 0) {
            products = products.filter(product =>
                this.currentFilters.categories.includes(product.category)
            );
        }

        // Apply brand filter
        if (this.currentFilters.brands.length > 0) {
            products = products.filter(product =>
                this.currentFilters.brands.includes(product.brand)
            );
        }

        // Apply price filter
        products = products.filter(product =>
            product.price >= this.currentFilters.priceMin &&
            product.price <= this.currentFilters.priceMax
        );

        // Apply sorting
        products = this.sortProducts(products);

        this.filteredProducts = products;
        this.currentPage = 1; // Reset to first page
        this.renderProducts();
        this.updatePagination();
        this.updateResultsCount();
    }

    // Sort products based on current sort option
    sortProducts(products) {
        switch (this.currentSort) {
            case 'price-asc':
                return products.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return products.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return products.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return products.sort((a, b) => b.name.localeCompare(a.name));
            case 'newest':
                return products.sort((a, b) => b.id - a.id);
            case 'popularity':
                return products.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
            default:
                return products;
        }
    }

    // Render products for current page
    renderProducts() {
        const productGrid = document.querySelector('.products-layout .product-grid');
        if (!productGrid) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            productGrid.innerHTML = `
                <div class="no-products">
                    <p>Nema proizvoda koji odgovaraju vašim kriterijima.</p>
                </div>
            `;
            return;
        }

        productGrid.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');
    }

    // Create product card HTML
    createProductCard(product) {
        const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        const oldPriceHtml = product.oldPrice ? `<span class="old-price">${product.oldPrice.toFixed(2)} €</span>` : '';

        return `
            <div class="product-card" data-product-id="${product.id}">
                ${badgeHtml}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        ${oldPriceHtml}
                        <span class="current-price">${product.price.toFixed(2)} €</span>
                    </div>
                    <div class="product-actions">
                        <a href="pojedinacni-proizvod.html?id=${product.id}" class="btn btn-outline">Detalji</a>
                        <button class="btn btn-primary">Dodaj u košaricu</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Update pagination
    updatePagination() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        const pagination = document.querySelector('.pagination');

        if (!pagination || totalPages <= 1) {
            if (pagination) pagination.style.display = 'none';
            return;
        }

        pagination.style.display = 'flex';

        let paginationHtml = '';

        // Previous button
        if (this.currentPage > 1) {
            paginationHtml += `<a href="#" data-page="${this.currentPage - 1}"><i class="fas fa-chevron-left"></i></a>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            paginationHtml += `<a href="#" class="${activeClass}" data-page="${i}">${i}</a>`;
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHtml += `<a href="#" data-page="${this.currentPage + 1}"><i class="fas fa-chevron-right"></i></a>`;
        }

        pagination.innerHTML = paginationHtml;
    }

    // Update results count
    updateResultsCount() {
        const resultsCount = document.querySelector('.products-header .results-count');
        if (resultsCount) {
            const total = this.filteredProducts.length;
            const start = (this.currentPage - 1) * this.itemsPerPage + 1;
            const end = Math.min(start + this.itemsPerPage - 1, total);

            resultsCount.textContent = `Prikazano ${start}-${end} od ${total} proizvoda`;
        }
    }

    // Update filter counts
    updateFilterCounts() {
        // Update category counts
        window.TechShop.CATEGORIES.forEach(category => {
            const checkbox = document.querySelector(`input[value="${category.id}"]`);
            if (checkbox) {
                const label = checkbox.closest('li');
                if (label) {
                    label.querySelector('.count').textContent = `(${category.count})`;
                }
            }
        });

        // Update brand counts
        window.TechShop.BRANDS.forEach(brand => {
            const checkbox = document.querySelector(`input[value="${brand.id}"]`);
            if (checkbox) {
                const label = checkbox.closest('li');
                if (label) {
                    label.querySelector('.count').textContent = `(${brand.count})`;
                }
            }
        });
    }
}

// Initialize product catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.TechShop) {
        new ProductCatalog();
    }
});
