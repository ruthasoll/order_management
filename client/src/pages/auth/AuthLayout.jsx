import React from 'react'
import { Outlet, useNavigate } from "react-router";
import {useLocation} from "react-router-dom"
import { useEffect } from 'react';

const AuthLayout = () => {

    const token = localStorage.getItem("order-token");
    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname.replace("/", "")

    useEffect(() => {
        console.log("location", location)
       
        
      if (token) {
        if(route === 'login' || route === 'signup'){
               navigate("/")
            return;
            }else{
                return
            //    navigate("/login") 
            }
      }else{
        if(route === 'login' || route === 'signup'){
        //    navigate("/login")
        return;
        }else{
           navigate("/login") 
        }
      }
    }, [route]);

  return (
    <div><Outlet  /></div>
  )
}

export default AuthLayout