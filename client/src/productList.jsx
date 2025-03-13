import React from 'react';
import ProductCard from './productCard';
const ProductList = () => {
    // Dummy data for products
    const products = [
        {
            id: 1,
            name: "Nike Air MX Super 2500 - Red",
            price: 449,
            availableQuantity: 20,
            image: "https://via.placeholder.com/300x200?text=Nike+Air+MX+Super+2500",
        },
        {
            id: 2,
            name: "Adidas Ultraboost 21 - Black",
            price: 180,
            availableQuantity: 15,
            image: "https://via.placeholder.com/300x200?text=Adidas+Ultraboost+21",
        },
        {
            id: 3,
            name: "Puma RS-X - Blue",
            price: 110,
            availableQuantity: 10,
            image: "https://via.placeholder.com/300x200?text=Puma+RS-X",
        },
        {
            id: 4,
            name: "New Balance 990v5 - Grey",
            price: 185,
            availableQuantity: 5,
            image: "https://via.placeholder.com/300x200?text=New+Balance+990v5",
        },
        {
            id: 5,
            name: "Reebok Classic - White",
            price: 75,
            availableQuantity: 30,
            image: "https://via.placeholder.com/300x200?text=Reebok+Classic",
        },
        {
            id: 6,
            name: "Asics Gel-Kayano 27 - Blue",
            price: 160,
            availableQuantity: 12,
            image: "https://via.placeholder.com/300x200?text=Asics+Gel-Kayano+27",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center p-5">
            {products.map(product => (
                <div key={product.id} className="w-1/3 p-2"> {/* Adjust width for three cards per row */}
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductList;