// ═══════════════════════════════════════════════════════
//  D.I.A.S. — Site Script
// ═══════════════════════════════════════════════════════

// ─── Hamburger menu ───────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');
if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
    // Inchide la click pe link
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => nav.classList.remove('open'));
    });
}

// ─── Counter animation ────────────────────────────────
function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start);
        }
    }, 16);
}

// ─── Intersection Observer pentru animatii ────────────
const observerOptions = { threshold: 0.15 };

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target || '0');
            animateCounter(el, target);
            counterObserver.unobserve(el);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
});

// Bar fill observer
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-fill, .cat-bar').forEach(bar => {
                const w = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => { bar.style.width = w; }, 100);
            });
            barObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stats-grid, .categories-grid').forEach(el => {
    barObserver.observe(el);
});

// ─── Fade-in la scroll ────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Adauga clasa fade-in la carduri
document.querySelectorAll('.service-card, .stat-card, .team-card, .mval, .ri-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    el.classList.add('fade-target');
    fadeObserver.observe(el);
});

// Override visible
document.head.insertAdjacentHTML('beforeend', `
<style>
.fade-target.visible { opacity: 1 !important; transform: translateY(0) !important; }
</style>
`);

// ─── Sticky header shadow ─────────────────────────────
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-main');
    if (header) {
        header.style.boxShadow = window.scrollY > 10
            ? '0 4px 40px rgba(0,0,0,0.6)'
            : '0 4px 30px rgba(0,0,0,0.5)';
    }
});

// ─── Active nav link ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// CSS pentru active nav
document.head.insertAdjacentHTML('beforeend', `
<style>
.nav a.active { color: var(--gold) !important; }
</style>
`);
