import { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { cartItems, useItemStore } from "../Store/Store";

function ProductDetail() {
    const [amount, setAmount] = useState(0);

    const { increment, decrement, addItems } = cartItems((state) => ({
        increment: state.increment,
        decrement: state.decrement,
        addItems: state.addItems
    }));

    const { product, setProductDetailVisible } = useItemStore((state) => ({
        product: state.product,
        setProductDetailVisible: state.setProductDetailVisible
    }));

    const handleAddItemToCart = () => {
        if (amount > 0) {
            addItems({
                itemName: product.itemName,
                itemPrice: product.itemPrice,
                itemCost: product.itemPrice * amount,
                itemQuantity: amount
            });
            setAmount(0); // Reset amount after adding to cart
            setProductDetailVisible(false);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
            <div className="relative bg-white p-5 rounded-md shadow-lg w-full max-w-md md:max-w-2xl lg:max-w-4xl">
                <div className="absolute top-2 right-2">
                    <button onClick={() => setProductDetailVisible(false)} className="text-orange-400">
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row justify-around items-center gap-5">
                    <div className="flex flex-col justify-around items-center gap-5 m-10">
                        <div className="flex flex-row justify-around items-center gap-2">
                            <span><small>Item:</small></span>
                            <p className="text-orange-400">{product.itemName}</p>
                        </div>
                        <div className="flex flex-row justify-around items-center gap-2">
                            <small><span>Price:</span></small>
                            <p className="font-extrabold text-2xl rounded-md">
                                <span className="text-orange-400 p-2">Ksh.</span>{product.itemPrice}
                            </p>
                        </div>

                        <div className="flex gap-5 items-center">
                            <button className="flex gap-1 items-center border rounded-md border-slate-400 px-2 py-1">
                                {amount === 0 ? (
                                    <button className="text-slate-400 rounded-full bg-slate-200 p-1" disabled>
                                        <RemoveIcon />
                                    </button>
                                ) : (
                                    <button className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1" onClick={() => { decrement(); setAmount(amount - 1) }}>
                                        <RemoveIcon />
                                    </button>
                                )}

                                {amount}

                                <button className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1" onClick={() => { increment(); setAmount(amount + 1) }}>
                                    <AddIcon />
                                </button>
                            </button>
                            <span>Plates</span>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-2 py-1 bg-slate-300 rounded-md text-slate-800">
                                Add {amount} for Ksh.{product.itemPrice * amount}
                            </button>
                            <Button onClick={handleAddItemToCart} disabled={amount === 0}>Order</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
