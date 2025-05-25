// E-commerce functionality for TechShop
// Product data structure and core functionality

// Product database - in a real app this would come from an API
const PRODUCTS = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 1199.99,
        oldPrice: null,
        category: "smartphones",
        brand: "Apple",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895395658",
        gallery: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895395658",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895395658",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-whitetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692895395658"
        ],
        description: "iPhone 15 Pro s titanijskim dizajnom, A17 Pro čipom i naprednim Pro kamernim sustavom s 5x teleobjektivom.",
        features: ["6.1-inch Super Retina XDR display", "A17 Pro chip", "Pro camera system", "5x Telephoto camera", "Action Button", "USB-C"],
        badge: "Novo",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        colors: [
            { name: "Natural Titanium", color: "#F5F5DC" },
            { name: "Blue Titanium", color: "#4A90E2" },
            { name: "White Titanium", color: "#F8F8FF" },
            { name: "Black Titanium", color: "#2C2C2C" }
        ],
        variants: ["128GB", "256GB", "512GB", "1TB"]
    },
    {
        id: 2,
        name: "MacBook Pro 14-inch M3",
        price: 1999.99,
        oldPrice: null,
        category: "laptops",
        brand: "Apple",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290",
        gallery: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290"
        ],
        description: "MacBook Pro s M3 čipom donosi nevjerojatnu performansu za profesionalne zadatke i kreativni rad.",
        features: ["14-inch Liquid Retina XDR display", "M3 chip", "Up to 22 hours battery life", "1080p FaceTime HD camera", "Six-speaker sound system"],
        badge: "Popularno",
        rating: 4.9,
        reviews: 89,
        inStock: true,
        colors: [
            { name: "Space Gray", color: "#5C5C5C" },
            { name: "Silver", color: "#E8E8E8" }
        ],
        variants: ["8GB RAM", "16GB RAM", "32GB RAM"]
    },
    {
        id: 3,
        name: "iPad Air M2",
        price: 699.99,
        oldPrice: 799.99,
        category: "tablets",
        brand: "Apple",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1713308272877",
        gallery: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1713308272877",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-purple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1713308272877"
        ],
        description: "iPad Air s M2 čipom donosi nevjerojatnu performansu u tankom i laganom dizajnu.",
        features: ["11-inch Liquid Retina display", "M2 chip", "All-day battery life", "Apple Pencil Pro support", "12MP cameras"],
        badge: "Akcija",
        rating: 4.7,
        reviews: 203,
        inStock: true,
        colors: [
            { name: "Blue", color: "#007AFF" },
            { name: "Purple", color: "#AF52DE" },
            { name: "Starlight", color: "#F9F6EF" },
            { name: "Space Gray", color: "#5C5C5C" }
        ],
        variants: ["128GB", "256GB", "512GB", "1TB"]
    },
    {
        id: 4,
        name: "AirPods Pro 2",
        price: 279.99,
        oldPrice: null,
        category: "audio",
        brand: "Apple",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
        gallery: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2nd-gen-hero-select-202209?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1660925795051"
        ],
        description: "AirPods Pro 2. generacije s naprednim potiskivanjem buke i prostornim zvukom.",
        features: ["Active Noise Cancellation", "Adaptive Transparency", "Spatial Audio", "Up to 6 hours listening time", "MagSafe Charging Case"],
        badge: null,
        rating: 4.8,
        reviews: 342,
        inStock: true,
        colors: [
            { name: "White", color: "#FFFFFF" }
        ],
        variants: ["Standard"]
    },
    {
        id: 5,
        name: "Apple Watch Series 9",
        price: 429.99,
        oldPrice: null,
        category: "wearables",
        brand: "Apple",
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s10-case-unselect-gallery-1-202503?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=T1poMzZuRzBxQ1RzQmhMUHprUE5LZHlVRllKam5abHNZRGludXlMbytKNjZqY1lkK0tzZFpEVlpBSXpHb1VXNVBPMVJocHRGWWdEaGFBbE5iRklMb1hPYW04cW1YR2l1R0RzLzYxenhFZTlwZDRjSG44dlRjQnB4RFJ4d3IvN0o",
        gallery: [
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s10-case-unselect-gallery-1-202503?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=T1poMzZuRzBxQ1RzQmhMUHprUE5LZHlVRllKam5abHNZRGludXlMbytKNjZqY1lkK0tzZFpEVlpBSXpHb1VXNVBPMVJocHRGWWdEaGFBbE5iRklMb1hPYW04cW1YR2l1R0RzLzYxenhFZTlwZDRjSG44dlRjQnB4RFJ4d3IvN0o",
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s10-case-unselect-gallery-3-202503?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=T1poMzZuRzBxQ1RzQmhMUHprUE5LZHNPaXdkbGRqaUhPM1p1TVdpN2tNZTZqY1lkK0tzZFpEVlpBSXpHb1VXNVBPMVJocHRGWWdEaGFBbE5iRklMb1M3TmZoTTJ6aU5oeUwxT29jSjZRSGpOVGpZZk5GQXgrMUIvYk5sdHcwekM"
        ],
        description: "Apple Watch Series 9 s S9 čipom, najnapredniji pametni sat za zdravlje i fitnes.",
        features: ["S9 SiP chip", "Double Tap gesture", "Precision Finding", "All-day 18-hour battery", "Advanced health sensors"],
        badge: null,
        rating: 4.6,
        reviews: 278,
        inStock: true,
        colors: [
            { name: "Pink", color: "#F8BBD0" },
            { name: "Midnight", color: "#1C1C1E" },
            { name: "Starlight", color: "#F9F6EF" },
            { name: "Silver", color: "#E8E8E8" },
            { name: "Product Red", color: "#FF3B30" }
        ],
        variants: ["41mm", "45mm"]
    },
    {
        id: 6,
        name: "Magic Keyboard",
        price: 179.99,
        oldPrice: 199.99,
        category: "accessories",
        brand: "Apple",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK2A3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1628010471000",
        gallery: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK2A3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1628010471000",
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXCL3_AV3?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=WkovODlkaGxlcUZOamRGYytBVnFBQ1RkTXNZOFJZTitTVFE0NHl0VW5Cb0YwVmtIbGRkS25RMVpBRlo0bk5DUStsbmlHM0V0NExrNmJOMHI2d3RzWVE"
        ],
        description: "Magic Keyboard s Touch ID i numeričkim tipkovnicama za Mac računala.",
        features: ["Touch ID", "Numeric keypad", "Rechargeable battery", "Wireless connectivity", "Scissor mechanism"],
        badge: "Akcija",
        rating: 4.5,
        reviews: 156,
        inStock: true,
        colors: [
            { name: "White", color: "#FFFFFF" },
            { name: "Black", color: "#1C1C1E" }
        ],
        variants: ["With Touch ID", "Standard"]
    },
    {
        id: 7,
        name: "iPhone 15",
        price: 899.99,
        oldPrice: null,
        category: "smartphones",
        brand: "Apple",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378",
        gallery: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780378"
        ],
        description: "iPhone 15 s Dynamic Island, naprednim kamernim sustavom i USB-C priključkom.",
        features: ["6.1-inch Super Retina XDR display", "A16 Bionic chip", "Advanced dual-camera system", "Dynamic Island", "USB-C"],
        badge: "Popularno",
        rating: 4.7,
        reviews: 289,
        inStock: true,
        colors: [
            { name: "Pink", color: "#F8BBD0" },
            { name: "Yellow", color: "#FFD60A" },
            { name: "Green", color: "#30D158" },
            { name: "Blue", color: "#007AFF" },
            { name: "Black", color: "#1C1C1E" }
        ],
        variants: ["128GB", "256GB", "512GB"]
    },
    {
        id: 8,
        name: "USB-C Adapter",
        price: 79.99,
        oldPrice: 99.99,
        category: "accessories",
        brand: "Apple",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MUF82?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1551489688005",
        gallery: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MUF82?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1551489688005"
        ],
        description: "Apple USB-C Digital AV Multiport Adapter omogućuje povezivanje USB-C uređaja s HDMI displayom.",
        features: ["USB-C to HDMI", "USB-A port", "USB-C charging port", "4K video output", "Compact design"],
        badge: "Akcija",
        rating: 4.3,
        reviews: 187,
        inStock: true,
        colors: [
            { name: "White", color: "#FFFFFF" }
        ],
        variants: ["Standard"]
    },
    {
        id: 9,
        name: "Samsung Galaxy S24 Ultra",
        price: 1299.99,
        oldPrice: null,
        category: "smartphones",
        brand: "Samsung",
        image: "https://www.nabava.net/slike/products/94/38/51703894/mobiteli-samsung-galaxy-s24-ultra-256gb-68_ecb001db.png",
        gallery: [
            "https://www.nabava.net/slike/products/94/38/51703894/mobiteli-samsung-galaxy-s24-ultra-256gb-68_ecb001db.png",
            "https://linkversity.hr/wp-content/uploads/2024/12/samsung-galaxy-s24-ultra-1024x597.webp"
        ],
        description: "Samsung Galaxy S24 Ultra s S Pen-om, AI funkcijama i 200MP kamerom.",
        features: ["6.8-inch Dynamic AMOLED 2X", "Snapdragon 8 Gen 3", "200MP Pro camera", "S Pen included", "5000mAh battery"],
        badge: "Novo",
        rating: 4.7,
        reviews: 124,
        inStock: true,
        colors: [
            { name: "Titanium Black", color: "#2C2C2C" },
            { name: "Titanium Gray", color: "#8E8E93" },
            { name: "Titanium Violet", color: "#8E44AD" },
            { name: "Titanium Yellow", color: "#F1C40F" }
        ],
        variants: ["256GB", "512GB", "1TB"]
    },
    {
        id: 10,
        name: "Sony WH-1000XM5",
        price: 399.99,
        oldPrice: 449.99,
        category: "audio",
        brand: "Sony",
        image: "https://www.harveynorman.co.uk/cdn/shop/files/WH1000XM5B.CE7_1.jpg?v=1742818549&width=1920",
        gallery: [
            "https://cdn11.bigcommerce.com/s-pwefhhr7pn/images/stencil/1280x1280/products/32210/131470/fe31c604d6ead4abfc15d2587a0d8b44e0fcb317_414861__20295.1732062684.jpg?c=1",
            "https://www.harveynorman.co.uk/cdn/shop/files/WH1000XM5B.CE7_1.jpg?v=1742818549&width=1920"
        ],
        description: "Sony WH-1000XM5 bežične slušalice s vrhunskim potiskivanjem buke.",
        features: ["Industry-leading noise canceling", "30-hour battery life", "Multipoint connection", "Quick Charge", "Touch controls"],
        badge: "Akcija",
        rating: 4.8,
        reviews: 267,
        inStock: true,
        colors: [
            { name: "Black", color: "#1C1C1E" },
            { name: "Silver", color: "#E8E8E8" }
        ],
        variants: ["Standard"]
    },
    {
        id: 11,
        name: "Microsoft Surface Pro 9",
        price: 1199.99,
        oldPrice: null,
        category: "tablets",
        brand: "Microsoft",
        image: "https://www.bug.hr/img/microsoft-surface-pro-9-je-premium-windows-tablet-koji-se-dodavanjem-tipkovnice__wJdcS.jpg",
        gallery: [
            "https://www.bug.hr/img/microsoft-surface-pro-9-je-premium-windows-tablet-koji-se-dodavanjem-tipkovnice__wJdcS.jpg",
            "https://www.lowyat.net/wp-content/uploads/2022/10/surface-pro-9-03-1024x641.jpg"
        ],
        description: "Microsoft Surface Pro 9 - laptop performanse u tablet formatu.",
        features: ["13-inch PixelSense display", "12th Gen Intel Core", "All-day battery", "Windows 11", "Surface Pen support"],
        badge: "Popularno",
        rating: 4.6,
        reviews: 89,
        inStock: true,
        colors: [
            { name: "Platinum", color: "#E5E5E5" },
            { name: "Graphite", color: "#4A4A4A" },
            { name: "Sapphire", color: "#0F4C75" },
            { name: "Forest", color: "#2D5016" }
        ],
        variants: ["8GB/128GB", "8GB/256GB", "16GB/256GB", "16GB/512GB", "16GB/1TB"]
    }
];

// Categories for filtering
const CATEGORIES = [
    { id: "smartphones", name: "Pametni telefoni", count: 3 },
    { id: "laptops", name: "Laptopi", count: 1 },
    { id: "tablets", name: "Tableti", count: 2 },
    { id: "audio", name: "Audio", count: 2 },
    { id: "wearables", name: "Nosiva tehnologija", count: 1 },
    { id: "accessories", name: "Dodaci", count: 2 }
];

// Brands for filtering
const BRANDS = [
    { id: "Apple", name: "Apple", count: 8 },
    { id: "Samsung", name: "Samsung", count: 1 },
    { id: "Sony", name: "Sony", count: 1 },
    { id: "Microsoft", name: "Microsoft", count: 1 }
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
