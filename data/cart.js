export let cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
    });
  }
}

export function removefromcart(productsId) {
  const newcart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== productsId) {
      newcart.push(cartItem);
    }
  });
  cart = newcart;
}
