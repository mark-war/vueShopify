app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/ 
    `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img 
                    :src="image"
                    :class="[!inStock ? 'out-of-stock-img' : '']"/>
            </div>
            <div class="product-info">
                <h1>{{ productName }}</h1>
                <p v-if="inStock">In Stock</p>
                <!-- <p v-else-if="inventory <= 10 && inventory > 0">Few Stocks Left!</p> -->
                <p v-else>Out of Stock</p>
                <p v-show="onSale">On Sale</p>
                <p>Shipping: {{ shipping }}</p>

                <product-details :details="details"></product-details>

                <p>Colors Available:</p>
                <div 
                    v-for="(variant, index) in variants" 
                    :key="variant.id" 
                    @mouseover="updateProduct(index)"
                    class="color-circle"
                    :style="{ backgroundColor: variant.color }"></div>
                
                <br/>
                
                <button
                    class="button"
                    :class="{ disabledButton: !inStock }"
                    :disabled="!inStock"
                    @click="addToCart">Add to Cart</button>
                <button 
                    class="button"
                    :class="{ disabledButton: !inStock }"
                    :disabled="!inStock"
                    @click="removeFromCart">Remove Item</button>
            </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>    
    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            onSale: false,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 10},
                {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0}
            ],
            reviews: [],
            tabs: ['review-form', 'review-list'],
            activeTab: 'reviewForm'
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)       
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        productName() {
            return this.brand + ' ' + this.product + ' ' + (this.onSale ? 'is on sale' : '')
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return '$2.99'
        }
    }
})