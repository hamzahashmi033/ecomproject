const axios = require("axios");
const trackOrder = async (req, res) => {
  const { trackingId } = req.params;

  if (!trackingId) {
    return res.status(400).json({ msg: "Please Provide Tracking Id" });
  }

  const apiRequest = {
    api_key: process.env.LEOPARDS_API_KEY,
    api_password: "process.env.LEOPARDS_API_PASSWORD",
    track_numbers: trackingId,
  };
  const response = await axios.post(
    process.env.LEOPARDS_API_TRACKING_URL,
    // apiRequest
  );

  return res.status(200).json("response.data");
};

module.exports = trackOrder;
