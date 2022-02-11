import React from "react";
import ListElement from "./RowListElement";
import RowHeader from "./RowHeader";
import PageLayout from "../../../Layout/PageLayout";

const RowList = ({ data }) => {
  let songNumber = 0;
  return (
    <PageLayout>
      <RowHeader />

      {data.map(({ title, ...otherProps }) => {
        songNumber++;
        return (
          <ListElement
            key={title}
            title={title}
            songNumber={songNumber}
            {...otherProps}
          />
        );
      })}
    </PageLayout>
  );
};

export default RowList;
