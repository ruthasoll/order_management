import './App.css'
import { Outlet } from "react-router"
import Navbar from './components/Navbar'
function App() {
  

  return (
    <>
    <Navbar />
    <div className='py-4 px-2'>
    <Outlet />
    </div>
    </>
  )
}

export default App
