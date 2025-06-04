# TnsH E-Commerce Website

A modern, responsive e-commerce website for a premium fashion and lifestyle brand with a clean, minimalist design aesthetic.

![TnsH Website](images/products/men-navigator-sunglasses-brown.jpg)

## Overview

TnsH is a premium fashion and lifestyle brand website built with HTML, CSS, and JavaScript. The website features a responsive design, product carousels, collections showcase, shopping cart functionality, and an order management system.

## Features

- **Responsive Design**: Fully responsive across all devices with a mobile-friendly navigation menu
- **Product Carousels**: Interactive sliding carousels showcasing trending products
- **Collections Showcase**: Beautifully organized product collections (Summer Essentials, Spring Essentials, etc.)
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Checkout System**: Streamlined checkout process
- **Order Management**: View and track your orders
- **Modern UI Components**: Hero sections, testimonials, back-to-top button, and more

## Pages

- **Home (index.html)**: Featured products, trending items, and collections
- **Our Story**: Brand information and story
- **Collections**: Product categories and collections
- **Sale**: Discounted items
- **Orders**: Order history and tracking
- **Checkout**: Shopping cart and checkout process

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome
- **Fonts**: Roboto, Playfair Display, Didot
- **Testing**: Simple test framework and Jasmine

## Project Structure

```
├── index.html              # Main homepage
├── checkout.html           # Checkout page
├── orders.html             # Orders page
├── our-collections.html    # Collections page
├── our-story.html          # Brand story page
├── sale.html               # Sales page
├── backend/                # Backend data
│   └── products.json       # Product database
├── data/                   # JavaScript data modules
│   ├── cart.js             # Cart functionality
│   ├── products.js         # Product data handling
│   └── deliveryOption.js   # Delivery options
├── images/                 # Images and assets
├── scripts/                # JavaScript files
│   ├── amazon.js           # Main script
│   ├── carousel.js         # Product carousel functionality
│   ├── checkout.js         # Checkout logic
│   ├── mobile-nav.js       # Mobile navigation
│   └── ...
├── styles/                 # CSS stylesheets
│   ├── pages/              # Page-specific styles
│   └── shared/             # Shared styles
└── tests/                  # Test files
```

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/TnsH-ecommerce.git
cd TnsH-ecommerce
```

2. Open the project in your preferred code editor.

3. To view the website, open `index.html` in a web browser or use a local development server:

```bash
# Using Python's built-in server
python -m http.server

# Or if you have Node.js installed
npx serve
```

4. The website should now be accessible at `http://localhost:8000` (or the port shown in your terminal).

## Development

The project is structured with clear separation between HTML structure, CSS styling, and JavaScript functionality:

- HTML files define the structure and content
- CSS files in the `styles` directory handle appearance
- JavaScript files in the `scripts` directory implement interactive features

### Adding New Products

To add new products:

1. Update the product data in `backend/products.json`
2. Add product images to the `images/products` directory

## Testing

The project includes both simple tests and Jasmine-based tests:

- Simple tests: Open `tests/test-runner.html` in a browser
- Jasmine tests: Open `tests-jasmine/tests.html` in a browser

## Browser Compatibility

The website is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

© 2025 TnsH. All rights reserved.

---

\*Created with ❤️ by Tanish
