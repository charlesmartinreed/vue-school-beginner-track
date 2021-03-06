// THIS EVENT BUS WILL LBE USED TO TRANSPORT DATA BETWEEN MULTIPLE LEVELS OF COMPONENTS; PARENTS, CHILDREN, GRANDCHILDREN...
var eventBus = new Vue();

// COMPONENT BEGINS HERE
Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
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

    <info-tabs :shipping="shipping" :details="details"></info-tabs>

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
  

    <div class="product-sizes" v-for="(size, index) in sizes" :key="index">
      {{ size }}
    </div>

    <div
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{ backgroundColor: variant.variantColor}"
      @mouseover="updateProduct(index)"
    ></div>
    </div>

  <product-tabs :reviews="reviews" :details="details"></product-tabs>

</div>
  `,
  data() {
    return {
      brand: "Millionairess",
      product: "Socks",
      description:
        "So luxurious, so fashionable. Go ahead and buy them - it's OK to be extra.",
      link: "https://hotsocks.biz",
      details: [
        "80% cotton",
        "20% polyester",
        "Fun for all ages",
        "Gender neutral",
        "Incredible sex appeal",
      ],
      inventory: 5,
      selectedVariant: 0,
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/images/vmSocks-green-onWhite.jpg",
          variantQuantity: 10,
          onSale: true,
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/images/vmSocks-blue-onWhite.jpg",
          variantQuantity: 0,
          onSale: false,
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
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", {
        action: "add",
        id: this.variants[this.selectedVariant].variantId,
      });
    },
    removeFromCart() {
      this.$emit("remove-from-cart", {
        action: "remove",
        id: this.variants[this.selectedVariant].variantId,
      });
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
  // results of a computed property are CACHED, which is what makes this more efficient than using a method when the operation in the computed property is expensive
  computed: {
    title: function () {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity > 0;
    },
    onSale() {
      return this.variants[this.selectedVariant].onSale
        ? `These incredibly dope ${this.brand} ${this.product} are currently on sale!`
        : null;
    },
    shipping() {
      return this.premium ? "Free Shipping" : "$3.99 for Shipping";
    },
  },
  mounted() {
    // lifecycle hook for code that runs when the component mounts
    eventBus.$on("review-submitted", (productReview) => {
      this.reviews.push(productReview);
    });
  },
});

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
  <ul>
  <li v-for="(detail, index) in details" :key="index">
    {{detail}}
  </li>
</ul>
  `,
});

// v-model is used for BIDIRECTIONAL DATA BINDING
Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

  <p v-if="errors.length">
  <strong>Please correct the following error(s):</strong>
    <ul>
      <li v-for="(error, index) in errors">
        {{error}}
      </li>
    </ul>
  </p>

  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="Your name">
  </p>

  <p>
  <label for="review">Review:</label>
  </p>

  <textarea id="review" v-model="review"></textarea>

  <p>Would you recommend this product?</p>
    <label for="recommend_yes">Yes
    <input 
    type="radio" 
    name="recommend" 
    id="recommend_yes" 
    value="Yes" 
    v-model="recommend"
    />
    </label>
    
    <label for="recommend_no">No
    <input 
    type="radio" 
    name="recommend" 
    id="recommend_no" 
    value="No" 
    v-model="recommend"
    />
    </label>
    

  </input>

  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option value="5">5</option>
      <option value="4">4</option>
      <option value="3" selected>3</option>
      <option value="2">2</option>
      <option value="1">1</option>
    </select>
  </p>

  <p>
    <input type="submit" value="Submit">
  </p>
</p>
</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      let { name, review, rating, recommend } = this;

      if (name && review && rating && recommend) {
        let productReview = {
          name,
          review,
          rating,
          recommend,
        };

        eventBus.$emit("review-submitted", productReview);
        console.log(productReview);

        // reset the values after submitting
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        // add a new error to errors
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
        if (!this.recommend) this.errors.push("Recommendation required");

        setTimeout(() => {
          this.errors = [];
        }, 5000);
      }
    },
  },
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>

      <span 
      class="tab"
      :class="{ activeTab: selectedTab === tab}"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="selectedTab = tab"
      >
      {{ tab }}
      </span>

    <div v-show="selectedTab === 'Reviews'">
    <p v-if="reviews.length === 0">There are no reviews yet.</p>
    
    <ul v-else>
      <li 
      v-for="(review, index) in reviews"
      :key="index">
      <p>{{ review.name }}</p>
      <p>{{ review.rating }}</p>
      <p>{{ review.review }}</p>
      <p>Recommended?: {{ review.recommend }}</p>
      </li>
     </ul>
    </div>

    <product-review v-show="selectedTab === 'Make a Review'"></product-review>

</div>

  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
    };
  },
});

Vue.component("info-tabs", {
  props: {
    shipping: {
      type: String,
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
  <div>
    <ul>
      <span 
      class="tabs"
      :class="{ activeTab : selectedTab === tab}"
      v-for="(tab, index) in tabs"
      @click="selectedTab = tab"
      :key="index"
      >
        {{tab}}
      </span>
    </ul>

    <div v-show="selectedTab === 'Shipping'">
      <strong>{{shipping}}</strong>
    </div>

    <div v-show="selectedTab === 'Details'">
      <ul>
        <li v-for="detail in details">
          <strong>{{detail}}</strong>
        </li>
      </ul>
    </div>

  </div>
  `,
  data() {
    return {
      tabs: ["Shipping", "Details"],
      selectedTab: "Shipping",
    };
  },
});

// create a new Vue instance
var app = new Vue({
  // initialization options go here
  // connect to the #app element on our DOM
  el: "#app",
  data: {
    premium: false,
    cart: [],
  },
  methods: {
    updateCart(update) {
      switch (update.action) {
        case "add":
          this.cart.push(update.id);
          break;
        case "remove":
          let index = this.cart.indexOf(update.id);
          if (index !== -1 && this.cart.length > 0) {
            this.cart.splice(index, 1);
          }
          break;
        default:
          break;
      }
    },
  },
});
