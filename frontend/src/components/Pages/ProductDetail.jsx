import { useParams, NavLink } from "react-router-dom"
import { useState } from "react";
import { Products } from "../Helper/Products";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
function ProductDetail() {
    const [count, setCount] = useState(1)
    const { id } = useParams();
    const product = Products.find(product => product.id === parseInt(id));
    if (!product) {
        return <div>Product Not Found. Such Another Item.</div>
    }
    return (
        <div>
            <div className="flex flex-col lg:flex-row relative items-center  bg-slate-50 p-2 rounded-md">
                <div className="absolute right-[10%] top-5 z-30"> <NavLink to="/mainpage/home" ><CloseIcon /></NavLink></div>
                <div className="relative">
                    <img src={product.image} alt="" className=" w-60 h-60 rounded-md m-10" />
                    <p className="bg-orange-400 text-white absolute rounded p-1 bottom-[20%] left-[15%]">{product.discount}</p>
                </div>
                <div className="flex flex-col gap-10 m-10">
                    <div className="flex flex-row justify-between items-center gap-10"><span ><small>Item : </small></span><p className=" text-orange-400  ">{product.name}</p></div>
                    <div className="flex flex-row justify-between items-center gap-10"><small><span>Price : </span></small> <p className=" bg-white font-extrabold text-2xl  rounded-md"><span className=" text-orange-400  p-2">$</span>{product.price}</p></div>
                    <strike>
                        <h3>
                            <span className="text-orange-400  p-2">$</span>{product.priceBefore}
                        </h3>
                    </strike>
                    <div className="flex gap-5 items-center">
                        {count === 1 ? <button className="text-slate-400 rounded-full bg-slate-200 p-1"><RemoveIcon /></button>
                            :
                            <button className="text-blue-400 font-extrabold  rounded-full bg-slate-200 p-1" onClick={() => setCount(count - 1)}><RemoveIcon /></button>
                        }
                        {count}
                        <button className="text-blue-400 font-extrabold rounded-full bg-slate-200 p-1" onClick={() => setCount(count + 1)}> <AddIcon /></button>
                    </div>
                    <div> <button className="px-2 py-1 bg-stone-300 rounded-md text-white font-semibold">Add {count} for ${product.price * count}</button> </div>

                </div>
            </div>


        </div >
    )
}

export default ProductDetail