import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/Store';
import { cartItems } from "../Store/Store";
import MenuDrawer from "./MenuDrawer";
import { jwtDecode } from 'jwt-decode';

function Navbar() {
    const { count } = cartItems((state) => ({
        count: state.count
    }));
    const clearToken = useAuthStore((state) => state.clearToken);
    const token = useAuthStore((state) => state.token);
    const [email, setEmail] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        event.stopPropagation(); // Stop the propagation of the click event
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        clearToken();
        navigate('/');
    };

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    setEmail(decodedToken.userEmail);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page
            }
        }
    }, [token]);

    const open = Boolean(anchorEl);
    const handleLogoClick = () => {
        navigate('/mainpage/home')
    }
    return (
        <div className="top-0 sticky flex justify-between p-2 pr-5 items-center bg-slate-100 shadow-md z-50 shadow-slate-200">
            <div className="text-2xl italic font-semibold">
                <h1 onClick={handleLogoClick} className="hover:cursor-pointer">
                    <span className="text-orange-400 " >Mule</span> Foods
                </h1>

            </div>
            <div>
                <NavLink to="/mainpage/cart" className="text-orange-400">
                    <Badge color="primary" badgeContent={count}>
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </NavLink>
            </div>
            <div className="hidden lg:flex flex-row justify-around items-center gap-3 links">
                <NavLink to='/mainpage/home' className='navlink'>Home</NavLink>
                <NavLink to='/mainpage/help' className='navlink'>Help?</NavLink>
                <NavLink to='/mainpage/confirm' className='navlink'>Confirm</NavLink>
                <NavLink to="/mainpage/account">
                    <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt={email.toUpperCase()}
                        src="/broken-image.jpg"
                    />
                </NavLink>

                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant="contained"
                    color="primary"
                >
                    Dashboard
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                >
                    <MenuItem onClick={handleClose}>
                        <NavLink to='/mainpage/admin'>Admin</NavLink>
                    </MenuItem>
                    <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
                        LogOut
                    </MenuItem>
                </Menu>
            </div>
            <div className="block lg:hidden"><MenuDrawer /></div>
        </div >
    );
}

export default Navbar;
