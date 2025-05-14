// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileCloseButton = document.querySelector(".mobile-close-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileSearchInput = document.querySelector(".mobile-search-input");
  const desktopSearchInput = document.querySelector(".search-bar");

  // Toggle mobile menu
  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    mobileMenuOverlay.classList.toggle("active");

    // Focus on search input when menu is opened
    if (mobileMenu.classList.contains("active")) {
      // Synchronize mobile search input with desktop search input
      if (desktopSearchInput && desktopSearchInput.value) {
        mobileSearchInput.value = desktopSearchInput.value;
      }
      mobileSearchInput.focus();
    }
  });

  // Close mobile menu when clicking close button
  mobileCloseButton.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
  });

  // Close mobile menu when clicking outside
  mobileMenuOverlay.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
  });

  // Handle mobile search
  mobileSearchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      // Implement search functionality - currently logging to console
      console.log("Mobile search for:", mobileSearchInput.value);

      // In a real application, you would likely redirect to a search results page
      // window.location.href = `search-results.html?query=${encodeURIComponent(mobileSearchInput.value)}`;

      // Synchronize with desktop search
      if (desktopSearchInput) {
        desktopSearchInput.value = mobileSearchInput.value;
      }

      // Close the menu after search
      mobileMenu.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
    }
  });

  // Synchronize desktop search with mobile search
  if (desktopSearchInput) {
    desktopSearchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        console.log("Desktop search for:", desktopSearchInput.value);
        // Synchronize with mobile search
        mobileSearchInput.value = desktopSearchInput.value;
      }
    });
  }

  // Handle resize events to reset menu state when resizing above breakpoint
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1240) {
      mobileMenu.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
    }
  });
});
