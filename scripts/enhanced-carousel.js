// Enhanced Trending Products Carousel Functionality

document.addEventListener("DOMContentLoaded", function () {
  // Trending products data - in a real app, these would come from your backend
  const trendingProducts = [
    {
      id: "trend-1",
      image: "images/products/knit-athletic-sneakers-gray.jpg",
      name: "Knit Athletic Sneakers - Gray",
      price: "45.99",
      rating: 4.5,
    },
    {
      id: "trend-2",
      image: "images/products/round-sunglasses-black.jpg",
      name: "Round Sunglasses",
      price: "15.99",
      rating: 4.7,
    },
    {
      id: "trend-3",
      image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
      name: "Men's Cozy Fleece Zip-Up Hoodie",
      price: "35.99",
      rating: 4.8,
    },
    {
      id: "trend-4",
      image: "images/products/vanity-mirror-silver.jpg",
      name: "Vanity Mirror - Silver",
      price: "22.99",
      rating: 4.4,
    },
    {
      id: "trend-5",
      image: "images/products/backpack.jpg",
      name: "Modern Backpack",
      price: "49.99",
      rating: 4.9,
    },
    {
      id: "trend-6",
      image: "images/products/straw-sunhat.webp",
      name: "Straw Sunhat",
      price: "19.99",
      rating: 4.3,
    },
    {
      id: "trend-7",
      image: "images/products/sky-flower-stud-earrings.webp",
      name: "Sky Flower Stud Earrings",
      price: "24.99",
      rating: 4.6,
    },
    {
      id: "trend-8",
      image: "images/products/bathroom-rug.jpg",
      name: "Plush Bathroom Rug",
      price: "18.99",
      rating: 4.2,
    },
  ];

  // Get carousel elements
  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const indicatorsContainer = document.querySelector(".carousel-indicators");

  // Clone items for infinite scrolling
  const itemsToClone = 2; // Number of items to clone at each end

  // Populate the carousel with items
  function populateCarousel() {
    // Clear the track first
    track.innerHTML = "";

    // Add clone of last items to beginning for continuous scrolling
    for (let i = 0; i < itemsToClone; i++) {
      const idx = trendingProducts.length - itemsToClone + i;
      const product = trendingProducts[idx];
      const item = createCarouselItem(product);
      item.classList.add("clone");
      track.appendChild(item);
    }

    // Add all the items
    trendingProducts.forEach((product, index) => {
      const item = createCarouselItem(product);
      if (index === 0) item.classList.add("active");
      track.appendChild(item);
    });

    // Add clone of first items to end for continuous scrolling
    for (let i = 0; i < itemsToClone; i++) {
      const product = trendingProducts[i];
      const item = createCarouselItem(product);
      item.classList.add("clone");
      track.appendChild(item);
    }
  }

  // Create a carousel item
  function createCarouselItem(product) {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    item.setAttribute("data-id", product.id);

    // Generate star rating HTML
    const ratingStars = generateRatingStars(product.rating);

    item.innerHTML = `
      <div class="carousel-product">
        <div class="carousel-image-container">
          <img src="${product.image}" alt="${product.name}" class="carousel-image">
          <div class="carousel-quick-view">Quick View</div>
        </div>
        <div class="carousel-product-details">
          <h3 class="carousel-product-name">${product.name}</h3>
          <div class="carousel-product-rating">${ratingStars}</div>
          <div class="carousel-product-price">$${product.price}</div>
        </div>
      </div>
    `;

    return item;
  }

  // Create indicators
  function createIndicators() {
    indicatorsContainer.innerHTML = "";
    for (let i = 0; i < trendingProducts.length; i++) {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("data-index", i);
      indicatorsContainer.appendChild(dot);

      // Add click event to each dot
      dot.addEventListener("click", () => {
        goToSlide(i);
      });
    }
  }

  // Populate the carousel and indicators
  populateCarousel();
  createIndicators();

  // Calculate carousel properties
  let slideWidth;
  let currentIndex = 0;
  let slideCount = trendingProducts.length;
  let autoScrollInterval;

  // Transition handling for infinite scrolling
  track.addEventListener("transitionend", () => {
    const carouselItems = document.querySelectorAll(".carousel-item");

    if (currentIndex === -1) {
      // If we've scrolled left past the first real item
      track.style.transition = "none";
      currentIndex = slideCount - 1;
      track.style.transform = `translateX(-${
        (currentIndex + itemsToClone) * slideWidth
      }px)`;
      setTimeout(() => {
        track.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      }, 10);
    } else if (currentIndex === slideCount) {
      // If we've scrolled right past the last real item
      track.style.transition = "none";
      currentIndex = 0;
      track.style.transform = `translateX(-${
        (currentIndex + itemsToClone) * slideWidth
      }px)`;
      setTimeout(() => {
        track.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      }, 10);
    }

    // Update active state for items and indicators
    updateActiveItems();
  });

  // Update which item is active
  function updateActiveItems() {
    // Update carousel items
    const carouselItems = document.querySelectorAll(
      ".carousel-item:not(.clone)"
    );
    carouselItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });

    // Update indicator dots
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Initialize the carousel
  function initializeCarousel() {
    const container = document.querySelector(".carousel-container");
    slideWidth = document.querySelector(".carousel-item").offsetWidth;

    // Set initial position to first real item
    track.style.transform = `translateX(-${itemsToClone * slideWidth}px)`;

    // Set up auto scrolling
    startAutoScroll();
  }

  // Auto scrolling functionality
  function startAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4000);
  }

  // Move to a specific slide
  function goToSlide(index) {
    track.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    currentIndex = index;
    track.style.transform = `translateX(-${
      (currentIndex + itemsToClone) * slideWidth
    }px)`;
    updateActiveItems();

    // Restart auto scroll
    startAutoScroll();
  }

  // Event listeners for navigation buttons
  prevButton.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  // Pause auto scroll when hovering over carousel
  const carouselWrapper = document.querySelector(".carousel-wrapper");
  carouselWrapper.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval);
  });

  carouselWrapper.addEventListener("mouseleave", () => {
    startAutoScroll();
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    slideWidth = document.querySelector(".carousel-item").offsetWidth;
    track.style.transform = `translateX(-${
      (currentIndex + itemsToClone) * slideWidth
    }px)`;
  });

  // Initialize after a small delay to ensure proper layout
  setTimeout(initializeCarousel, 100);

  // Add click event for quick view
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("carousel-quick-view")) {
      const productName = event.target
        .closest(".carousel-product")
        .querySelector(".carousel-product-name").textContent;
      // In a real application, you would show a quick view modal here
      alert(`Quick view for ${productName}`);
    }
  });

  // Function to generate rating stars
  function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = "";

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>';
    }

    // Half star if needed
    if (hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
  }
});
