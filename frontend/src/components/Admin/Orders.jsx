import axios from 'redaxios';
import { useEffect, useState } from 'react';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [completedOrderIds, setCompletedOrderIds] = useState(new Set());

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
            const status = isChecked ? 'pending' : 'completed'; // Toggle status
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


    const totalQuantity = orders.reduce((sum, order) => sum + order.totalQuantity, 0);
    const totalCost = orders.reduce((sum, order) => sum + order.totalCost, 0);


    const totalOrders = orders.length;
    const completedOrders = orders.filter(order => order.status === "completed").length;
    const pendingOrders = orders.filter(order => order.status !== "completed").length;


    // Helper function to get month name
    function getMonthName(monthIndex) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthNames[monthIndex];
    }

    return (
        <div className="p-4">
            <div>
                <span className='flex flex-row gap-3 justify-around items-center'>
                    <button>{totalOrders} Orders</button>
                    <button>{completedOrders} Completed</button>
                </span>
                <span className='flex flex-row gap-3 justify-around items-center'>
                    <button>{pendingOrders} Pending</button>
                    <button>{orders.length - completedOrders - pendingOrders} Cancelled</button>
                </span>
            </div>
            <div className="shadow-lg bg-white overflow-x-auto sm:rounded-lg w-full">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">No.</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">UserName</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Products</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Location</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Time</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Check</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => {
                            const orderDate = new Date(order.createdAt);

                            // Format the date
                            const formattedDate = `${orderDate.getDate()} ${getMonthName(orderDate.getMonth())} ${orderDate.getFullYear()}`;

                            // Format the time
                            const hours = orderDate.getHours() % 12 || 12; // Convert to 12-hour format
                            const minutes = orderDate.getMinutes().toString().padStart(2, '0');
                            const amOrPm = orderDate.getHours() < 12 ? 'AM' : 'PM';
                            const formattedTime = `${hours}:${minutes} ${amOrPm}`;

                            return (
                                <tr key={order.id}>
                                    <td className="px-2 py-2 align-text-top whitespace-normal border border-gray-300">{order.id}</td>
                                    <td className="px-2 py-2 align-text-top whitespace-normal border border-gray-300">{order.name}</td>
                                    <td className="px-2 py-2 align-text-top whitespace-normal border border-gray-300">
                                        {JSON.parse(order.products).map((item) => (
                                            <div key={item.productName}>{item.productName} - {item.quantity} plates</div>
                                        ))}
                                    </td>
                                    <td className="px-2 py-2 whitespace-normal border border-gray-300">{order.location}</td>
                                    <td className="px-2 py-2 whitespace-normal border border-gray-300">{formattedDate} {formattedTime}</td>
                                    <td className="px-2 py-2 whitespace-normal border border-gray-300">
                                        <input
                                            type='checkbox'
                                            checked={completedOrderIds.has(order.id) || order.status === "completed"}
                                            onChange={() => { handleCheckboxChange(order.id); }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <h1 className="px-2 py-2 font-semibold border border-gray-300">Total Plates Ordered: {totalQuantity} Plates</h1>
                <h1 className="px-2 py-2 font-semibold border border-gray-300">Total Cost: Kshs.{totalCost}</h1>
            </div>
        </div>
    );
}

export default Orders;
