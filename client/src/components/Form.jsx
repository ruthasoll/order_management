import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"), // Name must not be empty
  email: z.string().email("Invalid email address"), // Email validation
  password: z.string().min(6, "Password must be at least 6 characters"), // Password validation
  confirmPassword: z
    .string()
    .min(6, "Confirm password must match the password")
    .refine((val, ctx) => val === ctx.parent.password, {
      message: "Passwords must match",
    }),
  role: z.enum(["user", "admin"]).optional(), // Enum validation for role
});

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Form layout={"vertical"} onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Name"
        validateStatus={errors.name && "error"}
        help={errors.name?.message}
      >
        <Input placeholder="Enter your name" {...register("name")} />
      </Form.Item>
      <Form.Item
        label="Email"
        validateStatus={errors.email && "error"}
        help={errors.email?.message}
      >
        <Input placeholder="Enter your email" {...register("email")} />
      </Form.Item>
      <Form.Item
        label="Password"
        validateStatus={errors.password && "error"}
        help={errors.password?.message}
      >
        <Input.Password
          placeholder="Enter your password"
          {...register("password")}
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        validateStatus={errors.confirmPassword && "error"}
        help={errors.confirmPassword?.message}
      >
        <Input.Password
          placeholder="Confirm your password"
          {...register("confirmPassword")}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AuthForm;
