import { Button } from "@mui/material";
import { Products } from "../Helper/Products";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

function Home() {
    const [selectedItemsId, setSelectedItemsId] = useState([]);

    const handleSelectedId = (itemId) => {
        setSelectedItemsId([...selectedItemsId, itemId]);
    };

    const removeSelectedId = (itemId) => {
        setSelectedItemsId(selectedItemsId.filter((id) => id !== itemId));
    };

    const CheckId = (itemId) => {
        return selectedItemsId.includes(itemId);
    };

    return (
        <div className="flex flex-col gap-3">
            <div>
                <h1 className=" text-2xl italic font-semibold m-5"><span className="text-orange-400">Mule</span> Foods</h1>
                <p>Click on the food to order</p>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 m-2">
                {Products.map((item) => (
                    <div key={item.id} className="bg-slate-50 p-4 rounded-md shadow-md">
                        <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                        <p className=" bg-slate-50 font-extrabold   rounded-md"><span className=" text-orange-400  p-2">$</span>{item.price}</p>

                        {CheckId(item.id) ? (
                            <Button
                                onClick={() => { removeSelectedId(item.id) }}
                                variant="contained"
                                disabled
                                endIcon={<CheckIcon />}
                                className="bg-green-500 text-white"
                            >
                                Added
                            </Button>
                        ) : (
                            <Button
                                onClick={() => { handleSelectedId(item.id) }}

                            >
                                Order
                            </Button>
                        )}
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

export default Home;
