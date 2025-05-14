// Quick Shop Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Add quick shop buttons to all product containers once they are loaded
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // Check if product containers were added
        const productContainers =
          document.querySelectorAll(".product-container");

        if (productContainers.length > 0) {
          // Products have been added to the grid
          addQuickShopButtons();
          observer.disconnect(); // Stop observing once we've found products
        }
      }
    });
  });

  // Start observing the products grid
  observer.observe(document.querySelector(".js-products-grid"), {
    childList: true,
    subtree: true,
  });

  function addQuickShopButtons() {
    const productContainers = document.querySelectorAll(".product-container");

    productContainers.forEach((container) => {
      // Get the image container
      const imageContainer = container.querySelector(
        ".product-image-container"
      );

      // Create quick shop button
      const quickShopButton = document.createElement("button");
      quickShopButton.classList.add("quick-shop-button");
      quickShopButton.textContent = "Quick View";

      // Create quick shop overlay
      const quickShopOverlay = document.createElement("div");
      quickShopOverlay.classList.add("quick-shop-overlay");

      // Add elements to the image container
      imageContainer.appendChild(quickShopOverlay);
      imageContainer.appendChild(quickShopButton);

      // Add hover effect to product container
      container.classList.add("has-quick-shop");

      // Add click event to quick shop button
      quickShopButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Get product information
        const productImg = container.querySelector(".product-image").src;
        const productName = container
          .querySelector(".product-name")
          .textContent.trim();
        const productPrice =
          container.querySelector(".product-price").textContent;

        // Create quick shop modal
        showQuickShopModal(productImg, productName, productPrice);
      });
    });
  }

  function showQuickShopModal(image, name, price) {
    // Create modal background
    const modalBackground = document.createElement("div");
    modalBackground.classList.add("quick-shop-modal-background");

    // Create modal container
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("quick-shop-modal");

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("quick-shop-close");
    closeButton.innerHTML = '<i class="fas fa-times"></i>';

    // Create modal content
    modalContainer.innerHTML = `
      <div class="quick-shop-modal-content">
        <div class="quick-shop-modal-image">
          <img src="${image}" alt="${name}">
        </div>
        <div class="quick-shop-modal-info">
          <h3 class="quick-shop-modal-name">${name}</h3>
          <div class="quick-shop-modal-price">${price}</div>
          <div class="quick-shop-modal-description">
            <p>This premium product is made with the highest quality materials to ensure durability and satisfaction.</p>
          </div>
          <div class="quick-shop-modal-quantity">
            <label for="quick-shop-quantity">Quantity:</label>
            <select id="quick-shop-quantity">
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button class="quick-shop-add-to-cart button-secondary">Add to Cart</button>
        </div>
      </div>
    `;

    // Add close button to modal
    modalContainer.appendChild(closeButton);

    // Add modal to document
    modalBackground.appendChild(modalContainer);
    document.body.appendChild(modalBackground);

    // Prevent scrolling on the body
    document.body.style.overflow = "hidden";

    // Animation for modal appearance
    setTimeout(() => {
      modalBackground.classList.add("active");
      modalContainer.classList.add("active");
    }, 10);

    // Add click event to close button
    closeButton.addEventListener("click", closeModal);

    // Add click event to background (close when clicking outside)
    modalBackground.addEventListener("click", function (event) {
      if (event.target === modalBackground) {
        closeModal();
      }
    });

    // Add click event to add to cart button
    const addToCartButton = modalContainer.querySelector(
      ".quick-shop-add-to-cart"
    );
    addToCartButton.addEventListener("click", function () {
      const quantity = document.getElementById("quick-shop-quantity").value;
      alert(`Added ${quantity} ${name} to your cart!`);
      // In a real app, you would call your add to cart function here
      closeModal();
    });

    function closeModal() {
      modalBackground.classList.remove("active");
      modalContainer.classList.remove("active");

      // Remove modal after animation completes
      setTimeout(() => {
        document.body.removeChild(modalBackground);
        document.body.style.overflow = "";
      }, 300);
    }
  }
});
