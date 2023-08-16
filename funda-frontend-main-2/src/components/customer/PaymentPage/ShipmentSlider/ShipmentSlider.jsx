import { Button } from "antd";
import React from "react";
import "./styles.scss";

const ShipmentSlider = ({
  user,
  cartItems,
  order,
  users,
  setSlider,
  slider,
}) => {
  return (
    <div className="shipment-div">
      <h1 className="slider-header">Choose your delivery options</h1>
      <div className="slider-content">
        <h3>Shipment 1 of 1</h3>
        <div className="shipping-title">Shipping from Funda</div>
        <div className="deliver-to-info">
          Deliver to: {order?.fullName}, {order?.flatNo} , {order.town},{" "}
          {order.state}
        </div>
        <ul>
          {cartItems.map((cartItem) => (
            <li>
              <p className="product-name">{cartItem.productName}</p>
              <div className="amount-div">
                <span className="total-amount">
                  <span className="currency-icon">Rs. </span>{" "}
                  {(cartItem.quantity * cartItem.productPrice).toLocaleString(
                    navigator.language,
                    {
                      minimumFractionDigits: 0,
                    }
                  )}
                </span>{" "}
                -{" "}
                <span className="quantity">
                  <span className="quantity-title">Quantity: </span>{" "}
                  {cartItem.quantity}
                </span>
              </div>
              <div className="seller-div">
                Sold by:{" "}
                <span className="user-name">
                  {
                    users?.find(
                      ({ _id, fullName }) => cartItem.createdBy._id === _id
                    )?.fullName
                  }
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="shipping-notice">
          An adult must be present for the delivery <br></br>
          Included FREE Open Box Inspection at the time of delivery{" "}
          <span>{`T&C apply`}</span>
        </div>

        <Button onClick={() => setSlider(slider + 1)}>Continue</Button>
      </div>
    </div>
  );
};

export default ShipmentSlider;
