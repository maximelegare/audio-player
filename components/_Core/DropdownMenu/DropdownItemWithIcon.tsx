// DropdownMenu link with an icon on the side 

import React, { ReactElement } from "react";
import Box from "../Box";

interface Props {
  text:string,
  children:ReactElement
}

const DropdownItemWithIcon:React.FC<Props> = ({ text, children }) => {
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
