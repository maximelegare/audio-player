import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { PopoverClose } from "@radix-ui/react-popover";
import { useAudioPlayer } from "../../../hooks/AudioHooks";

const NewPlaylist = () => {
  const [inputValue, setInputValue] = useState("");
  const { createPlaylist } = useAudioPlayer();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue) {
      createPlaylist(inputValue);
      setInputValue("");
    } else {
      console.log("error");
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onSubmit={handleSubmit}
    >
      <div style={{ height: "10px" }} />
      <CustomInput
        placeHolder="Playlist Name"
        value={inputValue}
        handleChange={handleInputChange}
      />
      <div style={{ height: "20px" }} />
      <PopoverClose
        style={{
          background: "transparent",
          border: "none",
          borderRadius: "99999px",
          padding: 0,
          margin: 0,
        }}
      >
        <div onClick={handleSubmit}>
          <CustomButton falseButton variant="text">
            Create
          </CustomButton>
        </div>
      </PopoverClose>
      <div style={{ height: "10px" }} />
    </form>
  );
};

export default NewPlaylist;
