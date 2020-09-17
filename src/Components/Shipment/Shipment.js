import React, { useState } from "react";
import { useForm, onSubmit } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../Login/useAuth";
import {
  getDatabaseCart,
  clearLocalShoppingCart,
} from "../../utilities/databaseManager";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutFrom/CheckoutForm";
function Shipment() {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const auth = useAuth();
  const stripePromise = loadStripe(
    "pk_test_XEg2kRmKDHS2Pe9W8fjilGbX00WH8UE9tK"
  );

  const onSubmit = (data) => {
    setShipInfo(data);
  };
  const handlePlaceOrder = (payment) => {
    const savedCart = getDatabaseCart();
    const orderDatails = {
      email: auth.user.email,
      cart: savedCart,
      shipment: shipInfo,
      payment: payment,
    };
    fetch("http://localhost:5000/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDatails),
    })
      .then((res) => res.json())
      .then((order) => {
        setOrderId(order._id);
        clearLocalShoppingCart();
        // console.log("Order placed", data);
        // alert("Successfully placed your order width order " + order._id);
        // processOrder();
      });
  };

  // watch input value by passing the name of it

  return (
    <div className="shipment">
      <div style={{ display: shipInfo && "none" }} className="form">
        <form className="ship__form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={auth.user.name}
            ref={register({ required: true })}
          />
          {errors.name && <span className="error">Name is required</span>}

          <input
            name="email"
            defaultValue={auth.user.email}
            ref={register({ required: true })}
            placeholder="Email"
          />
          {errors.email && <span className="error">Email is required</span>}

          <input
            name="AddressLine1"
            ref={register({ required: true })}
            placeholder="Address"
          />
          {errors.AddressLine1 && (
            <span className="error">Address is required</span>
          )}

          <input
            name="AddressLine2"
            ref={register}
            placeholder="Address 2 (Optional)"
          />

          <input
            name="city"
            ref={register({ required: true })}
            placeholder="City"
          />
          {errors.city && <span className="error">City is required</span>}

          <input
            name="country"
            ref={register({ required: true })}
            placeholder="Country"
          />
          {errors.country && <span className="error">Country is required</span>}

          <input
            name="zipcode"
            ref={register({ required: true })}
            placeholder="Zip Code"
          />
          {errors.zipcode && (
            <span className="error">Zip Code is required</span>
          )}
          <input type="submit" className="button" />
        </form>
      </div>
      <div
        style={{ display: shipInfo ? "block" : "none" }}
        className="checkout"
      >
        {" "}
        <h3>Paymnet Information</h3>
        <Elements stripe={stripePromise}>
          <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
        </Elements>
        <br />
        {orderId && (
          <div>
            <h3>Thank you for shopping with us</h3>
            <p>Your order id is: {orderId}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shipment;
