import React from 'react';
import ProductList from './productList';
import Navbar from './navbar';
const Home = () =>{ 
    return (
        <div className=" rounded-lg overflow-hidden shadow-lg bg-white">
            <Navbar/>
         <ProductList/>
        </div>
    );
}

export default Home;