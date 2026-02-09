document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Navbar & Mobile Menu Logic ---
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');

    // Buttons & Lists
    const servicesBtn = document.getElementById('mobile-services-btn');
    const servicesList = document.getElementById('mobile-services-list');
    const strategyBtn = document.getElementById('mobile-strategy-btn');
    const strategyList = document.getElementById('mobile-strategy-list');

    if (menuOpenBtn && menu && overlay) {
        menuOpenBtn.onclick = () => {
            menu.classList.add('mobile-menu-active');
            overlay.classList.remove('hidden');
        };

        const closeMenu = () => {
            menu.classList.remove('mobile-menu-active');
            overlay.classList.add('hidden');
        };

        if (menuCloseBtn) menuCloseBtn.onclick = closeMenu;
        overlay.onclick = closeMenu;
    }

    // Toggle Function for Mobile Dropdowns
    function setupMobileToggle(btn, list) {
        if (btn && list) {
            btn.onclick = () => {
                const icon = btn.querySelector('i');
                list.classList.toggle('hidden');
                list.classList.toggle('flex');
                if (icon) icon.classList.toggle('rotate-180');
            };
        }
    }

    setupMobileToggle(servicesBtn, servicesList);
    setupMobileToggle(strategyBtn, strategyList);

    // --- 2. Active Link Logic (Desktop & Mobile) ---
    const currentPath = window.location.pathname.toLowerCase();

    function setActive(links, activeClass, parentId = null, mobBtn = null, mobList = null) {
        links.forEach(link => {
            const href = link.getAttribute("href").toLowerCase();
            const isHome = (currentPath === "/" || currentPath.includes("index")) && (href.includes("index") || href === "/");
            const isOther = href !== "/" && href !== "#" && currentPath.includes(href.replace(".html", ""));

            if (isHome || isOther) {
                link.classList.add(activeClass);

                // Desktop Parent Highlight
                if (parentId) {
                    const parent = document.getElementById(parentId);
                    if (parent) parent.classList.add("active-parent");
                }

                // Mobile Parent Highlight & Auto-Open
                if (mobBtn && mobList) {
                    mobBtn.classList.add("mob-parent-active");
                    mobList.classList.remove("hidden");
                    mobList.classList.add("flex");
                    const icon = mobBtn.querySelector('i');
                    if (icon) icon.classList.add('rotate-180');
                }
            }
        });
    }

    // 1. Regular Links (Home, About, Contact)
    setActive(document.querySelectorAll(".nav-link:not([id*='-parent'])"), "active-page");
    setActive(document.querySelectorAll(".mob-link"), "active-mob");

    // 2. Services Dropdown Links (Desktop & Mobile)
    setActive(
        document.querySelectorAll("#desktop-nav [href*='hospitality'], #desktop-nav [href*='eco-resorts'], #desktop-nav [href*='canteen']"),
        "active-item",
        "services-parent",
        servicesBtn,
        servicesList
    );
    setActive(document.querySelectorAll("#mobile-menu .mob-child[href*='hospitality'], #mobile-menu .mob-child[href*='eco-resorts'], #mobile-menu .mob-child[href*='canteen']"), "active-mob-child");

    // 3. Strategy Dropdown Links (Desktop & Mobile) - New Logic Added
    setActive(
        document.querySelectorAll("#desktop-nav [href*='methodology'], #desktop-nav [href*='partnership'], #desktop-nav [href*='impact']"),
        "active-item",
        "strategy-parent",
        strategyBtn,
        strategyList
    );
    setActive(document.querySelectorAll("#mobile-menu .mob-child[href*='methodology'], #mobile-menu .mob-child[href*='partnership'], #mobile-menu .mob-child[href*='impact']"), "active-mob-child");

    // active-page-end

    // --- 3. Slider Logic ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let current = 0;
        let slideInterval;
        const updateSlide = (index) => {
            slides.forEach(s => s.classList.remove('active-slide'));
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active-slide');
        };
        const startTimer = () => { slideInterval = setInterval(() => updateSlide(current + 1), 5000); };
        const resetTimer = () => { clearInterval(slideInterval); startTimer(); };

        const nxt = document.getElementById('next');
        const prv = document.getElementById('prev');
        if (nxt) nxt.onclick = () => { updateSlide(current + 1); resetTimer(); };
        if (prv) prv.onclick = () => { updateSlide(current - 1); resetTimer(); };
        startTimer();
    }

    // --- 4. Counter Logic ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(c => {
                    const target = +c.getAttribute('data-target');
                    let count = 0;
                    const update = () => {
                        const inc = target / 100;
                        if (count < target) {
                            count += inc;
                            c.innerText = Math.ceil(count);
                            setTimeout(update, 20);
                        } else { c.innerText = target; }
                    };
                    update();
                });
                obs.disconnect();
            }
        });
        obs.observe(counters[0].closest('section') || counters[0].parentElement);
    }
});



// --- 4. Counter impac Logic ---
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger counters when section is visible
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });

observer.observe(document.querySelector('#achievements-section'));

// Terms of Service
document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    const options = { month: 'long', year: 'numeric' };

    // Ye line apne aap "Month Year" format set kar degi (e.g., March 2026)
    dateElement.innerText = now.toLocaleDateString('en-US', options);
});

// footer-year-copyright
document.addEventListener("DOMContentLoaded", function () {
    const yearElement = document.getElementById('auto-year');
    if (yearElement) {
        yearElement.innerText = new Date().getFullYear();
    }
});