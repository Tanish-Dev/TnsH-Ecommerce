import { products } from "../data/products.js";
import { formatcurrency } from "./utils/money.js";
import { cart, addtocart } from "../data/cart.js";
import { showProductDetail } from "./product-detail.js";

// Render all products on the collections page
function renderAllProducts() {
  const productsContainer = document.querySelector(".js-all-products-grid");

  if (!productsContainer) {
    console.error("Products container not found");
    return;
  }

  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
      <div class="collection-product js-collection-product" data-product-id="${
        product.id
      }">
        <div class="collection-product-image-container">
          <img
            class="collection-product-image"
            src="${product.image}"
            alt="${product.name}"
          />
        </div>

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

        <div class="collection-product-price">$${formatcurrency(
          product.priceCents
        )}</div>

        <div class="collection-product-spacer"></div>

        <div class="collection-view-details-container">
          <button class="collection-view-details-button js-view-details" 
            data-product-id="${product.id}">
            View Details
          </button>
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

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderAllProducts();
  initializeEventListeners();
  updateCartCount();
});
