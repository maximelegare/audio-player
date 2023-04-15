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
              width: "100%",
              borderRadius: "10px",
              // backgroundColor: "#ffe3d4",
              cursor: "pointer",
              background: getTrackBackground({
                values: values,
                colors: ["rgb(90, 20, 160)", "#ffe3d4"],
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
            height: "15px",
            width: "15px",
            backgroundColor: "rgb(63, 16, 110)",
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
