document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Fully Loaded");

    // --- 1. Navbar & Mobile Menu Logic ---
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const mobServicesBtn = document.getElementById('mobile-services-btn');
    const mobServicesList = document.getElementById('mobile-services-list');

    if (menuOpenBtn && menu && overlay) {
        menuOpenBtn.onclick = () => {
            menu.classList.remove('translate-x-full'); // Tailwind standard way
            menu.classList.add('mobile-menu-active');
            overlay.classList.remove('hidden');
        };
    }

    const closeMenu = () => {
        if (menu && overlay) {
            menu.classList.add('translate-x-full');
            menu.classList.remove('mobile-menu-active');
            overlay.classList.add('hidden');
        }
    };

    if (menuCloseBtn) menuCloseBtn.onclick = closeMenu;
    if (overlay) overlay.onclick = closeMenu;

    // Mobile Dropdown Toggle (Services)
    if (mobServicesBtn && mobServicesList) {
        mobServicesBtn.onclick = (e) => {
            e.preventDefault();
            const icon = mobServicesBtn.querySelector('i');
            mobServicesList.classList.toggle('hidden');
            mobServicesList.classList.toggle('flex');
            if (icon) icon.classList.toggle('rotate-180');
        };
    }

    // --- 2. Active Link Logic (Local & Live Fix) ---
    let currentPath = window.location.pathname;
    let currentUrl = currentPath.split("/").pop() || "index.html";
    if (currentUrl === "/") currentUrl = "index.html";

    // Desktop Active
    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentUrl) link.classList.add("active-page");
    });

    // Dropdown Active
    document.querySelectorAll(".dropdown-item").forEach(item => {
        if (item.getAttribute("href") === currentUrl) {
            item.classList.add("active-item");
            const parent = document.getElementById("services-parent");
            if (parent) parent.classList.add("active-parent");
        }
    });

    // Mobile Active
    document.querySelectorAll(".mob-link").forEach(link => {
        if (link.getAttribute("href") === currentUrl) link.classList.add("active-mob");
    });

    document.querySelectorAll(".mob-child").forEach(child => {
        if (child.getAttribute("href") === currentUrl) {
            child.classList.add("active-mob-child");
            if (mobServicesList) {
                mobServicesList.classList.remove('hidden');
                mobServicesList.classList.add('flex');
                if (mobServicesBtn) {
                    mobServicesBtn.classList.add("mob-parent-active");
                    const icon = mobServicesBtn.querySelector('i');
                    if (icon) icon.classList.add('rotate-180');
                }
            }
        }
    });

    // --- 3. Slider Banner Logic ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let current = 0;
        let slideInterval;

        const updateSlide = (index) => {
            slides.forEach(s => s.classList.remove('active-slide'));
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active-slide');
        };

        const nextBtn = document.getElementById('next');
        const prevBtn = document.getElementById('prev');

        if (nextBtn) nextBtn.onclick = () => { updateSlide(current + 1); resetTimer(); };
        if (prevBtn) prevBtn.onclick = () => { updateSlide(current - 1); resetTimer(); };

        const startTimer = () => { slideInterval = setInterval(() => updateSlide(current + 1), 5000); };
        const resetTimer = () => { clearInterval(slideInterval); startTimer(); };
        startTimer();
    }

    // --- 4. Counter Animation Logic ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const speed = target / 100;
                    const update = () => {
                        if (count < target) {
                            count += speed;
                            counter.innerText = Math.ceil(count);
                            setTimeout(update, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    update();
                });
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        const counterSection = document.querySelector('.counter').parentElement.parentElement.parentElement;
        if (counterSection) observer.observe(counterSection);
    }
});