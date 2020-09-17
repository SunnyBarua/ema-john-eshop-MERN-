import React from "react";
import fakeData from "../../fakeData";
import "./Inventory.css";

function Inventory() {
  const handleAddInventor = () => {
    const product = fakeData[0];
    fetch("https://ema-john-ecommerce.herokuapp.com/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("post successfully", data);
      });
  };
  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <button onClick={handleAddInventor}>Add Inventor</button>
    </div>
  );
}

export default Inventory;
