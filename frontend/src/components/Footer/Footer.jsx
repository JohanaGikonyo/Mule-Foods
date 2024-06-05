import Divider from '@mui/material/Divider';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <div className='mt-10'>
            <Divider />
            <div className='flex justify-between items-center p-5 gap-2'>
                <small className='text-black flex flex-col items-start justify-around'><NavLink to='mainpage/home' className='flex text-black'><span className='text-orange-400 flex'>Mule </span> Foods</NavLink><span className='italic'>Faster than a phone Call</span> </small>
                <small className='flex items-center justify-around'>
                    <CopyrightIcon size={5} />copyright{new Date().getFullYear()}
                </small>
            </div >
        </div >
    );
}

export default Footer;
