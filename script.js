const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
menuBtn?.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!open));
  mobileNav.hidden = open;
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const courseData = {
  makeup: {
    kicker: 'Professional Makeup Artist Course',
    title: 'Basic to Bridal Makeover',
    price: '₹20,000',
    text: 'A 30-day intensive program covering professional makeup looks, bridal artistry, hairstyles, saree draping and the business side of beauty services.',
    points: ['HD Makeup','Non-HD Makeup','Semi-HD Makeup','Water-Resistant Makeup','Sweat-Resistant Makeup','Smudge-Proof Makeup','Full & Medium Coverage','No-Makeup & Glossy Looks','South / North Indian Bridal','Muslim & Christian Bridal','Day & Night Party Looks','15+ Hairstyles','5 Saree Draping Styles','Portfolio Shoot','Business Starter Kit','Lifetime Support','Guided Until First Client','Professional Certificate']
  },
  skin: {
    kicker: 'Skin Care / Beauty Therapy',
    title: 'Professional Beauty Therapy Training',
    price: '₹20,000',
    text: 'A practical skin and beauty course covering professional grooming, facial services and complete hand & foot care, with business guidance and lifetime support.',
    points: ['Eyebrows','Upper Lip','Lower Lip','Regular Waxing','Rica Wax','Clean Ups','Bleach','Basic Facials','Advanced Facials','Hydrafacial','De-Tan','Manicure','Spa Manicure','Pedicure','Spa Pedicure','Business Starter Kit','Lifetime Support','Professional Certificate']
  },
  cosmetology: {
    kicker: 'Complete Cosmetology Program',
    title: '5+ Core Beauty Skills in One Course',
    price: '₹40,000',
    text: 'A complete career-focused program bringing together multiple beauty disciplines in one learning journey.',
    points: ['Makeup','Skin Care','Nail Art','Flower Making','Airbrush Makeup','15+ Hairstyles','5 Saree Draping Styles','Hands-On Practice','Professional Range Products','Business Starter Kit','Career Guidance','Lifetime Support','Shringar Professional Certificate']
  },
  combo: {
    kicker: 'Makeup + Skin Combined Course',
    title: 'Two Career Skills, One Batch',
    price: '₹30,000',
    text: 'Makeup artistry plus beauty therapy in a single batch — with placement support — for less than the separate course fees (₹40,000).',
    points: ['Basic to Bridal Makeup','15+ Hairstyles','Saree Draping Styles','Groom Makeup & Portfolio','Waxing & Threading','Facials & HydraFacial','De-Tan','Manicure & Pedicure','100% Placement Support','Business Starter Kit','Lifetime Support','Professional Certificate']
  }
};

const modal = document.getElementById('course-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
document.querySelectorAll('.course-details').forEach(btn => btn.addEventListener('click', () => {
  const d = courseData[btn.dataset.course];
  modalContent.innerHTML = `
    <div class="modal-inner">
      <div class="modal-kicker">${d.kicker}</div>
      <h3>${d.title}</h3>
      <div class="modal-price">${d.price}</div>
      <p>${d.text}</p>
      <div class="modal-points">${d.points.map(p => `<span>${p}</span>`).join('')}</div>
      <a class="btn btn--primary btn--lg" target="_blank" rel="noopener" href="https://wa.me/916304071731?text=${encodeURIComponent('Hi Shringar, I am interested in ' + d.kicker + '. Please share admission details.')}">Ask about this course</a>
    </div>`;
  modal.showModal();
}));
modalClose?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', (e) => {
  const rect = modal.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) modal.close();
});

const leadForm = document.getElementById('lead-form');
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phone-error');
phoneInput?.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
  phoneError?.setAttribute('hidden', '');
});
leadForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = (phoneInput?.value || '').replace(/\D/g, '');
  const course = document.getElementById('course').value;
  if (!/^[6-9]\d{9}$/.test(phone)) {
    phoneError?.removeAttribute('hidden');
    phoneInput?.focus();
    return;
  }
  trackEvent('lead_submit', { course });
  try {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'admissions', name, phone, course }).toString()
    });
  } catch (_) { /* Netlify record must never block the WhatsApp redirect. */ }
  const msg = `Hi Shringar, I am ${name} and I am interested in ${course}.`;
  window.open(`https://wa.me/916304071731?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// Lightweight analytics layer: pushes events to dataLayer and Meta Pixel (fbq)
// when present. Safe no-op if blockers remove them. Events: whatsapp_click,
// call_click, lead_submit, campaign_view. Paste the Meta Pixel base code in
// index.html <head> to activate Meta reporting; nothing else needs changing.
function trackEvent(name, params) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params));
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, params || {});
  } catch (_) { /* Analytics must never break the page. */ }
}

document.addEventListener('click', (event) => {
  const wa = event.target.closest('a[href*="wa.me"]');
  if (wa) {
    trackEvent('whatsapp_click', { link_text: wa.textContent.trim().slice(0, 80) });
    return;
  }
  const tel = event.target.closest('a[href^="tel:"]');
  if (tel) trackEvent('call_click', { link_text: tel.textContent.trim().slice(0, 80) });
});

const testimonialModal = document.getElementById('testimonial-modal');
const testimonialPlayer = document.getElementById('testimonial-player');
const testimonialClose = document.querySelector('.testimonial-close');

function closeTestimonial() {
  testimonialPlayer.pause();
  testimonialPlayer.currentTime = 0;
  testimonialPlayer.removeAttribute('src');
  testimonialPlayer.load();
  if (testimonialModal.open) testimonialModal.close();
}

document.querySelectorAll('.testimonial-card').forEach(card => {
  card.addEventListener('click', async () => {
    testimonialPlayer.pause();
    testimonialPlayer.src = card.dataset.video;
    testimonialModal.showModal();
    try { await testimonialPlayer.play(); } catch (_) { /* Controls remain available if playback is blocked. */ }
  });
});

testimonialClose?.addEventListener('click', closeTestimonial);
testimonialModal?.addEventListener('click', event => {
  if (event.target === testimonialModal) closeTestimonial();
});
testimonialModal?.addEventListener('cancel', event => {
  event.preventDefault();
  closeTestimonial();
});

const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => {
  toTop?.classList.toggle('show', window.scrollY > 600);
}, { passive: true });
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const campaignModal = document.getElementById('campaign-modal');
const campaignClose = document.querySelector('.campaign-close');
function closeCampaign() {
  if (campaignModal?.open) campaignModal.close();
}
campaignClose?.addEventListener('click', closeCampaign);
campaignModal?.addEventListener('click', (event) => {
  if (event.target === campaignModal) closeCampaign();
});
window.addEventListener('load', () => {
  if (!campaignModal || campaignModal.open) return;
  window.setTimeout(() => {
    if (!campaignModal.open) {
      campaignModal.showModal();
      trackEvent('campaign_view');
    }
  }, 900);
});

// Next-batch countdown. While no date is fixed, the panel stays in "starts
// soon" mode (countdown hidden). To activate, set data-batch-date="2026-11-01T10:00"
// on #batch-panel: the date, countdown and dated WhatsApp message appear.
(function initBatchCountdown() {
  const panel = document.getElementById('batch-panel');
  if (!panel) return;
  const dateEl = document.getElementById('batch-date');
  const countdownEl = panel.querySelector('.countdown');
  const tbaEl = document.getElementById('batch-tba');
  const waBtn = document.getElementById('batch-whatsapp');

  let target = null;
  if (panel.dataset.batchDate) {
    const pinned = new Date(panel.dataset.batchDate);
    if (!isNaN(pinned)) target = pinned;
  }

  if (!target) {
    if (dateEl) dateEl.textContent = 'soon';
    countdownEl?.setAttribute('hidden', '');
    tbaEl?.removeAttribute('hidden');
    return;
  }
  tbaEl?.setAttribute('hidden', '');

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  const pad = (n) => String(n).padStart(2, '0');

  function render() {
    const diff = Math.max(0, target - new Date());
    daysEl.textContent = pad(Math.floor(diff / 86400000));
    hoursEl.textContent = pad(Math.floor(diff / 3600000) % 24);
    minsEl.textContent = pad(Math.floor(diff / 60000) % 60);
    secsEl.textContent = pad(Math.floor(diff / 1000) % 60);
  }

  const dateStr = target.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  dateEl.textContent = dateStr;
  if (waBtn) {
    waBtn.href = `https://wa.me/916304071731?text=${encodeURIComponent(`Hi Shringar Makeup Academy, I want to reserve a seat in the next batch starting ${dateStr}. Please share admission details.`)}`;
  }
  render();
  window.setInterval(render, 1000);
})();
