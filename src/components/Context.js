import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Regular 6 Inch Sub-Free savoury danish Veg Combo (15 cm, 6 Inch)",
                "src": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/hfrk8wawzihwfmfoynic",
                "content": "Combo includes two regular 6 veg sub price plus two piece of savoury danish worth Rs 50/- FREE",
                "price": 23,
                "count": 1
            },
            {
                "_id": "2",
                "title": "Veg Signature wrap combo with Sub-Free savoury danish",
                "src": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/wtskcxwuaegiomjplx2i",
                "content": "Combo includes two veg signature wrap price plus two piece of savoury danish worth Rs 50/- FREE",
                "price": 19,
                "count": 1
            },
            {
                "_id": "3",
                "title": "Drink With Non Veg Sub Combos (15 cm, 6 Inch)",
                "src": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/ax0vuaw8pb5bgtt9ayh1",
                "content": "Non Veg Combos includes one 6 sub along with Pepsi Pet Bottle (500 ml).",
                "price": 50,
                "count": 1
            },
            {
                "_id": "4",
                "title": "Snack Wrap With Veg Subs Combos (15 cm, 6 Inch)",
                "src": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/dbhdwrh4opaovxwd0swm",
                "content": "Veg Combos includes one 6 sub along with 1 veg snack wrap",
                "price": 15,
                "count": 1
            }
            
           
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


