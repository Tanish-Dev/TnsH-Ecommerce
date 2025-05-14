// Cart and Checkout Functionality Test

import {
  cart,
  addtocart,
  removefromcart,
  updatedeliveryoption,
} from "../data/cart.js";
import { products, getProduct } from "../data/products.js";
import { formatcurrency } from "../scripts/utils/money.js";

console.log("=== STARTING AMAZON FUNCTIONALITY TESTS ===");

// Test 1: Verify products are loaded
console.log("\nTest 1: Product Data Loading Test");
if (products && products.length > 0) {
  console.log(`✅ SUCCESS: ${products.length} products loaded successfully`);
  console.log(
    `Sample product: ${products[0].name}, Price: $${formatcurrency(
      products[0].priceCents
    )}`
  );
} else {
  console.log("❌ FAILED: Products not loaded correctly");
}

// Test 2: Cart Functionality
console.log("\nTest 2: Cart Functionality Test");
const initialCartLength = cart.length;
console.log(`Initial cart has ${initialCartLength} items`);

// Test adding item to cart
const testProductId = products[0].id;
addtocart(testProductId);
if (cart.some((item) => item.id === testProductId)) {
  console.log(`✅ SUCCESS: Product was added to cart`);
} else {
  console.log(`❌ FAILED: Product was not added to cart`);
}

// Test updating quantity
const originalQuantity =
  cart.find((item) => item.id === testProductId)?.quantity || 0;
addtocart(testProductId);
const newQuantity =
  cart.find((item) => item.id === testProductId)?.quantity || 0;
if (newQuantity > originalQuantity) {
  console.log(
    `✅ SUCCESS: Product quantity updated from ${originalQuantity} to ${newQuantity}`
  );
} else {
  console.log(`❌ FAILED: Product quantity not updated correctly`);
}

// Test 3: Delivery Options
console.log("\nTest 3: Delivery Options Test");
if (cart.length > 0) {
  const testItem = cart[0];
  const originalDeliveryOption = testItem.deliveryOptionId;
  const newDeliveryOption = originalDeliveryOption === "1" ? "2" : "1";

  updatedeliveryoption(testItem.id, newDeliveryOption);

  if (
    cart.find((item) => item.id === testItem.id).deliveryOptionId ===
    newDeliveryOption
  ) {
    console.log(
      `✅ SUCCESS: Delivery option updated from ${originalDeliveryOption} to ${newDeliveryOption}`
    );
  } else {
    console.log(`❌ FAILED: Delivery option not updated correctly`);
  }
}

// Test 4: Remove from Cart
console.log("\nTest 4: Remove from Cart Test");
const itemToRemove = cart[0]?.id;
if (itemToRemove) {
  const cartSizeBefore = cart.length;
  removefromcart(itemToRemove);
  if (
    cart.length < cartSizeBefore &&
    !cart.some((item) => item.id === itemToRemove)
  ) {
    console.log(`✅ SUCCESS: Item removed from cart successfully`);
  } else {
    console.log(`❌ FAILED: Item was not removed correctly`);
  }
} else {
  console.log("⚠️ WARNING: No items in cart to test removal");
}

// Test 5: Product Lookup by ID
console.log("\nTest 5: Product Lookup Test");
const randomProductId =
  products[Math.floor(Math.random() * products.length)].id;
const foundProduct = getProduct(randomProductId);
if (foundProduct && foundProduct.id === randomProductId) {
  console.log(`✅ SUCCESS: Product found by ID: ${foundProduct.name}`);
} else {
  console.log(`❌ FAILED: Product lookup by ID not working correctly`);
}

console.log("\n=== FINISHED TESTING ===");
console.log(
  "Run checkout.html and index.html in browser to verify UI functionality"
);
