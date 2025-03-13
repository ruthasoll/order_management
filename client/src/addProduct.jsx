// src/AddProduct.js
import React, { useState } from 'react';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('availableQuantity', availableQuantity);

        // You can replace this URL with your actual API endpoint
        const response = await fetch('http://localhost:8000/api/products', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Product added successfully');
        } else {
            alert('Failed to add product');
        }
    };

    return (
        <div className=" mt-15 max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Add Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Available Quantity:</label>
                    <input
                        type="number"
                        value={availableQuantity}
                        onChange={(e) => setAvailableQuantity(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-yellow-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;