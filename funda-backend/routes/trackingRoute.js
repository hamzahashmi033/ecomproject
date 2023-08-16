const express = require("express");
const trackOrder = require("../controllers/orderTracking");

const trackOrderRouter = express.Router();

trackOrderRouter.post("/track-order/:trackingId", trackOrder);
module.exports = trackOrderRouter;
