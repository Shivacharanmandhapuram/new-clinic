document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements to animate
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // Navbar background change on scroll
  const navbar = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(233, 240, 236, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
    } else {
      navbar.style.background = 'rgba(233, 240, 236, 0.9)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Simple interactions for feature tabs (visual mockups)
  const docTabs = document.querySelectorAll('.doc-tab-item');
  docTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      docTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ── Rotating Hero Sub-headline ──
  const rotatingVariants = [
    'For smoother intake.',
    'For fewer missed calls.',
    'To reduce no-shows.',
    'For lower front-desk load.',
    'For faster patient flow.'
  ];
  let currentVariant = 0;
  const rotatingText = document.getElementById('rotating-text');
  const progressBar = document.getElementById('rotating-progress-bar');
  const CYCLE_MS = 3500;

  function startProgressBar() {
    if (!progressBar) return;
    progressBar.classList.remove('animate');
    // Force reflow so the class removal takes effect before re-adding
    void progressBar.offsetWidth;
    progressBar.classList.add('animate');
  }

  function rotateHeadline() {
    if (!rotatingText) return;

    // Exit animation
    rotatingText.classList.add('exit');

    setTimeout(() => {
      currentVariant = (currentVariant + 1) % rotatingVariants.length;
      rotatingText.textContent = rotatingVariants[currentVariant];

      // Prepare enter
      rotatingText.classList.remove('exit');
      rotatingText.classList.add('enter');

      // Force reflow
      void rotatingText.offsetWidth;

      // Enter animation
      rotatingText.classList.remove('enter');

      // Restart progress
      startProgressBar();
    }, 450);
  }

  // Kick off the first progress bar
  startProgressBar();

  let rotationInterval = setInterval(rotateHeadline, CYCLE_MS);

  // Pause rotation when tab is hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(rotationInterval);
    } else {
      startProgressBar();
      rotationInterval = setInterval(rotateHeadline, CYCLE_MS);
    }
  });
});
