import React from "react";
import "./Flag.css"; // CSS dosyanızı buraya ekleyin
import flags from "./assets/flames.svg";

const Flag = ({ index }) => {
  const singleFlagWidth = 1280; // Her bayrağın genişliği
  const singleFlagHeight = 854; // Her bayrağın yüksekliği
  const scaleFactor = 0.16; // Orantılı küçültme
  const scaledWidth = singleFlagWidth * scaleFactor;
  const scaledHeight = singleFlagHeight * scaleFactor;

  return (
    <div
      className="flag-wrapper"
      style={{
        display: "inline-block",
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        backgroundImage: `url(${flags})`,
        backgroundSize: `${1280 * 15 * scaleFactor}px auto`,
        backgroundPosition: `-${index * scaledWidth}px 0`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default Flag;
