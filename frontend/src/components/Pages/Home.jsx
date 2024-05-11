import { Button } from "@mui/material"
import { Products } from "../Helper/Products"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import CheckIcon from '@mui/icons-material/Check';
function Home() {
    const [selectedItemsId, setSelectedItemsId] = useState([])
    // const [tickItem, setTickItem] = useState(false)
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
                        <img src={item.image} className=" w-60 h-60 rounded-md" />
                        <p className="text-slate-800  font-bold">{item.name}</p>
                        <div className="flex flex-row justify-between items-center gap-10"> <p className=" bg-white   rounded-md"><span className=" p-2">$</span>{item.price}</p>
                            <span className={` ${CheckId(item.id) ? `` : "hidden "}`}>
                                <Button onClick={() => { removeSelectedId(item.id) }}> <span><CheckIcon /></span>Added</Button>
                            </span>
                            <span className={` ${CheckId(item.id) ? `hidden` : ""}`}>
                                <Button onClick={() => { handleSelectedId(item.id) }}>Buy</Button>
                            </span>
                        </div>

                    </div>
                ))}
            </div>
            <div className="mb-5 p-2"><button><NavLink to='/mainpage/help' className="m-5 border p-2 border-orange-400 rounded-md">Help Center</NavLink></button></div>
        </div >
    )
}

export default Home