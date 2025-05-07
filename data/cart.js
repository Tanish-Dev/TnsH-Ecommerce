export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

function savetostorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addtocart(productsId) {
  let matchingitem;
  cart.forEach((cartItem) => {
    if (cartItem.id === productsId) {
      matchingitem = cartItem;
    }
  });
  if (matchingitem) {
    matchingitem.quantity++;
    console.log("Item already in cart, quantity updated.");
  } else {
    console.log("Item not in cart, adding new item.");
    cart.push({
      id: productsId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  savetostorage();
}

export function removefromcart(productsId) {
  const newcart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== productsId) {
      newcart.push(cartItem);
    }
  });
  cart = newcart;
  savetostorage();
}

export function updatedeliveryoption(productsId, deliveryOptionId) {
  let matchingitem;
  cart.forEach((cartItem) => {
    if (cartItem.id === productsId) {
      matchingitem = cartItem;
    }
  });
  matchingitem.deliveryOptionId = deliveryOptionId;
  savetostorage();
}
