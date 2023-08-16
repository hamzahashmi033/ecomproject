const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: "Full Name is required",
      max: 50,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    business_name: {
      type: String,
    },
    business_type: {
      type: String,
    },
    reference: {
      type: String,
    },

    main_selles_channel: {
      type: String,
    },
    establish_year: {
      type: String, //Date,
    },
    business_identity_type: {
      type: String,
    },
    business_id: {
      type: Number,
    },
    social_account: {
      type: Array,
    },
    job_title: {
      type: String,
    },
    street_address: {
      type: String,
    },
    appartment: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    state: {
      type: String,
    },
    banner: {
      type: String,
    },

    phoneNumber: {
      type: String,
      unique: true,
      required: "Your phone number is required",
      max: 30,
    },

    email: {
      type: String,
      unique: true,
      required: "Your email is required",
      trim: true,
    },

    password: {
      type: String,
      required: false,
      max: 100,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },

    role: {
      type: String,
    },

    cnicFront: {
      type: String,
    },

    cnicBack: {
      type: String,
    },

    idName: {
      type: String,
    },

    idNumber: {
      type: String,
    },

    cheque: {
      type: String,
    },

    accountHolderName: {
      type: String,
    },

    iban: {
      type: String,
    },

    bankName: {
      type: String,
    },

    bankCode: {
      type: String,
    },

    branchName: {
      type: String,
    },

    accountNumber: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    // createdOn: {
    //   type: Date,
    //   default: Date.now,
    // },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    updatedOn: {
      type: Date,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
UserSchema.methods.comparePassword = function (password) {
  return password == this.password;
};
UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model("Users", UserSchema);
