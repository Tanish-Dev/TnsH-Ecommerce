// Hero Slider Functionality - Enhanced for ShopIN
document.addEventListener("DOMContentLoaded", function () {
  // Define the hero slide images - high-quality fashion imagery
  const slideImages = [
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
  ];

  // Hero content for each slide - elegant and engaging copy
  const slideTitles = [
    "Summer Collection <span class='hero-year'>2025</span>",
    "Premium Essentials <span class='hero-year'>Collection</span>",
    "New Arrivals <span class='hero-year'>Weekly</span>",
  ];

  const slideSubtitles = [
    "Elevate your wardrobe with our curated selection",
    "Timeless pieces designed for modern living",
    "Stay ahead of the trends with our latest styles",
  ];

  const slideTags = ["New Season", "Best Sellers", "Just Arrived"];

  let currentSlide = 0;
  const totalSlides = slideImages.length;
  let slideInterval;

  // Get DOM elements
  const heroSlider = document.querySelector(".hero-slider");
  const heroSlide = document.querySelector(".hero-slide");
  const heroImage = document.querySelector(".hero-image");
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroTag = document.querySelector(".hero-tag");
  const dots = document.querySelectorAll(".dot");
  const progressBarElement = document.querySelector(".hero-progress-bar");
  const leftArrow = document.querySelector(".hero-arrow-left");
  const rightArrow = document.querySelector(".hero-arrow-right");
  const heroLine = document.querySelector(".hero-line");
  const heroButtons = document.querySelector(".hero-buttons");
  const heroContentInner = document.querySelector(".hero-content-inner");

  // Initialize slider
  function initSlider() {
    // Initial slide setup
    updateSlideContent(currentSlide);

    // Setup navigation
    setupNavigation();

    // Start auto slide with progress bar
    startAutoSlide();

    // Add event listeners for hover pause
    setupHoverPause();
  }

  // Setup navigation controls
  function setupNavigation() {
    // Setup slide dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    // Setup arrow navigation
    if (leftArrow) leftArrow.addEventListener("click", prevSlide);
    if (rightArrow) rightArrow.addEventListener("click", nextSlide);
  }

  // Setup hover pause functionality
  function setupHoverPause() {
    heroSlider.addEventListener("mouseenter", () => {
      // Pause auto rotation on hover
      clearInterval(slideInterval);
      // Pause progress bar animation
      progressBarElement.style.transition = "none";
    });

    heroSlider.addEventListener("mouseleave", () => {
      // Resume auto rotation
      startAutoSlide();
    });
  }

  // Reset animations for a slide
  function resetAnimations() {
    // Animation elements
    const animElements = [
      heroTag,
      heroTitle,
      heroLine,
      heroSubtitle,
      heroButtons,
    ];

    // Reset each element's animation
    animElements.forEach((el) => {
      if (el) {
        el.style.animation = "none";
        el.offsetHeight; // Trigger reflow
        el.style.animation = "";
      }
    });
  }

  // Start auto slide with progress bar
  function startAutoSlide() {
    // Clear any existing intervals
    if (slideInterval) clearInterval(slideInterval);

    // Reset and animate progress bar
    if (progressBarElement) {
      progressBarElement.style.width = "0%";
      progressBarElement.offsetHeight; // Trigger reflow
      progressBarElement.style.transition = "width 5s linear";
      progressBarElement.style.width = "100%";
    }

    // Set interval for auto slide
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index === currentSlide) return;

    // Update slide index
    currentSlide = index;

    // Transition to the new slide
    transitionToSlide(currentSlide);

    // Reset the auto slide timer
    startAutoSlide();
  }

  // Go to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    transitionToSlide(currentSlide);
    startAutoSlide();
  }

  // Go to previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    transitionToSlide(currentSlide);
    startAutoSlide();
  }

  // Transition to a new slide
  function transitionToSlide(index) {
    // Fade out current slide content
    if (heroContentInner) {
      heroContentInner.style.opacity = "0";
      heroContentInner.style.transform = "translateY(20px)";
    }

    // After fade out, update content
    setTimeout(() => {
      // Update slide content
      updateSlideContent(index);

      // Reset animations
      resetAnimations();

      // Update active dot indicator
      updateDotIndicators(index);

      // Fade in updated content
      if (heroContentInner) {
        heroContentInner.style.opacity = "1";
        heroContentInner.style.transform = "translateY(0)";
      }
    }, 300);

    // Update image with crossfade
    fadeBackgroundImage(heroImage, slideImages[index]);
  }

  // Update slide content
  function updateSlideContent(index) {
    if (heroTitle) heroTitle.innerHTML = slideTitles[index];
    if (heroSubtitle) heroSubtitle.textContent = slideSubtitles[index];
    if (heroTag) heroTag.textContent = slideTags[index];
  }

  // Update active dot indicator
  function updateDotIndicators(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Fade background image for smooth transition
  function fadeBackgroundImage(element, newImageUrl) {
    // Create temporary element for crossfade
    const temp = document.createElement("div");
    temp.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("${element.style.backgroundImage.slice(5, -2)}");;
      background-size: cover;
      background-position: center 30%;
      z-index: 0;
      opacity: 1;
      transition: opacity 1s ease;
    `;

    // Insert before the main image element
    element.parentNode.insertBefore(temp, element);

    // Update main image
    element.style.backgroundImage = `url("${newImageUrl}")`;

    // Fade out temp element then remove it
    setTimeout(() => {
      temp.style.opacity = "0";
      setTimeout(() => {
        if (temp.parentNode) temp.parentNode.removeChild(temp);
      }, 1000);
    }, 50);
  }

  // Add transition effects to hero content
  if (heroContentInner) {
    heroContentInner.style.transition =
      "opacity 0.5s ease, transform 0.5s ease";
  }

  // Initialize the slider
  initSlider();
});
