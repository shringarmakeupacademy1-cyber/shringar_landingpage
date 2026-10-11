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
leadForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const course = document.getElementById('course').value;
  const msg = `Hi Shringar Makeup Academy,\nMy name is ${name}.\nPhone: ${phone}\nI am interested in: ${course}.\nPlease share admission details.`;
  window.open(`https://wa.me/916304071731?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
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
