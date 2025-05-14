document.addEventListener("DOMContentLoaded", function () {
  // Define slide content
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      tag: "New Collection",
      title: "MINIMALIST <span class='hero-accent'>ESSENTIALS</span>",
      subtitle: "Curated pieces designed for modern living",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2071&q=80",
      tag: "Summer 2025",
      title: "EFFORTLESS <span class='hero-accent'>Style</span>",
      subtitle: "Contemporary designs for the modern wardrobe",
    },
    {
      image:
        "https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
      tag: "Limited Edition",
      title: "MONOCHROME <span class='hero-accent'>Collection</span>",
      subtitle: "Premium pieces with timeless appeal",
    },
  ];

  // Hero elements
  const heroSlide = document.querySelector(".hero-slide");
  const heroImage = document.querySelector(".hero-image");
  const heroTag = document.querySelector(".hero-tag");
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const dots = document.querySelectorAll(".dot");

  // Clone slides
  for (let i = 1; i < slides.length; i++) {
    const clone = heroSlide.cloneNode(true);
    clone.classList.remove("active");
    heroSlide.parentNode.appendChild(clone);
  }

  // Get all slides after cloning
  const allSlides = document.querySelectorAll(".hero-slide");

  let currentSlide = 0;
  let slideInterval;

  // Initialize hero
  function initHero() {
    updateSlide(0);
    startSlideTimer();
    setupEventListeners();
  }

  function updateSlide(index) {
    // Reset active state
    allSlides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Set active state
    allSlides[index].classList.add("active");
    dots[index].classList.add("active");

    // Update content for current slide
    const slideData = slides[index];
    const activeSlide = allSlides[index];

    // Update slide content
    activeSlide.querySelector(
      ".hero-image"
    ).style.backgroundImage = `url(${slideData.image})`;
    activeSlide.querySelector(".hero-tag").textContent = slideData.tag;
    activeSlide.querySelector(".hero-title").innerHTML = slideData.title;
    activeSlide.querySelector(".hero-subtitle").textContent =
      slideData.subtitle;

    currentSlide = index;
  }

  function startSlideTimer() {
    // Clear any existing interval
    if (slideInterval) {
      clearInterval(slideInterval);
    }

    // Start new interval
    slideInterval = setInterval(() => {
      goToNextSlide();
    }, 5000);
  }

  function goToNextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    updateSlide(nextIndex);
  }

  function goToPrevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    updateSlide(prevIndex);
  }

  function setupEventListeners() {
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateSlide(index);
        startSlideTimer(); // Reset timer when manually navigating
      });
    });

    // Pause on hover
    document
      .querySelector(".hero-section")
      .addEventListener("mouseenter", () => {
        if (slideInterval) {
          clearInterval(slideInterval);
        }
      });

    document
      .querySelector(".hero-section")
      .addEventListener("mouseleave", () => {
        startSlideTimer();
      });
  }

  // Initialize the hero section
  initHero();
});
