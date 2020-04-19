var product = "Socks";

// create a new Vue instance

var app = new Vue({
  // initialization options go here
  el: "#app", // connect to the #app element on our DOM
  data: {
    brand: 'Millionairess',
    product: "Socks",
    description:
      "So luxurious, so fashionable. Go ahead and buy them - it's OK to be extra.",
    link: "https://hotsocks.biz",
    inventory: 5,
    details: [
      "80% cotton",
      "20% polyester",
      "Fun for all ages",
      "Gender neutral",
    ],
    cart: 0,
    selectedVariant: 0,
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/images/vmSocks-green-onWhite.jpg",
        variantQuantity: 10,
        onSale: true
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/images/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0,
        onSale: false
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
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
  // results of a computed property are CACHED, which is what makes this more efficient than using a method when the operation in the computed property is expensive
  computed: {
    title: function() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity > 0;
    },
    onSale() {
      return this.variants[this.selectedVariant].onSale ? `These incredibly dope ${this.brand} ${this.product} are currently on sale!` : null
  
    }
  },
});
