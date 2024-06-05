import { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";
import { Products } from "../Helper/Products";
import { cartItems } from "../Store/Store";
function Homes() {
    const [amounts, setAmounts] = useState(Products.map(() => 0));
    const { addItems, increment, decrement } = cartItems();

    const updateAmount = (index, delta) => {
        setAmounts(prevAmounts => {
            const updatedAmounts = [...prevAmounts];
            updatedAmounts[index] = Math.max(updatedAmounts[index] + delta, 0);
            return updatedAmounts;
        });

    };

    const handleAddItemToCart = (item, delta) => {
        const amount = amounts[item.id - 1];
        delta > 0 ? decrement(amount) : increment(amount);
        if (amount > 0) {
            addItems({
                itemName: item.name,
                itemPrice: item.price,
                itemCost: item.price * amount,
                itemQuantity: amount
            });
            setAmounts(prevAmounts => {
                const updatedAmounts = [...prevAmounts];
                updatedAmounts[item.id - 1] = 0;
                return updatedAmounts;
            });
        }
    };

    return (
        <div className="flex flex-row p-4">
            <div className="flex-grow">
                <div>
                    <h1 className="text-2xl italic font-semibold mb-5 text-center">
                        <span className="text-orange-400">Mule</span> Foods
                    </h1>
                    <p className="text-center mb-5">Click on the + to order Food Item</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Products.map((item) => (
                        <div key={item.id} className="flex justify-center items-center">
                            <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-md">
                                <div className="flex flex-col items-center gap-5">
                                    <p className="text-lg font-extrabold">{item.name}</p>
                                    <p className="font-bold">
                                        <span className="text-orange-400">Ksh.</span>{item.price}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="text-blue-400 font-extrabold rounded-full p-1"
                                            onClick={() => updateAmount(item.id - 1, -1)}
                                            disabled={amounts[item.id - 1] === 0}
                                            aria-label="Decrease quantity"
                                        >
                                            <RemoveIcon />
                                        </button>
                                        {amounts[item.id - 1]}
                                        <button
                                            className="text-blue-400 font-extrabold rounded-full p-1"
                                            onClick={() => updateAmount(item.id - 1, 1)}
                                            aria-label="Increase quantity"
                                        >
                                            <AddIcon />
                                        </button>
                                    </div>
                                    <Button
                                        disabled={amounts[item.id - 1] === 0}
                                        onClick={() => handleAddItemToCart(item)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Order
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <NavLink to='/mainpage/help' className="border p-2 border-orange-400 rounded-md">Help Center</NavLink>
                </div>
            </div>

        </div>
    );
}

export default Homes;
