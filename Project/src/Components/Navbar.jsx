import React, { useState } from "react";
import Logo from "../images/game.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "./Navbar.css";
const Navbar = () => {
  const [openlink, setopenlink] = useState(false);
  const toggle = () => {
    setopenlink(!openlink);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openlink ? "open" : "close"}>
        <img src={Logo} alt="logo" />
        <div>
          <b className="title">AWAAZ</b>
        </div>
        <div className="hiddenLinks">
          <Link to="/Home"> Home </Link>
          <Link to="/menu"> Menu </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/Home"> Home </Link>
        <Link to="/menu"> Menu </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <button onClick={toggle}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
