import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { KeyboardArrowLeft, Menu } from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";
import Drawer from "./DrawerMenu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Header({ title }) {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: deepPurple[500],
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const logOut = () => {
    dispatch(signInAction({}));
    navigate("/");
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          {window.location.pathname !== "/dashboard" && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => navigate(-1)}
            >
              <KeyboardArrowLeft />
            </IconButton>
          )}
          <Typography
            variant=""
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            {title}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setState(true)}
          >
            {" "}
            <Menu />{" "}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={state} user={auth} onClose={() => setState(false)} />
    </div>
  );
}

export default Header;
