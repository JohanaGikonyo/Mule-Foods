import PropTypes from 'prop-types';
function OrdersTableStructure({ orderList, completedOrderIds, handleCheckboxChange }) {
    // Helper function to get month name
    function getMonthName(monthIndex) {
        const monthNames = ['Jan', 'Feb', 'March', 'Apr.', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[monthIndex];
    }

    return (
        <div className="shadow-lg bg-white overflow-x-auto sm:rounded-lg w-full mt-4">
            <div className="inline-block min-w-full">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 table-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">No.</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">UserName</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Products</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40 border border-gray-300">Location</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Time</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">Check</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orderList.map((order, index) => {
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
                                        <td className="px-4 py-2 align-text-top border border-gray-300 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-4 py-2 align-text-top border border-gray-300 whitespace-nowrap">{order.name}</td>
                                        <td className="px-4 py-2 align-text-top border border-gray-300 max-w-sm whitespace-nowrap break-words">
                                            {JSON.parse(order.products).map((item) => (
                                                <div key={item.productName}>{item.productName} - {item.quantity} plates</div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 whitespace-nowrap w-72 break-words">{order.location}</td>
                                        <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{formattedDate} {formattedTime}</td>
                                        <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
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
                </div>
            </div>
        </div>
    );
}

OrdersTableStructure.propTypes = {
    orderList: PropTypes.array.isRequired,
    completedOrderIds: PropTypes.instanceOf(Set).isRequired,
    handleCheckboxChange: PropTypes.func.isRequired // Add this line
};

export default OrdersTableStructure;
