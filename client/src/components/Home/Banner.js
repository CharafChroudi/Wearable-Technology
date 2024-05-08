import bannerImg from "./assets/BannerImage.png";
import React from "react";

const Banner = () => {
  // inline styles for banner image
  const bannerStyle = {
    width: "100%", // Full width
    height: "auto", //aspect ratio
    display: "block", // Remove margins
  };

  return (
    <div>
      <img src={bannerImg} alt="Banner" style={bannerStyle} />
      <h3>Home Page</h3>
    </div>
  );
};

export default Banner;
