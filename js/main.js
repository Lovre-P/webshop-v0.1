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
        // Kreiraj div za cookie banner
        const cookieBannerDiv = document.createElement('div');
        cookieBannerDiv.id = 'cookie-banner';
        cookieBannerDiv.className = 'cookie-banner';
        cookieBannerDiv.setAttribute('role', 'dialog');
        cookieBannerDiv.setAttribute('aria-labelledby', 'cookie-title');
        cookieBannerDiv.setAttribute('aria-describedby', 'cookie-description');

        // Učitaj sadržaj cookie bannera
        // Provjeri jesmo li u poddirektoriju (npr. /pages/)
        const isInSubdirectory = window.location.pathname.includes('/pages/');
        const basePath = isInSubdirectory ? '../' : './';

        fetch(`${basePath}components/cookie-banner.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                cookieBannerDiv.innerHTML = html;
                document.body.appendChild(cookieBannerDiv);

                // Prikaži banner s animacijom
                setTimeout(() => {
                    cookieBannerDiv.classList.add('show');
                }, 1000);

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
