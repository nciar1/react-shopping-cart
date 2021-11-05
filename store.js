import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";
import { productsReducer } from './src/reducers/productReducers'; //not a default export .. use  {}

const initialState = {};
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;


const store = createStore(combineReducers({
    products: productsReducer,

}),

intialState,

composeEnhancer(applyMiddleware(thunk)),

//compose all middleware together

);
export default store;