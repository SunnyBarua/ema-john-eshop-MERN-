import React from "react";
import "./ReviewItem.css";

function ReviewItem(props) {
  const { name, quantity, key, price } = props.product;
  return (
    <div className="review__item">
      <div className="product_review__container">
        <h4 className="product__name">{name}</h4>
        <p>Quanity:{quantity}</p>
        <p>
          <small>${price}</small>
        </p>
        <br />
        <button
          className="main__button"
          
          onClick={() => props.handleRemoveProduct(key)}
        >
          Remove{" "}
        </button>
      </div>
    </div>
  );
}

export default ReviewItem;
