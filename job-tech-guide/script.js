// =========================================================
// How to Prepare for a Job in Tech — Script
// Small, beginner-friendly enhancements only.
// =========================================================

// 1. Auto-update the year in the footer.
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2. Reveal sections as they scroll into view.
//    Adds the `visible` class to anything with `.reveal`.
const revealTargets = document.querySelectorAll(
  ".slide, .point-card, .step, .tip, .image-placeholder"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  // Fallback for very old browsers — show everything immediately.
  revealTargets.forEach((el) => el.classList.add("visible"));
}
