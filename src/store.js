import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";
import { cartReducer } from './reducers/cartReducer';
import { productsReducer } from './reducers/productReducers'; //not a default export .. use  {}

const initialState = {};

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;


const store = createStore(combineReducers({
    products: productsReducer,
    cart: cartReducer,

}),

    initialState,

composeEnhancer(applyMiddleware(thunk)),

//compose all middleware together

);
export default store;