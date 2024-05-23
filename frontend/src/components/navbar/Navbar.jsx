import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/Store';
import { cartItems } from "../Store/Store";
import MenuDrawer from "./MenuDrawer";
import { jwtDecode } from 'jwt-decode';
function Navbar() {
    const { count } = cartItems((state) => ({
        count: state.count
    }))
    const clearToken = useAuthStore((state) => state.clearToken);
    const token = useAuthStore((state) => state.token);
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const handleLogout = () => {
        clearToken()
        // Redirect to SignIn page
        navigate('/');
    };
    useEffect(() => {
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
    }, [token]);
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