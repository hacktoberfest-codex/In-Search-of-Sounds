import React from "react";
import { SuppList } from "../Components/SuppList";
import SuppItem from "../Components/SuppItem";
import "./styles/Supp.css";

function Supp() {
  return (
    <div className="supp">
      <h1 className="suppTitle">Our faciliy</h1>
      <div className="suppList">
        {SuppList.map((suppItem, key) => {
          return (
            <SuppItem
              key={key}
              image={suppItem.image}
              name={suppItem.name}
              price={suppItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Supp;
