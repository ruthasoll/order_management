import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [data,setData]= useState(
        {
            name:"",
            email:"",
            password:"",

        }
    )
    const navigate =  useNavigate()
    const signupUser = async(e) =>{
            e.preventDefault()
            const {name, email, password} = data

            if (!name) {
                toast.error('Name is required');
                return;
            }
            if (!email) {
                toast.error('Email is required');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                toast.error('Email is invalid');
                return;
            }
            if (!password) {
                toast.error('Password is required');
                return;
            }
            if (password.length < 8) {
                toast.error('Password must be at least 8 characters long');
                return;
            }
            try {
                const {data} = await axios.post('http://localhost:8000/signup',{
                    name, email, password
                })

                if(data.error){
                    toast.error(data.error)
                }else{
                    setData({ name: "", email: "", password: "" })
                    toast.success('signup sucessful')
                    navigate('/login')
                }
                
            } catch (error) {
                // console.log(error)
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Error response:', error.response.data);
                    toast.error(error.response.data.error || 'Something went wrong');
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Error request:', error.request);
                    toast.error('No response from server');
                } else {
                    // Something happened in setting up the request
                    console.error('Error message:', error.message);
                    toast.error('Error in sending request');
                }
            }
    }
  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg">
           <h2 className="text-2xl font-bold text-center mb-5">Signup</h2>
        <form onSubmit={signupUser}>
            <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input className="w-full p-2 border rounded" type='text' placeholder='enter name' value={data.name} onChange={(e)=> setData({...data,name:e.target.value })} required />
            </div>
            <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input className="w-full p-2 border rounded" type='email' placeholder='enter email' value={data.email} onChange={(e)=> setData({...data,email:e.target.value})} required/>
            </div>
            <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input  className="w-full p-2 border rounded" type='password' placeholder='enter password' value={data.password} onChange={(e)=> setData({...data,password:e.target.value})} required />
            </div>
            
            <button className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-blue-600 transition" type='submit'>Signup</button>
        </form>
        <p className="mt-4 text-center">
                Already have an account?{' '}
                <button
                    onClick={() => navigate('/login')}
                    className="text-yellow-500 hover:underline"
                >
                    Please login
                </button>
            </p>
    </div>
  )
}

export default Signup