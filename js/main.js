document.addEventListener('DOMContentLoaded', function() {
    // Učitavanje headera i footera
    loadComponent('header', document.querySelector('header'));
    loadComponent('footer', document.querySelector('footer'));

    // Učitavanje cookie bannera
    loadCookieBanner();

    // Dark mode toggle
    setupDarkMode();

    // Inicijalizacija ostalih funkcionalnosti
    setupMobileMenu();
    setupFAQAccordion();
    setupProductTabs();
    setupQuantityButtons();
    setupProductSlider();
    setupAddToCartButtons();
    setupSearchFunctionality();
    setupAccessibility();

    // Popravi linkove nakon učitavanja komponenti
    setTimeout(fixLinks, 100);
});

// Funkcija za učitavanje komponenti (header, footer)
function loadComponent(componentName, targetElement) {
    if (!targetElement) return;

    // Provjeri jesmo li u poddirektoriju (npr. /pages/)
    const isInSubdirectory = window.location.pathname.includes('/pages/');
    const basePath = isInSubdirectory ? '../' : './';

    fetch(`${basePath}components/${componentName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            targetElement.outerHTML = html;

            // Nakon učitavanja headera, inicijaliziraj dark mode toggle
            if (componentName === 'header') {
                setupDarkMode();
            }
        })
        .catch(error => {
            console.error(`Error loading ${componentName}:`, error);
        });
}

// Funkcija za postavljanje dark mode funkcionalnosti
function setupDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Provjeri trenutnu temu iz localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    // Event listener za toggle button
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        // Promijeni ikonu
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Funkcija za mobilni menu
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) return;

    menuToggle.addEventListener('click', function() {
        const mainNav = document.querySelector('.main-nav');
        mainNav.classList.toggle('active');
    });
}

// Funkcija za FAQ accordion
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length === 0) return;

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';

            // Zatvori sve odgovore
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.style.display = 'none';
            });

            // Resetiraj sve ikone
            document.querySelectorAll('.faq-toggle i').forEach(icon => {
                icon.className = 'fas fa-plus';
            });

            // Ako nije bio otvoren, otvori ga
            if (!isOpen) {
                answer.style.display = 'block';
                this.querySelector('.faq-toggle i').className = 'fas fa-minus';
            }
        });
    });
}

// Funkcija za tabove na stranici proizvoda
function setupProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Ukloni active klasu sa svih tabova
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Ukloni active klasu sa svih panela
            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });

            // Dodaj active klasu na kliknuti tab
            this.classList.add('active');

            // Prikaži odgovarajući panel
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Funkcija za gumbe za količinu
function setupQuantityButtons() {
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');

    if (minusButtons.length === 0 || plusButtons.length === 0) return;

    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
        });
    });
}

// Funkcija za učitavanje cookie bannera
function loadCookieBanner() {
    // Provjeri jesu li kolačići već prihvaćeni
    const cookieSettings = localStorage.getItem('cookie-settings');

    // Ako nisu, prikaži banner
    if (!cookieSettings) {
        // Provjeri jesmo li u poddirektoriju (npr. /pages/)
        const isInSubdirectory = window.location.pathname.includes('/pages/');
        const basePath = isInSubdirectory ? '../' : './';
        const cookiePath = `${basePath}components/cookie-banner.html`;

        fetch(cookiePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Dodaj HTML direktno u body
                document.body.insertAdjacentHTML('beforeend', html);

                // Prikaži banner s animacijom
                setTimeout(() => {
                    const banner = document.getElementById('cookie-banner');
                    if (banner) {
                        banner.classList.add('show');
                    }
                }, 500);

                // Dodaj event listenere za gumbe
                setupCookieBannerEvents();
            })
            .catch(error => {
                console.error('Error loading cookie banner:', error);
            });
    }
}

// Funkcija za postavljanje event listenera za cookie banner
function setupCookieBannerEvents() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const acceptAllBtn = document.getElementById('accept-all-cookies');
    const saveSettingsBtn = document.getElementById('save-cookie-settings');
    const closeBtn = document.getElementById('cookie-close');

    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', function() {
            // Spremi sve kolačiće
            localStorage.setItem('cookie-settings', JSON.stringify({
                necessary: true,
                analytics: true,
                functional: true,
                marketing: true,
                timestamp: new Date().toISOString()
            }));

            // Sakrij banner
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 500);
        });
    }

    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // Prikupi postavke kolačića
            const analyticsEnabled = document.getElementById('analytics-cookies').checked;
            const functionalEnabled = document.getElementById('functional-cookies').checked;
            const marketingEnabled = document.getElementById('marketing-cookies').checked;

            // Spremi postavke
            localStorage.setItem('cookie-settings', JSON.stringify({
                necessary: true, // Uvijek omogućeno
                analytics: analyticsEnabled,
                functional: functionalEnabled,
                marketing: marketingEnabled,
                timestamp: new Date().toISOString()
            }));

            // Sakrij banner
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 500);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            // Sakrij banner bez spremanja postavki
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 500);
        });
    }
}

// Test function to show cookie banner (for testing purposes)
// Call this in browser console: testCookieBanner()
function testCookieBanner() {
    localStorage.removeItem('cookie-settings');
    location.reload();
}

// Funkcija za poboljšanje pristupačnosti
function setupAccessibility() {
    // Dodaj aria-current="page" na aktivne linkove u navigaciji
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath ||
            (currentPath.includes('/pages/') && linkPath.includes('/pages/') &&
             currentPath.split('/').pop() === linkPath.split('/').pop())) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('active');
        }
    });

    // Dodaj aria-required="true" na obavezna polja u formama
    const requiredInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    requiredInputs.forEach(input => {
        input.setAttribute('aria-required', 'true');

        // Dodaj klasu required na label
        const inputId = input.getAttribute('id');
        if (inputId) {
            const label = document.querySelector(`label[for="${inputId}"]`);
            if (label) {
                label.classList.add('required');
            }
        }
    });

    // Poboljšaj pristupačnost tablica
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (!table.getAttribute('role')) {
            table.setAttribute('role', 'grid');
        }

        const headerCells = table.querySelectorAll('th');
        headerCells.forEach(cell => {
            if (!cell.getAttribute('scope')) {
                cell.setAttribute('scope', 'col');
            }
        });
    });
}

// Funkcija za popravak linkova ovisno o lokaciji stranice
function fixLinks() {
    // Provjeri jesmo li u poddirektoriju (npr. /pages/)
    const isInSubdirectory = window.location.pathname.includes('/pages/');

    if (isInSubdirectory) {
        // Popravi linkove u headeru
        fixLink('logo-link', '../index.html');
        fixLink('home-link', '../index.html');
        fixLink('products-link', 'proizvodi.html');
        fixLink('about-link', 'o-nama.html');
        fixLink('contact-link', 'kontakt.html');
        fixLink('login-link', 'prijava.html');
        fixLink('cart-link', 'kosarica.html');

        // Popravi linkove u footeru
        fixLink('footer-home-link', '../index.html');
        fixLink('footer-products-link', 'proizvodi.html');
        fixLink('footer-about-link', 'o-nama.html');
        fixLink('footer-contact-link', 'kontakt.html');
        fixLink('footer-faq-link', 'faq.html');
        fixLink('footer-faq-link2', 'faq.html');
        fixLink('footer-delivery-link', 'dostava.html');
        fixLink('footer-returns-link', 'povrati.html');
        fixLink('footer-terms-link', 'uvjeti-koristenja.html');
        fixLink('footer-privacy-link', 'politika-privatnosti.html');

        // Popravi link u cookie banneru
        fixLink('privacy-link', 'politika-privatnosti.html');
    }
}

// Pomoćna funkcija za popravak pojedinačnog linka
function fixLink(id, newHref) {
    const link = document.getElementById(id);
    if (link) {
        link.setAttribute('href', newHref);
    }
}

// Funkcija za product slider
function setupProductSlider() {
    const sliderContainers = document.querySelectorAll('.product-grid-container');

    sliderContainers.forEach(container => {
        const productGrid = container.querySelector('.product-grid');
        const prevBtn = container.querySelector('.slider-nav.prev');
        const nextBtn = container.querySelector('.slider-nav.next');

        if (!productGrid || !prevBtn || !nextBtn) return;

        const cardWidth = 280; // Fixed width + gap
        const gap = 24; // var(--spacing-lg) is typically 24px
        const scrollAmount = cardWidth + gap;

        // Update button states
        function updateButtons() {
            const scrollLeft = productGrid.scrollLeft;
            const maxScroll = productGrid.scrollWidth - productGrid.clientWidth;

            prevBtn.disabled = scrollLeft <= 0;
            nextBtn.disabled = scrollLeft >= maxScroll - 1; // -1 for rounding errors
        }

        // Scroll to previous products
        prevBtn.addEventListener('click', () => {
            productGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Scroll to next products
        nextBtn.addEventListener('click', () => {
            productGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button states on scroll
        productGrid.addEventListener('scroll', updateButtons);

        // Initial button state
        updateButtons();

        // Update on window resize
        window.addEventListener('resize', updateButtons);
    });
}

// Funkcija za "Dodaj u košaricu" gumbove
function setupAddToCartButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-primary') && e.target.textContent.includes('Dodaj u košaricu')) {
            e.preventDefault();

            // Get product ID from the product card
            const productCard = e.target.closest('.product-card');
            if (!productCard) return;

            // Extract product info from the card
            const productName = productCard.querySelector('h3').textContent;
            const productImage = productCard.querySelector('img').src;

            // Find product in database by name (simple matching)
            const product = window.TechShop?.PRODUCTS.find(p => p.name === productName);

            if (product && window.TechShop?.cart) {
                // Get selected options if on product detail page
                const selectedColor = getSelectedColor();
                const selectedVariant = getSelectedVariant();
                const quantity = getSelectedQuantity();

                window.TechShop.cart.addItem(product.id, quantity, selectedColor, selectedVariant);
            } else {
                // Fallback notification if product not found
                showFallbackNotification('Proizvod dodano u košaricu!');
            }
        }
    });
}

// Helper functions for product options
function getSelectedColor() {
    const colorOption = document.querySelector('.color-option.active');
    return colorOption ? colorOption.dataset.color : null;
}

function getSelectedVariant() {
    const variantOption = document.querySelector('.variant-option.active');
    return variantOption ? variantOption.textContent : null;
}

function getSelectedQuantity() {
    const quantityInput = document.querySelector('.quantity-selector input');
    return quantityInput ? parseInt(quantityInput.value) : 1;
}

// Fallback notification for when e-commerce.js is not loaded
function showFallbackNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-success show';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Funkcija za pretraživanje
function setupSearchFunctionality() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form input');

    if (!searchForm || !searchInput) return;

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            // Redirect to products page with search parameter
            const isInSubdirectory = window.location.pathname.includes('/pages/');
            const productsUrl = isInSubdirectory ? 'proizvodi.html' : 'pages/proizvodi.html';
            window.location.href = `${productsUrl}?search=${encodeURIComponent(searchTerm)}`;
        }
    });
}
