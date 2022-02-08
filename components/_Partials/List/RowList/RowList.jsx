import React from "react";
import ListElement from "./RowListElement";
import RowHeader from "./RowHeader";


const RowList = ({ data }) => {

  let songNumber = 0
  return (
    <div>
      <RowHeader />
      {data.map(({ id, ...otherProps }) => {
        songNumber++
        return <ListElement key={id} id={id} songNumber={songNumber} {...otherProps} />;
      })}
    </div>
  );
};

export default RowList;
