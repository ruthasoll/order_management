import React, { useState } from "react";
import { Button, Form, Input } from "antd";

const AuthForm = ({ btnTitle, onSubmit, isLogin, children }) => {
  return (
    <Form layout={"vertical"} onFinish={onSubmit}>
      {!isLogin && (
        <Form.Item
          label="Name"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
      )}
      <Form.Item
        label="Email"
        name={"email"}
        rules={[
          {
            required: true,
            message: "Please input a valid email address !",
          },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name={"password"}
        rules={[
          {
            required: true,
            message: "Please input password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>
      {!isLogin && (
        <Form.Item
          label="Confirm Password"
          name={"confirmPassword"}
          rules={[
            {
              required: true,
              message: "Please Confirm your password!",
            },
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {btnTitle}
        </Button>
        {children}
      </Form.Item>
    </Form>
  );
};
export default AuthForm;
