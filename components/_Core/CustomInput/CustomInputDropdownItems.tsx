import React, { ReactElement } from "react";
import RowListElement from "../../_Partials/List/RowList/RowListElement";
import { Song } from "../../../typeScript/interfaces";

import styles from "../../../styles/_Core/CustomInput.module.scss";

interface Props {
  title: string;
  data: { title: string; options?: Options; idx?: number, song:any, setPlaylistBasedOnSongClicked:(any) => void }[];
}

interface Options {
  imgWidth: number;
  imgHeight: number;
  noHighlightWhenClicked: boolean;
  noOptionsIcon: boolean;
  condensed: boolean;
  noAlbum: boolean;
  noDuration: boolean;
  data:Song
}

const CustomInputDropdownItems: React.FC<Props> = ({ title, data }) => {
  return (
    <>
      {
        // If there is Data, render it
        data.length !== 0 && (
          <>
            {title && (
              <div>
                <h3>{title}</h3>
                <hr />
              </div>
            )}
            <div className={styles.customInputDropdownSections}>
              {data.map(
                (song): ReactElement => (
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
                )
              )}
            </div>
          </>
        )
      }
    </>
  );
};

export default CustomInputDropdownItems;
