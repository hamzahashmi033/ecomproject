const Order = require("../models/order");
const sgMail = require("@sendgrid/mail");
const User = require("../models/User");
const Product = require("../models/Product");
const voucher = require("../models/voucher");
const mailer = require("../config/mailer");
const axios = require("axios");
exports.getAllOrder = async (req, res, next) => {
  try {
    // const allOrder = await Order.find();
    // if (!allOrder) {
    //   return res.status(400).json({
    //     message: "NO order available",
    //     order: [],
    //   });
    // }
    return res.status(200).json({
      message: "Get All Orders",
      // orders: allOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.changeOrderStatus = async (req, res, next) => {
  try {
    // const id = req.params.orderId;
    // const Status = req.body.status;
    // if (!Status || !id) {
    //   return res.status(400).json({
    //     message: "status feild required",
    //   });
    // }
    // const order = await Order.findOne({ _id: id });

    // if (!order) {
    //   return res.status(400).json({
    //     message: "No Order Available",
    //   });
    // }
    // order.status = Status;
    // await order.save();
    return res.status(201).json({
      message: "Status Updated Sucessfully",
      // order: order,
    });
  } catch (err) {
    res.status(500).json({
      message: "server side error",
      error: err.message,
    });
  }
};

exports.postOrder = async (req, res, next) => {
  const userId = req.params.userID;
  // if (!userId) {
    return res.status(400).json({
      message: "feilds are missing",
    });
  // }
  const date = new Date().toISOString();

  try {
    const x = await Order.findOne({}).limit(1).sort({ $natural: -1 });
    let OrderId;
    if (!x) {
      OrderId = 100;
    } else {
      OrderId = x.OrderId + 1;
    }

    let {
      vcode,
      fullName,
      phoneNumber,
      pinCode,
      houseAddress,
      email,
      company,
      city,
      //flatNo,
      //landmark,
      sellerId,
      items,
      totalAmount,
      paymentType,
      //area,
      //town,
      state,
    } = req.body;

    // console.log(req.body);
    if (
      !userId ||
      !fullName ||
      !phoneNumber ||
      !pinCode ||
      //!flatNo ||
      !items ||
      !sellerId ||
      !totalAmount ||
      !paymentType ||
      //!area ||
      !state ||
      !houseAddress ||
      !email ||
      // !company ||
      !city
      //!town
    ) {
      return res.status(422).json({
        message: "Feilds are missing ",
      });
    }

    //console.log(req.body);
    // const vcode = req.body.voucher_code;

    if (vcode) {
      v = await voucher.findOne({ voucher_code: vcode });

      if (!v) {
        return res.status(400).json({
          message: "No Voucher available",
        });
      } else if (v.voucher_quantity < 1) {
        return res.status(400).json({
          message: "Voucher limits ended",
        });
      } else if (date > v.expire_date.toISOString()) {
        return res.status(400).josn({
          message: "voucher is expired",
        });
      } else if (totalAmount < v.minimum_amount) {
        console.log("x");
        return res.status(400).json({
          message: "total amount should be greater then " + v.minimum_amount,
        });
      } else {
        totalAmount = totalAmount - v.voucher_discount;
        v.voucher_quantity = v.voucher_quantity - 1;
        await v.save();
      }
    }

    const seller = await User.findOne({ _id: sellerId });

    const order = new Order({
      userId,
      OrderId,
      fullName,
      phoneNumber,
      pinCode,
      //flatNo,
      //landmark,
      items,
      voucher_code: vcode,
      sellerId,
      totalAmount,
      paymentType,
      //area,
      //town,
      state,
      houseAddress,
      email,
      company,
      city,
    });

    //await order.save();
    let productData = req.body.items;
    // console.log(productData);
    let prodDetails = productData.map((items) => {
      return { product_id: items.productId, qty: items.quantity };
    });

    for (y = 0; y < prodDetails.length; y++) {
      let p = await Product.findOne({ _id: prodDetails[y].product_id });
      if (!p) {
        return res.status(400).json({
          message: "Product is not available",
        });
      }

      if (p.productQuantity >= prodDetails[y].qty) {
        console.log("product is available");
      } else {
        return res.status(422).json({
          message: p.productName + " product is out of stock",
        });
      }
    }

    let resProd = [];
    for (i = 0; i < prodDetails.length; i++) {
      const id = prodDetails[i].product_id;
      const q = prodDetails[i].qty;
      const prod = await Product.findOne({ _id: id });
      resProd.push(prod);
      const newQty = prod.productQuantity - q;
      prod.updatedAt = Date.now();
      prod.productQuantity = newQty;
      await prod.save();
    }
    await order.save();

    // Leopard API Integration..........

    let savedOrder = await Order.findOne({ userId: userId });
    const apiRequest = {
      api_key: "process.env.LEOPARDS_API_KEY",
      api_password: "process.env.LEOPARDS_API_PASSWORD",
      booked_packet_weight: 500,
      booked_packet_no_piece: 1,
      booked_packet_collect_amount: savedOrder.totalAmount,
      origin_city: "self",
      destination_city: savedOrder.city,
      shipment_name_eng: "Funda",
      shipment_phone: "self",
      shipment_address: "self",
      consignment_name_eng: savedOrder.fullName,
      consignment_phone: savedOrder.phoneNumber,
      consignment_address: savedOrder.houseAddress, 
      special_instructions: savedOrder.paymentType,
    };

    axios.post(process.env.LEOPARDS_API_URL, apiRequest).then((response) => {
      console.log("response.data");
    });
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toISOString().split("T")[1];

    await mailer.send(
      seller.email,
      "New Order Placed",
      `
      <body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
      <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px #d97a21;">
        <thead>
          <tr>
            <th style="text-align:left;"><img style="max-width: 150px;" src="https://funda.pk/favicon.png" alt="Funda"></th>
            <th style="text-align:right;font-weight:400;">${date}  ${time} </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="height:35px;"></td>
          </tr>
          <tr>
            <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
            <p>A new order has been placed.</p>
              <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:#d97a21;font-weight:bold;margin:0">Pending</b></p>
              <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order ID</span> ${
                order.OrderId
              }  </p>
              <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order Amount</span> ${
                order.totalAmount
              }</p>
            </td>
          </tr>
          <tr>
            <td style="height:35px;"></td>
          </tr>
          <tr>
            <td style="width:50%;padding:20px;vertical-align:top">
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> ${
                order.fullName
              }</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span>${
                order.email
              }</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span> ${
                order.phoneNumber
              }</p>
            </td>
          </tr>
          <tr>
          <tr>
            <td colspan="2" style=  "font-size:15px;padding:30px 15px 0 15px; ">ITEMS</td>
          </tr>
          <tr>
          ${order.items.map(
            (item) =>
              `<td colspan="2" style="padding:15px;">
              <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;">
                <span style="display:block;font-size:13px;font-weight:normal;">
                  ${item.productName}
                </span>
                Rs. ${item.total}
              </p>
            </td>`
          )}
          </tr>
        </tbody>
        <tfooter>
          <tr>
            <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">
              <strong style="display:block;margin:0 0 10px 0;">Regards</strong> Team Funda
            </td>
          </tr>
        </tfooter>
      </table>
    </body>
      `
    );

    return res.status(201).json({
      message: "order place sucessfully",
      Product: resProd,
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "server side error",
      message: err.message,
    });
  }
};

exports.getOrderBySeller = async (req, res, next) => {
  const id = req.params.sellerId;
  if (!id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const order = await Order.find({ sellerId: { $all: [id] } });

    if (order.length < 1) {
      return res.status(400).json({
        message: " No order for this selller ",
      });
    }

    let final_orders = [];
    let item_array = [];

    for (let i = 0; i < order.length; i++) {
      order[i].items.map((item) => {
        if (item.sellerId == id) {
          item_array.push(item);
        }
      });

      order[i].items.splice(0, order[i].items.length);

      order[i].items.push(...item_array);

      final_orders.push(order[i]);

      item_array.splice(0, item_array.length);
    }

    return res.status(200).json({
      seller_order_details: final_orders,
    });
  } catch (err) {
    res.json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.getOrderByUserID = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }

  try {
    const result = await Order.find({ userId: userId });
    return res.status(200).json({
      message: "sucess",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "server Sider error found",
    });
  }
};

exports.sendOrderInvoiceMail = async (req, res, next) => {
  // console.log("Invoice sent");
  const userId = req.params.userID;
  const orderId = req.body.orderID;
  if (!userId || !orderId) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  const date = new Date().toISOString().split("T")[0];
  const time = new Date().toISOString().split("T")[1];

  try {
    const user = await User.findOne({ _id: userId });
    const order = await Order.findOne({ _id: orderId });
    if (!user || !order) {
      return res.status(422).json({
        message: "Not Availabe",
      });
    }

    await mailer.send(
      order.email,
      "Order Invoice by Funda",
      `
      <body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
      <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px #d97a21;">
        <thead>
          <tr>
            <th style="text-align:left;"><img style="max-width: 150px;" src="https://funda.pk/favicon.png" alt="Funda"></th>
            <th style="text-align:right;font-weight:400;">${date}  ${time} </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="height:35px;"></td>
          </tr>
          <tr>
            <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">
              <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:#00b800;font-weight:bold;margin:0">Success</b></p>
              <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order ID</span> ${
                order.OrderId
              }  </p>
              <p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order Amount</span> ${
                order.totalAmount
              }</p>
            </td>
          </tr>
          <tr>
            <td style="height:35px;"></td>
          </tr>
          <tr>
            <td style="width:50%;padding:20px;vertical-align:top">
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> ${
                order.fullName
              }</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span>${
                order.email
              }</p>
              <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span> ${
                order.phoneNumber
              }</p>
            </td>
          </tr>
          <tr>
          <tr>
            <td colspan="2" style=  "font-size:15px;padding:30px 15px 0 15px; ">ITEMS</td>
          </tr>
          <tr>
          ${order.items.map(
            (item) =>
              `<td colspan="2" style="padding:15px;">
              <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;">
                <span style="display:block;font-size:13px;font-weight:normal;">
                  ${item.productName}
                </span>
                Rs. ${item.total}
              </p>
            </td>`
          )}
          </tr>
        </tbody>
        <tfooter>
          <tr>
            <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">
              <strong style="display:block;margin:0 0 10px 0;">Regards</strong> Team Funda
            </td>
          </tr>
        </tfooter>
      </table>
    </body>
      `
    );
    res.status(200).json({
      message: "send sucessfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};
