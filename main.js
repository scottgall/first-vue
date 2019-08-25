

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div>
      <section class="product">

        <div class="product-image">
          <img :src="image" >
        </div>      

        <div claqss="product-info">
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
        </div>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)"
            >
        </div>

        <button v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add to Cart</button>

        <div class="cart">
          <p>Cart({{cart}})</p>
        </div>

      </section>
    </div>
  `,
  data() {
    return  {
        brand: 'Supreme',
        product: `Socks`,
        description: `they're made for walking`,
        selectedVariant: 0,
        details: ["cotton", "polyester", "gender-neutral"],
        variants: [
          {
            variantId: 2234,
            variantColor: "green",
            variantImage: "./assets/vmSocks-green.jpg",
            variantQuantity: 10
          },
          {
            variantId: 6666,
            variantColor: "blue",
            variantImage: "./assets/vmSocks-blue.jpg",
            variantQuantity: 0
          },
        ],
        cart: 0,
      }
    },
    methods: {
      addToCart() {
        this.cart += 1;
      },
      updateProduct(index) {
        this.selectedVariant = index;
      }
    },
    computed: {
      title() {
        return `${this.brand} ${this.product}`;
      },
      image() {
        return this.variants[this.selectedVariant].variantImage
      },
      inStock() {
        return this.variants[this.selectedVariant].variantQuantity
      },
      shipping() {
        if (this.premium) {
          return "Free"
        } 
        return 2.99
      }
    }
  }); 

var app = new Vue({
  el: '.app',
  data: {
    premium: false 
  }
})