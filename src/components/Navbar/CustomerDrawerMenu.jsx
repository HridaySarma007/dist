import React, { useState } from "react";
import {
  Drawer,
  Divider,
  Avatar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { deepPurple } from "@mui/material/colors";
import {
  Dashboard,
  People,
  PersonAdd,
  Report,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
//import { useDispatch } from "react-redux";
//import { logout } from "../../redux/actions/authAction";

const useStyles = makeStyles({
  active: {
    background: "#f4f4f4",
  },
});

const CustomerDrawerMenu = ({ customer, open, onClose }) => {
  console.log(customer.fullName);
  const drawerWidth = 240;

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");
    navigate("/customer-login");
  }

  return (
    <>
      <Drawer
        variant="temporary"
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        anchor="left"
        open={open}
        onClose={() => onClose()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Avatar sx={{ bgcolor: "#1873cd" }} />
          <Typography>{customer.fullName}</Typography>
          <Typography>
            <small>{customer.email}</small>
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItemButton onClick={() => navigate("/customer-dashboard", {replace:true})}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon>
              <Logout style={{ marginRight: "10", marginTop: "5" }} />
            </ListItemIcon>
            <ListItemText onClick={() => logout()}>Logout</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default CustomerDrawerMenu;
