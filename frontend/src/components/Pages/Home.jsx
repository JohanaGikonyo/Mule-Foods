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


    const incrementAmount = (index) => {
        console.log("Incrementing amount for index:", index);
        setAmounts(prevAmounts => {
            const updatedAmounts = [...prevAmounts];
            updatedAmounts[index] += 1;
            console.log("Updated amounts:", updatedAmounts);
            return updatedAmounts;
        });
        increment(); // Increment total count
    };

    const decrementAmount = (index) => {
        console.log("Decrementing amount for index:", index);
        if (amounts[index] > 0) {
            setAmounts(prevAmounts => {
                const updatedAmounts = [...prevAmounts];
                updatedAmounts[index] -= 1;
                console.log("Updated amounts:", updatedAmounts);
                return updatedAmounts;
            });
            decrement(); // Decrement total count
        }
    };


    const handleAddItemToCart = (item) => {
        console.log("Item:", item);
        const amount = amounts[item.id - 1];
        console.log("Amount:", amount);
        if (amount > 0) {
            // Add item to the cart
            console.log("Adding item to cart:", item);
            addItems({
                itemName: item.name,
                itemPrice: item.price,
                itemCost: item.price * amount,
                itemQuantity: amount
            });
            // Reset the amount to 0 after adding the item to the cart
            setAmounts(prevAmounts => {
                const updatedAmounts = [...prevAmounts];
                updatedAmounts[item.id - 1] = 0; // Reset amount after adding to cart
                return updatedAmounts;
            });
        }
    };




    return (
        <div className="grid">
            {/* <div className={`flex flex-col gap-3 text-center ${productDetailVisible ? 'filter blur-sm' : ''}`}> */}
            <div>
                <h1 className="text-2xl italic font-semibold m-5">
                    <span className="text-orange-400">Mule</span> Foods
                </h1>
                <p>Click on the + to order Food Item</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 p-2 m-2 gap-3">
                {Products.map((item) => (
                    <div key={item.id} className="inset-0 flex justify-center items-center">
                        <div className="relative bg-white p-5 rounded-md shadow-lg w-full max-w-md md:max-w-2xl lg:max-w-4xl">
                            <div className="absolute top-2 right-2"></div>
                            <div className="flex flex-col lg:flex-row justify-around items-center gap-5">
                                <div className="flex flex-col justify-around items-center gap-5 m-10">
                                    <div className="flex flex-row justify-around items-center gap-2">
                                        <span><small>Item:</small></span>
                                        <p className="text-orange-400">{item.name}</p>
                                    </div>
                                    <div className="flex flex-row justify-around items-center gap-2">
                                        <small><span>Price:</span></small>
                                        <p className="font-extrabold text-2xl rounded-md">
                                            <span className="text-orange-400 p-2">Ksh.</span>{item.price}
                                        </p>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                        <button className="flex gap-1 items-center border rounded-md border-slate-400 px-2 py-1">
                                            <button
                                                className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1"
                                                onClick={() => decrementAmount(item.id - 1)}
                                                disabled={amounts[item.id - 1] === 0}
                                            >
                                                <RemoveIcon />
                                            </button>
                                            {amounts[item.id - 1]}
                                            <button
                                                className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1"
                                                onClick={() => incrementAmount(item.id - 1)}
                                            >
                                                <AddIcon />
                                            </button>
                                        </button>
                                        <span>Plates</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="px-2 py-1 bg-gray-300 rounded text-gray-800">
                                            Add {amounts[item.id - 1]} for Ksh.{item.price * amounts[item.id - 1]}
                                        </button>
                                        <Button disabled={amounts[item.id - 1] === 0} onClick={() => handleAddItemToCart(item)} variant="contained" color="primary">Order</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="mb-5 p-2">
                <button>
                    <NavLink to='/mainpage/help' className="m-5 border p-2 border-orange-400 rounded-md">Help Center</NavLink>
                </button>
            </div>
        </div>
    );
}

export default Homes;
