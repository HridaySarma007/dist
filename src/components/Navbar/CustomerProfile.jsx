import React, { useState } from "react";
import {
    AppBar,
    Button,
    Avatar,
    Menu,
    MenuItem,
    Box,
    ListItemIcon,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { MenuOpenOutlined, PersonAdd, Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const CustomerProfile = ({ customer }) => {
    console.log(customer);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function stringAvatar(name) {
        let nameArray = name.trim().split(" ");
        return {
            sx: {
                bgcolor: grey[500],
            },

            children: `${nameArray.length >= 2
                    ? name.split(" ")[0][0] + "" + name.split(" ")[1][0]
                    : name.split(" ")[0][0]
                }`,
        };
    }

    function logout() {
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer");
        window.location.href = "/customer-login";
    }

    return (
        <Box>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                startIcon={
                    <Avatar
                        sx={{ width: 34, height: 34 }}
                        {...stringAvatar(customer.fullName)}
                    ></Avatar>
                }
            ></Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={() => navigate("/profile", { replace: true })}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default CustomerProfile;
