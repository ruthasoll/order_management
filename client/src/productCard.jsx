// src/ProductCard.js
import React, { useState } from 'react';
import QuantityModal from './modal';

const ProductCard = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 cursor-pointer" onClick={handleCardClick}>
            <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
            <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">Price: ${product.price}</p>
                <p className="text-gray-700 mb-2">Available Quantity: {product.availableQuantity}</p>
            </div>
            <QuantityModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                productName={product.name} // Pass the product name here
            />
        </div>
    );
};

export default ProductCard;