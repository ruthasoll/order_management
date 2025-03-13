import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCompactDisc, faCompass, faEye, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <div className="h-screen w-1/5 bg-white shadow-lg p-5 border-r border-gray-300">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">Order Management</h2>
            <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-700"><FontAwesomeIcon icon={faCompass} className="text-yellow-500 mr-2" />Explore</h3>
                <ul>
                    <li className="my-2">
                        <button className="text-gray-600 hover:text-blue-500 transition duration-300">
                            Explore Products
                        </button>
                    </li>
                </ul>
            </div>
            
            <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-700"><FontAwesomeIcon icon={faEye} className="text-yellow-500 mr-2" />All Orders</h3>
                <button className="text-gray-600 hover:text-blue-500 transition duration-300" onClick={() => navigate('/orderTable')}>
                
                    View All Orders
                </button>
            </div>
            <button className="bg-yellow-500 mt-100 text-black-500 hover:underline transition duration-300 px-9 py-2">
                Logout
            </button>
        </div>
    );
};

export default Sidebar;