import { useParams } from "react-router-dom"
import { Products } from "../Helper/Products";
function ProductDetail() {
    const { id } = useParams();
    const product = Products.find(product => product.id === parseInt(id));
    if (!product) {
        return <div>Product Not Found. Such Another Item.</div>
    }
    return (
        <div>
            <div className="flex flex-row items-center  bg-slate-50 p-2 rounded-md">
                <img src={product.image} alt="" className=" w-60 h-60 rounded-md m-10" />
                <div className="flex flex-col gap-10 m-10">
                    <p className=" text-orange-400  ">{product.name}</p>
                    <div className="flex flex-row justify-between items-center gap-10"> <p className=" bg-white font-extrabold text-2xl  rounded-md"><span className=" text-orange-400  p-2">$</span>{product.price}</p></div>
                    <button className="px-2 py-1 bg-blue-400 rounded-md text-white">Order</button>
                </div>
            </div>


        </div>
    )
}

export default ProductDetail