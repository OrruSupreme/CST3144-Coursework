new Vue({
    el: '#app',
    data: {
        courses: [],
        cart: [],
        sortKey: 'subject',
        sortOrder: 'asc',
        name_: '',
        phone: '',
        validName: false,
        validPhone: false,
        search_term: ''
    },
    created() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
        this.updateCourseSpace();
    },
    computed: {
        sortedCourses() {
            console.log(this.courses)
            let sorted = [...this.courses];

            sorted.sort((a, b) => {
                let modifier = 1;

                if (this.sortOrder === 'desc') {
                    modifier = -1;
                }

                if (this.sortKey === 'price' || this.sortKey === 'space') {
                    return (a[this.sortKey] - b[this.sortKey]) * modifier;
                } else {
                    let aValue = a[this.sortKey];
                    let bValue = b[this.sortKey];
                    if (aValue) aValue = aValue.toLowerCase();
                    if (bValue) bValue = bValue.toLowerCase();
                    if (aValue < bValue) return -1 * modifier;
                    if (aValue > bValue) return 1 * modifier;
                    return 0;
                }
            });
            return sorted;
        },
        totalPrice() {
            return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }
    },
    methods: {
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
            window.location = 'checkout.html';
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
        completeOrder() {
            alert(`Order completed for ${name_.value}`)
            // this.cart=[];
            console.log(name_, phone.value);

        },
        search() {
            if (this.search_term.length > 0 && this.search_term.trim()!== '' ) {
                fetch(`/search?search_term=${this.search_term}`)
                .then(res => res.json())
                .then((data) => this.courses = data)
                .catch(err => { console.log(err) })
            }
            
        }

    },
    mounted() {
        fetch('/courses')
            .then(res => res.json())
            .then((data) => this.courses = data)
            .catch(err => { console.log(err) })
    }
})

