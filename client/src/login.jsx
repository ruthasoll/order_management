import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Login = () => {
    const [data,setData]=useState({ 
        email:"",
        password:"",
})
    // const navigate = useNavigate()
    // const loginUser = async(e) =>{
    //     e.preventDefault()
    //     const {email,password}=data
    //     try {
    //         const {data} = await axios('http://localhost:8000/login',{
    //             email,password
    //         })
    //         if(data.error){
    //             toast.error(data.error)
    //         }
    //         else{
    //             setData({})
    //             navigate('/')
    //         }
    //     } catch (error) {
    //         toast.error('login failed try again.'); 
    //         console.error(error); 
    //     }
    
    //     // axios.get('/')
    // }
    const navigate = useNavigate()
    const loginUser = async (e) => {
        e.preventDefault(); // Pass the event object here
        const { email, password } = data;
        try {
            const response = await axios.post('http://localhost:8000/login', { email, password }); // Use POST method and correct syntax
            const responseData = response.data; // Get the response data
            
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                setData({ email: "", password: "" }); // Reset fields to initial state
                navigate('/home'); // Redirect to home
            }
        } catch (error) {
            toast.error('Login failed. Please try again.'); // Handle error
            console.error(error); // Log error for debugging
        }
    };
  return (
    <div className="max-w-md mx-auto mt-30 p-5 border rounded shadow-lg">
         <h2 className="text-2xl font-bold text-center mb-5">Login</h2>
        <form onSubmit={loginUser}>
            <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input  className="w-full p-2 border rounded" type='email' placeholder='enter email' value={data.email} onChange={(e)=> setData({...data, email:e.target.value})} required/>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input className="w-full p-2 border rounded" type='password' placeholder='enter password' value={data.password} onChange={(e)=> setData({...data, password:e.target.value})} required/>
            </div>
            
            <button className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition" type='submit'>Login</button>
        </form>
        <p className="mt-4 text-center">
                If you don't have an account,{' '}
                <button
                    onClick={() => navigate('/signup')}
                    className="text-yellow-500 hover:underline"
                >
                    create one
                </button>
            </p>
    </div>
  )
}

export default Login