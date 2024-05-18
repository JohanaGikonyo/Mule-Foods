import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { cartItems } from "../Store/Store";
import MenuDrawer from "./MenuDrawer";

function Navbar() {
    const { count } = cartItems((state) => ({
        count: state.count
    }))
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear token from local storage
        localStorage.removeItem('token');
        // Redirect to SignIn page
        navigate('/');
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    setEmail(decodedToken.userEmail)

                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page

            }
        }
    }, []);
    return (
        <div className="top-0 sticky flex justify-between p-2 pr-5 items-center bg-slate-100 shadow-md z-50 shadow-slate-200">
            <div className="text-2xl italic font-semibold">
                <h1>
                    <span className="text-orange-400">Mule</span> Foods
                </h1>
            </div>
            <div>
                <NavLink to="/mainpage/cart" className="text-orange-400">  <Badge color="primary" badgeContent={count}>
                    <ShoppingCartOutlinedIcon />
                </Badge >
                </NavLink>
            </div>
            <div className="hidden lg:flex flex-row justify-around items-center gap-3 links">
                <NavLink to='/mainpage/home'>Home</NavLink>
                <NavLink to='/mainpage/help'>Help?</NavLink>
                <NavLink to='/mainpage/confirm'>Confirm</NavLink>
                <NavLink to="/mainpage/account">  <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt={`${email.toUpperCase()}`}
                    src="/broken-image.jpg"
                /></NavLink>
                <Button onClick={handleLogout}>Log Out</Button>
            </div>
            <div className="block lg:hidden"><MenuDrawer /></div>
        </div >
    );
}

export default Navbar;
