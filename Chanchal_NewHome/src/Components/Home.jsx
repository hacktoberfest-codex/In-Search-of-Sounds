import React from "react";
import image from "../images/homepic.png";
import "./styles/Home.css";
const Home = () => {
  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
      }}
    >
      <div className="headerContainer">
        <h1> need help! </h1>
        <p> VOICE FOR LIFE</p>

        <button> CONNECT </button>
      </div>
    </div>
  );
};
export default Home;
