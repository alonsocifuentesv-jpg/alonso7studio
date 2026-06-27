window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

const ro = new IntersectionObserver(entries => {
  entries.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

const co = new IntersectionObserver(entries => {
  entries.forEach(x => {
    if (x.isIntersecting) {
      x.target.querySelectorAll('.count').forEach(c => {
        const t = +c.dataset.target;
        let n = 0;
        const s = t / 55;
        const i = setInterval(() => {
          n = Math.min(n + s, t);
          c.textContent = Math.floor(n).toLocaleString('es-CL');
          if (n >= t) clearInterval(i);
        }, 22);
      });
      co.unobserve(x.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.stats').forEach(el => co.observe(el));

function toggleFaq(btn) {
  btn.parentElement.classList.toggle('open');
}

function enviarWA(e) {
  e.preventDefault();
  const nombre = document.getElementById('f-nombre').value;
  const tel = document.getElementById('f-tel').value;
  const serv = document.getElementById('f-serv').value || 'No especificado';
  const msg = document.getElementById('f-msg').value;
  const txt = `Hola Dental Pacífico 👋\n\n*Nombre:* ${nombre}\n*Teléfono:* ${tel || 'No indicado'}\n*Servicio:* ${serv}\n*Mensaje:* ${msg || '—'}\n\n¡Quisiera reservar una hora!`;
  window.open('https://wa.me/56939665163?text=' + encodeURIComponent(txt), '_blank');
}
