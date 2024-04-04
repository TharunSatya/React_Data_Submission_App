import React from "react";
import { useState } from "react";
import "./Homepage.css";
import Addschemapopup from "./Addschemapopup";
const Homepage = () => {
  //showPopup is used to toggle the popup
  const [showPopup, setShowPopup] = useState(false);
  // function to show popup
  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <div className={showPopup ? "home-container-row" : "home-container"}>
      <div className="main-container">
        <nav className="nav-bar">
          <p>Home Page</p>
        </nav>

        <div className="content">
          <button className="save-segment-btn" onClick={handleClick}>
            Save Content
          </button>
        </div>
      </div>

      {showPopup && <Addschemapopup setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Homepage;
