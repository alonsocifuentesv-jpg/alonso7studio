/* Joyas Maison — Interactividad principal */

/* ── Header scroll ─────────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Menú móvil ────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Nav link activo al hacer scroll ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY + 100 >= sec.offsetTop) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── Reveal on scroll ──────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.nosotros-text, .nosotros-images, .valor, .coleccion-card, ' +
  '.servicio-card, .blog-card, .cifra, .info-item, .contacto-form-wrapper'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 4 === 1) el.classList.add('reveal-delay-1');
  if (i % 4 === 2) el.classList.add('reveal-delay-2');
  if (i % 4 === 3) el.classList.add('reveal-delay-3');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── Contador animado ──────────────────────────────────────── */
const cifraEls = document.querySelectorAll('.cifra-num');
let counted = false;

function animateCounters() {
  if (counted) return;
  const section = document.querySelector('.cifras');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    counted = true;
    cifraEls.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();
      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('es-CL');
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    });
  }
}
window.addEventListener('scroll', animateCounters, { passive: true });
animateCounters();

/* ── Slider de testimonios ─────────────────────────────────── */
const cards  = document.querySelectorAll('.testimonio-card');
const dotsContainer = document.getElementById('testimoniosDots');
let current = 0;
let autoTimer;

function buildDots() {
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
}

function goTo(index) {
  cards[current].classList.remove('active');
  dotsContainer.children[current].classList.remove('active');
  current = (index + cards.length) % cards.length;
  cards[current].classList.add('active');
  dotsContainer.children[current].classList.add('active');
  resetTimer();
}

function resetTimer() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), 5000);
}

document.getElementById('prevTestimonio').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextTestimonio').addEventListener('click', () => goTo(current + 1));

buildDots();
resetTimer();

/* ── Formulario de contacto ────────────────────────────────── */
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const required = form.querySelectorAll('[required]');
  let valid = true;

  required.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#c0392b';
      valid = false;
    }
  });

  if (!valid) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
    form.reset();
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 6000);
  }, 1400);
});

/* ── Smooth scroll con offset por header fijo ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
