// Sale page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize countdown timer
  initCountdown();

  // Initialize category filter
  initCategoryFilter();
});

// Countdown timer functionality
function initCountdown() {
  // Set the end date for the sale (14 days from now)
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 14);

  // Update the countdown every second
  const countdownTimer = setInterval(function () {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result with leading zeros
    document.getElementById("countdown-days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("countdown-hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("countdown-minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("countdown-seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    // When the countdown is over
    if (distance < 0) {
      clearInterval(countdownTimer);
      document.getElementById("countdown-days").textContent = "00";
      document.getElementById("countdown-hours").textContent = "00";
      document.getElementById("countdown-minutes").textContent = "00";
      document.getElementById("countdown-seconds").textContent = "00";
    }
  }, 1000);
}

// Category filter functionality
function initCategoryFilter() {
  const categoryTabs = document.querySelectorAll(".category-tab");
  const saleProducts = document.querySelectorAll(".sale-product");

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      categoryTabs.forEach((tab) => tab.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Get the selected category
      const selectedCategory = tab.getAttribute("data-category");

      // Filter products
      saleProducts.forEach((product) => {
        if (
          selectedCategory === "all" ||
          product.getAttribute("data-category") === selectedCategory
        ) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  });
}

// Quick add to cart functionality
document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    // You can add the logic to update the cart here
    // For now, just show a simple alert
    const productName =
      this.closest(".sale-product").querySelector(".product-name").textContent;

    updateCartDisplay();

    // Animation for added to cart
    const addedEl = document.createElement("div");
    addedEl.classList.add("added-to-cart");
    addedEl.textContent = "Added to Cart";
    this.closest(".hover-actions").appendChild(addedEl);

    setTimeout(() => {
      addedEl.remove();
    }, 2000);
  });
});

// Function to update cart display
function updateCartDisplay() {
  const cartQuantity = document.querySelector(".js-cart-quantity");
  if (cartQuantity) {
    let currentQuantity = parseInt(cartQuantity.textContent);
    cartQuantity.textContent = currentQuantity + 1;
  }
}
