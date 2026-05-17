// Theme Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.removeAttribute('data-theme');
    themeSwitch.checked = false;
} else {
    body.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
    localStorage.setItem('theme', 'dark');
}

// Typing Effect
const typedText = document.getElementById('typed-text');
const textArray = [
    "Building the future, one line of code at a time.",
    "Turning ideas into elegant solutions.",
    "Passionate about clean, efficient code.",
    "Always learning, always growing."
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = textArray[textIndex];
    
    if (!isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    } else {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

typeWriter();

// Particles
const particlesContainer = document.getElementById('particles');
const heroImageCircle = document.querySelector('.hero-image-stack');

function isInsideHeroCircle(x, y, radius) {
    if (!heroImageCircle) return false;
    const containerRect = particlesContainer.getBoundingClientRect();
    const circleRect = heroImageCircle.getBoundingClientRect();
    const circleCenterX = circleRect.left - containerRect.left + circleRect.width / 2;
    const circleCenterY = circleRect.top - containerRect.top + circleRect.height / 2;
    const distance = Math.hypot(x - circleCenterX, y - circleCenterY);
    return distance < (circleRect.width / 2 + radius + 6);
}

    function createParticle() {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 8 + 4;
        p.style.width = p.style.height = size + 'px';

        // avoid placing particles inside hero circle
        const hero = document.querySelector('.hero-image-stack');
        let attempt = 0;
        let x, y;
        do {
            x = Math.random() * window.innerWidth;
            y = Math.random() * window.innerHeight;
            attempt++;
        } while (hero && isInsideHeroCircle(x, y, hero) && attempt < 30);

        p.style.left = x + 'px';
        p.style.top = y + 'px';
        particlesContainer.appendChild(p);
        setTimeout(() => p.remove(), 7000);
}

    // media modal (project details)
    const mediaModal = document.getElementById('media-modal');
    const mediaSlot = document.querySelector('.media-slot');
    const mediaCaption = document.querySelector('.media-modal__caption');
    const prevBtn = document.querySelector('.media-prev');
    const nextBtn = document.querySelector('.media-next');
    const closeBtn = document.querySelector('.media-modal__close');
    const modalOverlay = document.querySelector('.media-modal__overlay');
    let currentMedia = [];
    let currentIndex = 0;

    function openMediaModal(list, startIndex = 0) {
        currentMedia = list.slice();
        currentIndex = startIndex || 0;
        renderMedia(currentIndex);
        mediaModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMediaModal() {
        mediaModal.setAttribute('aria-hidden', 'true');
        mediaSlot.innerHTML = '';
        mediaCaption.textContent = '';
        document.body.style.overflow = '';
    }

    function renderMedia(i) {
        mediaSlot.innerHTML = '';
        if (!currentMedia || currentMedia.length === 0) return;
        const src = currentMedia[i];
        const lower = src.toLowerCase();
        let el;
        if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg')) {
            el = document.createElement('video');
            el.src = src;
            el.controls = true;
            el.autoplay = true;
        } else {
            el = document.createElement('img');
            el.src = src;
            el.alt = '';
        }
        mediaSlot.appendChild(el);
        mediaCaption.textContent = `${i + 1} of ${currentMedia.length}`;
    }

    function prevMedia() {
        if (!currentMedia.length) return;
        currentIndex = (currentIndex - 1 + currentMedia.length) % currentMedia.length;
        renderMedia(currentIndex);
    }

    function nextMedia() {
        if (!currentMedia.length) return;
        currentIndex = (currentIndex + 1) % currentMedia.length;
        renderMedia(currentIndex);
    }

    prevBtn.addEventListener('click', prevMedia);
    nextBtn.addEventListener('click', nextMedia);
    closeBtn.addEventListener('click', closeMediaModal);
    modalOverlay.addEventListener('click', closeMediaModal);
    document.addEventListener('keydown', (e) => {
        if (mediaModal.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeMediaModal();
            if (e.key === 'ArrowLeft') prevMedia();
            if (e.key === 'ArrowRight') nextMedia();
        }
    });

    // wire up details buttons
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', function (ev) {
            ev.preventDefault();
            let data = this.getAttribute('data-media') || '[]';
            try {
                const list = JSON.parse(data);
                if (Array.isArray(list) && list.length) openMediaModal(list, 0);
            } catch (err) {
                console.error('Invalid media list', err);
            }
        });
    });

setInterval(createParticle, 300);

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Submission (Placeholder)
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .education-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});