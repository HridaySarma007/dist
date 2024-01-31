import React from "react";
import { useMediaQuery, useTheme, Button } from "@mui/material";

//import NotFound from "../../Images/404.png";

const NotFound = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         
          <p style={{ fontSize: "1.3em", fontWeight: "bold" }}>
            The resource you are looking for is not available
          </p>
        </div>
       
    </>
  );
};

export default NotFound;
