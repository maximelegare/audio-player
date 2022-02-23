import React from "react";
import Box from "../Box";


const DropdownItemWithIcon = ({ text, children }) => {
  return (
    <>
      <div style={{ flexGrow: 1 }}>{text}</div>
      <Box variant="center">
        {children}
      </Box>
    </>
  );
};

export default DropdownItemWithIcon;
