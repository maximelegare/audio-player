import React from "react";
import DialogComponent from "./Dialog";
import { IoIosAdd } from "react-icons/io";
import buttonStyles from "../../styles/_Core/CustomButton.module.scss";
import CustomInput from "../_Core/CustomInput/CustomInput";
import { useState } from "react";
import RadioGroupComponent from "../_Core/RadioGroup";

import styles from "../../styles/_Core/Dialog.module.scss";

import playlistRadioData from "../../lib/playlistRadioButtons.json";

import { useRecoilValue } from "recoil";
import { selectedSideBarProvider } from "../../atoms/generalAtom";

export const NewPlaylistDialog = () => {
  const [inputValues, setInputValues] = useState({
    playlistTitle: "",
  });

  const provider = useRecoilValue(selectedSideBarProvider)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <>
      <DialogComponent
        title="Create a playlist"
        openTriggerComponent={
          <div className={buttonStyles.iconOnly}>
            <IoIosAdd />
          </div>
        }
      >
        <div className={styles.inputContainer}>
          <h4>What type of Playlist do you want?</h4>
          <RadioGroupComponent
            radioButtons={playlistRadioData}
            defaultValue={provider}
          />
        </div>
        <div className={styles.inputContainer}>
          <h4>Title:</h4>
          <CustomInput
            placeHolder="Playlist title"
            name="playlistTitle"
            handleChange={(e) => handleChange(e)}
          />
        </div>
      </DialogComponent>
    </>
  );
};
