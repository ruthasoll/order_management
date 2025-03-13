import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Products =  () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async ()=>{
            const base_url = "http://localhost:8000/api"
            try{
                const result = await axios.get(`${base_url}/products`)
                console.log("result", result)
                // setProducts(result.data)
            }catch(error){
                console.log("error", error)
            }
        }
        fetchProducts()
    },[])
  return (
    <div>
        {products.map((product)=> <>product</>)}
    </div>
  )
}

export default Products