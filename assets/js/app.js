new Vue({
    el:'#app',
    data:{
        courses: [
            {id: 1, subject: "Biology", location: "London", price: 80, space: 5},
            {id: 1, subject: "Math 101", location: "Atlanta", price: 200, space: 5},
            {id: 1, subject: "English", location: "Utah", price: 300, space: 5},
            {id: 1, subject: "Physics", location: "California", price: 450, space: 5},
            {id: 1, subject: "French", location: "Los Angeles", price: 55, space: 5},
            {id: 1, subject: "Chemistry", location: "Las Vegas", price: 100, space: 5},
            {id: 1, subject: "Agriculture", location: "Houston", price: 120, space: 5},
            {id: 1, subject: "Finance", location: "New York", price: 180, space: 5},
            {id: 1, subject: "Computer Studies", location: "Mauritius", price: 200, space: 5},
            {id: 1, subject: "Cyber Security", location: "London", price: 80, space: 5},
        ],
        cart:[5]
    },
    methods:{
        addTocart(param) {
            this.cart.push(param);
            alert('Added to Cart');
        },
        checkOut(cart) {
            console.log()
        },
        removeItemFromCart(param) {
            this.cart= this.cart.filter (item => item.id !== param.id);
        }
    }
})