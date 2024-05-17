import { Button } from "@mui/material";
import { Products } from "../Helper/Products";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ProductDetail from "./ProductDetail";
import { useItemStore } from "../Store/Store";

function Home() {
    const { setProduct, productDetailVisible, setProductDetailVisible } = useItemStore((state) => ({
        setProduct: state.setProduct,
        productDetailVisible: state.productDetailVisible,
        setProductDetailVisible: state.setProductDetailVisible
    }));
    const [selectedItemsId, setSelectedItemsId] = useState([]);

    const handleSelectedId = (itemId) => {
        setSelectedItemsId([...selectedItemsId, itemId]);
    };


    const CheckId = (itemId) => {
        return selectedItemsId.includes(itemId);
    };

    const handleProduct = (item) => {
        setProductDetailVisible();
        setProduct({
            itemId: Math.ceil(Math.random()),
            itemName: item.name,
            itemPrice: item.price,
            itemPriceBefore: item.priceBefore
        });
    }

    return (
        <div>
            <div className="flex justify-around items-center ">
                <div className="z-30 fixed top-[25%] ">
                    {productDetailVisible ? <ProductDetail /> : ""}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-2xl italic font-semibold m-5">
                        <span className="text-orange-400">Mule</span> Foods
                    </h1>
                    <p>Click on the food to order</p>
                </div>

                <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 m-2">
                    {Products.map((item) => (
                        <div key={item.id} className="bg-slate-50 p-4 rounded-md shadow-md hover:cursor-pointer" onClick={() => { handleProduct(item) }}>
                            <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                            <div className="flex justify-around items-center mb-2">
                                {item.priceBefore && <strike className="text-gray-500">Ksh.{item.priceBefore}</strike>}
                                <p className="bg-slate-50 font-extrabold rounded-md">
                                    <span className="text-orange-400 p-2">Ksh.</span>{item.price}
                                </p>
                            </div>

                            <Button
                                onClick={() => { handleSelectedId(item.id) }}
                                disabled={CheckId(item.id)}
                            >
                                {CheckId(item.id) ? "Added" : "Order"}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="mb-5 p-2">
                    <button>
                        <NavLink to='/mainpage/help' className="m-5 border p-2 border-orange-400 rounded-md">Help Center</NavLink>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
