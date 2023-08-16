import { Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalShipping } from "@mui/icons-material";
import {
  PayPalScriptProvider,
  BraintreePayPalButtons,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { Grid } from "@mui/material";
import Paypal from "../../../../assets/kmmart-logo/paypal.png";
import CashOn from "../../../../assets/kmmart-logo/cash-on-delivery.png";

import "./styles.scss";
import { postOrder } from "../../../../redux/_actions/orderAction";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const PaymentMethod = ({
  order,
  setOrder,
  cartItems,
  setShowInvoice,
  userId,
  products,
  setSlider,
  slider,
}) => {
  const [paymentType, setPaymentType] = useState("cash");
  let totalAmount = 0;
  const dispatch = useDispatch();
  const voucher = useSelector((state) => state.voucher.validateVoucher);
  const orders = useSelector((state) => state.orders);
  const priceDetail = JSON.parse(localStorage.getItem("price_details"));

  // useEffect(() => {
  //   if (orders?.order) {
  //     setShowInvoice(true);
  //   }
  // }, [orders?.order]);
  const userOrder = useSelector((state) => state.order);
  const handleAddOrder = () => {
    const items = cartItems.map(
      ({
        _id,
        quantity,
        productPrice,
        productImage,
        productDescription,
        productName,
        createdBy,
        productSubCategory,
        selectedAttributes,
      }) => {
        return {
          productId: _id,
          quantity: quantity,
          price: productPrice,
          sellerId: createdBy,
          productName: productName,
          productDescription: productDescription,
          productImage: productImage,
          total: (quantity * selectedAttributes[0].attributePrice).toString(),
          productSubCategory: productSubCategory,
          selectedAttributes: selectedAttributes,
        };
      }
    );

    const sellersId = cartItems.map(({ createdBy }) => createdBy);

    const uniqSellerIds = [
      ...new Map(sellersId.map((item) => [item["_id"], item])).values(),
    ];

    let sellerIds = [];
    uniqSellerIds.map((dt) => sellerIds.push(dt._id));
    items.map(({ total }) => {
      totalAmount = totalAmount + parseInt(total);
    });

    const testOrder = {
      ...order,
      vcode: voucher?.voucher?.voucher_code,

      items: items,
      sellerId: sellerIds,
      paymentType: paymentType,
      totalAmount: totalAmount + priceDetail?.deliveryPrice,
    };

    setOrder({
      ...order,
      items: items,
      sellerId: uniqSellerIds,
      paymentType: paymentType,
      totalAmount: totalAmount,
    });

    dispatch(postOrder(testOrder, userId));
    setShowInvoice(true);
    const showInvoice = cartItems.filter(
      (item) =>
        products.find(({ _id }) => _id === item._id).productQuantity <
        item.quantity
    );
    localStorage.setItem("CartList", JSON.stringify([]));
  };

  return (
    <div className="payment-method-div">
      <h1 className="slider-header">Select a payment method</h1>
      <div className="slider-content">
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                defaultValue="Cash on delivery"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  onClick={(e) => setPaymentType(e.target.value)}
                  value={paymentType}
                  checked={true}
                  control={<Radio />}
                  label="Cash on delivery"
                />
                {/* <FormControlLabel
                  value="Credit/Debit Card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                /> */}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <Grid container textAlign="center">
        <Grid item lg={6} sx={{pb:2,}}>
          <Button
            onClick={() => {
              setSlider(slider - 1);
            }}
          >
            Update Address
          </Button>
        </Grid>
        <Grid item lg={6} sx={{pb:2,}}>
          <Button onClick={handleAddOrder}>Place Order</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentMethod;
