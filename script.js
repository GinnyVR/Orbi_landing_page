const track = document.querySelector("[data-carousel-track]");
const slides = track ? Array.from(track.children) : [];
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const dots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
const viewport = document.querySelector(".carousel-viewport");

let currentSlide = 0;
let touchStartX = 0;
let touchStartY = 0;

function updateCarousel(index) {
  if (!track || !slides.length) return;

  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentSlide);
  });
}

if (prevButton) {
  prevButton.addEventListener("click", () => updateCarousel(currentSlide - 1));
}

if (nextButton) {
  nextButton.addEventListener("click", () => updateCarousel(currentSlide + 1));
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    updateCarousel(Number(dot.dataset.carouselDot || 0));
  });
});

if (viewport && slides.length > 1) {
  viewport.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true }
  );

  viewport.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      updateCarousel(deltaX > 0 ? currentSlide - 1 : currentSlide + 1);
    },
    { passive: true }
  );
}

const revealTargets = document.querySelectorAll("[data-reveal]");
const navShells = Array.from(document.querySelectorAll(".nav-shell"));

if ("IntersectionObserver" in window && revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

navShells.forEach((shell) => {
  const toggle = shell.querySelector(".menu-toggle");
  const closeTargets = shell.querySelectorAll("[data-menu-close]");

  if (!toggle) return;

  const setMenuState = (isOpen) => {
    shell.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setMenuState(!shell.classList.contains("menu-open"));
  });

  closeTargets.forEach((target) => {
    target.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });
});

updateCarousel(0);
