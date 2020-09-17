import React, { useEffect, useState } from "react";

import Product from "../Product/Product";
import { useParams } from "react-router-dom";
function ProductDetail() {
  const { productKey } = useParams();

  console.log(productKey);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://ema-john-ecommerce.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);
  return (
    <div>
      <Product product={product} showAddToCart={false} />
    </div>
  );
}

export default ProductDetail;
