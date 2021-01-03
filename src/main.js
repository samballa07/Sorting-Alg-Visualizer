import React from "react";
import "./main.css";

const Main = (props) => {
  var arr = props.array;
  return (
    <>
      <div className="container">
        <div className="array-container">
          {arr.map((value, idx) => {
            return (
              <div
                style={{ height: `${value}px` }}
                className="array-bar"
                key={idx}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Main;
