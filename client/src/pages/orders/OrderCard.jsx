import React from "react";
import { Card, Tag, Button, Select, message, Popconfirm } from "antd";
import axios from "axios";
import { base_url } from "../../App";

const { Option } = Select;

const OrderCard = ({ order, fetchOrders }) => {
  const handleStatusChange = async (value) => {
    try {
      const result = await axios.put(
        `${base_url}/orders/${order.id}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("order-token")}`,
          },
        }
      );
      if (result.status === 200) {
        message.success("Order status updated successfully");
        fetchOrders();
      }
    } catch (error) {
      message.error("Error updating order status");
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await axios.delete(`${base_url}/orders/${order.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("order-token")}`,
        },
      });
      if (result.status === 200) {
        message.success("Order deleted successfully");
        fetchOrders();
      }
    } catch (error) {
      message.error("Error deleting order");
      console.error("Error deleting order:", error);
    }
  };

  return (
    <Card title={`Order ID: ${order.id}`} style={{ marginBottom: 20 }}>
      <p>
        <strong>User:</strong> {order.user.name} ({order.user.email})
      </p>
      <p>
        <strong>Delivery Date:</strong>{" "}
        {new Date(order.deliveryDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <Tag
          color={
            order.status === "pending"
              ? "orange"
              : order.status === "done"
              ? "green"
              : "red"
          }
        >
          {order.status}
        </Tag>
      </p>
      <p>
        <strong>Items:</strong>
      </p>
      <ul>
        {order.items.map((item) => (
          <li key={item.product.id} className="shadow mb-2 mt-2 p-2">
            {item.product.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <Select
        defaultValue={order.status}
        style={{ width: 120 }}
        onChange={handleStatusChange}
      >
        <Option value="pending">Pending</Option>
        <Option value="done">Done</Option>
        <Option value="canceled">Canceled</Option>
      </Select>
      <Popconfirm
        title="Are you sure you want to delete this order?"
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
      >
        <Tag color={"red"} style={{ marginLeft: 10 }}>
          <Button type="danger">Delete</Button>
        </Tag>
      </Popconfirm>
    </Card>
  );
};

export default OrderCard;
