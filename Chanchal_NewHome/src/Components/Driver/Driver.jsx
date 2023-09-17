import React from "react";
import styles from "./Driver.module.css";
import Bee from "./boy.png";

const Driver = () => {
  return (
    <div className={styles.driver}>
      <div className={styles.left}>
        <img src={Bee} alt="/" />
      </div>
      <div>
        <h2>
          Find the perfect test <span>to try before you decide</span>
        </h2>
        <p>
          Using the power of her voice, she inspired positive change and
          uplifted countless lives in her community.
        </p>
        <p>
          His impassioned speech rallied people together, harnessing the
          strength of their collective voices for the greater good.
        </p>
        <button>Services</button>
      </div>
    </div>
  );
};

export default Driver;
