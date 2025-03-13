import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
export const base_url = "http://localhost:8000/api";

function App() {
  return (
    <>
      <Navbar />
      <div className="py-4 px-2">
        <Outlet />
      </div>
    </>
  );
}

export default App;
