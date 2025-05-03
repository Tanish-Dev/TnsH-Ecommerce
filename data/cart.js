export const cart = [];

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
