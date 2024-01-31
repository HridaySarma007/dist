import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Chip from '@mui/material/Chip';
import {grey, green} from '@mui/material/colors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function DropDown({ onClick, defaultValue, items }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState(defaultValue);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value) => {
        setAnchorEl(null);
    };

    const onItemClick = (value) => {
        onClick(value);
        setValue(value);
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="outlined"
                sx={{mx:1}}
            >
                {value.label} <ArrowDropDownIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {items.map((item) => (
                    <MenuItem onClick={() => onItemClick(item)}>{item.label}</MenuItem>
                ))}
            </Menu>
        </div>
    );
}
