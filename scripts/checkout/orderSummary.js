import { products, getProduct } from "../../data/products.js";
import { cart, removefromcart, updatedeliveryoption } from "../../data/cart.js";
import { formatcurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOption,
  getDeliveryOption,
} from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";

hello();

const today = dayjs();

const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D"));

export function renderOrderSummary() {
  let checkoutproductsHTMl = "";

  cart.forEach((cartItem) => {
    const productsId = cartItem.id;

    let matchingitem = getProduct(productsId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOptions = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    // Convert deliverydays to a number and provide a default value if deliveryOptions is undefined
    const deliveryDays = deliveryOptions
      ? Number(deliveryOptions.deliverydays)
      : 0;
    const deliveryDate = today.add(deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    console.log("Matching item:", matchingitem);
    checkoutproductsHTMl += ` <div class="cart-item-container js-cart-item-container${
      matchingitem.id
    }">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingitem.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingitem.name}
                </div>
                <div class="product-price">$${formatcurrency(
                  matchingitem.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span></span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${
                    matchingitem.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionsHTML(matchingitem, cartItem)}
              </div>
            </div>
          </div>`;
  });

  function deliveryOptionsHTML(matchingitem, cartItem) {
    let html = "";
    deliveryOption.forEach((DeliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(DeliveryOption.deliverydays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        DeliveryOption.priceincents === 0
          ? "FREE"
          : `$${formatcurrency(DeliveryOption.priceincents)}`;

      const isChecked = DeliveryOption.id === cartItem.deliveryOptionId;

      html += `
                <div class="delivery-option js-delivery-option" data-product-id="${
                  matchingitem.id
                }" data-delivery-option-id="${DeliveryOption.id}">
                  <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingitem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString}</div>
                  </div>
                </div>`;
    });
    return html;
  }

  document.querySelector(".js-checkout-products").innerHTML =
    checkoutproductsHTMl;

  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      console.log("Delete link clicked");
      const productId = link.dataset.productId;
      console.log("Product ID:", productId);
      removefromcart(productId);
      const container = document
        .querySelector(`.js-cart-item-container${productId}`)
        .remove();
      console.log(container);
      renderPaymentSummary();
    });
  });

  hello();

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updatedeliveryoption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
