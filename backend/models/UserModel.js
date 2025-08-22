const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String }, // Field to store the avatar path
  phone: { type: String }, // New field to store phone number
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  }, // New field to store address details
  role: {
    type: String,
    enum: [
      "accountant", // University Accountant
      "admin", // System Administrator
        "customer",
      "client",
      "customer_support", // New role: Customer 
      "superadmin", // Super Administrator
      "user", // Default role

    ],
    default: "user", // Default role
  },
  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }, // Timestamp for record creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
});

const User = mongoose.model("User", userSchema);

module.exports = User;
