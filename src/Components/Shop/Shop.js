import React, { useState, useEffect } from "react";

import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("https://ema-john-ecommerce.herokuapp.com")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    if (products.length > 0) {
      const previousCart = productKeys.map((existingKey) => {
        const product = products.find((pd) => pd.key === existingKey);
        product.quantity = savedCart[existingKey];
        return product;
      });
      setCart(previousCart);
    }
  }, [products]);
  const handleAddProduct = (product) => {
    const productToBeAdded = product.key;

    const sameProduct = cart.find((pd) => pd.key === productToBeAdded);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== productToBeAdded);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="shop">
      <div className="product__container">
        <ul>
          {products.map((item) => (
            <Product
              key={item.key}
              showAddToCart={true}
              handleAddProduct={handleAddProduct}
              product={item}
            />
          ))}
        </ul>
      </div>
      <div className="cart__container">
        <Cart cart={cart}>
          <Link to="/review" className="button__link">
            <button className="main__button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
}

export default Shop;
