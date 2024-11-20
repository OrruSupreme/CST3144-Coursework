new Vue({
    el:'#app',
    data:{
        courses: [
            {id: 1, subject: "Biology", location: "London", price: 80, space: 0, },
            {id: 2, subject: "Math 101", location: "Atlanta", price: 200, space: 5,img:'/Images/math-regular-24.png'},
            {id: 3, subject: "English", location: "Utah", price: 300, space: 5},
            {id: 4, subject: "Physics", location: "California", price: 450, space: 5},
            {id: 5, subject: "French", location: "Los Angeles", price: 55, space: 5},
            {id: 6, subject: "Chemistry", location: "Las Vegas", price: 100, space: 5},
            {id: 7, subject: "Agriculture", location: "Houston", price: 120, space: 5},
            {id: 8, subject: "Finance", location: "New York", price: 180, space: 5},
            {id: 9, subject: "Computer Studies", location: "Mauritius", price: 200, space: 5},
            {id: 10, subject: "Cyber Security", location: "London", price: 80, space: 5},
        ],
        cart:[],
        name_:'',
        phone:'',
        validName: false,
        validPhone: false
    },
    created() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
        this.updateCourseSpace();
    },
    computed:{
        totalPrice () {
            return this.cart.reduce((sum, item) => sum +item.price, 0);
        }
    },
    methods:{
        addToCart(param) {
            if (param.space > 0) {
                param.space -= 1;
                const inCart = this.cart.find(item => item.id === param.id);
                if (inCart) {
                    inCart.quantity += 1;
                } else {
                    this.cart.push({ ...param, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(this.cart));
                alert(" added to cart!");
            }
        },
        checkout(param) {
            window.location= 'checkout.html';
            console.log(cart)
        },
        removeItemFromCart(param) {
            const inCart = this.cart.find(item => item.id === param.id);
            if (inCart) {
                inCart.quantity = inCart.quantity - 1;

                var originalCourse = this.courses.find(c => c.id === param.id);
                originalCourse += 1;

                if (inCart.quantity === 0) {
                    this.cart = this.cart.filter(item => item.id !== param.id);
                }
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        },

        updateCourseSpace() {
            this.cart.forEach(cartItem => {
                const course = this.courses.find(c => c.id === cartItem.id)
                if (course) {
                    course.space -= cartItem.quantity;
                }
            });
        },
       
        validateName() {
            const nameRegx = /^[a-zA-Z\s]+$/;
            this.validName = nameRegx.test(this.name)
        },
        validatePhone() {
            const phoneRegx = /^[0-9]+$/;
            this.validPhone = phoneRegx.test(this.phone)
        },
        completeOrder () {
            alert(`Order completed for ${name_.value}`)
            // this.cart=[];
            console.log(name_, phone.value);

        },

    }
})

