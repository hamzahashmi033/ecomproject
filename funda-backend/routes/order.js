//general authentication middleware

const authorization = require("../config/Authantication");

const express = require("express");

const orderController = require("../controllers/order");

const route = express.Router();

route.post("/addOrder/:userID", orderController.postOrder);
route.get("/getOrderbyuser/:id", orderController.getOrderByUserID);
route.get("/getOrderBySeller/:sellerId", orderController.getOrderBySeller);
route.post("/orderMail/:userID", orderController.sendOrderInvoiceMail);
route.get("/getAllOrders", orderController.getAllOrder);
route.patch("/changeStatus/:orderId", orderController.changeOrderStatus);

module.exports = route;
