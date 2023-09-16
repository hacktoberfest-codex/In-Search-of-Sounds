import React from "react";

const SuppItem = ({ image, name, price }) => {
  return (
    <div>
      <div className="suppItem">
        <div style={{ backgroundImage: `url(${image})` }}> </div>
        <h1> {name} </h1>
        <p> ${price} </p>
      </div>
    </div>
  );
};

export default SuppItem;
