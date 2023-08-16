const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../config/mailer");
const ejs = require("ejs");
const path = require("path");
// @route POST api/auth/login
// @desc login user
// @access Public

exports.socialLogin = async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;

    if (!name || !email || !profilePicture) {
      return res.status(422).json({
        message: "Feilds are required.",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      if (!user?.isActive) {
        const updatedUser = await user.updateOne(
          { isActive: true },
          { new: true }
        );
        jwt.sign(
          { id: updatedUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "10h" },
          (err, token) => {
            if (err) {
              return res.status(401).json({
                message: err,
              });
            }
            res.status(200).json({
              message: "Login Successfully",
              token,
              user: updatedUser,
            });
          }
        );
      } else {
        jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "10h" },
          (err, token) => {
            if (err) {
              return res.status(401).json({
                message: err,
              });
            }
            res
              .status(200)
              .json({ message: "Login Successfully", token, user: user });
          }
        );
      }
    } else {
      const nameSplited = name.split(" ");
      const newUser = await User.create({
        email,
        profile_picture: profilePicture,
        fullName: name,
        firstName: nameSplited[0],
        lastName: nameSplited[1],
        role: "customer",
        isActive: true,
      });
      jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "10h" },
        (err, token) => {
          if (err) {
            return res.status(401).json({
              message: err,
            });
          }
          res
            .status(200)
            .json({ message: "Login Successfully", token, user: newUser });
        }
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        message: "feilds are required",
      });
    }
    const user = await User.findOne({
      email: email,
    });

    //validate password
    if (!user) {
      return res.status(401).json({ message: "User doesnot exist" });
    }
    if (!user.isActive) {
      return res.status(401).json({
        message: "Your account has not been verified.",
      });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "10h" },
          (err, token) => {
            if (err) {
              return res.status(401).json({
                message: err,
              });
            }
            res
              .status(200)
              .json({ message: "Login Successfully", token, user: user });
          }
        );
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET api/auth/:token
// @desc get loggedin user
// @access Public
exports.getLoggedInUser = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).json({ message: "Token required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User doesnot exist" });
    }
    // Login successful, write token, and send back user
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @route POST api/auth/addy

// @desc Add a new user
// @access Public
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      fullName,
      phoneNumber,
      password,
      email,
      role,
      reference,
      isActive,
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
      cnicFront,
      cnicBack,
      idName,
      idNumber,
      cheque,
      accountHolderName,
      iban,
      bankCode,
      bankName,
      branchName,
      accountNumber,
    } = req.body;

    if (role) {
      if (role === "seller") {
        if (
          !firstName ||
          !lastName ||
          !fullName ||
          !reference ||
          !phoneNumber ||
          !password ||
          !role ||
          !profile_picture ||
          !business_name ||
          !business_type ||
          !main_selles_channel ||
          // !establish_year ||
          !business_identity_type ||
          // !business_id ||
          // !social_account ||
          !job_title ||
          !street_address ||
          !appartment ||
          !city ||
          !pincode ||
          !state ||
          !banner ||
          isActive === true ||
          !cnicFront ||
          !cnicBack ||
          !idName ||
          !idNumber ||
          !cheque ||
          !accountHolderName ||
          !iban ||
          // !bankCode ||
          !bankName ||
          !branchName ||
          !accountNumber
        ) {
          return res.status(401).json({
            message: "All feilds are required for seller",
          });
        }
      } else if (role === "customer") {
        if (
          !firstName ||
          !lastName ||
          !fullName ||
          !phoneNumber ||
          !password ||
          !email ||
          isActive === true
        ) {
          return res.status(422).json({
            message: "All feilds are required for customer",
          });
        }
      } else {
        return res.status(422).json({
          message: "Valid role is not define",
        });
      }
    } else {
      return res.status(422).json({
        message: "role is required",
      });
    }

    const useremail = await User.findOne({ email });
    if (useremail) {
      return res.status(401).json({
        message:
          "The email address you have entered is already associated with another account.",
      });
    }
    const usernumber = await User.findOne({ phoneNumber });
    if (usernumber) {
      return res.status(401).json({
        message:
          "The phone number you have entered is already associated with another account.",
      });
    }
    if (role === "seller") {
      const userAccountNumber = await User.findOne({ accountNumber });
      if (userAccountNumber) {
        return res.status(401).json({
          message:
            "The account number you have entered is already associated with another account.",
        });
      }

      const userIdNumber = await User.findOne({ idNumber });
      if (userIdNumber) {
        return res.status(401).json({
          message:
            "The cnic number you have entered is already associated with another account.",
        });
      }
    }
    const newUser = new User({
      firstName,
      lastName,
      fullName,
      reference,
      phoneNumber,
      password,
      email,
      role,
      isActive,
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
      cnicFront,
      cnicBack,
      idName,
      idNumber,
      cheque,
      accountHolderName,
      iban,
      bankCode,
      bankName,
      branchName,
      accountNumber,
      isActive: role === "customer" ? true : false,
    });

    newUser.password = await bcrypt.hash(newUser.password, 12);

    const user_ = await newUser.save();
    //await user_.save();
    const usertoken = crypto.randomBytes(20).toString("hex");

    const duptoken = await Token.findOne({ userId: user_.id });

    const tokenCreatedAt = new Date().getTime();

    if (duptoken) {
      Token.updateOne(
        { userId: user_.id },
        { $set: { token: usertoken, tokenCreatedAt: tokenCreatedAt } }
      );
    } else {
      Token.create({
        userId: user_.id,
        token: usertoken,
        tokenCreatedAt: tokenCreatedAt,
      });
    }
    // send email
    if (role !== "customer") {
      let link = process.env.APPURL + "/verifyaccount/" + usertoken;
      const data = await ejs.renderFile(
        path.join(__dirname, "../email-templates/ejs/verify-account.ejs"),
        {
          name: user_?.fullName,
          link,
          year: new Date().getFullYear(),
        }
      );
      mailer.send(email, "Account Verification Token", data);
      res.status(200).json({
        message: "A verification email has been sent to " + email + ".",
      });
    } else {
      res.status(200).json({
        message: "Account Created Sucessfully.",
      });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @Method: POST
// @Route : api/auth/verifytoken
// @Desc  : Verify Token
exports.verifyToken = async (req, res) => {
  try {
    // Find a matching token
    const token = await Token.findOne({ token: req.params.token });
    if (!token)
      return res.status(200).json({
        message: "Token has been expired.",
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, (err, user) => {
      if (!user)
        return res.status(200).json({ message: "Token has been expired." });

      if (user.isActive === true) {
        return res
          .status(200)
          .json({ message: "This user has already been verified." });
      }
      user.isActive = true;
      Token.findOneAndDelete({ userId: token.userId }, function (err) {
        if (err) return res.status(500).json({ message: err.message });
      });
      user.save(function (err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({
          message: "Account Verified Sucessfully",
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    //Generate and set password reset token
    user.generatePasswordReset();

    // Save the updated user object
    await user.save();

    // send email

    let link = process.env.APPURL + "/resetpassword/" + user.resetPasswordToken;

    const data = await ejs.renderFile(
      path.join(__dirname, "../email-templates/ejs/forgot-password.ejs"),
      { name: user?.fullName, link, year: new Date().getFullYear() }
    );

    mailer.send(user?.email, "Reset Password", data);

    res.status(200).json({
      message: "A reset email has been sent to " + user.email + ".",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(422).json({
        message: "feilds are required",
      });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(req.body.password, salt, (err, hash) => {
    //     if (err) {
    //       return res.status(401).json({
    //         message: err,
    //       });
    //     }
    //     req.body.password = hash;
    //   });
    // });
    const hashPwd = await bcrypt.hash(req.body.password, 12);

    //Set the new password
    user.password = hashPwd;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user object
    await user.save();

    res.status(200).json({
      message: "Your password updated successfully. Login to proceed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PATCH api/auth/changepassword/{id}
// @desc Update user details
// @access Public
exports.changePassword = async function (req, res) {
  try {
    const id = req.params.id;

    const { oldpassword, password } = req.body;

    if (!oldpassword || !password || !id) {
      return res.status(401).json({
        message: "Please Enter All Fields",
      });
    }

    const user = await User.findOne({
      _id: id,
    });

    if (!user) return res.status(401).json({ message: "Invalid User." });
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    // .then((isMatch) => {
    //   if (!isMatch) {
    //     return res.status(400).json({ message: "Incorrect Password" });
    //   }
    // });
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(401).json({
            message: err,
          });
        } else {
          user.password = hash;
          await user.save();
          return res
            .status(200)
            .json({ data: user, message: "Password Sucessfully Changed" });
        }
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// @route PATCH api/auth/changeemail/{id}
// @desc Update user email address
// @access Public
exports.changeEmailAddress = async function (req, res) {
  try {
    const id = req.params.id;
    const { email } = req.body;
    if (!email || !id) {
      return res.status(401).json({
        message: "All feilds are",
      });
    }
    const user = await User.findOne({
      _id: id,
    });
    if (!user) return res.status(401).json({ message: "Invalid User." });
    const dupUser = await User.findOne({
      email: email,
    });
    if (dupUser) {
      return res
        .status(401)
        .json({ message: "Email Address is already in use." });
    }
    user.email = email;
    user.isActive = false;
    await user.save();
    const usertoken = crypto.randomBytes(20).toString("hex");
    const duptoken = await Token.findOne({ userId: user.id });
    const tokenCreatedAt = new Date().getTime();
    if (duptoken) {
      Token.updateOne(
        { userId: user.id },
        { $set: { token: usertoken, tokenCreatedAt: tokenCreatedAt } }
      );
    } else {
      Token.create({
        userId: user.id,
        token: usertoken,
        tokenCreatedAt: tokenCreatedAt,
      });
    }
    // send email
    let link = process.env.APPURL + "/verifyaccount/" + usertoken;

    const data = await ejs.renderFile(
      path.join(__dirname, "../email-templates/ejs/change-email.ejs"),
      { name: user?.fullName, link, year: new Date().getFullYear() }
    );

    mailer.send(user?.email, "Account Verification Token", data);

    return res.status(200).json({
      message: "A verification email has been sent to " + email + ".",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
