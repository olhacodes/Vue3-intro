app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `      
      <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :class="{ 'out-of-stock-img': !inStock }" v-bind:src="image">
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ sale }}</p>
            <a :href="url" target="_blank">Made by Vue Mastery</a>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else="inStock">Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div class="color-circle" v-for="(variant, index) in variants" :key="variant.id" :style="{backgroundColor: variant.color}" @mouseover="updateVariant(index)"></div>
            <button class="button" v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to Cart</button>
            <button class="button" @click="removeFromCart">Remove Item</button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>
    `,
  data() {
    return {
      product: 'Socks',
      selectedVariant: 0,
      url: 'https://www.vuemastery.com/',
      inventory: 8,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        {
          id: 2124,
          color: 'green',
          image: './assets/images/socks_green.jpg',
          quantity: 50,
          onSale: true,
        },
        {
          id: 2125,
          color: 'blue',
          image: './assets/images/socks_blue.jpg',
          quantity: 0,
          onSale: false,
        },
      ],
      brand: 'Vue Mastery',
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit('remove-from-cart');
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    sale() {
      if (this.variants[this.selectedVariant].onSale) {
        return this.brand + ' ' + this.product + ' are on sale!';
      }
    },
    shipping() {
      return this.premium ? 'FREE' : '$2.99';
    },
  },
});
