import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../App";

import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: "12id",
      name: "product-1",
      description:
        "product description product description product description product description product description",
      productImage:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      avaliableQnt: 20,
      price: 140,
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(`${base_url}/products`);
        console.log("result", result);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      {products.map((product) => (
        <Card
          key={product.id}
          style={{ width: 300 }}
          cover={<img alt={product.name} src={product.productImage} />}
          actions={[
            <EditOutlined key="edit" />,
            <PlusCircleOutlined key="add" />,
          ]}
        >
          <Meta title={product.name} description={product.description} />
          <div className="mt-2 w-full flex items-center justify-between">
            <p className="flex items-center gap-x-2 justify-between">
              <span className="text-xs text-zinc-600">Price</span>{" "}
              <span className="font-bold text-xs">{product.price}</span>
            </p>
            <p className="flex items-center gap-x-2 justify-between">
              <span className="text-xs text-zinc-600">Quantity</span>{" "}
              <span className="font-bold text-xs">{product.avaliableQnt}</span>
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Products;
