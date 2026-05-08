/* =========================
   ACTIVE MOBILE NAVBAR
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".mobile-nav-item");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   SMOOTH CLICK EFFECT
========================= */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

/* =========================
   NAVBAR SHADOW ON SCROLL
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
    navbar.style.background = "rgba(255,255,255,0.8)";
  } else {
    navbar.style.boxShadow = "none";
    navbar.style.background = "rgba(255,255,255,0.65)";
  }
});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
  ".card, .gallery-item, .timeline-item, .hero-text, .hero-image",
);

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

/* =========================
   TYPING EFFECT HERO TITLE
========================= */

const heroTitle = document.querySelector(".hero-text h1 span");

const words = [
  "Love & Memories",
  "Forever Together",
  "Beautiful Story",
  "Endless Happiness",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typingEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    heroTitle.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typingEffect, 1500);
      return;
    }
  } else {
    heroTitle.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex++;

      if (wordIndex >= words.length) {
        wordIndex = 0;
      }
    }
  }

  setTimeout(typingEffect, isDeleting ? 60 : 120);
}

typingEffect();

/* =========================
   PARALLAX HERO IMAGE
========================= */

const heroImage = document.querySelector(".image-wrapper");

window.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 30;
  const y = (window.innerHeight / 2 - e.pageY) / 30;

  heroImage.style.transform = `translate(${x}px, ${y}px)`;
});

/* =========================
   BUTTON RIPPLE EFFECT
========================= */

const buttons = document.querySelectorAll(
  ".primary-btn, .secondary-btn, .btn-love",
);

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");

    const diameter = Math.max(button.clientWidth, button.clientHeight);

    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;

    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;

    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;

    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  });
});

/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* =========================
   GALLERY IMAGE PREVIEW
========================= */

const galleryItems = document.querySelectorAll(".gallery-item img");

/* Create Overlay */
const imagePreview = document.createElement("div");
imagePreview.classList.add("image-preview");

imagePreview.innerHTML = `
  <span class="close-preview">
    <i class="fa-solid fa-xmark"></i>
  </span>

  <img src="" alt="Preview Image">

  <button class="preview-btn prev-btn">
    <i class="fa-solid fa-chevron-left"></i>
  </button>

  <button class="preview-btn next-btn">
    <i class="fa-solid fa-chevron-right"></i>
  </button>
`;

document.body.appendChild(imagePreview);

const previewImg = imagePreview.querySelector("img");
const closePreview = imagePreview.querySelector(".close-preview");
const nextBtn = imagePreview.querySelector(".next-btn");
const prevBtn = imagePreview.querySelector(".prev-btn");

let currentIndex = 0;

/* OPEN IMAGE */
function showImage(index) {
  currentIndex = index;

  previewImg.src = galleryItems[index].src;

  imagePreview.classList.add("show");

  document.body.style.overflow = "hidden";
}

/* CLICK IMAGE */
galleryItems.forEach((img, index) => {
  img.addEventListener("click", () => {
    showImage(index);
  });
});

/* CLICK EXPAND BUTTON */
const galleryButtons = document.querySelectorAll(".gallery-btn");

galleryButtons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    showImage(index);
  });
});

/* CLOSE */
closePreview.addEventListener("click", () => {
  imagePreview.classList.remove("show");

  document.body.style.overflow = "auto";
});

/* CLICK OUTSIDE */
imagePreview.addEventListener("click", (e) => {
  if (e.target === imagePreview) {
    imagePreview.classList.remove("show");

    document.body.style.overflow = "auto";
  }
});

/* NEXT IMAGE */
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  currentIndex++;

  if (currentIndex >= galleryItems.length) {
    currentIndex = 0;
  }

  previewImg.src = galleryItems[currentIndex].src;
});

/* PREV IMAGE */
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = galleryItems.length - 1;
  }

  previewImg.src = galleryItems[currentIndex].src;
});

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {
  if (!imagePreview.classList.contains("show")) return;

  if (e.key === "Escape") {
    imagePreview.classList.remove("show");

    document.body.style.overflow = "auto";
  }

  if (e.key === "ArrowRight") {
    currentIndex++;

    if (currentIndex >= galleryItems.length) {
      currentIndex = 0;
    }

    previewImg.src = galleryItems[currentIndex].src;
  }

  if (e.key === "ArrowLeft") {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = galleryItems.length - 1;
    }

    previewImg.src = galleryItems[currentIndex].src;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = musicToggle.querySelector("i");

  let isPlaying = false;

  musicToggle.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        await music.play();

        musicIcon.classList.remove("fa-play");
        musicIcon.classList.add("fa-pause");

        musicToggle.classList.add("active");

        isPlaying = true;
      } else {
        music.pause();

        musicIcon.classList.remove("fa-pause");
        musicIcon.classList.add("fa-play");

        musicToggle.classList.remove("active");

        isPlaying = false;
      }
    } catch (err) {
      console.log("Music error:", err);
      alert("Musik tidak bisa diputar. Cek file audio atau browser!");
    }
  });
});