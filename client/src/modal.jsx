// src/QuantityModal.js
import React, { useState } from 'react';

const QuantityModal = ({ isOpen, onClose, productName }) => {
    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState('');
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate delivery date
        if (!deliveryDate || new Date(deliveryDate) < new Date(today)) {
            alert('Delivery date cannot be in the past.');
            return;
        }

        // Here you would handle form submission (e.g., call API)
        console.log(`Order placed: ${quantity} of ${productName} for delivery on ${deliveryDate}`);
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">Specify Your Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Quantity:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            className="border rounded-md w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Delivery Date:</label>
                        <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            min={today} // Set minimum date to today
                            className="border rounded-md w-full p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-md px-4 py-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuantityModal;