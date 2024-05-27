import { useEffect, useState } from 'react';
import axios from 'redaxios';
import OrdersTableStructure from './OrdersTableStructure';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [completedOrderIds, setCompletedOrderIds] = useState(new Set());
    const [table, setTable] = useState("pending");

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get('https://mule-foods.onrender.com/orderapi/getorders');
                setOrders(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getOrders();

        // Set up WebSocket connection
        const socket = new WebSocket('wss://mule-foods.onrender.com/orderapi/socket');


        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'new_order') {
                setOrders((prevOrders) => [...prevOrders, message.order]);
            } else if (message.type === 'update_order') {
                setOrders((prevOrders) => prevOrders.map(order => order.id === message.order.id ? message.order : order));
            }
        };


    }, []);

    const handleCheckboxChange = async (orderId) => {
        const isChecked = completedOrderIds.has(orderId);
        setCompletedOrderIds(prevCompletedOrderIds => {
            const newCompletedOrderIds = new Set(prevCompletedOrderIds);
            if (isChecked) {
                newCompletedOrderIds.delete(orderId);
            } else {
                newCompletedOrderIds.add(orderId);
            }
            return newCompletedOrderIds;
        });

        try {
            const status = isChecked ? 'pending' : 'completed';// Determine the new status based on the current checkbox state
            const response = await axios.put(`https://mule-foods.onrender.com/orderapi/updateorderstatus/${orderId}`, { status });
            if (response.status === 200) {
                setOrders(prevOrders => {
                    return prevOrders.map(order => {
                        if (order.id === orderId) {
                            return { ...order, status };
                        } else {
                            return order;
                        }
                    });
                });
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const pendingOrders = orders.filter(order => order.status !== "completed");
    const completedOrders = orders.filter(order => order.status === "completed");

    const totalQuantity = orders.reduce((sum, order) => sum + order.totalQuantity, 0);
    const totalCost = orders.reduce((sum, order) => sum + order.totalCost, 0);

    return (
        <div className="p-4">
            <h1 className='italic text-orange-900'>Welcome To The Admin Dashboard</h1>
            <div className="flex gap-3 m-3 items-center justify-center">
                <div className='flex flex-col gap-2'>
                    <div className="bg-gray-200 rounded-lg p-4 w-28 h-20 flex justify-center items-center">
                        <button className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {orders.length} Orders
                        </button>
                    </div>
                    <div className="bg-gray-200 rounded-lg w-28 h-20 p-4 flex justify-center items-center" onClick={() => { setTable("pending") }} >
                        <button className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {pendingOrders.length} Pending Orders
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className="bg-gray-200 rounded-lg p-4 w-28 h-20 flex justify-center items-center" onClick={() => { setTable("complete") }}>
                        <button className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {completedOrders.length} Completed
                        </button>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-4 w-28 h-20 flex justify-center items-center">
                        <button className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {orders.length - completedOrders.length - pendingOrders.length} Cancelled
                        </button>
                    </div>
                </div>
            </div>

            {table === "pending" && (
                <>
                    {/* <h2 className="text-lg font-semibold mt-4">Pending Orders</h2> */}
                    <OrdersTableStructure orderList={pendingOrders} completedOrderIds={completedOrderIds} handleCheckboxChange={handleCheckboxChange} />
                </>
            )}

            {table === "complete" && (
                <>
                    {/* <h2 className="text-lg font-semibold mt-4">Completed Orders</h2> */}
                    <OrdersTableStructure orderList={completedOrders} completedOrderIds={completedOrderIds} handleCheckboxChange={handleCheckboxChange} />
                </>
            )}

            <div className="mt-4 px-4 py-2  border-gray-300 flex items-center gap-3">
                <h1 className="font-semibold">Total  Ordered : {totalQuantity} plates</h1> |
                <h1 className="font-semibold">Total Cost: Kshs.{totalCost}</h1>
            </div>
        </div>
    );
}

export default Orders;
