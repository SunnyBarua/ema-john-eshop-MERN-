import React from "react";

function Cart(props) {
  const cart = props.cart;
  //   const total = cart.reduce((total, pd) => total + pd.price, 0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity;
  }
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 3.77;
  } else if (total > 0) {
    shipping = 12.99;
  }
  const tax = total / 10;
  const grandTotal = (total + shipping + Number(tax)).toFixed(2);

  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };
  return (
    <div>
      <h4 className="text-primary">Order Summary</h4>
      <p>Items Ordered:{cart.length}</p>
      <p>Product Price:{formatNumber(total)}</p>
      <p>
        <small>Shipping Cost:{shipping}</small>
      </p>
      <p>
        <small>Tax + VAT:{formatNumber(tax)}</small>
      </p>
      <p>Total Price: {grandTotal}</p>
      <br />
      {props.children}
    </div>
  );
}

export default Cart;