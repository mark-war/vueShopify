const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true
        }
    },
    methods: {
        updateCart(id, isAdd) {
            if(isAdd) {
                this.cart.push(id)
            } else {
                if(this.cart.length > 0) {
                    this.cart.pop()
                }
            }
            
        }
    }
})