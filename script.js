// Auto-update footer year.
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============ TEAM CAROUSEL (infinite loop) ============
(function () {
  const track = document.getElementById("teamTrack");
  const prevBtn = document.getElementById("teamPrev");
  const nextBtn = document.getElementById("teamNext");
  if (!track || !prevBtn || !nextBtn) return;

  const originals = Array.from(track.querySelectorAll(".team-card"));
  if (!originals.length) return;

  // Clone the originals once and append — this enables the seamless wrap.
  originals.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  let timer = null;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function step() {
    return originals[0].getBoundingClientRect().width + 16; // card width + gap
  }

  function originalWidth() {
    return step() * originals.length;
  }

  function snap(toLeft) {
    track.style.scrollBehavior = "auto";
    track.scrollLeft = toLeft;
    // force layout flush so the next smooth scroll starts from here
    void track.offsetWidth;
    track.style.scrollBehavior = "smooth";
  }

  function next() {
    const w = originalWidth();
    // If we've scrolled into the cloned region, silently snap back to the
    // mirrored position in the originals before scrolling forward.
    if (track.scrollLeft >= w - 2) {
      snap(track.scrollLeft - w);
    }
    track.scrollTo({ left: track.scrollLeft + step(), behavior: "smooth" });
  }

  function prev() {
    const w = originalWidth();
    // If we're at the very start, silently jump to the mirrored position
    // inside the clones, then scroll left from there.
    if (track.scrollLeft <= 2) {
      snap(track.scrollLeft + w);
    }
    track.scrollTo({ left: track.scrollLeft - step(), behavior: "smooth" });
  }

  // 8 seconds per slide — enough time to read each bio comfortably.
  const SLIDE_INTERVAL = 8000;

  function start() { if (!reduced && !isPaused) timer = setInterval(next, SLIDE_INTERVAL); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  let isPaused = false;
  function pause() { isPaused = true; stop(); }
  function resume() { isPaused = false; start(); }

  prevBtn.addEventListener("click", () => { prev(); restart(); });
  nextBtn.addEventListener("click", () => { next(); restart(); });

  // Pause on hover, touch, and focus anywhere inside the carousel.
  const carousel = document.getElementById("teamCarousel");
  carousel.addEventListener("mouseenter", pause);
  carousel.addEventListener("mouseleave", resume);
  carousel.addEventListener("focusin", pause);
  carousel.addEventListener("focusout", resume);
  carousel.addEventListener("touchstart", pause, { passive: true });
  carousel.addEventListener("touchend", () => {
    // small delay so a quick tap doesn't immediately resume
    setTimeout(resume, 1500);
  });

  start();
})();

// ============ CONTACT FORM (front-end only) ============
(function () {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("cf-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.classList.remove("success", "error");

    if (!form.checkValidity()) {
      feedback.textContent = "Please fill in all required fields before sending.";
      feedback.classList.add("error");
      return;
    }

    const name = form.elements["name"].value.trim().split(" ")[0] || "there";
    feedback.textContent = `Thanks ${name} — we received your project brief and will reply within 4 business hours.`;
    feedback.classList.add("success");
    form.reset();
  });
})();

// ============ GALLERY CAROUSEL ============
(function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const dotsEl = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const currentEl = document.getElementById("carouselCurrent");
  const totalEl = document.getElementById("carouselTotal");
  const stage = document.querySelector(".carousel-stage");

  if (!slides.length || !dotsEl || !prevBtn || !nextBtn) return;

  let index = 0;
  let timer = null;
  const total = slides.length;
  if (totalEl) totalEl.textContent = total;

  // Build dot indicators.
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => go(i));
    dotsEl.appendChild(dot);
  }

  function go(next) {
    slides[index].classList.remove("active");
    dotsEl.children[index].classList.remove("active");
    index = (next + total) % total;
    slides[index].classList.add("active");
    dotsEl.children[index].classList.add("active");
    if (currentEl) currentEl.textContent = index + 1;
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  prevBtn.addEventListener("click", () => { prev(); restart(); });
  nextBtn.addEventListener("click", () => { next(); restart(); });

  // Keyboard arrows when carousel is focused.
  stage.setAttribute("tabindex", "0");
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { next(); restart(); }
    if (e.key === "ArrowLeft") { prev(); restart(); }
  });

  // Touch swipe.
  let startX = 0;
  stage.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); restart(); }
  });

  // Auto-play (pauses on hover, respects reduced motion).
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function start() { if (!reduced) timer = setInterval(next, 5500); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  stage.addEventListener("mouseenter", stop);
  stage.addEventListener("mouseleave", start);

  start();
})();
