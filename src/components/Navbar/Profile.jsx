import React, { useState } from "react";
import {
    AppBar,
    Button,
    Avatar,
    Menu,
    MenuItem,
    Box,
    ListItemIcon,
    ListItemText,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { MenuOpenOutlined, PersonAdd, Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { useMediaQuery, useTheme } from '@mui/material';

const Profile = ({ user }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function stringAvatar(name = "AD") {
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

    return (
        <Box>
            {!isMatch
                ?
                <Button
                    onClick={handleClick}
                    sx={{ textAlign: "left" }}
                >

                    <div
                        style={{ display: "flex", alignItems: "center" }}
                    >

                        <Avatar
                            sx={{ width: 34, height: 34 }}
                            {...stringAvatar(user?.name)}
                        ></Avatar>
                        <ListItemText primary={user.name} secondary={user.username} sx={{ ml: 2 }} />
                    </div>
                </Button>
                :
                <Button
                    onClick={handleClick}
                    startIcon={
                        <Avatar
                            sx={{ width: 34, height: 34 }}
                            {...stringAvatar(user?.name)}
                        ></Avatar>
                    }
                >
                </Button>
            }
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={() => dispatch(logout())}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Profile;
