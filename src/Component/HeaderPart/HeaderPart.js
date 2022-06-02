import React from "react";
import HeaderImage from "../../Asset/breadcumbImage.svg";

const HeaderPart = () => {
  return (
    <div className="col-12">
      <div className="headerPart">
        <img src={HeaderImage} alt="" />
      </div>
    </div>
  );
};

export default HeaderPart;
