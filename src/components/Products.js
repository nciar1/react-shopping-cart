import React, { Component } from 'react';
import formatCurrency from '../util';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {fetchProducts} from '../actions/productActions';


class Products extends Component {
    constructor(props){
        //initial state of modal
       super(props);
        this.state = {
            product: null, //don't show modal if product does not exist
        }
    };

    componentDidMount(){
        this.props.fetchProducts();
    }

    openModal = (product) => {
        this.setState({product});
    };

    closeModal = () => {
        this.setState({product:null});
    };

    render() {
        const {product} = this.state;
        return (
            <div>
                {!this.props.products ? (<div> Loading... </div>)
                    :
                    (
                    <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className = "product">
                                <a href={"#" + product._id} onClick={() =>this.openModal(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>{product.title}
                                    </p>
                                    </a>
                                    <div className = "product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button onClick={ () => this.props.addToCart(product)} className="button primary">
                                            Add to Cart
                                            </button>
                                            </div>
        
                            </div>
                        </li>
                    ))}
                        </ul>
                    )
        

                }


               
                {product && <Modal isOpen = {true}
                onRequestClose={this.closeModal}>
                    <button className = "close-modal" onClick= {this.closeModal}> x</button>
                    <div className = "product-details">
                        <img src = {product.image} alt = {product.title} />
                        <div className = "product-details-description">
                           <p>
                               <strong> 
                               {product.title}
                               </strong>
                           </p>

                           <p>
                               {product.description}
                           </p>

                           <p>
                               Available sizes: {" "}
                               {product.availableSizes.map(x=> (
                                   <span> 
                                       {" "}
                                       <button className = "button">{x}</button>
                                   </span>
                               ))}
                           </p>
                    
                            </div>
                       {formatCurrency(product.price)}
                    </div>
                    <button className ="button primary" onClick = {() => {
                        this.props.addToCart(product);
                        this.closeModal();

                    }}
                    
                    >Add to Cart</button>

                </Modal>
    }
            </div>
        )
    }
}
export default connect((state) => ({products: state.products.items}),{fetchProducts,})(Products);
//product reducer sets items variable