import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";

console.log("Checkout page loaded with cart:", cart);

renderOrderSummary();
renderPaymentSummary();
