import { products } from "../data/products.js";
import { formatcurrency } from "./utils/money.js";
import { cart, addtocart } from "../data/cart.js";
import { showProductDetail } from "./product-detail.js";

// Track current filter and sort state
let currentFilter = "all";
let currentSort = "default";
let priceMin = 0;
let priceMax = Infinity;
let selectedCategories = [];

// Render all products on the collections page
function renderAllProducts() {
  const productsContainer = document.querySelector(".js-all-products-grid");

  if (!productsContainer) {
    console.error("Products container not found");
    return;
  }

  // Apply filters and sorting
  let filteredProducts = filterProducts(products);
  let sortedProducts = sortProducts(filteredProducts);

  let productsHTML = "";

  if (sortedProducts.length === 0) {
    productsHTML = `<div class="no-products-message">No products match your filter criteria</div>`;
    productsContainer.innerHTML = productsHTML;
    return;
  }

  sortedProducts.forEach((product) => {
    // Determine if product has any special badges
    const isNew = product.isNew;
    const isBestseller =
      product.keywords && product.keywords.includes("bestseller");
    const isSale = product.priceCents < product.originalPriceCents;

    productsHTML += `
      <div class="collection-product js-collection-product" 
          data-product-id="${product.id}"
          data-category="${product.type || ""}"
          data-price="${product.priceCents}">
        <div class="collection-product-image-container">
          ${isNew ? `<span class="product-badge new-badge">New</span>` : ""}
          ${
            isBestseller
              ? `<span class="product-badge bestseller-badge">Bestseller</span>`
              : ""
          }
          ${isSale ? `<span class="product-badge sale-badge">Sale</span>` : ""}
          
          <img
            class="collection-product-image"
            src="${product.image}"
            alt="${product.name}"
          />
        </div>

        <div class="collection-product-content">
          <div class="collection-product-name limit-text-to-2-lines">
            ${product.name}
          </div> 

          <div class="collection-product-rating-container">
            <img
              class="collection-product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="collection-product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="collection-product-price">
            $${formatcurrency(product.priceCents)}
            ${
              product.originalPriceCents
                ? `<span class="original-price">$${formatcurrency(
                    product.originalPriceCents
                  )}</span>`
                : ""
            }
          </div>

          <div class="collection-product-spacer"></div>

          <div class="collection-view-details-container">
            <button class="collection-view-details-button js-view-details" 
              data-product-id="${product.id}">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  });

  productsContainer.innerHTML = productsHTML;
}

// Initialize event listeners for View Details buttons and product details
function initializeEventListeners() {
  document.querySelectorAll(".js-view-details").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Stop propagation to prevent duplicate triggers
      event.stopPropagation();

      const productId = button.dataset.productId;
      showProductDetail(productId);
    });
  });

  // Add click event to show product details for collection products
  document.querySelectorAll(".js-collection-product").forEach((container) => {
    container.addEventListener("click", () => {
      const productId = container.dataset.productId;
      showProductDetail(productId);
    });
  });
}

// Update the cart count in the header
function updateCartCount() {
  let cartCount = 0;
  cart.forEach((cartItem) => {
    cartCount += cartItem.quantity;
  });

  const cartCountElement = document.querySelector(".js-cart-quantity");
  if (cartCountElement) {
    cartCountElement.innerHTML = cartCount;
  }
}

/**
 * Filter products based on current filter criteria
 */
function filterProducts(productsList) {
  return productsList.filter((product) => {
    // Apply category filter
    if (currentFilter !== "all" && product.type !== currentFilter) {
      if (!(product.keywords && product.keywords.includes(currentFilter))) {
        return false;
      }
    }

    // Apply price filter
    if (product.priceCents < priceMin || product.priceCents > priceMax) {
      return false;
    }

    // Apply checkbox category filters
    if (selectedCategories.length > 0) {
      const productType = product.type || "";
      const productKeywords = product.keywords || [];
      const matchesCategory = selectedCategories.some((category) => {
        return productType === category || productKeywords.includes(category);
      });

      if (!matchesCategory) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort products based on current sort criteria
 */
function sortProducts(productsList) {
  const sortedProducts = [...productsList];

  switch (currentSort) {
    case "price-low":
      sortedProducts.sort((a, b) => a.priceCents - b.priceCents);
      break;
    case "price-high":
      sortedProducts.sort((a, b) => b.priceCents - a.priceCents);
      break;
    case "rating":
      sortedProducts.sort((a, b) => b.rating.stars - a.rating.stars);
      break;
    default:
      // Default sorting (no change)
      break;
  }

  return sortedProducts;
}

/**
 * Handle filter button clicks
 */
function handleFilterButtonClick() {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      document.querySelectorAll(".filter-button").forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      // Update current filter
      currentFilter = button.dataset.filter;

      // Re-render products
      renderAllProducts();
    });
  });
}

/**
 * Handle sort selection changes
 */
function handleSortChange() {
  const sortSelect = document.querySelector(".js-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentSort = sortSelect.value;
      renderAllProducts();
    });
  }
}

/**
 * Handle price range filtering
 */
function handlePriceFilter() {
  const minInput = document.querySelector(".js-price-min");
  const maxInput = document.querySelector(".js-price-max");

  if (minInput && maxInput) {
    minInput.addEventListener("input", () => {
      priceMin = minInput.value ? parseInt(minInput.value) * 100 : 0;
      renderAllProducts();
    });

    maxInput.addEventListener("input", () => {
      priceMax = maxInput.value ? parseInt(maxInput.value) * 100 : Infinity;
      renderAllProducts();
    });
  }
}

/**
 * Handle category checkbox filters
 */
function handleCategoryFilter() {
  document.querySelectorAll(".filter-checkbox input").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      selectedCategories = Array.from(
        document.querySelectorAll(".filter-checkbox input:checked")
      ).map((input) => input.value);

      renderAllProducts();
    });
  });
}

/**
 * Handle back to top button visibility
 */
function handleBackToTop() {
  const backToTopButton = document.querySelector(".back-to-top");

  if (!backToTopButton) return;

  // Show button when page is scrolled down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderAllProducts();
  initializeEventListeners();
  updateCartCount();

  // Initialize all filter and sort controls
  handleFilterButtonClick();
  handleSortChange();
  handlePriceFilter();
  handleCategoryFilter();

  // Add animation class to collections grid after small delay for better UX
  setTimeout(() => {
    document
      .querySelectorAll(".collection-product")
      .forEach((product, index) => {
        setTimeout(() => {
          product.classList.add("fade-in");
        }, index * 50);
      });
  }, 300);

  // Initialize back to top button
  handleBackToTop();
});
