// ===============================
// SAIBAY Construction Website JS
// ===============================

// Project galleries mapped by folder to power the modal lightbox.
const projectData = {
  project1: {
    title: "Project 01 - Residential Build",
    images: [
      "pictures/project1/a1.jpg",
      "pictures/project1/a2 (1).jpg",
      "pictures/project1/a3.jpg",
      "pictures/project1/a3 (1).jpg"
    ]
  },
  project2: {
    title: "Project 02 - Commercial Development",
    images: [
      "pictures/project2/b1.jpg",
      "pictures/project2/b1 (1).jpg",
      "pictures/project2/b2.jpg",
      "pictures/project2/b2 (1).jpg",
      "pictures/project2/b3.jpg",
      "pictures/project2/b3 (1).jpg"
    ]
  },
  project3: {
    title: "Project 03 - Mixed-Use Fit-Out",
    images: [
      "pictures/project3/a2.jpg",
      "pictures/project3/c1.jpg",
      "pictures/project3/c1 (1).jpg",
      "pictures/project3/c2.jpg",
      "pictures/project3/c2 (1).jpg",
      "pictures/project3/c3.jpg"
    ]
  },
  project4: {
    title: "Project 04 - Large-Scale Site Delivery",
    images: [
      "pictures/project4/d1.jpg",
      "pictures/project4/d1 (1).jpg",
      "pictures/project4/d1 (2).jpg",
      "pictures/project4/d1 (3).jpg",
      "pictures/project4/d2.jpg",
      "pictures/project4/d2 (1).jpg",
      "pictures/project4/d3.jpg",
      "pictures/project4/d3 (1).jpg"
    ]
  }
};

const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id]");
const yearEl = document.getElementById("year");

// Modal elements
const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalThumbs = document.getElementById("modalThumbs");
const modalClose = document.getElementById("modalClose");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");
const projectCards = document.querySelectorAll(".project-card");

let currentProjectKey = null;
let currentImageIndex = 0;

// Keep footer date current.
yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle.
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when a nav link is clicked.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Smooth section scroll offset for sticky header.
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const headerHeight = document.querySelector(".site-header").offsetHeight;
    const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 2;

    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  });
});

// Highlight active nav link based on current scroll position.
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY + document.querySelector(".site-header").offsetHeight + 24;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const inView = fromTop >= section.offsetTop && fromTop < section.offsetTop + section.offsetHeight;

    navLinks.forEach((link) => {
      const match = link.getAttribute("href") === `#${id}`;
      if (match) {
        link.classList.toggle("active", inView);
      }
    });
  });
});

// Initialize and open modal for selected project.
function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  currentProjectKey = projectKey;
  currentImageIndex = 0;
  modalTitle.textContent = project.title;
  renderModalImage();
  renderModalThumbs();

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
}

function closeProjectModal() {
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}

function renderModalImage() {
  const project = projectData[currentProjectKey];
  if (!project) return;

  modalImage.src = project.images[currentImageIndex];
  modalImage.alt = `${project.title} image ${currentImageIndex + 1}`;
}

function renderModalThumbs() {
  const project = projectData[currentProjectKey];
  if (!project) return;

  modalThumbs.innerHTML = "";

  project.images.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.toggle("active", index === currentImageIndex);

    const image = document.createElement("img");
    image.src = src;
    image.alt = `${project.title} thumbnail ${index + 1}`;

    button.appendChild(image);
    button.addEventListener("click", () => {
      currentImageIndex = index;
      renderModalImage();
      renderModalThumbs();
    });

    modalThumbs.appendChild(button);
  });
}

function showNextImage() {
  const project = projectData[currentProjectKey];
  if (!project) return;
  currentImageIndex = (currentImageIndex + 1) % project.images.length;
  renderModalImage();
  renderModalThumbs();
}

function showPreviousImage() {
  const project = projectData[currentProjectKey];
  if (!project) return;
  currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
  renderModalImage();
  renderModalThumbs();
}

// Project card click and keyboard support.
projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(card.dataset.project);
    }
  });
});

// Modal controls.
modalClose.addEventListener("click", closeProjectModal);
prevImage.addEventListener("click", showPreviousImage);
nextImage.addEventListener("click", showNextImage);

projectModal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.close === "true") {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (!projectModal.classList.contains("open")) return;

  if (event.key === "Escape") closeProjectModal();
  if (event.key === "ArrowRight") showNextImage();
  if (event.key === "ArrowLeft") showPreviousImage();
});

// Simple front-end form messaging for local usage.
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formMessage.textContent = "Please complete all fields with valid details before submitting.";
    formMessage.style.color = "#aa2e2e";
    return;
  }

  formMessage.textContent = "Thank you. Your message has been captured locally (placeholder behavior).";
  formMessage.style.color = "#2f6f49";
  contactForm.reset();
});
