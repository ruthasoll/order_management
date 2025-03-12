import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
import Signup from './signup'
import Login from './login'
import Navbar from './navbar'
function App() {
  

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </Router>
      
    </>
  )
}

export default App
