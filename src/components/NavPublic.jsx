import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from "../../Images/logo-landing.svg";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from '@mui/material';

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

const setNavValue = (path) => {
    if (path === "/") return 0;
    if (path === "/contact") return 1;
    return 10;
}

const Header = () => {
    const [value, setValue] = React.useState(setNavValue(window.location.pathname));
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLoginClick = () => {
        setValue(10);
        navigate("/customer-login", { replace: true });
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <AppBar
                color="default"
                elevation={0}
            >
                <Toolbar>
                    <img src={logo} width="200px" onClick={() => navigate("/")} />
                    <Typography sx={{ ml: "auto" }}></Typography>
                    {!isMatch
                        ? <>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="nav tabs example"
                            >
                                <LinkTab label="Home" href="/" />
                                <LinkTab label="Contact Us" href="/contact" />
                                <LinkTab label="Sample Collection" href="/sample-collection" />
                            </Tabs>
                            <Button onClick={handleLoginClick} variant='outlined' sx={{ ml: 2 }}>Login</Button>
                        </>
                        : <IconButton onClick={() => setOpen(true)}><MenuIcon /></IconButton>

                    }
                </Toolbar>
            </AppBar>

            <Dialog
                fullScreen={isMatch}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{maxWidth:"100vw"}}
            >
                <DialogTitle id="responsive-dialog-title">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center", width: "100%" }}>
                        <Typography>MAIN MENU</Typography>
                        <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <List component="nav" >
                        <ListItemButton
                            divider
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/", {replace:true})
                            }}
                        >
                            <ListItemText primary="HOME" />
                        </ListItemButton>
                        <ListItemButton
                            divider
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/contact", {replace:true})
                            }}
                        >
                            <ListItemText primary="CONTACT US" />
                        </ListItemButton>
                        <ListItemButton
                            divider
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/sample-collection", {replace:true})
                            }}
                        >
                            <ListItemText primary="SAMPLE COLLECTION" />
                        </ListItemButton>
                        <ListItemButton
                            onClick={(event) => {
                                setOpen(false);
                                navigate("/customer-login", {replace:true})
                            }}
                        >
                            <ListItemText primary="LOGIN" />
                        </ListItemButton>
                    </List>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Header;
