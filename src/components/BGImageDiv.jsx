/* eslint-disable react/prop-types */
// import React from "react";

const BackgroundImageDiv = ({ imageUrl, children, classs }) => {
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={divStyle} className={`absolute inset-0  ${classs}`}>
      {children}
    </div>
  );
};

export default BackgroundImageDiv;
