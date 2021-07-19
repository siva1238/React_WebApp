import React from "react";

import "./Image.css";

const Image = (props) => {
  const path = "http://localhost:8080/" + `${props.imageUrl}`;
  return (
    <div
      className="image"
      style={{
        backgroundImage: `url(${path})`,
        backgroundSize: props.contain ? "contain" : "cover",
        backgroundPosition: props.left ? "left" : "center",
      }}
    />
  );
};

export default Image;
