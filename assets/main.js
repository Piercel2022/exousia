/* ═══════════════════════════════════════════
   CELLULE EXOUSIA — JavaScript partagé
   Importé par toutes les pages du site
════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Navbar : fond opaque au scroll ──────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const updateNav = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('bg-navy', 'shadow-lg');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('bg-navy', 'shadow-lg');
        navbar.classList.add('bg-transparent');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // ── 2. Menu burger mobile ──────────────────────────────────────
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // ── 3. Fermer le menu mobile (utilisé par les liens) ──────────
  window.closeMobileMenu = function () {
    if (mobileMenu) mobileMenu.classList.add('hidden');
  };

  // ── 4. Marquer le lien actif selon la page courante ───────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPath) {
      link.classList.add('active');
    }
  });

  // ── 5. Animations fade-up (IntersectionObserver) ──────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── 6. Smooth scroll pour les ancres internes ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── 7. Formulaire Netlify : feedback visuel ───────────────────
  const form = document.querySelector('form[data-netlify]');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Envoi en cours…';
        btn.disabled = true;
      }
    });
  }

});