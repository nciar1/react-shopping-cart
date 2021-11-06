import { FETCH_PRODUCTS } from "../types";


export const fetchProducts = () => async(dispatch) => {


   const res = await fetch("/api/products"); //get data from server
   const data = await res.json();     //convert to data to json
   console.log(data);


   dispatch({
       type: FETCH_PRODUCTS,
       payload: data,
   });

};