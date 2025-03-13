import React from 'react';
import Navbar from './navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const OrdersTable = () => {
    // Dummy data for orders
    const orders = [
        { id: 1, productName: 'Mobile Phone', orderQuantity: 2, deliveryDate: '13/03/2025' },
        { id: 2, productName: 'Laptop', orderQuantity: 1, deliveryDate: '15/03/2025' },
        { id: 3, productName: 'Headphones', orderQuantity: 5, deliveryDate: '20/03/2025' },
        { id: 4, productName: 'Smartwatch', orderQuantity: 3, deliveryDate: '18/03/2025' },
    ];

    const handleDelete = (id) => {
        // Handle delete operation
        console.log(`Delete order with id: ${id}`);
    };

    const handleEdit = (id) => {
        // Handle edit operation
        console.log(`Edit order with id: ${id}`);
    };

    return (
        <>
        <Navbar/>
            <div className="overflow-x-auto">

<table className="mt-8 min-w-full border-collapse border border-gray-300">
    <thead>
        <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Order Number</th>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Order Quantity</th>
            <th className="border border-gray-300 p-2">Delivery Date</th>
            <th className="border border-gray-300 p-2">Operation</th>
        </tr>
    </thead>
    <tbody>
        {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">{order.productName}</td>
                <td className="border border-gray-300 p-2">{order.orderQuantity}</td>
                <td className="border border-gray-300 p-2">{order.deliveryDate}</td>
                <td className="border border-gray-300 p-2">
                    <button
                        onClick={() => handleEdit(order.id)}
                        className="text-blue-500 hover:underline mr-2"
                    >
                        <FontAwesomeIcon icon={faEdit} className="text-yellow-500 mr-2"/>
                    </button>
                    <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-500 hover:underline"
                    >
                        <FontAwesomeIcon icon={faTrash} className="text-orange-600 mr-2"/>
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
</div>
        </>
        
    );
};

export default OrdersTable;