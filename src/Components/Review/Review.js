import React, { useState, useEffect } from "react";
import "./Review.css";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";

import { Link } from "react-router-dom";
import { useAuth } from "../Login/useAuth";

function Review() {
  const [cart, setCart] = useState([]);

  const auth = useAuth();

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    console.log(productKeys);
    fetch("https://ema-john-ecommerce.herokuapp.com/getProductsByKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        const cartProducts = productKeys.map((key) => {
          const product = data.find((pd) => pd.key === key);
          product.quantity = savedCart[key];
          return product;
        });
        setCart(cartProducts);
      });
  }, []);

  return (
    <div className="review">
      <div className="product__review__container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            product={pd}
            handleRemoveProduct={handleRemoveProduct}
          />
        ))}

        {!cart.length && (
          <h1>
            Your cart is empty. <Link to="/shop">Keep shopping</Link>
          </h1>
        )}
      </div>
      <div className="cart__container">
        <Cart cart={cart}>
          <Link to="/shipment" className="button__link">
            {auth.use ? (
              <button className="main__button">Place Order</button>
            ) : (
              <button className="main__button">Proceed to Checkout</button>
            )}
          </Link>
        </Cart>
      </div>
    </div>
  );
}

export default Review;
