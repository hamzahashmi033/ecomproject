const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/order");
const bcrypt = require("bcryptjs");

// @route GET api/user
// @desc Returns all users
// @access Public
exports.show = async function (req, res) {
  const users = await User.find().select("-password");
  res.status(200).json({ users });
};
// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.showById = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({
        message: "feilds are missing",
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) return res.status(401).json({ message: "User does not exist" });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.showAllSeller = async (req, res, next) => {
  try {
    const seller = await User.find({ role: "seller" });
    if (seller.length < 1) {
      return res.status(200).json({
        seller,
      });
    } else {
      return res.status(200).json({
        message: "seller available",
        seller,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.showAllUser = async (req, res, next) => {
  try {
    const user = await User.find({ role: "users" });
    if (user.length < 1) {
      return res.status(200).json({
        user,
      });
    } else {
      return res.status(200).json({
        user,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// @route PATCH api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res.state(400).json({
      message: "feild are missing",
    });
  }
  const {
    firstName,
    lastName,
    fullName,
    phoneNumber,
    reference,
    profile_picture,
    business_name,
    business_type,
    main_selles_channel,
    establish_year,
    business_identity_type,
    business_id,
    social_account,
    job_title,
    street_address,
    appartment,
    city,
    pincode,
    state,
    banner,
  } = req.body;
  try {
    const user = await User.findById(id);
    if (!user || !user.role) {
      return res.status(400).json({
        message: "User || Role Donot Found",
      });
    }
    if (user.role === "seller") {
      if (
        !firstName ||
        !lastName ||
        !fullName ||
        !phoneNumber ||
        !reference ||
        !profile_picture ||
        !business_name ||
        !business_type ||
        !main_selles_channel ||
        // !establish_year ||
        !business_identity_type ||
        !business_id ||
        !social_account ||
        !job_title ||
        !street_address ||
        !appartment ||
        !city ||
        !pincode ||
        !state ||
        !banner
      ) {
        return res.status(400).json({
          message: "All Feilds Are Required",
        });
      } else {
        user.firstName = firstName;
        user.lastName = lastName;
        user.fullName = fullName;
        user.phoneNumber = phoneNumber;
        user.reference = reference;
        user.profile_picture = profile_picture;
        user.business_name = business_name;
        user.business_type = business_type;
        user.main_selles_channel = main_selles_channel;
        user.establish_year = establish_year;
        user.business_identity_type = business_identity_type;
        user.business_id = business_id;
        user.social_account = social_account;
        user.job_title = job_title;
        user.street_address = street_address;
        user.appartment = appartment;
        user.city = city;
        user.pincode = pincode;
        user.state = state;
        user.banner = banner;
        await user.save();
        return res.status(201).json({
          message: "account updated sucessfully",
        });
      }
    }
    if (user.role === "customer" || user.role === "admin") {
      if (!firstName || !lastName || !fullName || !phoneNumber) {
        return res.status(400).json({
          message: "All Feilds Are Required",
        });
      } else {
        user.firstName = firstName;
        user.lastName = lastName;
        user.fullName = fullName;
        user.phoneNumber = phoneNumber;
        await user.save();
        return res.status(201).json({
          message: "account updated sucessfully",
        });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are missing",
    });
  }
  try {
    const user = await User.findById(id);
    if (!user) return res.status(401).json({ message: "User does not exist" });
    await User.findByIdAndUpdate(id, { $set: { isActive: "false" } });

    res.status(200).json({ message: "Account has been deactivated" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// @route PATCH api/user/activateuser/{id}
// @desc Activate User Account
// @access Public

exports.activateUser = async function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(422).json({
      message: "feilds are missing",
    });
  }
  try {
    const user = await User.findById(id);
    if (!user) return res.status(401).json({ message: "User does not exist" });

    await User.findByIdAndUpdate(id, { $set: { isActive: "true" } });

    res.status(200).json({ message: "Account has been Activated" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//-----------------------------------------------------------
exports.deactive = async (req, res, next) => {
  const { status } = req.body;
  const id = req.params.id;
  if (!id || !"status" in req.body) {
    return res.status(422).json({
      message: "feilds are missing",
    });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "No user available",
      });
    }

    if (status === false) {
      user.isActive = status;
      await user.save();
    }

    if (status === false) {
      let prod = await Product.find({ createdBy: id /*createdBy: id */ });
      // if (prod.length < 1) {
      //   return res.status(400).json({
      //     message: "product Not Found",
      //     user,
      //   });
      // }

      if (prod?.length > 0) {
        for (let i = 0; i < prod.length; i++) {
          prod[i].status = status;
          await prod[i].save();
        }
      }

      return res.json({
        user,
        prod,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};

//----------------------------------------------------------------
//activate user

exports.activate = async (req, res, next) => {
  const { status } = req.body;
  const id = req.params.id;
  if (!status || !id) {
    return res.status.json({
      message: "feilds are required",
    });
  }
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "No user available",
      });
    }

    if (status === true) {
      user.isActive = status;
      await user.save();
    }

    if (status === true) {
      let prod = await Product.find({ createdBy: id /*createdBy: id */ });

      // if (prod.length < 1) {
      //   return res.status(400).json({
      //     message: "product Not Found",
      //     user,
      //   });
      // }

      if (prod?.length > 0) {
        for (let i = 0; i < prod.length; i++) {
          prod[i].status = status;

          await prod[i].save();
        }
      }

      return res.json({
        user,
        prod,
      });
    }
  } catch (err) {
    res.status.json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.sellerDetails = async (req, res, next) => {
  const id = req.params.sellerID;
  if (!id) {
    return res.status(422).json({
      message: "feilds are required",
    });
  }
  try {
    const order = await Order.find();
    let totalAmount = 0;
    let totalOrders = 0;
    let completedOrders = 0;
    let completedOrdersAmount = 0;
    let pendingOrdersAmount = 0;
    let pendingOrder = 0;
    let inStokProduct = 0;
    let outStokProduct = 0;
    for (i = 0; i < order.length; i++) {
      const identify = order[i].items.find((p) => p.sellerId == id);
      if (order[i].status === "Completed" && identify) {
        completedOrders = completedOrders + 1;
        let coPrice = parseInt(identify.total);
        completedOrdersAmount = completedOrdersAmount + coPrice;
      }
      if (order[i].status === "Pending" && identify) {
        pendingOrder = pendingOrder + 1;
        let poPrice = parseInt(identify.total);
        pendingOrdersAmount = pendingOrdersAmount + poPrice;
      }
      if (identify) {
        let total = parseInt(identify.total);
        totalAmount = totalAmount + total;
        totalOrders = totalOrders + 1;
        console.log("Total: ", total, " Total Amount: ", totalAmount);
      }
    }
    const numberOfProduct = await Product.countDocuments({ createdBy: id });
    const product = await Product.find({ createdBy: id });
    for (i = 0; i < product.length; i++) {
      if (product[i].productQuantity > 1) {
        inStokProduct = inStokProduct + 1;
      } else {
        outStokProduct = outStokProduct + 1;
      }
    }

    return res.status(200).json({
      message: "seller data is available",
      Total_order_Amount: totalAmount,
      Total_Order: totalOrders,
      Pending_Order: pendingOrder,
      Pending_Order_Amount: pendingOrdersAmount,
      Completed_Order: completedOrders,
      Completed_Order_Amount: completedOrdersAmount,
      Number_Of_Product: numberOfProduct,
      In_Stock_Product: inStokProduct,
      Out_Of_Stock: outStokProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.adminDetails = async (req, res, next) => {
  let totalUsers = 0;
  let totalCustomers = 0;
  let totalSellers = 0;
  //******************************** */
  let totalAmount = 0;
  let totalOrders = 0;
  let completedOrders = 0;
  let completedOrdersAmount = 0;
  let pendingOrdersAmount = 0;
  let pendingOrder = 0;
  try {
    const user = await User.find();
    const totalOrders = await Order.countDocuments();
    const numberOfProduct = await Product.countDocuments();
    const order = await Order.find();
    //console.log(order);

    for (i = 0; i < user.length; i++) {
      if (user[i].role === "customer") {
        totalCustomers = totalCustomers + 1;
      }

      if (user[i].role === "seller") {
        totalSellers = totalSellers + 1;
      }
    }

    for (i = 0; i < order.length; i++) {
      // const identify = order[i].items.find((p) => p.sellerId == id);
      if (order[i].status === "Completed") {
        completedOrders = completedOrders + 1;
        // let coPrice = parseInt(identify.price) * identify.quantity;
        completedOrdersAmount = completedOrdersAmount + order[i].totalAmount;
        //console.log(order[i]);
        //console.log(order[i].totalAmount);
      }
      if (order[i].status === "Pending") {
        pendingOrder = pendingOrder + 1;
        // let poPrice = parseInt(identify.price) * identify.quantity;
        pendingOrdersAmount = pendingOrdersAmount + order[i].totalAmount;
      }
      // if (identify) {
      //   let total = parseInt(identify.price) * identify.quantity;
      //   totalAmount = totalAmount + total;
      // }
    }

    totalAmount = pendingOrdersAmount + completedOrdersAmount;
    totalUsers = totalCustomers + totalSellers;
    res.status(200).json({
      message: "sucessfully get admin details",
      Total_order_Amount: totalAmount,
      Total_Orders: totalOrders,
      Total_pending_Orders: pendingOrder,
      Total_Pending_Amount: pendingOrdersAmount,
      Total_Completed_Order: completedOrders,
      Total_Completed_Amount: completedOrdersAmount,
      Total_Number_of_products: numberOfProduct,
      Total_Users: totalUsers,
      Total_Sellers: totalSellers,
      Total_customers: totalCustomers,
      Total_Orders: totalOrders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};

exports.addSeller = async (req, res) => {
  const {
    avatar,
    email,
    businessName,
    password,
    firstName,
    lastName,
    phoneNumber,
  } = req.body;

  if (
    !email ||
    !businessName ||
    !password ||
    !firstName ||
    !lastName ||
    !phoneNumber
  ) {
    return res.status(400).json({ message: "Fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(400)
        .json({ message: "Email already associated with another account." });
    } else {
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(400).json({
          message: "Phone number already associated with another account.",
        });
      }

      const pass = await bcrypt.hash(password, 12);

      await User.create({
        profile_picture: avatar,
        firstName,
        lastName,
        fullName: firstName + " " + lastName,
        business_name: businessName,
        phoneNumber,
        password: pass,
        email,
        role: "seller",
        isActive: true,
      });
      res.status(200).json({ message: "Seller added successfully." });
    }
  } catch (err) {
    res.status(500).json({
      message: "server sider error",
      error: err.message,
    });
  }
};
