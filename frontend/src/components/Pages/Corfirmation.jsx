import { Avatar, Stack } from "@mui/material"
import { green } from '@mui/material/colors';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Corfirmation() {
    const [location, setLocation] = useState("")
    const [phone, setPhone] = useState()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    setPhone(decodedToken.userPhone)
                    setLocation(decodedToken.userLocation)
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page

            }
        }
    }, []);

    return (
        <div className="flex flex-col justify-around items-center m-6 p-3">
            <Stack>
                <Avatar sx={{ bgcolor: green[300], width: 100, height: 100 }} >
                    <span className=""><DoneIcon /></span>
                </Avatar>
            </Stack>
            <div>
                <h2>Your Order was Succefull</h2>
                <h4 >It will be delivered to
                    <span className="text-blue-500  p-1  thanks ">{phone}  at {location}</span>

                    in one(1) Hour
                </h4>
                <h5 >Thank You</h5>
                <Button><NavLink to='/mainpage/account'>Change Location?</NavLink></Button>
                <div className="mt-10 mb-10"><button className="px-2 py-1 border border-orange-400 rounded-md"><NavLink to='/mainpage/help'>Contact Us <span className="text-blue-500"><ArrowForwardIcon /></span></NavLink></button></div>
            </div>
        </div >
    )
}

export default Corfirmation