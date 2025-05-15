import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatcurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  // Check if cart exists and has items
  if (!cart || cart.length === 0) {
    console.log("Cart is empty in payment summary");
    renderEmptyPaymentSummary();
    return;
  }

  let itemCount = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);

    // Skip if product not found
    if (!product) {
      console.error(`Product not found with ID: ${cartItem.id}`);
      return; // Skip this iteration
    }

    productPriceCents += product.priceCents * cartItem.quantity;
    itemCount += cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId) || {
      priceincents: 0,
    };
    shippingPriceCents += deliveryOption.priceincents;
  });

  const totalbeforetaxcents = productPriceCents + shippingPriceCents;
  const taxCents = totalbeforetaxcents * 0.1;
  const totalCents = totalbeforetaxcents + taxCents;
  console.log(productPriceCents);
  console.log(shippingPriceCents);
  console.log(totalCents);

  const paymentSummaryHTML = `
   <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${itemCount}):</div>
            <div class="payment-summary-money">$${formatcurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatcurrency(
              shippingPriceCents
            )}</div> 
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatcurrency(
              totalbeforetaxcents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatcurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatcurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}

function renderEmptyPaymentSummary() {
  const emptyPaymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>
    <div class="payment-summary-row">
      <div>Your cart is empty</div>
    </div>
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$0.00</div>
    </div>
    <a href="index.html" class="place-order-button button-primary">
      Continue Shopping
    </a>
  `;
  document.querySelector(".js-payment-summary").innerHTML =
    emptyPaymentSummaryHTML;
}

renderPaymentSummary();
