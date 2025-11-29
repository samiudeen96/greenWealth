import React from "react";

const ButtonBg = ({ children, onHandler }) => {
  return (
    <button className="animated-button bg-primary text-white px-6" onClick={onHandler}>
      <div className="button-inner text-white">
        <p className="button-text text-white">{children}</p>
        <p className="button-text-hover text-white">{children}</p>
      </div>
    </button>
  );
};

export default ButtonBg;
