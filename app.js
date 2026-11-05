// Reveal on scroll
const io = new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.rv,.bring,.contact,.cover').forEach((el) => io.observe(el));

// Statement: letters light up as you scroll through it
const st = document.querySelector('.statement');
if (st) {
  const chars = [...st.querySelectorAll('.ch')];
  const tick = () => {
    const r = st.getBoundingClientRect(), vh = innerHeight;
    // progress 0 when top hits 90% of viewport, 1 when bottom hits 45%
    const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.45 + r.height)));
    const n = Math.round(p * chars.length * 1.15);
    chars.forEach((c, i) => c.classList.toggle('on', i < n));
  };
  addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick); tick();
}

// Marquee: duplicate the set so the loop is seamless
document.querySelectorAll('.track').forEach((t) => { t.innerHTML += t.innerHTML; });

// Keep autoplay videos playing only when visible
const vio = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()));
document.querySelectorAll('video[autoplay]').forEach((v) => vio.observe(v));

// Language intro: greeting bubble on hover, exit animation before navigating
const intro = document.querySelector('.intro');
if (intro) {
  const hello = intro.querySelector('.hello');
  intro.querySelectorAll('.choose .btn').forEach((b) => {
    b.addEventListener('mouseenter', () => { hello.textContent = hello.dataset[b.dataset.l]; intro.classList.add('hov'); });
    b.addEventListener('mouseleave', () => intro.classList.remove('hov'));
    b.addEventListener('click', (e) => {
      e.preventDefault(); hello.textContent = hello.dataset[b.dataset.l]; intro.classList.add('hov');
      setTimeout(() => intro.classList.add('out'), 350);
      setTimeout(() => { location.href = b.href; }, 900);
    });
  });
}
addEventListener('pageshow', (e) => { if (e.persisted && intro) intro.classList.remove('out', 'hov'); });
