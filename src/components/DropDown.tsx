import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {Button} from "@mui/material";
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography, useTheme } from '@mui/material';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        maxHeight: 48 * 4.5,
        overflowY: "auto",
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

type PropsDropDown<T> = {
    values: T[],
    onClick: (v: T) => void,
    getMenuLabel: (v: T) => string,
    label?: string,
    defaultLabel?: string
}

export default function DropDown<T>(props: PropsDropDown<T>) {
    const { values, onClick, getMenuLabel, label, defaultLabel } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState<T | undefined>(undefined);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (v: T) => {
        setValue(v);
        setAnchorEl(null);
        v && onClick(v);
    };

    const displayButtonText = (value: T | undefined) => {
        if (value) {
            return (
                <span>
                    <Typography color="textSecondary" sx={{mr:1, display: "inline", fontSize: "12px", fontWeight: "bold" }}>
                        {label?.toUpperCase()}
                    </Typography>  {getMenuLabel(value)}
                </span>
            )
        } else {
            return (
                <span>
                    <Typography color="textSecondary" sx={{ mr:1, display: "inline", fontSize: "12px", fontWeight: "bold" }}>
                        {label?.toUpperCase()}
                    </Typography>  {defaultLabel}
                </span>)
        }
    }

    return (
        <div>
            <Button
                id="dropdown-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                <b>{displayButtonText(value)}</b>
            </Button>
            <StyledMenu
                id="dropdown-menu"
                MenuListProps={{
                    'aria-labelledby': 'dropdown-button',
                }}
                anchorEl={anchorEl}
                open={open}
                // @ts-ignore
                onClose={() => handleClose(value)}
            >
                <MenuItem
                    // @ts-ignore
                    onClick={() => handleClose(undefined)}
                    disableRipple
                    sx={{fontSize:"12px"}}
                >
                    {defaultLabel?.toUpperCase()}
                </MenuItem>
                {values.map((v, idx) => (
                    <MenuItem sx={{fontSize:"12px"}} key={idx} onClick={() => handleClose(v)} disableRipple>
                        {getMenuLabel(v).toUpperCase()}
                    </MenuItem>
                ))}
            </StyledMenu>
        </div>
    );
}



