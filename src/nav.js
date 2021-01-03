import React, { useState } from "react";
import Slider from "./slider.js";
import Main from "./main";
import { getMergeSortAnimations } from "./sortingAlgorithms";
import "./nav.css";

const resetArray = () => {
  const newArr = [];
  for (var i = 0; i < 210; i++) {
    newArr.push(Math.floor(Math.random() * (426 - 1 + 1) + 1));
  }
  return newArr;
};
var isRun = false;
const Nav = () => {
  const [sort, setSort] = useState("merge");
  const [arr, setArray] = useState(resetArray());
  const [speed, setSpeed] = useState(2);
  const [isSorted, setIsSorted] = useState(false);

  const handleRun = (e) => {
    if (isRun || isSorted) {
      return;
    }
    if (sort === "merge") {
      isRun = true;
      const animations = getMergeSortAnimations(arr);
      e.target.style.backgroundColor = "green";
      document.getElementById("slider").style.pointerEvents = "none";
      setTimeout(() => {
        e.target.style.backgroundColor = "rgb(57, 57, 61)";
        isRun = false;
        document.getElementById("slider").style.pointerEvents = "auto";
        setIsSorted(true);
      }, animations.length * speed);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName("array-bar");
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? "yellow" : " #BE00FE";
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * speed);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * speed);
        }
      }
    }
  };

  const handleSortChange = (e) => {
    if (e.target.id !== "merge") {
      alert(
        "ONLY MERGE SORT IS IMPLEMENTED CURRENTLY. Other sorts still being implemented"
      );
    }
    if (!isRun) {
      var newSort = e.target.id;
      if (sort !== newSort) {
        document.getElementById(sort).style.backgroundColor = "rgb(57, 57, 61)";
        setSort(newSort);
        setArray(resetArray);
        for (var bar of document.getElementsByClassName("array-bar")) {
          bar.style.backgroundColor = "#FF0099";
        }
        e.target.style.backgroundColor = "#8B0000";
        setIsSorted(false);
      }
    }
  };
  const handleRandomize = () => {
    if (!isRun) {
      setIsSorted(false);
      setArray(resetArray());
      for (var elem of document.getElementsByClassName("array-bar")) {
        elem.style.backgroundColor = "#FF0099";
      }
    }
  };

  //console.log(getMergeSortAnimations(arr));
  return (
    <>
      <div className="title">
        <h1>Algorithm Visualizer</h1>
      </div>
      <div className="nav-container">
        <div className="menu">
          <div className="sort-text-container">
            <div>
              <button
                style={{ backgroundColor: "#8B0000" }}
                id="merge"
                onClick={handleSortChange}
              >
                Merge Sort
              </button>
            </div>
            <div>
              <button id="heap" onClick={handleSortChange}>
                Heap Sort
              </button>
            </div>
            <div>
              <button id="bubble" onClick={handleSortChange}>
                Bubble Sort
              </button>
            </div>
            <div>
              <button id="quick" onClick={handleSortChange}>
                Quick Sort
              </button>
            </div>
          </div>
          <div>
            <div>
              <button
                id="run"
                onClick={handleRun}
                style={({ backgroundColor: "green" }, { fontSize: "17px" })}
              >
                Run
              </button>
            </div>
          </div>
          <div>
            <Slider isRun={isRun} speed={speed} setSpeed={setSpeed} />
          </div>
          <div className="user-input">
            <div>
              <button style={{ fontSize: "16px" }} onClick={handleRandomize}>
                Randomize
              </button>
            </div>
          </div>
        </div>
      </div>
      <Main array={arr}></Main>
    </>
  );
};

export default Nav;
