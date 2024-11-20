new Vue({
    el:'#app',
    data:{
        courses: [
            {id: 1, subject: "Biology", location: "London", price: 80, space: 0, img:'/Images/math-regular-24.png'},
            {id: 2, subject: "Math 101", location: "Atlanta", price: 200, space: 5},
            {id: 3, subject: "English", location: "Utah", price: 300, space: 5},
            {id: 4, subject: "Physics", location: "California", price: 450, space: 5},
            {id: 5, subject: "French", location: "Los Angeles", price: 55, space: 5},
            {id: 6, subject: "Chemistry", location: "Las Vegas", price: 100, space: 5},
            {id: 7, subject: "Agriculture", location: "Houston", price: 120, space: 5},
            {id: 8, subject: "Finance", location: "New York", price: 180, space: 5},
            {id: 9, subject: "Computer Studies", location: "Mauritius", price: 200, space: 5},
            {id: 10, subject: "Cyber Security", location: "London", price: 80, space: 5},
        ],
        cart:[]
    },
    created() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
    },
    computed:{
        totalPrice () {
            return this.cart.reduce((sum, item) => sum +item.price, 0);
        }
    },
    methods:{
        addTocart(param) {
            this.cart.push(param);
            localStorage.setItem('cart', JSON.stringify(this.cart)); 
            alert('Added to Cart');
        },
        checkout(param) {
            window.location= 'checkout.html';
            console.log(cart)
        },
        removeItemFromCart(param) {
            this.cart= this.cart.filter (item => item.id !== param.id);
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    }
})

