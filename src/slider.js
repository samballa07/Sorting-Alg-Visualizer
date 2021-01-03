import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import "./nav.css";
const useStyles = makeStyles({
  root: {
    width: 225,
  },
});

function valuetext(value) {
  return "" + value;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();

  const handleChange = (e, newValue) => {
    if (!props.isRun) {
      console.log(newValue);
      if (newValue === 1) {
        props.setSpeed(1);
      } else if (newValue === 2) {
        props.setSpeed(5);
      } else if (newValue === 3) {
        props.setSpeed(10);
      }
    }
  };

  return (
    <div id="slider" style={{ textAlign: "center" }} className={classes.root}>
      <div className="slider-name">
        <h5>Speed:</h5>
      </div>
      <Slider
        onChange={handleChange}
        style={{ bottom: "30px" }}
        defaultValue={2}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={3}
      />
    </div>
  );
}
