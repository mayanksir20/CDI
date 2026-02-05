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

    // --- 2. Active Link Logic (Local & Live Fix) ---
    let currentPath = window.location.pathname;
    let currentUrl = currentPath.split("/").pop();
    if (currentUrl === "" || currentUrl === "/") {
        currentUrl = "index.html";
    }

    // Desktop
    const navLinks = document.querySelectorAll(".nav-link");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const servicesParent = document.getElementById("services-parent");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentUrl) {
            link.classList.add("active-page");
        }
    });

    dropdownItems.forEach(item => {
        if (item.getAttribute("href") === currentUrl) {
            item.classList.add("active-item");
            if (servicesParent) servicesParent.classList.add("active-parent");
        }
    });

    // Mobile
    const mobLinks = document.querySelectorAll(".mob-link");
    const mobChildren = document.querySelectorAll(".mob-child");

    mobLinks.forEach(link => {
        if (link.getAttribute("href") === currentUrl) {
            link.classList.add("active-mob");
        }
    });

    mobChildren.forEach(child => {
        if (child.getAttribute("href") === currentUrl) {
            child.classList.add("active-mob-child");
            if (servicesBtn && servicesList) {
                servicesBtn.classList.add("mob-parent-active");
                servicesList.classList.remove("hidden");
                servicesList.classList.add("flex");
                const icon = servicesBtn.querySelector('i');
                if (icon) icon.classList.add('rotate-180');
            }
        }
    });

    // --- 3. Slider banner Logic ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let current = 0;
        let slideInterval;

        function updateSlide(index) {
            slides.forEach(s => s.classList.remove('active-slide'));
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active-slide');
            
            const h1 = slides[current].querySelector('h1');
            if (h1) {
                h1.classList.remove('animate__animated', 'animate__fadeInUp');
                void h1.offsetWidth; 
                h1.classList.add('animate__animated', 'animate__fadeInUp');
            }
        }

        const nextBtn = document.getElementById('next');
        const prevBtn = document.getElementById('prev');

        if (nextBtn) nextBtn.onclick = () => { updateSlide(current + 1); resetTimer(); };
        if (prevBtn) prevBtn.onclick = () => { updateSlide(current - 1); resetTimer(); };

        function startTimer() { slideInterval = setInterval(() => updateSlide(current + 1), 5000); }
        function resetTimer() { clearInterval(slideInterval); startTimer(); }
        startTimer();
    }

    // --- 4. Counter Animation Logic ---
    const counterElements = document.querySelectorAll('.counter');
    if (counterElements.length > 0) {
        const startCounters = () => {
            counterElements.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / 200;
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

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        const observedEl = document.querySelector('.counter').closest('section') || document.querySelector('.counter').parentElement;
        observer.observe(observedEl);
    }
});