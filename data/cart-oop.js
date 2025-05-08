import { addtocart } from "./cart.js";

function Cart(localStoragekey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      cart.cartItems = JSON.parse(localStorage.getItem(localStoragekey));
      if (!this.cartItems) {
        this.cartItems = [
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
    },
    savetostorage() {
      localStorage.setItem(localStoragekey, JSON.stringify(this.cartItems));
    },
    addtocart(productsId) {
      let matchingitem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.id === productsId) {
          matchingitem = cartItem;
        }
      });
      if (matchingitem) {
        matchingitem.quantity++;
        console.log("Item already in cart, quantity updated.");
      } else {
        console.log("Item not in cart, adding new item.");
        this.cartItems.push({
          id: productsId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      this.savetostorage();
    },
    removefromcart(productsId) {
      const newcart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.id !== productsId) {
          newcart.push(cartItem);
        }
      });
      this.cartItems = newcart;
      this.savetostorage();
    },
    updatedeliveryoption(productsId, deliveryOptionId) {
      let matchingitem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.id === productsId) {
          matchingitem = cartItem;
        }
      });
      matchingitem.deliveryOptionId = deliveryOptionId;
      this.savetostorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const Businesscart = Cart("cart-business");

Businesscart.loadFromStorage();
cart.loadFromStorage();

console.log(cart);
console.log(Businesscart);
