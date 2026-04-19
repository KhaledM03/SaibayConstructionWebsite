const yearEl = document.getElementById("year");
yearEl.textContent = String(new Date().getFullYear());

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id]");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const offset = document.querySelector(".site-header").offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset + 2;
    window.scrollTo({ top, behavior: "smooth" });

    mainNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  const top = window.scrollY + document.querySelector(".site-header").offsetHeight + 26;

  sections.forEach((section) => {
    const inView = top >= section.offsetTop && top < section.offsetTop + section.offsetHeight;
    const id = section.getAttribute("id");

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.toggle("active", inView);
      }
    });
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const heroMedia = document.getElementById("heroMedia");
const playCursor = document.getElementById("playCursor");

if (!prefersReducedMotion) {
  heroMedia.addEventListener("mousemove", (event) => {
    const rect = heroMedia.getBoundingClientRect();
    playCursor.style.left = `${event.clientX - rect.left}px`;
    playCursor.style.top = `${event.clientY - rect.top}px`;
  });

  window.addEventListener("scroll", () => {
    const shift = window.scrollY * 0.3;
    heroMedia.style.backgroundPosition = `center ${shift * 0.07}px`;
  });
}

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count || "0");
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 36));

      const interval = window.setInterval(() => {
        current = Math.min(target, current + increment);
        el.textContent = String(current);

        if (current >= target) {
          window.clearInterval(interval);
        }
      }, 28);

      observer.unobserve(el);
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const reelImages = [
  "pictures/GalleryImages01.jpg",
  "pictures/GalleryImages02.jpg",
  "pictures/GalleryImages06.jpg",
  "pictures/GalleryImages09.jpg",
  "pictures/GalleryImages11.jpg",
  "pictures/GalleryImages13.jpg"
];

const reelModal = document.getElementById("reelModal");
const reelImage = document.getElementById("reelImage");
const reelClose = document.getElementById("reelClose");
const reelPrev = document.getElementById("reelPrev");
const reelNext = document.getElementById("reelNext");
let reelIndex = 0;

function openReel() {
  reelModal.classList.add("open");
  reelModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeReel() {
  reelModal.classList.remove("open");
  reelModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderReel() {
  reelImage.src = reelImages[reelIndex];
  reelImage.alt = `SAIBAY field reel still ${reelIndex + 1}`;
}

function nextReel() {
  reelIndex = (reelIndex + 1) % reelImages.length;
  renderReel();
}

function prevReel() {
  reelIndex = (reelIndex - 1 + reelImages.length) % reelImages.length;
  renderReel();
}

heroMedia.addEventListener("click", () => {
  renderReel();
  openReel();
});

heroMedia.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    renderReel();
    openReel();
  }
});

reelClose.addEventListener("click", closeReel);
reelPrev.addEventListener("click", prevReel);
reelNext.addEventListener("click", nextReel);

reelModal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.close === "true") {
    closeReel();
  }
});

document.addEventListener("keydown", (event) => {
  if (!reelModal.classList.contains("open")) return;
  if (event.key === "Escape") closeReel();
  if (event.key === "ArrowRight") nextReel();
  if (event.key === "ArrowLeft") prevReel();
});

const caseData = [
  {
    name: "Project 01 - Residential Build",
    typology: "Residential",
    sqft: "4,200 sqft",
    duration: "10 months",
    year: "2025",
    images: [
      "pictures/project1/a1.jpg",
      "pictures/project1/a2 (1).jpg",
      "pictures/project1/a3.jpg",
      "pictures/project1/a3 (1).jpg"
    ],
    before: "pictures/project1/a1.jpg",
    after: "pictures/project1/a3.jpg"
  },
  {
    name: "Project 02 - Commercial Expansion",
    typology: "Commercial",
    sqft: "8,700 sqft",
    duration: "13 months",
    year: "2024",
    images: [
      "pictures/project2/b1.jpg",
      "pictures/project2/b2.jpg",
      "pictures/project2/b3.jpg",
      "pictures/project2/b1 (1).jpg"
    ],
    before: "pictures/project2/b1.jpg",
    after: "pictures/project2/b3.jpg"
  },
  {
    name: "Project 03 - Mixed-Use Fit-Out",
    typology: "Mixed-Use",
    sqft: "6,100 sqft",
    duration: "9 months",
    year: "2025",
    images: [
      "pictures/project3/c1.jpg",
      "pictures/project3/c2.jpg",
      "pictures/project3/c3.jpg",
      "pictures/project3/a2.jpg"
    ],
    before: "pictures/project3/c1.jpg",
    after: "pictures/project3/c3.jpg"
  },
  {
    name: "Project 04 - Site Delivery",
    typology: "Large Scale",
    sqft: "12,300 sqft",
    duration: "16 months",
    year: "2023",
    images: [
      "pictures/project4/d1.jpg",
      "pictures/project4/d2.jpg",
      "pictures/project4/d3.jpg",
      "pictures/project4/d1 (2).jpg"
    ],
    before: "pictures/project4/d1.jpg",
    after: "pictures/project4/d3.jpg"
  }
];

const caseFeature = document.getElementById("caseFeature");
const caseOverlay = document.getElementById("caseOverlay");
const caseThumbs = document.getElementById("caseThumbs");
const casePagination = document.getElementById("casePagination");
const beforeImage = document.getElementById("beforeImage");
const afterImage = document.getElementById("afterImage");
const baRange = document.getElementById("baRange");
const sliderLine = document.getElementById("sliderLine");

let currentCase = 0;
let currentThumb = 0;

function updateBeforeAfter(value) {
  afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
  sliderLine.style.left = `${value}%`;
}

baRange.addEventListener("input", (event) => {
  updateBeforeAfter(event.target.value);
});

function renderCase() {
  const data = caseData[currentCase];
  caseFeature.src = data.images[currentThumb];
  caseFeature.alt = `${data.name} featured image ${currentThumb + 1}`;
  beforeImage.src = data.before;
  afterImage.src = data.after;

  caseOverlay.innerHTML = [
    `<strong>${data.name}</strong>`,
    `<span>Typology: ${data.typology}</span>`,
    `<span>Area: ${data.sqft}</span>`,
    `<span>Duration: ${data.duration}</span>`,
    `<span>Completion: ${data.year}</span>`
  ].join("<br />");

  caseThumbs.innerHTML = "";
  data.images.forEach((src, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");
    image.src = src;
    image.alt = `${data.name} thumbnail ${index + 1}`;
    button.appendChild(image);

    button.classList.toggle("active", index === currentThumb);
    button.addEventListener("click", () => {
      currentThumb = index;
      renderCase();
    });

    caseThumbs.appendChild(button);
  });

  casePagination.querySelectorAll("button").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentCase);
  });
}

function buildCasePagination() {
  casePagination.innerHTML = "";
  caseData.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Load ${item.name}`);
    dot.classList.toggle("active", index === currentCase);
    dot.addEventListener("click", () => {
      currentCase = index;
      currentThumb = 0;
      renderCase();
    });
    casePagination.appendChild(dot);
  });
}

buildCasePagination();
renderCase();
updateBeforeAfter(50);

const leadForm = document.getElementById("leadForm");
const steps = Array.from(document.querySelectorAll(".form-step"));
const prevStepBtn = document.getElementById("prevStep");
const nextStepBtn = document.getElementById("nextStep");
const submitLeadBtn = document.getElementById("submitLead");
const formProgress = document.getElementById("formProgress");
const progressLabel = document.getElementById("progressLabel");
const formFeedback = document.getElementById("formFeedback");
const calendarPanel = document.getElementById("calendarPanel");

let currentStep = 1;

function validateStep(stepNumber) {
  const step = steps[stepNumber - 1];
  const requiredFields = step.querySelectorAll("input[required], textarea[required]");

  for (const field of requiredFields) {
    if (field.type === "radio") {
      const group = step.querySelectorAll(`input[name='${field.name}']`);
      const oneChecked = Array.from(group).some((radio) => radio.checked);
      if (!oneChecked) return false;
    } else if (!field.value.trim()) {
      return false;
    }
  }

  return true;
}

function renderStep() {
  steps.forEach((step) => {
    step.classList.toggle("active", Number(step.dataset.step) === currentStep);
  });

  const width = `${(currentStep / steps.length) * 100}%`;
  formProgress.style.width = width;
  progressLabel.textContent = `Step ${currentStep} of ${steps.length}`;

  prevStepBtn.style.visibility = currentStep === 1 ? "hidden" : "visible";
  nextStepBtn.style.display = currentStep === steps.length ? "none" : "inline-flex";
  submitLeadBtn.classList.toggle("show", currentStep === steps.length);
}

nextStepBtn.addEventListener("click", () => {
  if (!validateStep(currentStep)) {
    formFeedback.textContent = "Please complete this step before continuing.";
    formFeedback.style.color = "#8a1f1f";
    return;
  }

  formFeedback.textContent = "";
  currentStep += 1;
  renderStep();
});

prevStepBtn.addEventListener("click", () => {
  formFeedback.textContent = "";
  currentStep = Math.max(1, currentStep - 1);
  renderStep();
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateStep(currentStep)) {
    formFeedback.textContent = "Please fill the required fields before submitting.";
    formFeedback.style.color = "#8a1f1f";
    return;
  }

  formFeedback.textContent = "Scope captured. Choose your 15-minute scoping call below.";
  formFeedback.style.color = "#1f5f31";
  leadForm.querySelectorAll("fieldset, .form-actions").forEach((el) => {
    el.style.display = "none";
  });

  calendarPanel.hidden = false;
});

renderStep();
