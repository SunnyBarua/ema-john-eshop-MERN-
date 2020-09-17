import React from "react";
import "./Product.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

function Product(props) {
  const { key, name, img, seller, price, stock } = props.product;
  console.log(props.product);

  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product__name">
          <Link to={"/product/" + key} className="manual__link">
            {name}
          </Link>
        </h4>
        <br />
        <p>
          <small>by:{seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock -Order soon</small>
        </p>
        {props.showAddToCart && (
          <button
            className="main__button"
            onClick={() => props.handleAddProduct(props.product)}
          >
            <ShoppingCartIcon />
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
