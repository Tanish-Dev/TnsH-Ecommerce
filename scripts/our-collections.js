import { products } from "../data/products.js";
import { formatcurrency } from "./utils/money.js";
import { cart, addtocart } from "../data/cart.js";

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
      <div class="collection-product">
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

        <div class="collection-added-to-cart js-added-to-cart${product.id}">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button class="collection-add-to-cart-button button-secondary js-add-to-cart" 
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  productsContainer.innerHTML = productsHTML;
}

// Initialize event listeners for Add to Cart buttons
function initializeEventListeners() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      // Show the "Added" message
      document
        .querySelector(`.js-added-to-cart${productId}`)
        .classList.add("added");

      // Hide the message after 2 seconds
      setTimeout(() => {
        document
          .querySelector(`.js-added-to-cart${productId}`)
          .classList.remove("added");
      }, 2000);

      // Add to cart
      addtocart(productId);
      updateCartCount();
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
