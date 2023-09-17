import React from "react";

import "./Experience.css";
const Experience = () => {
  return (
    <div className="experience" id="experience">
      <div className="tile">Experience</div>
      <div className="achievement">
        {/* darkMode */}
        <div className="circle">5+</div>
        <span>gaming </span>
        <span>Experience</span>
      </div>
      <div className="achievement">
        <div className="circle">20+</div>
        <span>interactive </span>
        <span>courses</span>
      </div>
      <div className="achievement">
        <div className="circle">100+</div>
        <span>encouraging </span>
        <span>feedbacks</span>
      </div>
    </div>
  );
};

export default Experience;
