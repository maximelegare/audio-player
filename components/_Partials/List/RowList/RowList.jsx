import React from "react";
import ListElement from "./RowListElement";
import RowHeader from "./RowHeader";


const RowList = ({ data }) => {

  let songNumber = 0
  return (
    <div>
      <RowHeader />
      
      {data.map(({ title, ...otherProps }) => {
        songNumber++
        return <ListElement key={title} title={title} songNumber={songNumber} {...otherProps} />;
      })}
    </div>
  );
};

export default RowList;
