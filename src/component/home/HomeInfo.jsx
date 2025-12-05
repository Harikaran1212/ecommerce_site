import React from "react";
import "./HomeInfo.css";
import { Link } from "react-router-dom";

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h2>
        Indulge in luxury and elevate your style with our stunning, high-end designer creations.
        </h2>
        <p>
          Where style, sophistication, exclusivity is the forefront of our
          collection. Welcome to a collection where style, sophistication, and exclusivity come together in perfect harmony. Every piece is thoughtfully crafted to reflect timeless elegance and elevate your presence with effortless grace. Here, premium design meets refined artistry, offering creations that are as distinctive as they are captivating made for those who appreciate the true essence of luxury.
        </p>
      </div>
      <button className="explore-clothing_btn">
        <Link to="explore/all">Discover Our Products</Link>
      </button>
    </article>
  );
}

export default HomeInfo;
