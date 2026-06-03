// ── Scroll progress bar ───────────────────────────────────
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});

// ── Navbar scroll ─────────────────────────────────────────
const navbar   = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('visible', scrolled);
});

// ── Mobile nav toggle ─────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// ── Hero Carousel ─────────────────────────────────────────
const track  = document.getElementById('carouselTrack');
const slides = track ? track.querySelectorAll('.carousel-slide') : [];
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let autoTimer;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current]?.classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current]?.classList.add('active');
}
function startAuto() { stopAuto(); autoTimer = setInterval(() => goToSlide(current + 1), 5500); }
function stopAuto()  { clearInterval(autoTimer); }

if (slides.length) {
  document.getElementById('carouselPrev')?.addEventListener('click', () => { goToSlide(current - 1); startAuto(); });
  document.getElementById('carouselNext')?.addEventListener('click', () => { goToSlide(current + 1); startAuto(); });
  dots.forEach(dot => dot.addEventListener('click', () => { goToSlide(+dot.dataset.slide); startAuto(); }));
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  startAuto();
}

// ── Animated Stats Counter ───────────────────────────────
function animateCounter(el) {
  const target = +el.dataset.target;
  if (!target) return;
  const duration = 1800;
  const start = performance.now();
  const startVal = 0;
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(startVal + (target - startVal) * eased) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => statsObserver.observe(el));

// ── Colour Family Filter Tabs ─────────────────────────────
const tabs     = document.querySelectorAll('.tab-btn');
const families = document.querySelectorAll('.colour-family');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const group = btn.dataset.group;
    families.forEach(fam => { fam.style.display = (group === 'all' || fam.dataset.group === group) ? 'block' : 'none'; });
  });
});

// ── Gallery Filter Tabs ───────────────────────────────────
const galleryTabs  = document.querySelectorAll('.gallery-tab');
const galleryItems = document.querySelectorAll('.gallery-item');
galleryTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    galleryTabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    galleryItems.forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'block' : 'none';
    });
  });
});

// ── Contact Form — Web3Forms ──────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    const error   = document.getElementById('form-error');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });
      const json = await res.json();
      if (json.success) {
        if (success) success.style.display = 'block';
        if (error)   error.style.display   = 'none';
        contactForm.reset();
        setTimeout(() => { if (success) success.style.display = 'none'; }, 6000);
      } else { throw new Error(json.message); }
    } catch (err) {
      if (error) { error.style.display = 'block'; error.textContent = 'Something went wrong. Please call us directly on +211 980 373 157.'; }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}

// ── Scroll fade-in ────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.10 });
document.querySelectorAll('.service-card,.product-card,.badge,.teaser-card,.stat,.contact-item,.paint-chip,.paint-chip-card,.service-detail-body,.testimonial-card,.gallery-item,.trust-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
