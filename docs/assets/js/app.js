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
        search_term: '',
        isCartEmpty: false
    },

    created() {
        const storedCart = localStorage.getItem('cart');
        this.cart = storedCart ? JSON.parse(storedCart) : [];
        this.isCartEmpty = this.cart.length === 0;
        this.updateCourseSpace();
    },
    watch: {
        cart: {
            handler(newValue) {
                this.isCartEmpty = newValue.length === 0;
                localStorage.setItem('cart', JSON.stringify(newValue));
            },
            deep: true,
        },
    },
    computed: {
        sortedCourses() {
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
        checkout() {
            let payload = JSON.stringify({
                name: this.name_,
                phone: this.phone,
                items: this.cart.map((item) => {
                    return {
                        id: item.id,
                        quantity: item.quantity
                    }
                })
            })
            console.log(payload)

            fetch('https://cst3144-cw-backend-k0iq.onrender.com/order/', {
                method: 'post', headers: {
                    'Content-Type': 'application/json',
                }, body: payload
            })
                .then(res => res.json())
                .then((data) => {
                   this.cart=[]
                   localStorage.setItem('cart', JSON.stringify(this.cart));
                    return data


                })
                .catch(err => { console.log(err) })
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
        collectContactInfoOnCheckout(param) {
            window.location = 'checkout.html';

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
            // console.log(name_, phone.value);

        },
        search() {
            if (this.search_term.length > 0 && this.search_term.trim()!== '' ) {
                fetch(`https://cst3144-cw-backend-k0iq.onrender.com/search?search_term=${this.search_term}`)
                .then(res => res.json())
                .then((data) => this.courses = data)
                .catch(err => { console.log(err) })
            }
            
        }

    },
    mounted() {
        fetch('https://cst3144-cw-backend-k0iq.onrender.com/lessons')
            .then(res => res.json())
            .then((data) => 
                {
                    // this.courses = data
                    this.courses = data.map((course) =>{
                        if (this.cart) {
                            let courseItem= this.cart.find((item)=> item.id===course.id);
                            if (courseItem) {
                                course.space -= courseItem.quantity;
                            }
                            
                        } 
                        return course;
                    })
                    return response;
                })
            .catch(err => { console.log(err) })
    }
})
