document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Navbar & Mobile Menu Logic ---
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');
    const servicesBtn = document.getElementById('mobile-services-btn');
    const servicesList = document.getElementById('mobile-services-list');

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

    if (servicesBtn && servicesList) {
        servicesBtn.onclick = () => {
            const icon = servicesBtn.querySelector('i');
            servicesList.classList.toggle('hidden');
            servicesList.classList.toggle('flex');
            if (icon) icon.classList.toggle('rotate-180');
        };
    }

    // --- 2. Active Link Logic (Netlify Fix) ---
    const currentPath = window.location.pathname.toLowerCase();

    function setActive(links, activeClass, isChild = false) {
        links.forEach(link => {
            const href = link.getAttribute("href").toLowerCase();
            // Netlify "/" aur "index.html" handle karne ke liye
            const isHome = (currentPath === "/" || currentPath.includes("index")) && (href.includes("index") || href === "/");
            const isOther = href !== "/" && href !== "#" && currentPath.includes(href.replace(".html", ""));

            if (isHome || isOther) {
                link.classList.add(activeClass);
                // Services parent highlight logic
                if (isChild) {
                    const parent = document.getElementById("services-parent");
                    if (parent) parent.classList.add("active-parent");
                    if (servicesBtn && servicesList) {
                        servicesBtn.classList.add("mob-parent-active");
                        servicesList.classList.remove("hidden");
                        servicesList.classList.add("flex");
                        const icon = servicesBtn.querySelector('i');
                        if (icon) icon.classList.add('rotate-180');
                    }
                }
            }
        });
    }

    setActive(document.querySelectorAll(".nav-link"), "active-page");
    setActive(document.querySelectorAll(".dropdown-item"), "active-item", true);
    setActive(document.querySelectorAll(".mob-link"), "active-mob");
    setActive(document.querySelectorAll(".mob-child"), "active-mob-child", true);

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



    // --- 4. Counter impact Logic ---
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
        if(entries[0].isIntersecting) {
            startCounters();
            observer.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('#achievements-section'));