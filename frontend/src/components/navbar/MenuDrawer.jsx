import * as React from 'react';
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
import Person2Icon from '@mui/icons-material/Person2';
import { useUser } from '../Store/Store';
const MenuDrawer = () => {
    const [open, setOpen] = React.useState(false);
    const { userData } = useUser((state) => ({
        userData: state.userData
    }))
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 380 }} role="presentation" onClick={toggleDrawer(false)} className='flex flex-col gap-5 '>
            <div className='flex justify-between items-center p-3'>
                <div className=" text-2xl italic font-semibold"><h1><span className="text-orange-400">Mule</span> Foods</h1></div>

                <button><CloseIcon /></button>
            </div>
            <Divider />
            <List className='flex flex-col justify-around items-center gap-5'>
                <span className='flex items-center justify-between gap-4'> <HomeIcon /><NavLink to='/mainpage/home'>Home</NavLink></span>
                <span className='flex items-center justify-between gap-4'><HelpCenterIcon /><NavLink to='/mainpage/help'>Help?</NavLink></span>
                <NavLink to='/mainpage/confirm'>Cornfirm</NavLink>
            </List>
            <Divider />
            <List className='flex flex-col justify-around items-center gap-5'>
                <span className='flexh items-center justify-between gap-4'><span><Person2Icon /></span><Button><NavLink to="/account">Account</NavLink></Button></span>
                <small>{userData.map((user) => (
                    <div key={user.id}>
                        <p>{user.userEmail}</p>
                    </div>
                ))}</small>

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
