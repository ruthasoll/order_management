import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Orders =  () => {
    const [orders, setOrders] = useState([])
    const token = localStorage.getItem("order-token");

    useEffect(()=>{
        const fetchOrders = async ()=>{
            const base_url = "http://localhost:8000/api"
            try{
                const result = await axios.get(`${base_url}/orders`)
                console.log("result", result)
                // setorders(result.data)
            }catch(error){
                console.log("error", error)
            }
        }
        if(!token) return;
        fetchOrders()
    },[])
  return (
    <div>
        {orders.map((order)=> <>order</>)}
    </div>
  )
}

export default Orders