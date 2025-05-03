import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

let checkoutproductsHTMl = "";

cart.forEach((cartItem) => {
  const productsId = cartItem.id;
  let matchingitem;

  products.forEach((product) => {
    if (product.id === productsId) {
      matchingitem = product;
    }
  });

  console.log("Matching item:", matchingitem);
  checkoutproductsHTMl += ` <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingitem.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingitem.name}
                </div>
                <div class="product-price">$${(
                  matchingitem.priceCents / 100
                ).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">2</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-1"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});

document.querySelector(".js-checkout-products").innerHTML =
  checkoutproductsHTMl;
