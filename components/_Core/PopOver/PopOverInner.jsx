import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import { PopoverClose } from "@radix-ui/react-popover";
import { useAudioPlayer } from "../../../hooks/AudioHooks";

const PopOverInner = ({ buttonText, text, playlistPopover, handleSync, disableButton }) => {
  const [inputValue, setInputValue] = useState("");
  const { createPlaylist } = useAudioPlayer();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (playlistPopover) {
      if (inputValue) {
        createPlaylist(inputValue);
        setInputValue("");
      } else {
        console.log("error");
      }
    } else {
      handleSync();
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      // onSubmit={handleSubmit}
    >
      <div style={{ height: "10px" }} />
      {text && <p style={{ textAlign: "center", color: "#ffe3d4" }}>{text}</p>}
      {playlistPopover && (
        <CustomInput
          placeHolder="Playlist Name"
          value={inputValue}
          handleChange={handleInputChange}
          autoFocus
        />
      )}

      <div style={{ height: "20px" }} />

      <div onClick={handleSubmit}>
        <CustomButton popOverClose variant="text" disabled={disableButton}>
          {buttonText}
        </CustomButton>
      </div>

      <div style={{ height: "10px" }} />
    </form>
  );
};

export default PopOverInner;
