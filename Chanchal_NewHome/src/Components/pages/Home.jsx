import React from "react";
import image from "./assets/plogo.jpeg";
import "../styles/Home.css";
const Home = () => {
  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
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
