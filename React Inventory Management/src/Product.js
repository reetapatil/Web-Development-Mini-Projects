import React, { Component } from 'react';
import Filters from './Filters';
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

let PRODUCTS = {
    '1': { id: 1, category: 'Footwear', price: '$459.99', name: 'Nike' },
    '2': { id: 2, category: 'Footwear', price: '$400', name: 'Adidas' },
    '3': { id: 3, category: 'Smartwatch', price: '$600', name: 'Apple' },
    '4': { id: 4, category: 'Smartwatch', price: '$300', name: 'Fitbit' },
    '5': { id: 5, category: 'Smartphone', price: '$1,300', name: 'iPhone' },
    '6': { id: 6, category: 'Smartphone', price: '$900', name: 'Pixel' }
};

class Product extends Component {
    constructor(props) {

        super(props);
        this.state = {
            filterText: "",
            products: PRODUCTS
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
        }
        this.setState((prevState) => {
            let products = prevState.products
            products[product.id] = product
            return { products }
        });
    }

    handleDestroy(productId) {
        this.setState((prevState) => {
            let products = prevState.products
            delete products[productId]
            return { products }
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <h1 className="col-md-4">My Inventory </h1> <br />
                <Filters onFilter={this.handleFilter} />
                <ProductTable products={this.state.products} filterText={this.state.filterText} onDestroy={this.handleDestroy} />
                <ProductForm onSave={this.handleSave} />
            </div>
        )
    }
}

export default Product