import React from "react";
import p1 from "./profile1.jpg";
import p2 from "./profile4.jpg";
import p3 from "./comma.jpeg";
import "./Feed.css";
const Feed = () => {
  return (
    <div className="contac">
      <h2>FeedBack:Means a lot to us</h2>
      <div className="leftSid">
        <div className="pic">
          <img src={p1} alt="/" />
        </div>

        <div className="feed">
          <img src={p3} alt="/" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          sint totam corrupti, porro, culpa reprehenderit dolor dolorem tenetur
          fugiat quis necessitatibus sunt quam, aut fugit quod adipisci qui illo
          rem laboriosam quaerat maxime! Quod odio officiis reiciendis similique
          voluptatum, sed doloribus molestias, accusantium fugiat voluptatem
          optio labore totam! Perspiciatis omnis facere accusantium dolor saepe
        </div>
      </div>
      <div className="rightSid">
        <div className="pic">
          <img src={p2} alt="/" />
        </div>

        <div className="feed">
          {" "}
          <img src={p3} alt="/" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          sint totam corrupti, porro, culpa reprehenderit dolor dolorem tenetur
          fugiat quis necessitatibus sunt quam, aut fugit quod adipisci qui illo
          rem laboriosam quaerat maxime! Quod odio officiis reiciendis similique
          voluptatum, sed doloribus molestias, accusantium fugiat voluptatem
          optio labore totam! Perspiciatis omnis facere accusantium dolor saepe
        </div>
      </div>
    </div>
  );
};

export default Feed;
