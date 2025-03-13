import React, { useState } from "react";
import { Modal, Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { base_url } from "../../App";

const CreateProductModal = ({ open, onClose, fetchProducts }) => {
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = async (values) => {
    setLoading(true);
    try {
      const result = await axios.post(`${base_url}/products`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("order-token")}`,
        },
      });
      if (result.status === 201) {
        message.success("Product created successfully");
        fetchProducts();
        onClose();
      }
    } catch (error) {
      message.error("Error creating product");
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Create Product" open={open} onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={handleCreateProduct}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter the product price" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        {/* <Form.Item
          name="productImage"
          label="Product Image URL"
          rules={[
            { required: true, message: "Please enter the product image URL" },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="avaliableQnty"
          label="Available Quantity"
          rules={[
            { required: true, message: "Please enter the available quantity" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
