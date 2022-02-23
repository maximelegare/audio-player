import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import usePlaylists from "../../../hooks/PlaylistHooks";
import { PopoverClose } from "@radix-ui/react-popover";

const NewPlaylist = () => {
  const [inputValue, setInputValue] = useState("");
  const { createPlaylist } = usePlaylists();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue) {
      createPlaylist(inputValue);
      setInputValue("");
    }else{
        console.log("error")
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
        <CustomButton variant="text" type="submit">
          Create
        </CustomButton>
      </PopoverClose>
      <div style={{ height: "10px" }} />
    </form>
  );
};

export default NewPlaylist;
