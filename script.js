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
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const containerRect = particlesContainer.getBoundingClientRect();
    let leftPx, topPx;
    let attempts = 0;

    do {
        leftPx = Math.random() * (containerRect.width - size);
        topPx = Math.random() * (containerRect.height - size);
        attempts += 1;
    } while (isInsideHeroCircle(leftPx + size / 2, topPx + size / 2, size / 2) && attempts < 30);

    particle.style.left = `${(leftPx / containerRect.width) * 100}%`;
    particle.style.top = `${(topPx / containerRect.height) * 100}%`;
    
    particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
    particle.style.animationDelay = `${Math.random() * 2}s`;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

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