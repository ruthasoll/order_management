import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import Signup from "./pages/auth/Signup.jsx";
import Login from "./pages/auth/Login.jsx";
import Products from "./pages/products/Products.jsx";
import Orders from "./pages/orders/Orders.jsx";
import "@ant-design/v5-patch-for-react-19";
import { Routes, Route } from "react-router";
import AuthLayout from "./pages/auth/AuthLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            
          </Route>
        
      </Routes>

    </BrowserRouter>
  </StrictMode>
);
