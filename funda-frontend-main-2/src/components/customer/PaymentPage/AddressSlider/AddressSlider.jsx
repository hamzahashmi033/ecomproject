import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./styles.scss";
import {
  validatePhoneCountry,
  validateNumeric,
  validateName,
  validateNumber,
  validateAddress,
  validateString,
} from "../../../commonComponents/validators";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../../redux/_actions/userAction";
import { SET_ALERT } from "../../../../redux/types";
import { setAlert } from "../../../../redux/_actions/alertAction";
const AddressSlider = ({ setSlider, slider, user, order, setOrder }) => {
  const userbyid = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let getuserid = JSON.parse(localStorage.getItem("user"));
    dispatch(getUserById(getuserid?.user?.id));
  }, [dispatch]);
  const { Option } = Select;
  // const [phoneNumber, setPhoneNumber] = useState({
  //   phoneNumber: userbyid?.phoneNumber,
  //   error: "",
  // });

  const pakistanState = ["Sindh", "Punjab", "Balochistan", "KPK"];

  const onFinish = (values) => {
    // if (handlePhoneNumber(phoneNumber.phoneNumber)) {
    //   setOrder({
    //     ...order,
    //     ...values,
    //     phoneNumber: phoneNumber?.phoneNumber,
    //   });
    //   setSlider(slider + 1);
    // }
  };

  // const checkPhoneNumber = () => {
  //   if (!phoneNumber.phoneNumber) {
  //     setPhoneNumber({
  //       ...phoneNumber,
  //       error: "Phone number can't be empty",
  //     });
  //   } else {
  //     setPhoneNumber({
  //       ...phoneNumber,
  //       error: "",
  //     });
  //   }
  // };

  // const handlePhoneNumber = (e) => {
  //   if (!isValidPhoneNumber(e)) {
  //     setPhoneNumber({
  //       ...phoneNumber,
  //       error: "Phone number should be valid",
  //     });
  //     return false;
  //   } else {
  //     setPhoneNumber({
  //       ...phoneNumber,
  //       error: "",
  //     });
  //     return true;
  //   }
  // };
  function orderAddress() {
    if (
      order?.fullName != "" &&
      order?.pinCode != "" &&
      // order?.company != "" &&
      order?.houseAddress != "" &&
      order?.city != "" &&
      order?.email != ""
    ) {
      if (
        order?.phoneNumber.length == 13 &&
        order?.phoneNumber?.slice(3, order?.phoneNumber)?.length == 10 &&
        order?.phoneNumber?.slice(3, order?.phoneNumber)[0] == 3 &&
        order?.phoneNumber[0] == "+" &&
        order?.phoneNumber[1] == "9" &&
        order?.phoneNumber[2] == "2"
      ) {
        if (
          order?.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          setSlider(slider + 1);
        } else {
          dispatch(
            setAlert(SET_ALERT, {
              message: "Invalid Email",
              alertType: "danger",
            })
          );
        }
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Invalid Phone Number",
            alertType: "danger",
          })
        );
      }
    } else {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Empty Fields",
          alertType: "danger",
        })
      );
    }
  }
  return (
    <div className="address-div">
      {/* <h1 className="slider-header">Select a delivery address</h1> */}
      <div className="slider-content">
        {/* <h3>Add a new address</h3> */}
        <Grid container spacing={2} sx={{ p: 3, pt: 6 }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="body2" fontWeight="bold" fontSize={13}>
              Full Name
            </Typography>
            <Input
              value={order?.fullName}
              onChange={(e) => {
                setOrder({
                  ...order,
                  fullName: e.target.value,
                });
              }}
              placeholder="Full Name"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="body2" fontWeight="bold" fontSize={13}>
              Phone
            </Typography>
            <Input
              value={order?.phoneNumber}
              onChange={(e) => {
                let postal = +e.target.value.slice(3);

                if (!isNaN(postal) && String(postal).length < 11) {
                  setOrder({
                    ...order,
                    phoneNumber: e.target.value,
                  });
                }
              }}
              onKeyUp={(e) => {
                if (
                  (e.key === "Backspace" || e.key === "Delete") &&
                  e.target.value.length <= 3
                ) {
                  setOrder({
                    ...order,
                    phoneNumber: "+92",
                  });
                }
              }}
              placeholder="Cell-No"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="body2" fontWeight="bold" fontSize={13}>
              Postal Code
            </Typography>
            <Input
              onChange={(e) => {
                let postal = +e.target.value;
                if (!isNaN(postal) && String(postal).length <= 5) {
                  setOrder({
                    ...order,
                    pinCode: e.target.value,
                  });
                }
              }}
              value={order?.pinCode}
              placeholder="Postal-Code 5 Digit Code"
            />
          </Grid>
          {/* <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="body2" fontWeight="bold" fontSize={13}>
              Company Name
            </Typography>
            <Input
              value={order?.company}
              onChange={(e) => {
                setOrder({
                  ...order,
                  company: e.target.value,
                });
              }}
              placeholder="Company Name"
            />
          </Grid> */}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="body2" fontWeight="bold" fontSize={13}>
              Address
            </Typography>
            <Input
              value={order?.houseAddress}
              onChange={(e) => {
                setOrder({
                  ...order,
                  houseAddress: e.target.value,
                });
              }}
              placeholder="Address"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="body2" fontWeight="bold" fontSize={13}>
              Email Address
            </Typography>
            <Input
              onChange={(e) => {
                setOrder({
                  ...order,
                  email: e.target.value,
                });
              }}
              value={order?.email}
              placeholder="Email"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="body2" fontWeight="bold" fontSize={13}>
              Town / City
            </Typography>
            <Input
              onChange={(e) => {
                setOrder({
                  ...order,
                  city: e.target.value,
                });
              }}
              value={order?.city}
              placeholder="City"
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="body2" fontWeight="bold" fontSize={13}>
              State
            </Typography>
            <Select
              value={order?.state}
              style={{ width: "100%" }}
              placeholder="Select state"
              onSelect={(value, event) => {
                setOrder({
                  ...order,
                  state: value,
                });
              }}
            >
              {pakistanState.map((state) => (
                <Option value={state}>{state}</Option>
              ))}
            </Select>
          </Grid>
          <Grid item lg={12} md={12} textAlign="right">
            <Button onClick={orderAddress}>Next</Button>
          </Grid>
        </Grid>
        {/* <Form name="address" onFinish={onFinish} className="address-form">
          <Grid container>
            <Grid item lg={5}>
              <div className="input-item-div">
                <div className="fullName-label input-label">Full Name</div>
                <Form.Item
                  name="fullName"
                  initialValue={userbyid?.fullName}
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? validateName(value)
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Full name should be valid")
                              )
                          : Promise.reject("Please input your Full name"),
                    },
                  ]}
                >
                  <Input className="input-field" value={order?.fullName} />
                </Form.Item>
              </div>
            </Grid>
            <Grid item lg={2}></Grid>
            <Grid item lg={5}>
              <div className="input-item-div phoneNumber-div">
                <div className="input-label">Mobile Number</div>

                <Input
                  value={order?.phoneNumber}
                  onChange={(e) => {
                    let postal = +e.target.value.slice(3);

                    if (!isNaN(postal) && String(postal).length < 11) {
                      setOrder({
                        ...order,
                        // ...phoneNumber,
                        phoneNumber: e.target.value,
                      });
                    }
                  }}
                  placeholder="Cell-No"
                  onKeyUp={(e) => {
                    if (
                      (e.key === "Backspace" || e.key === "Delete") &&
                      e.target.value.length <= 3
                    ) {
                      setOrder({
                        ...order,
                        phoneNumber: "+92",
                      });
                    }
                  }}
                />
              </div>
            </Grid>
            <Grid item lg={5}>
              <div className="input-item-div">
                <div className="input-label">Postal Code</div>
                <Form.Item
                  name="pinCode"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? value.length <= 5
                            ? validateNumber(value)
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Pin code is not valid")
                                )
                            : Promise.reject(
                                new Error(
                                  "Pin code should be less than 6 numbers"
                                )
                              )
                          : Promise.reject(
                              new Error("Please enter your pin code")
                            ),
                    },
                  ]}
                >
                  <Input
                    className="input-field"
                    placeholder="5 digits (0-9) PIN code"
                  />
                </Form.Item>
              </div>
            </Grid>
            <Grid item lg={2}></Grid>
            <Grid item lg={5}>
              <div className="input-item-div">
                <div className="input-label">Company Name</div>
                <Form.Item
                  name="company"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? validateString(value)
                            ? Promise.resolve()
                            : Promise.reject(new Error("Not a Company Name"))
                          : Promise.resolve(),
                    },
                  ]}
                >
                  <Input className="input-field" placeholder="E.g Company" />
                </Form.Item>
              </div>
            </Grid>
            <Grid item lg={12}>
              <div className="input-item-div">
                <div className="input-label">Address</div>
                <Form.Item
                  name="houseAddress"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? validateAddress(value)
                            ? Promise.resolve()
                            : Promise.reject(new Error("Not a valid address"))
                          : Promise.reject(
                              new Error("Flat/House Address can't be empty")
                            ),
                    },
                  ]}
                >
                  <Input className="input-field" />
                </Form.Item>
              </div>
            </Grid>
            <Grid item lg={5}>
              <div className="input-item-div">
                <div className="input-label">Email</div>

                <Form.Item
                  initialValue={userbyid?.email}
                  name="email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input className="input-field" placeholder="Email Address" />
                </Form.Item>
              </div>
            </Grid>
            <Grid item lg={2}></Grid>
            <Grid item lg={5}>
              <div className="town-state-div">
                <div className="input-item-div">
                  <div className="input-label">City</div>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? validateString(value)
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("Not a valid Town/City")
                                )
                            : Promise.reject(
                                new Error("Town/City can't be empty")
                              ),
                      },
                    ]}
                  >
                    <Input className="input-field" />
                  </Form.Item>
                </div>
              </div>
            </Grid>
          </Grid>

          <div className="town-state-div">
            <div className="input-item-div">
              <div className="input-label">State</div>
              <Form.Item
                name="state"
                rules={[
                  {
                    required: true,
                    message: "Select a state",
                  },
                ]}
              >
                <Select placeholder="Select state">
                  {pakistanState.map((state) => (
                    <Option value={state}>{state}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="submit"
              htmlType="submit"
              // onClick={checkPhoneNumber}
            >
              Next
            </Button>
          </Form.Item>
        </Form> */}
      </div>
    </div>
  );
};

export default AddressSlider;
