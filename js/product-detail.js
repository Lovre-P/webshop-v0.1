// Product Detail Page Enhancements for TechShop
// Handles gallery, options selection, and dynamic content loading

class ProductDetail {
    constructor() {
        this.selectedColor = null;
        this.selectedVariant = null;
        this.currentProduct = null;
        
        this.init();
    }

    init() {
        // Only initialize on product detail page
        if (!window.location.pathname.includes('pojedinacni-proizvod.html')) return;
        
        this.loadProductFromURL();
        this.setupGallery();
        this.setupColorOptions();
        this.setupVariantOptions();
        this.setupQuantityButtons();
        this.setupAddToCart();
        this.setupRatingSelect();
    }

    // Load product data from URL parameter
    loadProductFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        
        if (productId && window.TechShop?.PRODUCTS) {
            this.currentProduct = window.TechShop.PRODUCTS.find(p => p.id === productId);
            if (this.currentProduct) {
                this.renderProductData();
            }
        }
    }

    // Render product data dynamically
    renderProductData() {
        const product = this.currentProduct;
        
        // Update basic info
        const titleElement = document.querySelector('.product-info h1');
        if (titleElement) titleElement.textContent = product.name;
        
        const priceElement = document.querySelector('.current-price');
        if (priceElement) priceElement.textContent = `${product.price.toFixed(2)} €`;
        
        const descriptionElement = document.querySelector('.product-short-description p');
        if (descriptionElement) descriptionElement.textContent = product.description;
        
        // Update gallery
        this.updateGallery(product.gallery);
        
        // Update color options
        this.updateColorOptions(product.colors);
        
        // Update variant options
        this.updateVariantOptions(product.variants);
        
        // Update badge
        this.updateBadge(product.badge);
        
        // Update rating
        this.updateRating(product.rating, product.reviews);
    }

    updateGallery(gallery) {
        if (!gallery || gallery.length === 0) return;
        
        const mainImage = document.getElementById('main-product-image');
        const thumbnailContainer = document.querySelector('.thumbnail-images');
        
        if (mainImage) {
            mainImage.src = gallery[0];
        }
        
        if (thumbnailContainer) {
            thumbnailContainer.innerHTML = gallery.map((image, index) => `
                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                    <img src="${image}" alt="${this.currentProduct.name} - Slika ${index + 1}">
                </div>
            `).join('');
        }
    }

    updateColorOptions(colors) {
        if (!colors || colors.length === 0) return;
        
        const colorContainer = document.querySelector('.color-options');
        if (!colorContainer) return;
        
        const colorMap = {
            'black': '#000000',
            'white': '#FFFFFF',
            'blue': '#0047AB',
            'silver': '#C0C0C0',
            'gold': '#FFD700',
            'space-gray': '#4A4A4A'
        };
        
        colorContainer.innerHTML = colors.map((color, index) => {
            const colorCode = colorMap[color] || '#CCCCCC';
            const borderStyle = color === 'white' ? 'border: 1px solid #ddd;' : '';
            return `
                <div class="color-option ${index === 0 ? 'active' : ''}" 
                     data-color="${color}" 
                     style="background-color: ${colorCode}; ${borderStyle}" 
                     title="${color}">
                </div>
            `;
        }).join('');
        
        this.selectedColor = colors[0];
    }

    updateVariantOptions(variants) {
        if (!variants || variants.length === 0) return;
        
        const variantContainer = document.querySelector('.variant-options');
        if (!variantContainer) return;
        
        variantContainer.innerHTML = variants.map((variant, index) => `
            <div class="variant-option ${index === 0 ? 'active' : ''}" data-variant="${variant}">
                ${variant}
            </div>
        `).join('');
        
        this.selectedVariant = variants[0];
    }

    updateBadge(badge) {
        const badgeElement = document.querySelector('.product-badge');
        if (badgeElement) {
            if (badge) {
                badgeElement.textContent = badge;
                badgeElement.style.display = 'block';
            } else {
                badgeElement.style.display = 'none';
            }
        }
    }

    updateRating(rating, reviewCount) {
        const ratingElement = document.querySelector('.rating-count');
        if (ratingElement) {
            ratingElement.textContent = `(${reviewCount} recenzije)`;
        }
    }

    // Setup gallery thumbnail clicks
    setupGallery() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.thumbnail')) {
                const thumbnail = e.target.closest('.thumbnail');
                const imageUrl = thumbnail.dataset.image;
                const mainImage = document.getElementById('main-product-image');
                
                if (mainImage && imageUrl) {
                    mainImage.src = imageUrl;
                    
                    // Update active thumbnail
                    document.querySelectorAll('.thumbnail').forEach(thumb => {
                        thumb.classList.remove('active');
                    });
                    thumbnail.classList.add('active');
                }
            }
        });
    }

    // Setup color option selection
    setupColorOptions() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.color-option')) {
                // Remove active class from all color options
                document.querySelectorAll('.color-option').forEach(option => {
                    option.classList.remove('active');
                });
                
                // Add active class to clicked option
                e.target.classList.add('active');
                
                // Store selected color
                this.selectedColor = e.target.dataset.color;
            }
        });
    }

    // Setup variant option selection
    setupVariantOptions() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.variant-option')) {
                // Remove active class from all variant options
                document.querySelectorAll('.variant-option').forEach(option => {
                    option.classList.remove('active');
                });
                
                // Add active class to clicked option
                e.target.classList.add('active');
                
                // Store selected variant
                this.selectedVariant = e.target.dataset.variant;
            }
        });
    }

    // Setup quantity buttons (already exists in main.js but ensure it works)
    setupQuantityButtons() {
        const quantitySelector = document.querySelector('.quantity-selector');
        if (!quantitySelector) return;
        
        const minusBtn = quantitySelector.querySelector('.minus');
        const plusBtn = quantitySelector.querySelector('.plus');
        const input = quantitySelector.querySelector('input');
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue < 99) {
                    input.value = currentValue + 1;
                }
            });
        }
        
        if (input) {
            input.addEventListener('change', () => {
                const value = parseInt(input.value);
                if (isNaN(value) || value < 1) {
                    input.value = 1;
                } else if (value > 99) {
                    input.value = 99;
                }
            });
        }
    }

    // Setup add to cart button
    setupAddToCart() {
        const addToCartBtn = document.querySelector('.add-to-cart');
        if (!addToCartBtn) return;
        
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!this.currentProduct) {
                // Fallback for static product page
                const productName = document.querySelector('.product-info h1')?.textContent;
                const product = window.TechShop?.PRODUCTS.find(p => p.name === productName);
                if (product) {
                    this.currentProduct = product;
                }
            }
            
            if (this.currentProduct && window.TechShop?.cart) {
                const quantity = parseInt(document.querySelector('.quantity-selector input')?.value || 1);
                window.TechShop.cart.addItem(
                    this.currentProduct.id, 
                    quantity, 
                    this.selectedColor, 
                    this.selectedVariant
                );
            }
        });
    }

    // Setup rating selection for review form
    setupRatingSelect() {
        const ratingStars = document.querySelectorAll('.rating-select i');
        let selectedRating = 0;
        
        ratingStars.forEach((star, index) => {
            star.addEventListener('click', () => {
                selectedRating = index + 1;
                
                // Update star display
                ratingStars.forEach((s, i) => {
                    if (i < selectedRating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            // Hover effect
            star.addEventListener('mouseenter', () => {
                ratingStars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
        
        // Reset on mouse leave
        const ratingContainer = document.querySelector('.rating-select');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', () => {
                ratingStars.forEach((s, i) => {
                    if (i < selectedRating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        }
    }
}

// Initialize product detail when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.TechShop) {
        new ProductDetail();
    }
});
