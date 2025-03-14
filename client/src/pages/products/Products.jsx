import React, { useState, useEffect } from "react";
import axios from "axios";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Button, List, InputNumber, message, Spin } from "antd";
import ProductCard from "./ProductCard";
import CreateProductModal from "./CreateProductModal";
import { base_url } from "../../App";




const Products = () => {
  useEffect(() => {
    const token = localStorage.getItem("order-token");

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        if (!token) return true; // No token means expired
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        return Date.now() > expirationTime; // Check if current time is past expiration
    };

    if (isTokenExpired(token)) {
        // Redirect to sign-in if the token is expired or nonexistent
        window.location.href = '/login';
    }
}, []);

  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      const result = await axios.get(`${base_url}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("order-token")}`,
        },
      });
      if (result.status === 200) {
        setProducts(result.data);
      }
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity < product.avaliableQnty) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          message.error("Cannot add more than available quantity");
          return prevCart;
        }
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);
      if (existingProduct.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      } else {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setLoading(true);
    try {
      const user = localStorage.getItem("user-id"); // Assuming user ID is stored in localStorage
      const order = {
        user,
        items: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
        deliveryDate: new Date(),
      };
      const result = await axios.post(`${base_url}/orders`, order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("order-token")}`,
        },
      });
      if (result.status === 201) {
        message.success("Order created successfully");
        window.location.href = "/orders";
      }
    } catch (error) {
      message.error("Error creating order");
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openCreateProductModal = () => {
    setIsCreateProductModalOpen(true);
  };

  const closeCreateProductModal = () => {
    setIsCreateProductModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      <div className="flex justify-between md:col-span-4">
        <h1>Explore Products</h1>
        <Button
          type="primary"
          onClick={openCreateProductModal}
          style={{ marginBottom: 20 }}
        >
          Create Product
        </Button>
      </div>
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
      <aside
        className="md:col-span-1"
        style={{
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {cart.length > 0 && <h2>Order Cart</h2>}
        <List
          itemLayout="horizontal"
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              className="mb-2 p-4"
              actions={[
                <MinusCircleOutlined onClick={() => removeFromCart(item.id)} />,

                <InputNumber
                  min={1}
                  max={item.avaliableQnty}
                  value={item.quantity}
                  onChange={(value) =>
                    setCart((prevCart) =>
                      prevCart.map((cartItem) =>
                        cartItem.id === item.id
                          ? { ...cartItem, quantity: value }
                          : cartItem
                      )
                    )
                  }
                />,
                <PlusCircleOutlined onClick={() => addToCart(item)} />,
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={`Price: ${item.price}`}
              />
            </List.Item>
          )}
        />
        {cart.length > 0 && (
          <Button type="primary" onClick={showModal} style={{ marginTop: 20 }}>
            Place Order
          </Button>
        )}
      </aside>
      <Modal
        title="Confirm Order"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Spin spinning={loading}>
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={`Price: ${item.price}, Quantity: ${item.quantity}`}
                />
              </List.Item>
            )}
          />
          <p>
            Total:{" "}
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </p>
          <p>Are you sure you want to place this order?</p>
        </Spin>
      </Modal>
      <CreateProductModal
        open={isCreateProductModalOpen}
        onClose={closeCreateProductModal}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

export default Products;
