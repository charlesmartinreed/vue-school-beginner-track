// COMPONENT BEGINS HERE
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">

  <div class="product-image">
    <!-- v-bind creates a bond between data and attribute - it dynamically binds an object to an expression -->
    <!-- v-bind:src is equivalent to shorthand, :src -->
    <img v-bind:src="image" alt="" />
  </div>
  <div class="product-info">
    <!-- value in {{ }} expression pulled from computed proeperty - this changes when the reactive component associated with the data does -->
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <product-details :details=details></product-details>
    <p>{{ premium ? "Premium User" : "Basic User"}}</p>
    <p>{{ shipping }}</p>
    <!-- conditional statements use the v-if, v-else-if, or v-else directive -->

    <button v-on:click="addToCart" 
    :disabled="!inStock" 
    :class="{ disabledButton: !inStock}"
    >Add to Cart</button>
    <button @click="removeFromCart">Remove From Cart</button>
      
    <!-- alternatively, we can use v-show to display elements programmatically; display:none for the element when not set to render with v-show directive -->
    <p v-if="inStock">In Stock!</p>
    <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
    <p :class="{ onSale: onSale}">{{ onSale }}</p>
    
    <a :href="link">More Info</a>

    <!-- for loops in Vue using vue-for -->
  

    <div class="product-sizes" v-for="(size, index) in sizes" key="index">
      {{ size }}
    </div>

    <!-- in the style directive, either camelCasing or kebob casing is valid, as long as the kebob case is in '' -->
    <!-- we can also bind to style objects or pass an array of style objects - :style="[]styleObject, styleObject2" -->
    <div
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{ backgroundColor: variant.variantColor}"
      @mouseover="updateProduct(index)"
    ></div>
  </div>
</div>
  `,
  data() {
    return {
      brand: 'Millionairess',
      product: "Socks",
      description:
        "So luxurious, so fashionable. Go ahead and buy them - it's OK to be extra.",
      link: "https://hotsocks.biz",
      details: [
        "80% cotton",
        "20% polyester",
        "Fun for all ages",
        "Gender neutral",
        "Incredible sex appeal"
      ],
      inventory: 5,
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
      }
    },
    methods: {
    addToCart() {
      this.$emit('add-to-cart', {
        action: 'add',
        id: this.variants[this.selectedVariant].variantId
      })
    },
    removeFromCart() {
      this.$emit('remove-from-cart', {
        action: 'remove',
        id: this.variants[this.selectedVariant].variantId
      })
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
      return this.variants[this.selectedVariant]. onSale ? `These incredibly dope ${this.brand} ${this.product} are currently on sale!` : null
    },
    shipping() {
      return this.premium ? "Free Shipping" : "$3.99 for Shipping"
    }
  },
})

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
    }
  },
  template: `
  <ul>
  <li v-for="(detail, index) in details" key="index">
    {{detail}}
  </li>
</ul>
  `,
})

// create a new Vue instance
var app = new Vue({
  // initialization options go here
   // connect to the #app element on our DOM
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(update) {
      switch (update.action) {
        case 'add':
          this.cart.push(update.id)
          break;
        case 'remove':
          let index = this.cart.indexOf(update.id)
          if (index !== -1 && this.cart.length > 0) {
          this.cart.splice(index, 1)
          }
          break;
        default:
          break;
      }
    }
  }
});