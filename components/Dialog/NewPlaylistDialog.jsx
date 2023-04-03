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

import { useAudioPlayer } from "../../hooks/AudioHooks";
import useSpotify from "../../hooks/useSpotify";
import CustomButton from "../_Core/CustomButton";
import * as Dialog from "@radix-ui/react-dialog";

export const NewPlaylistDialog = ({}) => {
  const provider = useRecoilValue(selectedSideBarProvider);

  const [inputsValues, setInputsValues] = useState({
    title: "",
    radio: provider,
  });

  const { createPlaylist } = useAudioPlayer();
  const { createSpotifyPlaylist } = useSpotify();

  const handleChange = ({ name, value }) => {
    setInputsValues({ ...inputsValues, [name]: value });
  };

  const handleSubmit = (title, radioInputValue) => {
    if (radioInputValue === "hodei") {
      console.log("hodei");
      return createPlaylist(title);
    } else if (radioInputValue === "spotify") {
      return createSpotifyPlaylist(title);
    }

    setInputsValues({ title: "", radio: provider });
  };

  return (
    <>
      <DialogComponent
        title="Create a playlist"
        onOpenChange={() => setInputsValues({ title: "", radio: provider })}
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
            handleChange={(e) => handleChange(e)}
            value={inputsValues.radio}
          />
        </div>
        <div className={styles.inputContainer}>
          <h4>Title:</h4>
          <CustomInput
            placeHolder="Playlist title"
            name="title"
            handleChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex m-[10px] gap-1 justify-end pt-3">
          <Dialog.Close>
            <CustomButton variant="textOutline">Close</CustomButton>
          </Dialog.Close>
          <Dialog.Close>
            <CustomButton
              variant="text"
              handleClick={() =>
                handleSubmit(inputsValues.title, inputsValues.radio)
              }
            >
              Create
            </CustomButton>
          </Dialog.Close>
        </div>
      </DialogComponent>
    </>
  );
};
