var product = "Socks";

// create a new Vue instance

var app = new Vue({
  // initialization options go here
  el: "#app", // connect to the #app element on our DOM
  data: {
    title: "Socks",
    description:
      "So luxurious, so fashionable. Go ahead and buy them - it's OK to be extra.",
    image: "./assets/images/vmSocks-green-onWhite.jpg",
    link: "https://hotsocks.biz",
    inventory: 29,
    onSale: false,
    details: [
      "80% cotton",
      "20% polyester",
      "Fun for all ages",
      "Gender neutral",
    ],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
      },
      {
        variantId: 2235,
        variantColor: "blue",
      },
    ],
    sizes: [
      "extra small",
      "small",
      "medium",
      "large",
      "extra large",
      "extra extra large",
    ],
  },
});
