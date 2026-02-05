// Navbar & Mobile Menu Logic
const menu = document.getElementById('mobile-menu');
const overlay = document.getElementById('mobile-overlay');
const menuOpenBtn = document.getElementById('menu-open');
const menuCloseBtn = document.getElementById('menu-close');
const servicesBtn = document.getElementById('mobile-services-btn');
const servicesList = document.getElementById('mobile-services-list');

// Open Menu
menuOpenBtn.onclick = () => {
    menu.classList.add('mobile-menu-active');
    overlay.classList.remove('hidden');
};

// Close Menu
const closeMenu = () => {
    menu.classList.remove('mobile-menu-active');
    overlay.classList.add('hidden');
};

menuCloseBtn.onclick = closeMenu;
overlay.onclick = closeMenu;

// Mobile Dropdown Toggle (Services)
servicesBtn.onclick = () => {
    const icon = servicesBtn.querySelector('i');
    servicesList.classList.toggle('hidden');
    servicesList.classList.toggle('flex');
    icon.classList.toggle('rotate-180');
};

// Navbar & Mobile Menu Logic end


document.addEventListener("DOMContentLoaded", function() {
    const currentUrl = window.location.pathname.split("/").pop() || "index.html";

    // --- Desktop Logic ---
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

    // --- Mobile Logic ---
    const mobLinks = document.querySelectorAll(".mob-link");
    const mobChildren = document.querySelectorAll(".mob-child");
    const mobServicesBtn = document.getElementById("mobile-services-btn");
    const mobServicesList = document.getElementById("mobile-services-list");

    mobLinks.forEach(link => {
        if (link.getAttribute("href") === currentUrl) {
            link.classList.add("active-mob");
        }
    });

    mobChildren.forEach(child => {
        if (child.getAttribute("href") === currentUrl) {
            child.classList.add("active-mob-child");
            // Automatically open the mobile dropdown if child is active
            if (mobServicesBtn && mobServicesList) {
                mobServicesBtn.classList.add("mob-parent-active");
                mobServicesList.classList.remove("hidden");
                mobServicesList.classList.add("flex");
                mobServicesBtn.querySelector('i').style.transform = "rotate(180deg)";
            }
        }
    });
});

// --- Slider banner Logic ---
const slides = document.querySelectorAll('.hero-slide');
let current = 0;
let slideInterval;

function updateSlide(index) {
    slides.forEach(s => s.classList.remove('active-slide'));
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active-slide');

    // Re-trigger animation
    const h1 = slides[current].querySelector('h1');
    if (h1) {
        h1.classList.remove('animate__animated', 'animate__fadeInUp');
        void h1.offsetWidth;
        h1.classList.add('animate__animated', 'animate__fadeInUp');
    }
}

document.getElementById('next').onclick = () => {
    updateSlide(current + 1);
    resetTimer();
};
document.getElementById('prev').onclick = () => {
    updateSlide(current - 1);
    resetTimer();
};

// Auto play & Reset Timer
function startTimer() {
    slideInterval = setInterval(() => updateSlide(current + 1), 5000);
}
function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

startTimer();

// Slider banner Logic end


// --- Counter Animation Logic ---
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

// Intersection Observer to start animation when visible
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounters();
        observer.disconnect(); // Runs only once
    }
}, { threshold: 0.5 });

observer.observe(document.querySelector('.counter').parentElement.parentElement.parentElement);

// Counter Animation Logic end