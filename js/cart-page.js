// Cart Page Management for TechShop
// Handles cart display, quantity updates, and item removal

class CartPage {
    constructor() {
        this.cart = window.TechShop?.cart;
        if (!this.cart) {
            console.error('Cart not available');
            return;
        }

        this.init();
    }

    init() {
        // Only initialize on cart page
        if (!window.location.pathname.includes('kosarica.html')) return;

        this.renderCartItems();
        this.setupEventListeners();
        this.updateCartSummary();
    }

    setupEventListeners() {
        // Remove item buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.remove') || e.target.closest('.remove')) {
                e.preventDefault();
                this.handleRemoveItem(e);
            }
        });

        // Quantity change buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.quantity-btn')) {
                this.handleQuantityChange(e);
            }
        });

        // Quantity input changes
        document.addEventListener('change', (e) => {
            if (e.target.matches('.quantity-input')) {
                this.handleQuantityInput(e);
            }
        });

        // Proceed to checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.proceedToCheckout();
            });
        }

        // Continue shopping button
        const continueBtn = document.querySelector('.continue-shopping');
        if (continueBtn) {
            continueBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'proizvodi.html';
            });
        }
    }

    renderCartItems() {
        const cartTableBody = document.querySelector('.cart-table tbody');
        if (!cartTableBody) return;

        if (this.cart.items.length === 0) {
            this.renderEmptyCart();
            return;
        }

        const cartItemsHtml = this.cart.items.map(item => {
            const product = window.TechShop.PRODUCTS.find(p => p.id === item.productId);
            if (!product) return '';

            const subtotal = product.price * item.quantity;
            const colorText = item.selectedColor ? ` - ${item.selectedColor}` : '';
            const variantText = item.selectedVariant ? ` - ${item.selectedVariant}` : '';

            return `
                <tr class="cart-item" data-product-id="${item.productId}" data-color="${item.selectedColor || ''}" data-variant="${item.selectedVariant || ''}">
                    <td class="product-remove">
                        <a href="#" class="remove" aria-label="Ukloni proizvod">
                            <i class="fas fa-times"></i>
                        </a>
                    </td>
                    <td class="product-thumbnail">
                        <a href="pojedinacni-proizvod.html?id=${product.id}">
                            <img src="${product.image}" alt="${product.name}">
                        </a>
                    </td>
                    <td class="product-name">
                        <a href="pojedinacni-proizvod.html?id=${product.id}">
                            ${product.name}${colorText}${variantText}
                        </a>
                    </td>
                    <td class="product-price">
                        <span class="amount">${product.price.toFixed(2)} €</span>
                    </td>
                    <td class="product-quantity">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus" type="button">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99">
                            <button class="quantity-btn plus" type="button">+</button>
                        </div>
                    </td>
                    <td class="product-subtotal">
                        <span class="amount">${subtotal.toFixed(2)} €</span>
                    </td>
                </tr>
            `;
        }).join('');

        cartTableBody.innerHTML = cartItemsHtml;

        // Show cart totals section when there are items
        const cartTotals = document.querySelector('.cart-totals');
        if (cartTotals) {
            cartTotals.style.display = 'block';
        }

        // Reset cart container styling when there are items
        const cartContainer = document.querySelector('.cart-container');
        if (cartContainer) {
            cartContainer.style.gridColumn = '';
        }
    }

    renderEmptyCart() {
        const cartContainer = document.querySelector('.cart-container');
        if (!cartContainer) return;

        // Hide cart totals section when cart is empty
        const cartTotals = document.querySelector('.cart-totals');
        if (cartTotals) {
            cartTotals.style.display = 'none';
        }

        // Make cart container full width when empty
        cartContainer.style.gridColumn = '1 / -1';

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h2>Vaša košarica je prazna</h2>
                <p>Dodajte proizvode u košaricu da biste nastavili s kupovinom.</p>
                <a href="proizvodi.html" class="btn btn-primary">Nastavi kupovinu</a>
            </div>
        `;
    }

    handleRemoveItem(e) {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const productId = parseInt(cartItem.dataset.productId);
        const selectedColor = cartItem.dataset.color || null;
        const selectedVariant = cartItem.dataset.variant || null;

        // Add confirmation
        if (confirm('Jeste li sigurni da želite ukloniti ovaj proizvod iz košarice?')) {
            this.cart.removeItem(productId, selectedColor, selectedVariant);
            this.renderCartItems();
            this.updateCartSummary();

            // Show notification
            this.cart.showNotification('Proizvod uklonjen iz košarice', 'success');
        }
    }

    handleQuantityChange(e) {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const quantityInput = cartItem.querySelector('.quantity-input');
        const currentQuantity = parseInt(quantityInput.value);
        let newQuantity = currentQuantity;

        if (e.target.classList.contains('minus')) {
            newQuantity = Math.max(1, currentQuantity - 1);
        } else if (e.target.classList.contains('plus')) {
            newQuantity = Math.min(99, currentQuantity + 1);
        }

        quantityInput.value = newQuantity;
        this.updateItemQuantity(cartItem, newQuantity);
    }

    handleQuantityInput(e) {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const newQuantity = Math.max(1, Math.min(99, parseInt(e.target.value) || 1));
        e.target.value = newQuantity;
        this.updateItemQuantity(cartItem, newQuantity);
    }

    updateItemQuantity(cartItem, newQuantity) {
        const productId = parseInt(cartItem.dataset.productId);
        const selectedColor = cartItem.dataset.color || null;
        const selectedVariant = cartItem.dataset.variant || null;

        this.cart.updateQuantity(productId, newQuantity, selectedColor, selectedVariant);

        // Update subtotal in the row
        const product = window.TechShop.PRODUCTS.find(p => p.id === productId);
        if (product) {
            const subtotal = product.price * newQuantity;
            const subtotalElement = cartItem.querySelector('.product-subtotal .amount');
            if (subtotalElement) {
                subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
            }
        }

        this.updateCartSummary();
    }

    updateCartSummary() {
        const subtotalElement = document.querySelector('.cart-subtotal .amount');
        const totalElement = document.querySelector('.cart-total .amount');

        const subtotal = this.cart.getTotalPrice();
        const shipping = subtotal > 100 ? 0 : 15; // Free shipping over 100€
        const total = subtotal + shipping;

        if (subtotalElement) {
            subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
        }

        if (totalElement) {
            totalElement.textContent = `${total.toFixed(2)} €`;
        }

        // Update shipping info
        const shippingElement = document.querySelector('.cart-shipping .amount');
        if (shippingElement) {
            shippingElement.textContent = shipping === 0 ? 'Besplatno' : `${shipping.toFixed(2)} €`;
        }

        // Show/hide free shipping message
        const freeShippingMsg = document.querySelector('.free-shipping-message');
        if (freeShippingMsg) {
            if (subtotal > 100) {
                freeShippingMsg.textContent = 'Čestitamo! Ostvarili ste besplatnu dostavu.';
                freeShippingMsg.className = 'free-shipping-message success';
            } else {
                const remaining = 100 - subtotal;
                freeShippingMsg.textContent = `Dodajte još ${remaining.toFixed(2)} € za besplatnu dostavu.`;
                freeShippingMsg.className = 'free-shipping-message info';
            }
        }
    }

    proceedToCheckout() {
        if (this.cart.items.length === 0) {
            this.cart.showNotification('Košarica je prazna', 'error');
            return;
        }

        // In a real app, this would redirect to checkout
        window.location.href = 'placanje.html';
    }
}

// Initialize cart page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.TechShop) {
        new CartPage();
    }
});
