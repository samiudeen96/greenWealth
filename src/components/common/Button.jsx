import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button className="animated-button" onClick={onClick}>
      <div className="button-inner">
        <p className="button-text">{children}</p>
        <p className="button-text-hover">{children}</p>
      </div>
    </button>
  );
};

export default Button;
