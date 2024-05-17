import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { jwtDecode } from 'jwt-decode';

function Confirmation() {
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    setPhone(decodedToken.userPhone);
                    setLocation(decodedToken.userLocation);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page
            }
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-300 rounded-full p-3">
                        <DoneIcon fontSize="large" />
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-4">Your Order Was Successful</h2>
                <p className="text-gray-600 mb-4">It will be delivered to <span className="text-blue-500">{phone} at {location}</span> in one (1) hour.</p>
                <p className="text-gray-600 mb-4">Thank You</p>
                <button className="bg-blue-500 text-white py-2 px-6 rounded-md mb-4"><NavLink to='/mainpage/account'>Change Location</NavLink></button>
                <button className="border border-orange-400 text-blue-500 py-2 px-6 rounded-md"><NavLink to='/mainpage/help'>Contact Us <ArrowForwardIcon /></NavLink></button>
            </div>
        </div>
    );
}

export default Confirmation;
