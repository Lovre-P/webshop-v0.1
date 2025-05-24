// E-commerce functionality for TechShop
// Product data structure and core functionality

// Product database - in a real app this would come from an API
const PRODUCTS = [
    {
        id: 1,
        name: "Smartphone XYZ",
        price: 799.99,
        oldPrice: null,
        category: "smartphones",
        brand: "TechBrand",
        image: "https://picsum.photos/300/300?random=1",
        gallery: [
            "https://picsum.photos/600/600?random=1",
            "https://picsum.photos/600/600?random=2",
            "https://picsum.photos/600/600?random=3"
        ],
        description: "Smartphone XYZ je najnoviji model s naprednim značajkama, vrhunskom kamerom i dugotrajnom baterijom.",
        features: ["6.1 inch display", "128GB storage", "Triple camera", "5G ready"],
        badge: "Novo",
        rating: 4.5,
        reviews: 24,
        inStock: true,
        colors: ["black", "white", "blue"],
        variants: ["128GB", "256GB", "512GB"]
    },
    {
        id: 2,
        name: "Laptop ABC",
        price: 1299.99,
        oldPrice: null,
        category: "laptops",
        brand: "CompuTech",
        image: "https://picsum.photos/300/300?random=2",
        gallery: [
            "https://picsum.photos/600/600?random=4",
            "https://picsum.photos/600/600?random=5"
        ],
        description: "Snažan laptop za rad i zabavu s najnovijim procesorom i grafičkom kartom.",
        features: ["Intel i7 processor", "16GB RAM", "512GB SSD", "RTX 3060"],
        badge: "Popularno",
        rating: 4.8,
        reviews: 45,
        inStock: true,
        colors: ["silver", "black"],
        variants: ["16GB RAM", "32GB RAM"]
    },
    {
        id: 3,
        name: "Tablet 123",
        price: 499.99,
        oldPrice: 599.99,
        category: "tablets",
        brand: "TabletCorp",
        image: "https://picsum.photos/300/300?random=3",
        gallery: [
            "https://picsum.photos/600/600?random=6",
            "https://picsum.photos/600/600?random=7"
        ],
        description: "Vrhunski tablet za kreativnost i produktivnost.",
        features: ["10.9 inch display", "256GB storage", "Apple Pencil support", "All-day battery"],
        badge: "Akcija",
        rating: 4.3,
        reviews: 18,
        inStock: true,
        colors: ["space-gray", "silver", "gold"],
        variants: ["64GB", "256GB"]
    },
    {
        id: 4,
        name: "Bežične slušalice",
        price: 149.99,
        oldPrice: null,
        category: "audio",
        brand: "SoundTech",
        image: "https://picsum.photos/300/300?random=4",
        gallery: [
            "https://picsum.photos/600/600?random=8"
        ],
        description: "Premium bežične slušalice s aktivnim poništavanjem buke.",
        features: ["Active noise cancellation", "30h battery life", "Quick charge", "Premium sound"],
        badge: null,
        rating: 4.6,
        reviews: 67,
        inStock: true,
        colors: ["black", "white", "blue"],
        variants: ["Standard", "Pro"]
    },
    {
        id: 5,
        name: "Smartwatch Pro",
        price: 299.99,
        oldPrice: null,
        category: "wearables",
        brand: "WatchTech",
        image: "https://picsum.photos/300/300?random=5",
        gallery: [
            "https://picsum.photos/600/600?random=9"
        ],
        description: "Napredni pametni sat s praćenjem zdravlja i fitness funkcijama.",
        features: ["Health monitoring", "GPS tracking", "Water resistant", "7-day battery"],
        badge: null,
        rating: 4.4,
        reviews: 32,
        inStock: true,
        colors: ["black", "silver", "gold"],
        variants: ["40mm", "44mm"]
    },
    {
        id: 6,
        name: "Gaming tipkovnica",
        price: 149.99,
        oldPrice: 199.99,
        category: "accessories",
        brand: "GameTech",
        image: "https://picsum.photos/300/300?random=6",
        gallery: [
            "https://picsum.photos/600/600?random=10"
        ],
        description: "Mehanička gaming tipkovnica s RGB osvjetljenjem.",
        features: ["Mechanical switches", "RGB lighting", "Programmable keys", "Gaming mode"],
        badge: "Akcija",
        rating: 4.7,
        reviews: 89,
        inStock: true,
        colors: ["black"],
        variants: ["Red switches", "Blue switches", "Brown switches"]
    },
    {
        id: 7,
        name: "Gaming miš s RGB osvjetljenjem i preciznim senzorima",
        price: 89.99,
        oldPrice: null,
        category: "accessories",
        brand: "GameTech",
        image: "https://picsum.photos/300/300?random=5",
        gallery: [
            "https://picsum.photos/600/600?random=11"
        ],
        description: "Precizni gaming miš s prilagodljivim DPI i RGB osvjetljenjem.",
        features: ["16000 DPI sensor", "RGB lighting", "Programmable buttons", "Ergonomic design"],
        badge: "Popularno",
        rating: 4.5,
        reviews: 156,
        inStock: true,
        colors: ["black", "white"],
        variants: ["Standard", "Wireless"]
    },
    {
        id: 8,
        name: "USB-C Hub",
        price: 59.99,
        oldPrice: 79.99,
        category: "accessories",
        brand: "ConnectTech",
        image: "https://picsum.photos/300/300?random=6",
        gallery: [
            "https://picsum.photos/600/600?random=12"
        ],
        description: "Višenamjenski USB-C hub s HDMI, USB portovima i čitačem kartica.",
        features: ["7-in-1 design", "4K HDMI output", "USB 3.0 ports", "SD card reader"],
        badge: null,
        rating: 4.2,
        reviews: 43,
        inStock: true,
        colors: ["space-gray", "silver"],
        variants: ["7-in-1", "9-in-1"]
    }
];

// Categories for filtering
const CATEGORIES = [
    { id: "smartphones", name: "Pametni telefoni", count: 1 },
    { id: "laptops", name: "Laptopi", count: 1 },
    { id: "tablets", name: "Tableti", count: 1 },
    { id: "audio", name: "Audio", count: 1 },
    { id: "wearables", name: "Nosiva tehnologija", count: 1 },
    { id: "accessories", name: "Dodaci", count: 3 }
];

// Brands for filtering
const BRANDS = [
    { id: "TechBrand", name: "TechBrand", count: 1 },
    { id: "CompuTech", name: "CompuTech", count: 1 },
    { id: "TabletCorp", name: "TabletCorp", count: 1 },
    { id: "SoundTech", name: "SoundTech", count: 1 },
    { id: "WatchTech", name: "WatchTech", count: 1 },
    { id: "GameTech", name: "GameTech", count: 2 },
    { id: "ConnectTech", name: "ConnectTech", count: 1 }
];

// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadFromStorage();
        this.updateCartUI();
    }

    // Load cart from localStorage
    loadFromStorage() {
        const saved = localStorage.getItem('techshop-cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveToStorage() {
        localStorage.setItem('techshop-cart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(productId, quantity = 1, selectedColor = null, selectedVariant = null) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return false;

        const existingItemIndex = this.items.findIndex(item =>
            item.productId === productId &&
            item.selectedColor === selectedColor &&
            item.selectedVariant === selectedVariant
        );

        if (existingItemIndex > -1) {
            this.items[existingItemIndex].quantity += quantity;
        } else {
            this.items.push({
                productId,
                quantity,
                selectedColor,
                selectedVariant,
                addedAt: new Date().toISOString()
            });
        }

        this.saveToStorage();
        this.updateCartUI();
        this.showNotification(`${product.name} dodano u košaricu!`, 'success');
        return true;
    }

    // Remove item from cart
    removeItem(productId, selectedColor = null, selectedVariant = null) {
        this.items = this.items.filter(item =>
            !(item.productId === productId &&
              item.selectedColor === selectedColor &&
              item.selectedVariant === selectedVariant)
        );
        this.saveToStorage();
        this.updateCartUI();
    }

    // Update item quantity
    updateQuantity(productId, quantity, selectedColor = null, selectedVariant = null) {
        const itemIndex = this.items.findIndex(item =>
            item.productId === productId &&
            item.selectedColor === selectedColor &&
            item.selectedVariant === selectedVariant
        );

        if (itemIndex > -1) {
            if (quantity <= 0) {
                this.removeItem(productId, selectedColor, selectedVariant);
            } else {
                this.items[itemIndex].quantity = quantity;
                this.saveToStorage();
                this.updateCartUI();
            }
        }
    }

    // Get cart total count
    getTotalCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get cart total price
    getTotalPrice() {
        return this.items.reduce((total, item) => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    // Update cart UI elements
    updateCartUI() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalCount = this.getTotalCount();

        cartCountElements.forEach(element => {
            element.textContent = totalCount;
            element.style.display = totalCount > 0 ? 'flex' : 'none';
        });
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Clear cart
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateCartUI();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Export for global access
window.TechShop = {
    PRODUCTS,
    CATEGORIES,
    BRANDS,
    cart
};
