import './App.css';
import React from 'react';
import data from "./data.json";
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component{
constructor(){
  super();
  this.state = {
    products: data.products,
    size:"",
    sort: "",
    cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):
    [], //by default there is no items in the cart
  };
}

createOrder =(order) => {
  alert("need to save" + order.name);
}

removeFromCart = (product) => {
  const cartItems = this.state.cartItems.slice();
  this.setState({cartItems: cartItems.filter((x)=> x._id !== product._id), 
  });//we get rid of current product that user selected to remove})

  localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x)=> x._id !== product._id))); //after filtering we set filtered data inside the state

  
}



addToCart = (product) => {
  const cartItems  = this.state.cartItems.slice();
  let alreadyInCart = false;
  cartItems.forEach(item =>{

    if(item._id === product._id){ //if item is already in cart just increase the amount 
      item.count++;
      alreadyInCart = true;
    }
  });
  if(!alreadyInCart){
    cartItems.push({...product, count: 1}) //add instant of product into cart
  }
this.setState({cartItems});

//use local storage to keep persistent
localStorage.setItem("cartItems", JSON.stringify(cartItems));


}

sortProducts = (event) =>{
  const sort = event.target.value;
  //implement we use event
  console.log(event.target.value);
  this.setState((state) => ({
    sort: sort,
    products: this.state.products.slice().sort((a,b) =>( 
      sort === "lowest"? 
      ((a.price > b.prize )? 1: -1):
      sort === "highest"?
      ((a.price < b.prize)? 1: -1):
     (a._id > b._id)? 1:-1),
    )
    
  }));

};

//pecome method style
filterProducts = (event) => {
  //implement
  console.log(event.target.value);

  if(event.target.value=== ""){
this.setState({size: event.target.value, products: data.products});}
  else{
    this.setState({
    size: event.target.value,
    products: data.products.filter((product) => product.availableSizes.indexOf(event.target.value)>=0), //ensures size exists in array
});
}};

  render(){
  return (
    <div className = "grid-container">
      <header>
        <a href = "/"> React Shopping Cart</a>
        </header>

        <main>
          <div className = "content">
            <div className = "main">
              <Filter count = {this.state.products.length}
              size= {this.state.size}
              sort = {this.state.sort}
              filterProducts = {this.filterProducts}
              sortProducts  = {this.sortProducts}
              > 
              
              </Filter>
              <Products products={this.state.products} addToCart = {this.addToCart}/>
          </div>
          <div className="sidebar">
            <Cart cartItems = {this.state.cartItems} 
            removeFromCart = {this.removeFromCart}
            createOrder= {this.createOrder}
            />
                    </div>
        </div>

        </main>

<footer>
  All rights reserved.
</footer>
    
    </div>
  );
}
}

export default App;
