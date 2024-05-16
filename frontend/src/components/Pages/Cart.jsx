import { cartItems } from "../Store/Store"
function Cart() {
    const { items } = cartItems((state) => ({
        items: state.items
    }))
    return (
        <div>
            {items.map((item) => (<div key={item.itemId} className="flex flex-col gap-2 items-center m-3">
                <img src={item.itemImage} alt="" className="w-40 h-40" />
                <h2>{item.itemName}</h2>
                <h3>cost : $ {item.itemPrice}</h3>
            </div>))}
        </div>
    )
}

export default Cart