import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { cartItems } from "../Store/Store";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertTitle, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { useAuthStore } from "../Store/Store";
import axios from 'redaxios';

function Cart() {
    const { items, updateItemQuantity, removeItem, increment, decrement, clearItems } = cartItems((state) => ({
        items: state.items,
        increment: state.increment,
        decrement: state.decrement,
        updateItemQuantity: state.updateItemQuantity,
        removeItem: state.removeItem,
        clearItems: state.clearItems
    }));
    const [state] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;
    const [totalCost, setTotalCost] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [location, setLocation] = useState("");
    const [name, setName] = useState("");
    const [circularProgress, setCircularProgress] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const token = useAuthStore(state => state.token)
    const navigate = useNavigate();

    useEffect(() => {
        const totalCost = items.reduce((sum, item) => sum + item.itemCost, 0);
        const totalQuantity = items.reduce((sum, item) => sum + item.itemQuantity, 0);
        setTotalCost(totalCost);
        setTotalQuantity(totalQuantity);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken) {
                    setName(decodedToken.userName);
                    setLocation(decodedToken.userLocation);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle error, maybe redirect to login page
            }
        }
    }, [items, token]);

    const handleIncrement = (itemName) => {
        updateItemQuantity(itemName, 1);
        increment(1)
    };

    const handleDecrement = (itemName) => {
        const itemIndex = items.findIndex(item => item.itemName === itemName);
        const updatedItems = [...items];
        decrement(1)
        if (updatedItems[itemIndex].itemQuantity <= 0) {
            removeItem(itemName);
        } else {
            updateItemQuantity(itemName, -1);
        }
    };



    const handleCompleteOrder = async (e) => {
        e.preventDefault();
        const productsToSend = items.map(item => ({
            productName: item.itemName,
            quantity: item.itemQuantity
        }));
        try {
            if (totalQuantity !== 0) {
                setCircularProgress(true);
                const response = await axios.post('https://mule-foods.onrender.com/orderapi/order', {
                    location, name, totalCost, totalQuantity, products: productsToSend
                });

                setCircularProgress(false);
                if (response.data === 'Order successful') {
                    decrement(totalQuantity);
                    navigate('/mainpage/confirm');
                    clearItems(); // Clear cart items
                } else {
                    setFailAlert(true);
                }
            } else {
                setFailAlert(true);
            }
        } catch (error) {
            console.error("An error occurred", error);
            setCircularProgress(false);
            setFailAlert(true);
        }
    };



    const handleFailClose = () => {
        setFailAlert(false);
        navigate('/mainpage/cart');
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10 px-2 md:px-20">
            <Snackbar open={failAlert} autoHideDuration={3000} onClose={handleFailClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleFailClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                    <AlertTitle>Failed</AlertTitle>
                    Failed!
                </Alert>
            </Snackbar>
            <div className="shadow-lg bg-white overflow-hidden sm:rounded-lg w-full">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-1 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6 md:py-3 border border-gray-300">Product</th>
                            <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6 md:py-3 border border-gray-300">Quantity</th>
                            <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6 md:py-3 border border-gray-300">Cost (Kshs.)</th>
                            <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6 md:py-3 border border-gray-300">Update</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr key={item.itemName}>
                                <td className="px-1 py-2 md:px-6 md:py-3 whitespace-wrap border border-gray-300">{item.itemName}</td>
                                <td className="px-1 py-2 md:px-6 md:py-3 whitespace-nowrap border border-gray-300">{item.itemQuantity}</td>
                                <td className="px-1 py-2 md:px-6 md:py-3 whitespace-nowrap border border-gray-300">Kshs.{item.itemCost}</td>
                                <td className="px-1 py-2 md:px-6 md:py-3 whitespace-nowrap border border-gray-300 flex justify-around">
                                    <button
                                        className="text-blue-400 font-extrabold rounded-full p-1"
                                        onClick={() => { handleDecrement(item.itemName) }}
                                        disabled={item.itemQuantity < 1}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </button>

                                    <button
                                        className="text-blue-400 font-extrabold rounded-full p-1 ml-1"
                                        onClick={() => { handleIncrement(item.itemName) }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </button>

                                </td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100">
                            <td className="px-1 py-2 md:px-6 md:py-3 font-semibold border border-gray-300">Total</td>
                            <td className="px-1 py-2 md:px-6 md:py-3 font-semibold border border-gray-300">{totalQuantity}</td>
                            <td className="px-1 py-2 md:px-6 md:py-3 font-semibold border border-gray-300">Kshs.{totalCost}</td>
                            <td className="border border-gray-300"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex gap-3 mt-10">
                <div className="mt-10 mb-10">
                    <button className="px-2 py-1 border border-orange-400 rounded-md">
                        <NavLink to='/mainpage/home' className="flex flex-row"><span className="text-blue-500"><ArrowBackIcon /> </span>Back</NavLink>
                    </button>
                </div>

                <div>
                    {circularProgress ? (
                        <div className='w-[100%] rounded-md bg-slate-100 z-30'>
                            <Button className='font-bold p-1 rounded-md flex items-center gap-1'><span className='p-3'><CircularProgress /></span>Please Wait...</Button>
                        </div>
                    ) : (
                        <div className="mt-10 mb-10">
                            <button className="px-1 py-1 border border-orange-400 rounded-md">
                                <button className="flex flex-row" onClick={handleCompleteOrder}>Complete <span className="text-blue-500"><ArrowForwardIcon /></span></button>
                            </button>
                        </div>)}
                </div>

            </div>
        </div >
    );
}

export default Cart;
