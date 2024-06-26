import { useEffect, useState } from 'react';
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
import { useAuthStore } from '../Store/Store';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
const MenuDrawer = () => {
    const clearToken = useAuthStore((state) => state.clearToken);
    const token = useAuthStore(state => state.token)
    const [open, setOpen] = useState(false);
    const [email, setName] = useState("")
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/mainpage/home')
    }
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
                    setName(decodedToken.userEmail)

                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page

            }
        }
    }, [token]);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 320 }} role="presentation" onClick={toggleDrawer(false)} className='flex flex-col gap-5 '>
            <div className='flex justify-between items-center p-3'>
                <div className=" text-2xl italic font-semibold"><h1 onClick={handleLogoClick}><span className="text-orange-400">Mule</span> Foods</h1></div>

                <button><CloseIcon /></button>
            </div>
            <Divider />
            <List className='flex flex-col justify-around items-center gap-5 links'>
                <span className='flex items-center justify-between gap-4'> <HomeIcon /><NavLink to='/mainpage/home'>Home</NavLink></span>
                <span className='flex items-center justify-between gap-4'><HelpCenterIcon /><NavLink to='/mainpage/help'>Help?</NavLink></span>
                <NavLink to='/mainpage/confirm'>Confirm</NavLink>
                <Button onClick={handleLogout}>Log Out</Button>
                <Button><NavLink to='/mainpage/admin'>Admin</NavLink></Button>
            </List>
            <Divider />
            <div className='flex flex-col justify-around items-center gap-5'>
                <div className='flex flex-row items-center justify-around'>
                    <span className='flexh items-center justify-between gap-4'><span>      <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt={`${email.toUpperCase()}`}
                        src="/broken-image.jpg"
                    />
                    </span>
                        <Button><NavLink to="/mainpage/account">Account</NavLink></Button></span>
                </div>
                <small>{email}</small>

            </div>

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
