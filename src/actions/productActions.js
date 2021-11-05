import { FETCH_PRODUCTS } from "../types";


export const fetchProducts = () => async(dispatch) => {

    //get data from server

   const res = await fetch("/api/products");

   dispatch({
       type: FETCH_PRODUCTS,
       payload: res.data,
   }

   )

}