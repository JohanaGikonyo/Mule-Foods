import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { NavLink } from 'react-router-dom';
import SegmentIcon from '@mui/icons-material/Segment';
import HomeIcon from '@mui/icons-material/Home';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import CloseIcon from '@mui/icons-material/Close';
import { jwtDecode } from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
const MenuDrawer = () => {
    const [open, setOpen] = useState(false);
    const [email, setName] = useState("")
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token from local storage
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    setName(decodedToken.userEmail)

                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page

            }
        }
    }, []);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 320 }} role="presentation" onClick={toggleDrawer(false)} className='flex flex-col gap-5 '>
            <div className='flex justify-between items-center p-3'>
                <div className=" text-2xl italic font-semibold"><h1><span className="text-orange-400">Mule</span> Foods</h1></div>

                <button><CloseIcon /></button>
            </div>
            <Divider />
            <List className='flex flex-col justify-around items-center gap-5 links'>
                <span className='flex items-center justify-between gap-4'> <HomeIcon /><NavLink to='/mainpage/home'>Home</NavLink></span>
                <span className='flex items-center justify-between gap-4'><HelpCenterIcon /><NavLink to='/mainpage/help'>Help?</NavLink></span>
                <NavLink to='/mainpage/confirm'>Cornfirm</NavLink>
                <Button onClick={handleLogout}>Log Out</Button>
            </List>
            <Divider />
            <List className='flex flex-col justify-around items-center gap-5'>
                <span className='flexh items-center justify-between gap-4'><span>      <Avatar
                    sx={{ bgcolor: deepOrange[500] }}
                    alt={`${email.toUpperCase()}`}
                    src="/broken-image.jpg"
                />
                </span><Button><NavLink to="/mainpage/account">Account</NavLink></Button></span>
                <small>{email}</small>

            </List>

        </Box >
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><SegmentIcon /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div >
    );
}
export default MenuDrawer;
