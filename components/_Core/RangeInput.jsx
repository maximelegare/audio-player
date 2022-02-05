import React from "react";
import { getTrackBackground, Range } from "react-range";

import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss"



const RangeInput = ({ values, step, min, max, updateValues, width }) => {
  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={(values) => updateValues(values)}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            width: width,
            height: "20px",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            {...props}
            ref={props.ref}
            style={{
              ...props.style,
              height: "6px",
              width: "max(30vw, 300px)",
              borderRadius: "10px",
              // backgroundColor: "#ffe3d4",
              cursor: "pointer",
              background: getTrackBackground({
                values: values,
                colors: ["#26c9c3", "#ffe3d4"],
                min: min,
                max: max,
              }),
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged, value }) => (
        <div
          {...props}
          defaultValue={0}
          // className={}
          style={{
            ...props.style,
            height: "20px",
            width: "20px",
            backgroundColor: "#26c9c3",
            visibility: isDragged ? "visible" : "hidden",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        />
      )}
    />
  );
};

export default RangeInput;
