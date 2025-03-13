import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCompactDisc, faCompass, faEye, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const logout = async (token) => {
        try {
            const response = await axios.post('http://localhost:8000/logout', { token });
            console.log(response.data); // Handle the response (e.g., show a message)
        } catch (error) {
            console.error('Error logging out:', error.response.data);
        }
    };
    
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between h-16 bg-white shadow-lg p-4 border-b border-gray-300">
            <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
            <div className="flex space-x-6">
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faCompass} className="text-yellow-500 mr-2" />
                    <button className="text-gray-600 hover:text-yellow-500 transition duration-300" onClick={() => navigate('/home')}>
                        Explore Products
                    </button>
                </div>

                <div className="flex items-center">
                    <FontAwesomeIcon icon={faCompass} className="text-yellow-500 mr-2" />
                    <button className="text-gray-600 hover:text-yellow-500 transition duration-300" onClick={() => navigate('/addProduct')}>
                        Add Products
                    </button>
                </div>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faEye} className="text-yellow-500 mr-2" />
                    <button className="text-gray-600 hover:text-yellow-500 transition duration-300" onClick={() => navigate('/orderTable')}>
                        View All Orders
                    </button>
                </div>
                <button className="bg-yellow-500 text-black hover:bg-yellow-1000 transition duration-300 px-4 py-2 rounded" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;