import React from "react";
import RowListElement from "../../_Partials/List/RowList/RowListElement";

import styles from "../../../styles/_Core/CustomInput.module.scss"

const CustomInputDropdownListTitle = ({ title, data }) => {
  return (
    <>
      {title && (
        <div>
          <h3>{title}</h3>
          <hr />
        </div>
      )}
      <div className={styles.customInputDropdownSections}>
        {data.length !== 0 ? data.map((song) => (
          <RowListElement
            key={song.title}
            song={song}
            options={{
              imgWidth: 35,
              imgHeight: 35,
              noHighlightWhenClicked: true,
              noOptionsIcon: true,
              condensed: true,
              noAlbum: true,
              noDuration: true,
            }}
          />
        )) : <div>No {title} Found</div>}
      </div>
    </>
  );
};

export default CustomInputDropdownListTitle;
