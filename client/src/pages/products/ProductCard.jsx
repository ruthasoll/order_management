import React from "react";
import { Card, Tooltip } from "antd";
import { PlusCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ product, addToCart }) => {
  const handleImageError = (e) => {
    e.target.src = "";
    e.target.style.backgroundColor = "grey";
  };

  return (
    <Card
      key={product.id}
      // cover={
      //   <img
      //     alt={product.name}
      //     src={product.productImage}
      //     onError={handleImageError}
      //     style={{ height: 200, objectFit: "cover" }}
      //   />
      // }
      // actions={[
      //   <Tooltip title="Add to Cart">
      //     <PlusCircleOutlined key="add" onClick={() => addToCart(product)} />
      //   </Tooltip>,
      // ]}
      style={{ position: "relative" }}
    >
      <Tooltip title="Add to Cart">
        <PlusCircleOutlined
          onClick={() => addToCart(product)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 24,
            color: "#1890ff",
            cursor: "pointer",
          }}
        />
      </Tooltip>
      <Meta title={product.name} description={product.description} />
      <div className="mt-2 w-full flex items-center justify-between">
        <p className="flex items-center gap-x-2 justify-between">
          <span className="text-xs text-zinc-600">Price</span>{" "}
          <span className="font-bold text-xs">{product.price}</span>
        </p>
        <p className="flex items-center gap-x-2 justify-between">
          <span className="text-xs text-zinc-600">Quantity</span>{" "}
          <span className="font-bold text-xs">{product.avaliableQnty}</span>
        </p>
      </div>
    </Card>
  );
};

export default ProductCard;
