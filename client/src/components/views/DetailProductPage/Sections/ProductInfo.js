import { Button, Descriptions } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function ProductInfo(props) {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);

  const addToCarthandler = () => {
    props.addToCart(props.detail._id);
  };

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{Product.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {Product.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />

      <div>
        <Button
          size="large"
          shape="round"
          type="danger"
          onClick={addToCarthandler}
        >
          Add it Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
