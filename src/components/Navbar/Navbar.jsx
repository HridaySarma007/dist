import React, { useEffect } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import DrawerMenu from "./DrawerMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Logo from "../../../Images/logo-landing.svg";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function LinkTab(props) {
    const navigate = useNavigate();
    return (
        <Tab
            sx={{ minHeight: "64px" }}
            component="a"
            onClick={(event) => {
                event.preventDefault();
                navigate(props.href, { replace: true })
            }}
            {...props}
        />
    );
}



const Navbar = () => {
    const user = useSelector((state) => state.auth.user);

    const setNavValue = (path) => {
        if (path.includes('dashboard')) return 0;
        if (path.includes('customer')) return 1;
        if (user.role === 'SUPER_USER' && path.includes('user')) return 2;
        if (path.includes('tea_reports')) {
            return user?.role === 'SUPER_USER' ? 4 : 3;
        }
        if (path.includes('report') || path.includes('recommendation')) {
            return user?.role === 'SUPER_USER' ? 3 : 2;
        }
        if (path.includes('samples')) {
            return user?.role === 'SUPER_USER' ? 5 : 4;
        }
    }

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const [value, setValue] = React.useState(setNavValue(window.location.pathname));
    const [open, setOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <AppBar color="default" position="static" elevation={0}>
                <Toolbar>
                    <img src={Logo} width="200px" onClick={() => navigate("/dashboard")} />
                    <Typography sx={{ ml: "auto" }}></Typography>
                    {!isMatch
                        ?
                        <>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="nav tabs example"
                                sx={{ mr: 2 }}
                            >
                                <LinkTab label="Dashboard" href="/dashboard" />
                                <LinkTab label="Customers" href="/customers" />
                                {user?.role === 'SUPER_USER' && <LinkTab label="Users" href="/users" />}
                                <LinkTab label="Farmer Test Results" href="/reports" />
                                <LinkTab label="Tea Test Results" href="/tea_reports" />
                                <LinkTab label="Samples" href="/samples" />
                            </Tabs>
                            <Profile sx={{ ml: 2 }} user={user} />
                        </>
                        : <>
                            <Profile user={user} />
                            <IconButton onClick={() => setOpen(true)}><MenuIcon /></IconButton>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <Dialog
                fullScreen={isMatch}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <div
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Typography>MAIN MENU</Typography>
                        <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <List component="nav">
                        <ListItemButton
                            divider
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/dashboard", { replace: true })
                            }}
                        >
                            <ListItemText primary="DASHBOARD" />
                        </ListItemButton>
                        <ListItemButton
                            divider
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/customers", { replace: true })
                            }}
                        >
                            <ListItemText primary="CUSTOMERS" />
                        </ListItemButton>
                        {user?.role === 'SUPER_USER' && <ListItemButton
                            divider
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/users", { replace: true })
                            }}
                        >
                            <ListItemText primary="USERS" />
                        </ListItemButton>
                        }
                        <ListItemButton
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/reports", { replace: true })
                            }}
                        >
                            <ListItemText primary="FARMER TEST RESULTS" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/tea_reports", { replace: true })
                            }}
                        >
                            <ListItemText primary="TEA TEST RESULTS" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/samples", { replace: true })
                            }}
                        >
                            <ListItemText primary="SAMPLES" />
                        </ListItemButton>
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Navbar;
