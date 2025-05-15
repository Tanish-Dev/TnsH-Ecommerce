import { cart, addtocart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatcurrency } from "./utils/money.js";
import { showProductDetail } from "./product-detail.js";

// Limit the featured products to the first 8 to reduce scrolling
const featuredProducts = products.slice(0, 8);

let productsHTMl = "";

featuredProducts.forEach((product) => {
  productsHTMl += `<div class="product-container js-product-container" data-product-id="${
    product.id
  }">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div> 

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatcurrency(
            product.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="view-details-container">
            <button class="view-details-button js-view-details" data-product-id="${
              product.id
            }">View Details</button>
          </div>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTMl;

function updateCartCount() {
  let cartCount = 0;
  cart.forEach((cartItem) => {
    cartCount += cartItem.quantity;
  });
  document.querySelector(".js-cart-count").innerHTML = cartCount;
}

document.querySelectorAll(".js-view-details").forEach((button) => {
  button.addEventListener("click", (event) => {
    // Stop event propagation to prevent duplicate triggers
    event.stopPropagation();

    const productId = button.dataset.productId;
    showProductDetail(productId);
  });
});

// Add event listeners to product containers to show product details
document.querySelectorAll(".js-product-container").forEach((container) => {
  container.addEventListener("click", () => {
    const productId = container.dataset.productId;
    showProductDetail(productId);
  });
});
