import React from "react";
import styles from "./Luxury.module.css";
import Game from "./game.png";
import Asses from "./asse.png";
import Train from "./train.png";
import Subs from "./subs.png";
const Luxury = () => {
  return (
    <div className={styles.luxury}>
      <div className={styles.heading}>
        <h1>High-end Experience</h1>
        <div className={styles.text_bg}>
          <p>
            <span>
              Choose the best to roll in style and elevate your experience.
            </span>
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <a href="/">
          <div className={styles.card}>
            <img src={Game} alt="/" />
            <div className={styles.content}>
              <h3>Gamification</h3>
            </div>
          </div>
        </a>
        <a href="/">
          <div className={styles.card}>
            <img src={Asses} alt="/" />
            <div className={styles.content}>
              <h3>Assessment</h3>
            </div>
          </div>
        </a>
        <a href="/">
          <div className={styles.card}>
            <img src={Train} alt="/" />
            <div className={styles.content}>
              <h3>Training</h3>
            </div>
          </div>
        </a>
        <a href="/">
          <div className={styles.card}>
            <img src={Subs} alt="/" />
            <div className={styles.content}>
              <h3>Subscripton</h3>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Luxury;
