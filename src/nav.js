import React, { useState } from "react";
import Slider from "./slider.js";
import Main from "./main";
import {
  getMergeSortAnimations,
  bubbleSort,
  heapSort,
  quickSort,
} from "./sortingAlgorithms";
import "./nav.css";

const resetArray = () => {
  const newArr = [];
  //set to 210 normally
  for (var i = 0; i < 210; i++) {
    newArr.push(Math.floor(Math.random() * (426 - 1 + 1) + 1));
  }
  return newArr;
  //return [80, 30, 10, 70, 40, 50, 90, 20, 60];
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
    e.target.style.backgroundColor = "green";
    document.getElementById("slider").style.pointerEvents = "none";
    isRun = true;

    if (sort === "merge") {
      const animations = getMergeSortAnimations(arr);
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
          const color = i % 3 === 0 ? "yellow" : "#BE00FE";
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
    } else if (sort === "bubble") {
      var og_arr = arr.slice();
      const animations = bubbleSort(arr);
      const arrayBars = document.getElementsByClassName("array-bar");

      for (let i = 0; i < animations.length; i++) {
        const [bar1, bar2, endCheck] = animations[i];
        // eslint-disable-next-line
        setTimeout(() => {
          const idx = og_arr[bar1] > og_arr[bar2] ? bar1 : bar2;
          arrayBars[idx].style.backgroundColor = "yellow";
          setTimeout(() => {
            const color = endCheck ? "#BE00FE" : "#FF0099";
            arrayBars[bar2].style.backgroundColor = color;
            arrayBars[bar1].style.backgroundColor = "#FF0099";
            if (og_arr[bar1] > og_arr[bar2]) {
              var temp_val = og_arr[bar1];
              og_arr[bar1] = og_arr[bar2];
              og_arr[bar2] = temp_val;
              var temp = arrayBars[bar1].style.height;
              arrayBars[bar1].style.height = arrayBars[bar2].style.height;
              arrayBars[bar2].style.height = temp;
            }
            if (animations.length - 1 === i) {
              arrayBars[0].style.backgroundColor = "#BE00FE";
              e.target.style.backgroundColor = "rgb(57, 57, 61)";
              isRun = false;
              document.getElementById("slider").style.pointerEvents = "auto";
              setIsSorted(true);
            }
          }, speed * 0.3);
        }, i * (speed * 0.3));
      }
    } else if (sort === "heap") {
      var animations = heapSort(arr);
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < animations.length; i++) {
        const [bar1, bar2, isEnd] = animations[i];

        // eslint-disable-next-line
        setTimeout(() => {
          arrayBars[bar1].style.backgroundColor = "yellow";
          arrayBars[bar2].style.backgroundColor = "yellow";
          setTimeout(() => {
            var temp = arrayBars[bar1].style.height;
            arrayBars[bar1].style.height = arrayBars[bar2].style.height;
            arrayBars[bar2].style.height = temp;
            arrayBars[bar1].style.backgroundColor = "#FF0099";
            arrayBars[bar2].style.backgroundColor = isEnd
              ? "#BE00FE"
              : "#FF0099";

            if (animations.length - 1 === i) {
              arrayBars[0].style.backgroundColor = "#BE00FE";
              e.target.style.backgroundColor = "rgb(57, 57, 61)";
              isRun = false;
              document.getElementById("slider").style.pointerEvents = "auto";
              setIsSorted(true);
            }
          }, speed);
        }, i * speed);
      }
    } else if (sort === "quick") {
      animations = [];
      quickSort(arr, 0, arr.length - 1, animations);
      var arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < animations.length; i++) {
        const [bar1, bar2] = animations[i];

        // eslint-disable-next-line
        setTimeout(() => {
          arrayBars[bar1].style.backgroundColor = "yellow";
          arrayBars[bar2].style.backgroundColor = "yellow";
          setTimeout(() => {
            var temp = arrayBars[bar1].style.height;
            arrayBars[bar1].style.height = arrayBars[bar2].style.height;
            arrayBars[bar2].style.height = temp;
            arrayBars[bar1].style.backgroundColor = "#BE00FE";
            arrayBars[bar2].style.backgroundColor = "#BE00FE";

            if (animations.length - 1 === i) {
              e.target.style.backgroundColor = "rgb(57, 57, 61)";
              isRun = false;
              document.getElementById("slider").style.pointerEvents = "auto";
              setIsSorted(true);
            }
          }, speed * 6);
        }, i * (speed * 6));
      }
    }
  };

  const handleSortChange = (e) => {
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
