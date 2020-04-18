var product = "Socks";

// create a new Vue instance

var app = new Vue({
  // initialization options go here
  el: "#app", // connect to the #app element on our DOM
  data: {
    title: "Socks",
    description:
      "So luxurious, so fashionable. Go ahead and buy them - it's OK to be extra.",
    link: "https://hotsocks.biz",
    inventory: 29,
    onSale: false,
    details: [
      "80% cotton",
      "20% polyester",
      "Fun for all ages",
      "Gender neutral",
    ],
    cart: 0,
    image: "",
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/images/vmSocks-green-onWhite.jpg",
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/images/vmSocks-blue-onWhite.jpg",
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
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
      } else {
        return;
      }
    },
    updateProduct(prop) {
      this.image = prop;
    },
  },
});
