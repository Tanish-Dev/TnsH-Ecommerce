export const deliveryOption = [
  {
    id: "1",
    deliverydays: "7",
    priceincents: 0,
  },
  {
    id: "2",
    deliverydays: "3",
    priceincents: 499,
  },
  {
    id: "3",
    deliverydays: "1",
    priceincents: 1000,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOptions;

  deliveryOption.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOptions = option;
    }
  });

  return deliveryOptions || deliveryOption[0];
}
