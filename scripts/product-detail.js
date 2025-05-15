import { getProduct } from "../data/products.js";
import { formatcurrency } from "./utils/money.js";
import { cart, addtocart } from "../data/cart.js";

/**
 * Shows the product detail overlay for a specific product
 * @param {string} productId - The ID of the product to display
 */
export function showProductDetail(productId) {
  // Get the product details
  const product = getProduct(productId);

  if (!product) {
    console.error("Product not found");
    return;
  }

  // Create or get the product detail overlay
  let productDetailOverlay = document.getElementById("product-detail-overlay");

  if (!productDetailOverlay) {
    productDetailOverlay = document.createElement("div");
    productDetailOverlay.id = "product-detail-overlay";
    productDetailOverlay.className = "product-detail-overlay";
    document.body.appendChild(productDetailOverlay);
  }

  // Determine if product has any special badges
  const isNew = product.isNew;
  const isBestseller =
    product.keywords && product.keywords.includes("bestseller");
  const isSale = product.priceCents < product.originalPriceCents;

  // Calculate savings percentage if on sale
  let savingsPercent = 0;
  if (isSale && product.originalPriceCents) {
    savingsPercent = Math.round(
      ((product.originalPriceCents - product.priceCents) /
        product.originalPriceCents) *
        100
    );
  }

  // Generate the HTML for the product detail
  const productHTML = `
    <div class="product-detail-container">
      <button class="product-detail-close" aria-label="Close product detail">
        <i class="fas fa-times"></i>
      </button>
      
      <div class="product-detail-content">
        <div class="product-detail-left">
          <div class="product-detail-image-container">
            <img src="${product.image}" alt="${
    product.name
  }" class="product-detail-image">
          </div>
        </div>
        
        <div class="product-detail-right">
          <div class="product-detail-breadcrumb">
            Home / ${product.type || "Products"} / ${product.name}
          </div>
          
          ${isNew ? '<span class="product-detail-badge new">New</span>' : ""}
          ${
            isBestseller
              ? '<span class="product-detail-badge bestseller">Bestseller</span>'
              : ""
          }
          ${isSale ? '<span class="product-detail-badge sale">Sale</span>' : ""}
          
          <h1 class="product-detail-name">${product.name}</h1>
          
          <div class="product-detail-rating">
            <img src="images/ratings/rating-${
              product.rating.stars * 10
            }.png" alt="${
    product.rating.stars
  } stars" class="product-detail-rating-stars">
            <span class="product-detail-rating-count">${
              product.rating.count
            } ratings</span>
          </div>
          
          <div class="product-detail-price-container">
            <span class="product-detail-price">$${formatcurrency(
              product.priceCents
            )}</span>
            ${
              product.originalPriceCents
                ? `<span class="product-detail-original-price">$${formatcurrency(
                    product.originalPriceCents
                  )}</span>`
                : ""
            }
          </div>
          
          ${
            savingsPercent > 0
              ? `<div class="product-detail-savings">You save: ${savingsPercent}% ($${formatcurrency(
                  product.originalPriceCents - product.priceCents
                )})</div>`
              : ""
          }
          
          <div class="product-detail-description">
            ${generateProductDescription(product)}
          </div>
          
          <div class="product-detail-features">
            <h3 class="product-detail-features-title">Features</h3>
            ${generateProductFeatures(product)}
          </div>
          
          ${
            product.sizeChartLink
              ? `<div class="product-detail-size-chart">
              <a href="#" class="product-detail-size-link" data-size-chart="${product.sizeChartLink}">
                <i class="fas fa-ruler-combined"></i> View Size Chart
              </a>
            </div>`
              : ""
          }
          
          <div class="product-detail-actions">
            <div class="product-detail-quantity">
              <div class="product-detail-quantity-label">Quantity:</div>
              <div class="product-detail-quantity-selector">
                <button class="product-detail-quantity-btn js-quantity-decrease" aria-label="Decrease quantity">-</button>
                <input type="text" value="1" class="product-detail-quantity-input js-product-detail-quantity" readonly aria-label="Product quantity">
                <button class="product-detail-quantity-btn js-quantity-increase" aria-label="Increase quantity">+</button>
              </div>
            </div>
            
            <div class="product-detail-cta-buttons">
              <button class="product-detail-add-to-cart js-product-detail-add-to-cart" 
                data-product-id="${product.id}">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button class="product-detail-wishlist js-add-to-wishlist" aria-label="Add to wishlist">
                <i class="far fa-heart"></i>
              </button>
            </div>
          </div>
          
          <div class="product-detail-added-message js-product-detail-added-message">
            <i class="fas fa-check"></i> Added to your cart
          </div>
          
          <div class="product-detail-meta">
            <div class="product-detail-keywords">
              ${generateKeywords(product)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add the product HTML to the overlay
  productDetailOverlay.innerHTML = productHTML;

  // Show the overlay
  setTimeout(() => {
    productDetailOverlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }, 10);

  // Add event listeners
  setupEventListeners(productDetailOverlay, product);
}

/**
 * Sets up event listeners for the product detail overlay
 */
function setupEventListeners(overlay, product) {
  // Close button
  const closeButton = overlay.querySelector(".product-detail-close");
  closeButton.addEventListener("click", () => closeProductDetail());

  // Click outside to close
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeProductDetail();
    }
  });

  // Escape key to close
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProductDetail();
    }
  });

  // Size chart link
  const sizeChartLink = overlay.querySelector(".product-detail-size-link");
  if (sizeChartLink) {
    sizeChartLink.addEventListener("click", (event) => {
      event.preventDefault();
      const chartImage = sizeChartLink.dataset.sizeChart;
      showSizeChart(chartImage);
    });
  }

  // Quantity handlers
  const quantityInput = overlay.querySelector(".js-product-detail-quantity");
  const decreaseBtn = overlay.querySelector(".js-quantity-decrease");
  const increaseBtn = overlay.querySelector(".js-quantity-increase");

  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", () => {
      const currentVal = parseInt(quantityInput.value, 10) || 1;
      if (currentVal > 1) {
        quantityInput.value = currentVal - 1;
      }
    });

    increaseBtn.addEventListener("click", () => {
      const currentVal = parseInt(quantityInput.value, 10) || 1;
      if (currentVal < 10) {
        quantityInput.value = currentVal + 1;
      }
    });
  }

  // Add to cart button
  const addToCartButton = overlay.querySelector(
    ".js-product-detail-add-to-cart"
  );
  addToCartButton.addEventListener("click", () => {
    const quantity = parseInt(
      overlay.querySelector(".js-product-detail-quantity").value,
      10
    );
    const productId = addToCartButton.dataset.productId;

    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addtocart(productId);
    }

    updateCartCount();
    showAddedMessage(overlay);
  });

  // Wishlist button
  const wishlistButton = overlay.querySelector(".js-add-to-wishlist");
  if (wishlistButton) {
    wishlistButton.addEventListener("click", () => {
      wishlistButton.classList.toggle("active");
      if (wishlistButton.classList.contains("active")) {
        wishlistButton.querySelector("i").classList.replace("far", "fas");
      } else {
        wishlistButton.querySelector("i").classList.replace("fas", "far");
      }
    });
  }
}

/**
 * Closes the product detail overlay
 */
function closeProductDetail() {
  const overlay = document.getElementById("product-detail-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    setTimeout(() => {
      document.body.classList.remove("no-scroll");
    }, 300);
  }

  // Remove the keydown event listener
  document.removeEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProductDetail();
    }
  });
}

/**
 * Shows a size chart in a modal
 */
function showSizeChart(chartImage) {
  let sizeChartModal = document.getElementById("size-chart-modal");

  if (!sizeChartModal) {
    sizeChartModal = document.createElement("div");
    sizeChartModal.id = "size-chart-modal";
    sizeChartModal.className = "size-chart-modal";
    document.body.appendChild(sizeChartModal);
  }

  sizeChartModal.innerHTML = `
    <div class="size-chart-container">
      <button class="size-chart-close" aria-label="Close size chart">
        <i class="fas fa-times"></i>
      </button>
      <img src="${chartImage}" alt="Size Chart" class="size-chart-image">
    </div>
  `;

  setTimeout(() => {
    sizeChartModal.classList.add("active");
  }, 10);

  // Close button event
  const closeButton = sizeChartModal.querySelector(".size-chart-close");
  closeButton.addEventListener("click", () => {
    sizeChartModal.classList.remove("active");
    setTimeout(() => {
      sizeChartModal.remove();
    }, 300);
  });

  // Click outside to close
  sizeChartModal.addEventListener("click", (event) => {
    if (event.target === sizeChartModal) {
      sizeChartModal.classList.remove("active");
      setTimeout(() => {
        sizeChartModal.remove();
      }, 300);
    }
  });
}

/**
 * Updates the cart count in the header
 */
function updateCartCount() {
  const cartCountElements = document.querySelectorAll(
    ".js-cart-count, .js-cart-quantity"
  );

  let cartCount = 0;
  cart.forEach((cartItem) => {
    cartCount += cartItem.quantity;
  });

  cartCountElements.forEach((element) => {
    element.innerHTML = cartCount;
  });
}

/**
 * Shows the "Added to Cart" message
 */
function showAddedMessage(overlay) {
  const addedMessage = overlay.querySelector(
    ".js-product-detail-added-message"
  );
  addedMessage.classList.add("show");

  setTimeout(() => {
    addedMessage.classList.remove("show");
  }, 2000);
}

/**
 * Generates a product description based on the product data
 */
function generateProductDescription(product) {
  // Here we would normally use product.description, but since it doesn't exist,
  // we'll generate one based on the product name and type
  const name = product.name.toLowerCase();
  let description = "";

  if (product.type === "clothing") {
    description = `
      <p>Elevate your wardrobe with our premium ${name}. Crafted from high-quality materials for comfort and durability, this piece features a modern design that effortlessly blends style and function.</p>
      <p>Perfect for everyday wear or special occasions, it's designed to complement your existing wardrobe while adding a touch of sophistication.</p>
    `;
  } else if (
    name.includes("kitchen") ||
    name.includes("towel") ||
    name.includes("duvet") ||
    name.includes("curtain")
  ) {
    description = `
      <p>Transform your home with our exquisite ${name}. Designed with both aesthetics and functionality in mind, this product brings elegance and practicality to your living space.</p>
      <p>Made from carefully selected materials, it combines durability with luxury for a truly exceptional addition to your home.</p>
    `;
  } else {
    description = `
      <p>Discover the exceptional quality of our ${name}. This premium product exemplifies our commitment to craftsmanship and attention to detail.</p>
      <p>With its versatile design and superior construction, it's a perfect addition to enhance your lifestyle.</p>
    `;
  }

  return description;
}

/**
 * Generates product features based on the product data
 */
function generateProductFeatures(product) {
  // Generate features based on product keywords and type
  let features = '<ul class="product-detail-features-list">';

  if (product.keywords) {
    if (product.keywords.includes("apparel") || product.type === "clothing") {
      features +=
        "<li>Premium quality materials for comfort and durability</li>";
      features += "<li>Thoughtfully designed for a perfect fit</li>";
      features += "<li>Easy care instructions for long-lasting wear</li>";
    }

    if (
      product.keywords.includes("kitchen") ||
      product.keywords.includes("home")
    ) {
      features += "<li>Made with high-quality, durable materials</li>";
      features += "<li>Elegant design complements any decor</li>";
      features += "<li>Easy to clean and maintain</li>";
    }

    if (product.keywords.includes("accessories")) {
      features += "<li>Carefully crafted with attention to detail</li>";
      features += "<li>Versatile design for multiple occasions</li>";
      features += "<li>Makes an ideal gift</li>";
    }
  }

  // Add some generic features if the list is empty
  if (features === '<ul class="product-detail-features-list">') {
    features += "<li>Exclusive TnsH design</li>";
    features += "<li>Premium quality craftsmanship</li>";
    features += "<li>Carefully selected materials</li>";
  }

  features += "</ul>";
  return features;
}

/**
 * Generates a list of keywords/tags for the product
 */
function generateKeywords(product) {
  if (!product.keywords || product.keywords.length === 0) {
    return "";
  }

  let keywordsHTML = '<div class="product-detail-tags">';
  product.keywords.forEach((keyword) => {
    keywordsHTML += `<span class="product-detail-tag">${keyword}</span>`;
  });
  keywordsHTML += "</div>";

  return keywordsHTML;
}
