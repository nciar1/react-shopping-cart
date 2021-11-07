import { productsReducer } from "../reducers/productReducers";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";


export const addToCart = (items, products) => (dispatch) =>
{
const cartItems = items.slice(); //makes clone of items
let alreadyExists = false;

cartItems.forEach( x=> {
    if(x._id === product._id){
        alreadyExists = true;
        x.count++;
    }
});

if(!alreadyExists){
    cartItems.push({...product,count: 1}); //count is number of each product in the cart
}
dispatch({
    type: ADD_TO_CART,
    payload: {cartItems}
});
localStorage.setItem("cartItems", JSON.stringify(cartItems));


};


export const removeFromCart = (items, product) => (dispatch) =>{
const cartItems = items.slice().filter(
    x => x._id !== product._id //if item is not equal to product id then itwill be added to items

);
dispatch({type:REMOVE_FROM_CART, 
    payload: {cartItems}});
    localStorage.setItem(JSON.stringify(cartItems));
};