import React from "react";
import RowListElement from "../../_Partials/List/RowList/RowListElement";

import styles from "../../../styles/_Core/CustomInput.module.scss";

const CustomInputDropdownItems = ({ sections }) => {
  return (
    <>
      {sections.length !== 0 ? (
        sections.map((section, idx) => {
          return (
            <div key={idx}>
              {
                // If there is Data, render it
                section.data.length !== 0 && (
                  <>
                    {section.title && (
                      <div>
                        <h3>{section.title}</h3>
                        <hr />
                      </div>
                    )}
                    <div className={styles.customInputDropdownSections}>
                      {section.data.map((song) => (
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
                      ))}
                    </div>
                  </>
                )
              }
            </div>
          );
        })
      ) : (
        <h4>No data found..</h4>
      )}
    </>
  );
};

export default CustomInputDropdownItems;
