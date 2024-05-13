import { Button } from "@mui/material"
import { Products } from "../Helper/Products"
import { NavLink, Link } from "react-router-dom"
import { useState } from "react"
import CheckIcon from '@mui/icons-material/Check';
function Home() {
    const [selectedItemsId, setSelectedItemsId] = useState([])
    const handleSelectedId = (itemId) => {
        setSelectedItemsId([...selectedItemsId, itemId])
    }
    const removeSelectedId = (itemId) => {
        setSelectedItemsId(selectedItemsId.filter((id) => id !== itemId));
    }
    const CheckId = (itemId) => {
        return selectedItemsId.includes(itemId)
    }

    return (
        <div className="flex flex-col gap-3">
            <div >

                <h1 className=" text-2xl italic font-semibold m-5"><span className="text-orange-400">Mule</span> Foods</h1>
                <p>Click On the Food to Order</p>
            </div>

            <div className="grid lg:grid-cols-3 justify-around  m-2 items-center gap-3 grid-cols-2">
                {Products.map((item) => (
                    <div key={item.id} className="flex flex-col items-center justify-between bg-slate-50 p-2 rounded-md">
                        <Link to={`/mainpage/product/${item.id}`} >
                            <img src={item.image} className=" w-60 h-60 rounded-md" />
                            <p className=" text-orange-400  ">{item.name}</p>
                            <div className="flex flex-row justify-between items-center gap-10"> <p className=" bg-white font-extrabold text-2xl  rounded-md"><span className=" text-orange-400  p-2">$</span>{item.price}</p>
                                <span className={` ${CheckId(item.id) ? `` : "hidden "}`}>
                                    <Button onClick={() => { removeSelectedId(item.id) }}> <span><CheckIcon /></span>Added</Button>
                                </span>
                                <span className={` ${CheckId(item.id) ? `hidden` : ""}`}>
                                    <Button onClick={() => { handleSelectedId(item.id); }}>Order</Button>
                                </span>
                            </div>
                        </Link>
                    </div >
                ))
                }
            </div >
            <div className="mb-5 p-2"><button><NavLink to='/mainpage/help' className="m-5 border p-2 border-orange-400 rounded-md">Help Center</NavLink></button></div>
        </div >
    )
}

export default Home