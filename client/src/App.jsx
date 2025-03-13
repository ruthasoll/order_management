import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
import Signup from './signup'
import Login from './login'
import Navbar from './navbar'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import OrdersTable from './orderTale'
import Sidebar from './sidebar'
import QuantityModal from './modal'
import AddProduct from './addProduct'
axios.default.baseURL = 'http://localhost:8000'
function App() {
  

  return (
    <>
      <Router>
        
        
        
        <Toaster position='bottom-right' toastOption={{duration:3000}} />
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/orderTable' element={<OrdersTable/>}/>
        <Route path='/modal' element={<QuantityModal/>}/>
        <Route path='/addProduct' element={<AddProduct/>}/>
      </Routes>
      </Router>
      
    </>
  )
}

export default App
