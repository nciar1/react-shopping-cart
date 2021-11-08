import './App.css';
import React from 'react';
import data from "./data.json";
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component{


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
    <Provider store = {store}>
    <div className = "grid-container">
      <header>
        <a href = "/"> React Shopping Cart</a>
        </header>

        <main>
          <div className = "content">
            <div className = "main">
              
              <Products/>
          </div>
          <div className="sidebar">
            <Cart/>
                    </div>
        </div>

        </main>

<footer>
  All rights reserved.
</footer>
    
    </div>
    </Provider>
  );
}
}

export default App;
