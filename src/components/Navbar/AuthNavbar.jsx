import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { AppBar, Box, Container, Divider, Hidden, Menu, Toolbar, Avatar, Button, IconButton, List, ListItemIcon, ListItem, ListItemText, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/styles";
// @material-ui/icons components
import AccountCircle from "@mui/icons-material/AccountCircle";
import Clear from "@mui/icons-material/Clear";
import Dashboard from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import VpnKey from "@mui/icons-material/VpnKey";

// core components
import componentStyles from "./AuthNavbarStyles";

const useStyles = makeStyles(componentStyles);

export default function AuthNavbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /*const menuId = "responsive-menu-id";
  const ListObject = (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      //component={List}
      className={classes.flexDirectionColumn}
       sx={{ marginRight:"80px"}}
    >
      <ListItem
        component={Link}
        to="/admin/dashboard"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
         sx={{ marginRight:".5rem!important"}}
      >
        <Box
          //component={Dashboard}
          width="100px"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        Home
      </ListItem>
      <ListItem
        component={Link}
        to="/auth/register"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
         sx={{ marginRight:".5rem!important"}}
      >
        <Box
          //component={AccountCircle}
          width="100px"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
       Client area
      </ListItem>
      <ListItem
        component={Link}
        to="/auth/login"
        onClick={handleMenuClose}
        classes={{
          root: classes.listItemRoot,
        }}
         sx={{ marginRight:".5rem!important"}}
      >
        <Box
          //component={VpnKey}
          width="1.25rem!important"
          height="1.25rem!important"
          marginRight=".5rem!important"
        />
        <span >Download report</span>
      </ListItem>
 
    </Box>
  );

  return (
    <>
      <AppBar position="absolute"  elevation={0}>
        <Toolbar>
          <Container
            display="flex!important"
            justifyContent="space-between"
            alignItems="center"
            marginTop=".75rem"
            component={Box}
            maxWidth="xl"
          >
            <Box
              alt="..."
              height="30px"
              //component="img"
              className={classes.headerImg}
              //src={require("assets/img/brand/argon-react-white.png").default}
            />
            <Hidden mdUp implementation="css">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleMenuOpen}
                aria-controls={menuId}
                aria-haspopup="true"
              >
                <Box
                  component={MenuIcon}
                  //color={theme.palette.white.main}
                  width="2rem!important"
                  height="2rem!important"
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                classes={{ paper: classes.menuPaper }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingLeft="1.25rem"
                  paddingRight="1.25rem"
                  paddingBottom="1rem"
                  className={classes.outlineNone}
                >
                  <Box
                    alt="..."
                    height="36px"
                    //component="img"
                    className={classes.headerImg}
                   // src={require("assets/img/brand/argon-react.png").default}
                  />
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleMenuClose}
                    aria-controls={menuId}
                    aria-haspopup="true"
                  >
                    <Box
                      component={Clear}
                      width="2rem!important"
                      height="2rem!important"
                    />
                  </IconButton>
                </Box>
                <Box
                  component={Divider}
                  marginBottom="1rem!important"
                  marginLeft="1.25rem!important"
                  marginRight="1.25rem!important"
                  width="100%"
                />
                {ListObject}
              </Menu>
            </Hidden>
            <Hidden smDown implementation="css">
              {ListObject}
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );*/

  return (
    <AppBar position="sticky">
      <Toolbar>


        <Typography
          variant="h6"
          noWrap
          //component="div"
          sx={{ flexGrow: 1, textAlign: "left" }}
        >

        </Typography>
      </Toolbar>
    </AppBar>


  );
}
