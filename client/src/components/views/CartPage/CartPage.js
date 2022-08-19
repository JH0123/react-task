import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  //   onSuccessBuy,
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Result, Empty } from "antd";
import Axios from "axios";

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (res) => {
            if (res.payload.length > 0) {
              calculateTotal(res.payload);
            }
          }
        );
      }
    }
  }, [props.user.userData]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = (productId) => {
    // dispatch(removeCartItem(productId)).then((res) => {
    //   if (res.payload.cartDetail.length <= 0) {
    //     setShowTotal(false);
    //   } else {
    //     calculateTotal(res.payload.cartDetail);
    //   }
    // });

    dispatch(removeCartItem(productId)).then(() => {
      Axios.get("/api/users/userCartInfo").then((res) => {
        if (res.data.success) {
          if (res.data.cartDetail.length <= 0) {
            setShowTotal(false);
          } else {
            calculateTotal(res.data.cartDetail);
          }
        } else {
          alert("Failed to get cart info");
        }
      });
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        {ShowTotal ? (
          <div style={{ width: "85%", margin: "3rem auto" }}>
            <h2>총 가격: {Total}원</h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Successfully Purchased Items" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <br />
            <Empty description={false} />
            <p>No Items In the Cart</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
