// Trending Products Carousel Functionality
// Using high-quality lifestyle imagery from Unsplash with grayscale aesthetic
// to match the Summer Essentials section style

document.addEventListener("DOMContentLoaded", function () {
  // Curated lifestyle products with high-quality imagery in a consistent aesthetic
  const trendingProducts = [
    {
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      name: "Summer Linen Collection",
      price: "45.99",
      rating: 4.5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      name: "Urban Essentials",
      price: "39.90",
      rating: 4.8,
    },
    {
      image:
        "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      name: "Men's Heritage Collection",
      price: "52.90",
      rating: 4.7,
    },
    {
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      name: "Coastal Comfort Edit",
      price: "38.90",
      rating: 4.6,
    },
    {
      image:
        "https://images.unsplash.com/photo-1465408953385-7c4627c29435?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      name: "Resort Wear Collection",
      price: "32.90",
      rating: 4.9,
    },
    {
      image:
        "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      name: "Weekend Getaway Edit",
      price: "59.90",
      rating: 4.3,
    },
    {
      image:
        "https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      name: "Sunset Wardrobe",
      price: "19.90",
      rating: 4.6,
    },
    {
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      name: "Modern Classics",
      price: "34.90",
      rating: 4.2,
    },
  ];

  // Get the carousel track
  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  // Clear the track first
  track.innerHTML = "";

  // Populate the carousel with items
  trendingProducts.forEach((product) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");

    // Generate star rating HTML
    const ratingStars = generateRatingStars(product.rating);

    item.innerHTML = `
      <div class="carousel-product">
        <div class="carousel-image-container">
          <img src="${product.image}" alt="${product.name}" class="carousel-image">
        </div>
        <h3 class="carousel-product-name">${product.name}</h3>
        <div class="carousel-product-rating">${ratingStars}</div>
        <div class="carousel-product-price">from $${product.price}</div>
        <button class="carousel-add-to-cart button-secondary js-add-to-cart" data-product-id="${product.id}">Explore Collection</button>
      </div>
    `;

    track.appendChild(item);
  });

  // Set up carousel controls
  let position = 0;
  const itemWidth = 320; // width of each item including margin
  const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
  const maxPosition = trendingProducts.length - visibleItems;
  let autoScrollInterval;

  // Function to update carousel position
  function updateCarouselPosition() {
    track.style.transform = `translateX(-${position * itemWidth}px)`;

    // For continuous scroll, we don't disable buttons
    prevButton.style.opacity = "1";
    nextButton.style.opacity = "1";
  }

  // Continuous scroll function
  function startAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      if (position >= maxPosition) {
        // If we reach the end, gradually reset to beginning
        position = 0;
      } else {
        position += 1;
      }
      updateCarouselPosition();
    }, 3000);
  }

  // Event listeners for buttons
  prevButton.addEventListener("click", () => {
    if (position <= 0) {
      // If at beginning, jump to end
      position = maxPosition;
    } else {
      position--;
    }
    updateCarouselPosition();

    // Reset auto-scroll timer when user interacts
    clearInterval(autoScrollInterval);
    startAutoScroll();
  });

  nextButton.addEventListener("click", () => {
    if (position >= maxPosition) {
      // If at end, jump to beginning
      position = 0;
    } else {
      position++;
    }
    updateCarouselPosition();

    // Reset auto-scroll timer when user interacts
    clearInterval(autoScrollInterval);
    startAutoScroll();
  });

  // Pause scrolling when hovering over carousel
  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    startAutoScroll();
  });

  // Start auto-scrolling
  startAutoScroll();

  // Initialize position
  updateCarouselPosition();

  // Resize handler
  window.addEventListener("resize", () => {
    const newVisibleItems = Math.floor(
      track.parentElement.offsetWidth / itemWidth
    );
    if (newVisibleItems !== visibleItems) {
      // Recalculate maxPosition
      maxPosition = trendingProducts.length - newVisibleItems;
      position = Math.min(position, maxPosition);
      updateCarouselPosition();
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

  // Add click handlers to "Add to Cart" buttons
  document.querySelectorAll(".carousel-add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productName = this.parentElement.querySelector(
        ".carousel-product-name"
      ).textContent;
      alert(`Added ${productName} to cart!`);
      // In a real app, you would call your add to cart function here
    });
  });
});

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    document
      .querySelector(`.js-added-to-cart${button.dataset.productId}`)
      .classList.add("added");
    setTimeout(() => {
      document
        .querySelector(`.js-added-to-cart${button.dataset.productId}`)
        .classList.remove("added");
    }, 2000);
    const productsId = button.dataset.productId;
    addtocart(productsId);
    updateCartCount();
  });
});
