import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    TextField,
    Button,
    MenuItem,
    Grid,
    Snackbar,
    Alert,
} from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, useTheme } from "@mui/material";
import Logo from "../../Images/logo-alt.svg";
const pages = ["Home", "Contact us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.up("md"));
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {

        setAnchorElNav(null);
    };

    const handleHome = () => {
        navigate("/", { replace: true })
        setAnchorElNav(null);
    };
    const handleContact = () => {
        navigate("/contact", { replace: true })
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (

        <AppBar position="static" elevation={3}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    {isMatch && <img onClick={() => navigate("/", { replace: true })} src={Logo} width="300px" />}

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                                textAlign: "right",
                            }}
                        >

                            <MenuItem onClick={handleHome}>
                                <Typography textAlign="right">Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleContact}>
                                <Typography textAlign="right">Contact</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    {!isMatch && <img
                        onClick={() => navigate("/", { replace: true })}
                        src={Logo}
                        width="200px"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    />}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex", lg: "flex" },
                            justifyContent: "right",
                        }}
                    >
                        <NavLink
                            exact
                            to="/"
                            style={{
                                textDecoration: "none",
                                margin: "20px",
                                color: "white",
                                display: "block",
                            }}
                        >
                            <Typography>Home</Typography>
                        </NavLink>
                        <NavLink
                            exact
                            to="/contact"
                            style={{
                                textDecoration: "none",
                                margin: "20px",
                                color: "white",
                                display: "block",
                            }}
                        >
                            <Typography>Contact us</Typography>
                        </NavLink>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
}

export default Header;
