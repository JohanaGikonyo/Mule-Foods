import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Products } from "../Helper/Products";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { cartItems } from "../Store/Store";
function ProductDetail() {
    const { increment, decrement, addItems } = cartItems((state) => ({
        increment: state.increment,
        decrement: state.decrement,
        addItems: state.addItems
    }));
    const { id } = useParams();
    const [amount, setAmount] = useState(() => {
        // Retrieve amount value from localStorage if available, otherwise default to 0
        return parseInt(localStorage.getItem(`product_${id}_amount`) || 0);
    });

    useEffect(() => {
        // Save amount value to localStorage whenever it changes
        localStorage.setItem(`product_${id}_amount`, amount);
    }, [amount, id]);

    useEffect(() => {
        // Reset amount value to zero in localStorage when the component unmounts (page is reloaded)
        const handleUnload = () => {
            // Iterate through all products and clear their amount from localStorage
            Products.forEach(product => {
                localStorage.removeItem(`product_${product.id}_amount`);
            });
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    const product = Products.find(product => product.id === parseInt(id));
    if (!product) {
        return <div>Product Not Found. Please select another item.</div>;
    }

    const handleAddItems = () => {
        addItems({
            itemId: Math.ceil(Math.random() * 1000000),
            itemImage: product.image,
            itemName: product.name,
            itemPrice: product.price
        })
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row relative items-center bg-slate-50 p-2 rounded-md">
                <div className="absolute right-[10%] top-5 z-30">
                    <NavLink to="/mainpage/home">
                        <CloseIcon />
                    </NavLink>
                </div>
                <div className="relative">
                    <img src={product.image} alt="" className="w-60 h-60 rounded-md m-10" />
                    <p className="bg-orange-400 text-white absolute rounded p-1 bottom-[20%] left-[15%]">{product.discount}</p>
                </div>
                <div className="flex flex-col justify-around  gap-5 m-10">
                    <div className="flex flex-row justify-around  items-center gap-2">
                        <span><small>Item:</small></span>
                        <p className="text-orange-400">{product.name}</p>
                    </div>
                    <div className="flex flex-row justify-around  items-center gap-2">
                        <small><span>Price:</span></small>
                        <p className=" font-extrabold text-2xl rounded-md">
                            <span className="text-orange-400 p-2">$</span>{product.price}
                        </p>
                    </div>
                    <strike>
                        <h3>
                            <span className="text-orange-400 p-2">$</span>{product.priceBefore}
                        </h3>
                    </strike>
                    <div className="flex gap-5 items-center">
                        {amount === 0 ? (
                            <button className="text-slate-400 rounded-full bg-slate-200 p-1" disabled><RemoveIcon /></button>
                        ) : (
                            <button className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1" onClick={() => { decrement(); setAmount(amount - 1) }}><RemoveIcon /></button>
                        )}
                        {amount}
                        <button className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1" onClick={() => { increment(); setAmount(amount + 1) }}><AddIcon /></button>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-2 py-1 bg-stone-300 rounded-md text-white font-semibold">
                            Add {amount} for ${product.price * amount}
                        </button>
                        <Button onClick={handleAddItems}>Order</Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
