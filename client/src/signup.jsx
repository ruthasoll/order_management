import React, { useState } from 'react'

const Signup = () => {
    const [data,setData]= useState(
        {
            name:"",
            email:"",
            password:"",

        }
    )
    const signupUser = (e) =>{
            e.preventDefault()
    }
  return (
    <div>
        <form onSubmit={signupUser}>
            <label>Name</label>
            <input type='text' placeholder='enter name' value={data.name} onChange={(e)=> setData({...data,name:e.target.value })} />
            <label>Email</label>
            <input type='email' placeholder='enter email' value={data.email} onChange={(e)=> setData({...data,email:e.target.value})}/>
            <label>Password</label>
            <input type='password' placeholder='enter password' value={data.password} onChange={(e)=> setData({...data,password:e.target.value})} />
            <button type='submit'>Signup</button>
        </form>
    </div>
  )
}

export default Signup