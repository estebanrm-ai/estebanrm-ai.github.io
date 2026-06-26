// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Menú móvil
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('navMobile');
toggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// Cerrar menú móvil al hacer click en un link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-group, .about-content, .contact-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// Efecto de escritura tipo terminal SQL
const codeLines = [
  { text: 'SELECT mes, consumo_kwh FROM facturas' },
  { text: 'WHERE año = 2026' },
  { text: 'ORDER BY consumo_kwh DESC' },
  { text: 'LIMIT 3;' },
  { text: '' },
  { text: 'mes        | consumo_kwh' },
  { text: '-----------+------------' },
  { text: 'Marzo      | 4,820' },
  { text: 'Enero      | 4,510' },
  { text: 'Agosto     | 4,290' },
];

function typeCode() {
  const el = document.getElementById('codeTyping');
  if (!el) return;

  let lineIndex = 0;
  let charIndex = 0;
  let fullText = '';

  function typeChar() {
    if (lineIndex >= codeLines.length) return;

    const currentLine = codeLines[lineIndex].text;

    if (charIndex < currentLine.length) {
      fullText += currentLine[charIndex];
      el.textContent = fullText;
      charIndex++;
      setTimeout(typeChar, 22);
    } else {
      fullText += '\n';
      el.textContent = fullText;
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 120);
    }
  }

  typeChar();
}

// Inicia cuando el hero es visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeCode();
      heroObserver.disconnect();
    }
  });
});

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) heroObserver.observe(heroVisual);