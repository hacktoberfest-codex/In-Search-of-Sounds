import React from "react";
import image from "../images/banner.png";
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
        <p> BLOOD FOR LIFE</p>

        <button> ORDER NOW </button>
      </div>
    </div>
  );
};
export default Home;
