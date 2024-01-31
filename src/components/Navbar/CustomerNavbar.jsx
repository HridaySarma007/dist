import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar, IconButton, Toolbar, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../../../Images/logo-landing.svg";
import Profile from "./CustomerProfile";

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
    return 0;
}

const Navbar = () => {
    const customer = JSON.parse(localStorage.getItem("customer"));


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
                <Toolbar >
                    <img src={Logo} width="200px" onClick={() => navigate("/customer-dashboard")} />
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
                                    <LinkTab label="Dashboard" href="/customer-dashboard" />
                                </Tabs>
                                <Profile customer={customer} />
                            </>
                        : <>
                            <Profile customer={customer}/>
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
                                navigate("/customer-dashboard", {replace:true})
                            }}
                        >
                            <ListItemText primary="DASHBOARD" />
                        </ListItemButton>
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Navbar;
