import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../App";
import OrderCard from "./OrderCard";
import { message, DatePicker, Select, Spin } from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("order-token");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${base_url}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("order-token")}`,
        },
      });
      console.log("result", result);
      setOrders(result.data);
      setFilteredOrders(result.data);
      extractUsers(result.data);
    } catch (error) {
      message.error("Error fetching orders");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const extractUsers = (orders) => {
    const users = orders.map((order) => order.user);
    const uniqueUsers = Array.from(new Set(users.map((user) => user.id))).map(
      (id) => {
        return users.find((user) => user.id === id);
      }
    );
    setUsers(uniqueUsers);
  };

  useEffect(() => {
    if (!token) return;
    fetchOrders();
  }, [token]);

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    filterOrders(value, dateRange, userFilter);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    filterOrders(statusFilter, dates, userFilter);
  };

  const handleUserFilterChange = (value) => {
    setUserFilter(value);
    filterOrders(statusFilter, dateRange, value);
  };

  const filterOrders = (status, dates, user) => {
    let filtered = orders;
    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }
    if (dates && dates.length === 2) {
      const [start, end] = dates;
      filtered = filtered.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate);
        return deliveryDate >= start && deliveryDate <= end;
      });
    }
    if (user) {
      filtered = filtered.filter((order) => order.user.id === user);
    }
    setFilteredOrders(filtered);
  };

  return (
    <div className="p-6">
      <h1>Orders</h1>
      <div
        className="filters"
        style={{ display: "flex", gap: "20px", marginBottom: "20px" }}
      >
        <Select
          placeholder="Filter by status"
          style={{ width: 200 }}
          onChange={handleStatusFilterChange}
        >
          <Option value="">All</Option>
          <Option value="pending">Pending</Option>
          <Option value="done">Done</Option>
          <Option value="canceled">Canceled</Option>
        </Select>
        <RangePicker onChange={handleDateRangeChange} />
        <Select
          placeholder="Filter by user"
          style={{ width: 200 }}
          onChange={handleUserFilterChange}
        >
          <Option value="">All</Option>
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
      </div>
      <Spin spinning={loading}>
        {filteredOrders.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                fetchOrders={fetchOrders}
              />
            ))}
          </div>
        ) : (
          <div className="no-data-card">
            <p>No orders available.</p>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default Orders;
