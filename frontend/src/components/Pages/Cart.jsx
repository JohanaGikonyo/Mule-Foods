import { useState, useEffect } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { cartItems } from "../Store/Store";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Cart() {
    const { items, updateItemQuantity, removeItem, increment, decrement } = cartItems((state) => ({
        items: state.items,
        increment: state.increment,
        decrement: state.decrement,
        updateItemQuantity: state.updateItemQuantity,
        removeItem: state.removeItem
    }));
    const [totalCost, setTotalCost] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const totalCost = items.reduce((sum, item) => sum + item.itemCost, 0);
        const totalQuantity = items.reduce((sum, item) => sum + item.itemQuantity, 0);
        setTotalCost(totalCost);
        setTotalQuantity(totalQuantity);
    }, [items]);

    const handleIncrement = (itemName) => {
        updateItemQuantity(itemName, 1);
        increment();
    };

    const handleDecrement = (itemName) => {
        decrement();
        const item = items.find(item => item.itemName === itemName);
        if (item.itemQuantity === 1) {
            removeItem(itemName);
        } else if (item.itemQuantity > 1) {
            updateItemQuantity(itemName, -1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10 ml-5 px-20 overflow-x-auto">
            <div className="shadow-lg bg-white overflow-hidden sm:rounded-lg">
                <table className="min-w-full  divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="lg:px-4 lg:py-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost (Kshs.)</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr key={item.itemName}>
                                <td className="lg:px-4 lg:py-4 px-6 py-3 whitespace-wrap">{item.itemName}</td>
                                <td className="lg:px-4 lg:py-4 px-6 py-3 whitespace-nowrap">{item.itemQuantity}</td>
                                <td className="lg:px-4 lg:py-4 px-6 py-3 whitespace-nowrap">Kshs.{item.itemCost}</td>
                                <td className="lg:px-4 lg:py-4 px-6 py-3 whitespace-nowrap">
                                    <button
                                        className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1"
                                        onClick={() => handleDecrement(item.itemName)}
                                        disabled={item.itemQuantity < 1}
                                    >
                                        <RemoveIcon />
                                    </button>
                                    <button
                                        className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1 ml-2"
                                        onClick={() => handleIncrement(item.itemName)}
                                    >
                                        <AddIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100">
                            <td className="lg:px-4 lg:py-4 px-6 py-3 font-semibold">Total</td>
                            <td className="lg:px-4 lg:py-4 px-6 py-3 font-semibold">{totalQuantity}</td>
                            <td className="lg:px-4 lg:py-4 px-6 py-3 font-semibold">Kshs.{totalCost}</td>
                            <td></td>
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
                <div className="mt-10 mb-10">
                    <button className="px-1 py-1 border border-orange-400 rounded-md">
                        <NavLink to='/mainpage/confirm' className="flex flex-row">Complete <span className="text-blue-500"><ArrowForwardIcon /></span></NavLink>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Cart;
