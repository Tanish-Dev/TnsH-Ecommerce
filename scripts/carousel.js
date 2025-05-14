// Trending Products Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Sample trending products - in a real app, these would come from your products data
  const trendingProducts = [
    {
      image: "images/products/knit-athletic-sneakers-gray.jpg",
      name: "Knit Athletic Sneakers - Gray",
      price: "45.99",
      rating: 4.5,
    },
    {
      image: "images/products/round-sunglasses-black.jpg",
      name: "Round Sunglasses",
      price: "15.99",
      rating: 4.7,
    },
    {
      image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
      name: "Men Cozy Fleece Zip-Up Hoodie - Red",
      price: "35.99",
      rating: 4.8,
    },
    {
      image: "images/products/vanity-mirror-silver.jpg",
      name: "Vanity Mirror",
      price: "22.99",
      rating: 4.4,
    },
    {
      image: "images/products/backpack.jpg",
      name: "Backpack",
      price: "49.99",
      rating: 4.9,
    },
    {
      image: "images/products/straw-sunhat.webp",
      name: "Straw Sunhat",
      price: "19.99",
      rating: 4.3,
    },
    {
      image: "images/products/sky-flower-stud-earrings.webp",
      name: "Sky Flower Stud Earrings",
      price: "24.99",
      rating: 4.6,
    },
    {
      image: "images/products/bathroom-rug.jpg",
      name: "Bathroom Rug",
      price: "18.99",
      rating: 4.2,
    },
  ];

  // Get the carousel track
  const track = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

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
        <div class="carousel-product-price">$${product.price}</div>
        <button class="carousel-add-to-cart button-secondary">Add to Cart</button>
      </div>
    `;

    track.appendChild(item);
  });

  // Set up carousel controls
  let position = 0;
  const itemWidth = 320; // width of each item including margin
  const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
  const maxPosition = trendingProducts.length - visibleItems;

  // Function to update carousel position
  function updateCarouselPosition() {
    track.style.transform = `translateX(-${position * itemWidth}px)`;

    // Enable/disable buttons based on position
    prevButton.disabled = position === 0;
    nextButton.disabled = position >= maxPosition;

    prevButton.style.opacity = position === 0 ? "0.5" : "1";
    nextButton.style.opacity = position >= maxPosition ? "0.5" : "1";
  }

  // Event listeners for buttons
  prevButton.addEventListener("click", () => {
    position = Math.max(0, position - 1);
    updateCarouselPosition();
  });

  nextButton.addEventListener("click", () => {
    position = Math.min(maxPosition, position + 1);
    updateCarouselPosition();
  });

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
