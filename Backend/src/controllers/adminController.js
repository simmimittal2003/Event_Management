const adminModel = require("../models/adminModel");
const {
  isValid,
  isValidEmail,
  isValidPassword,
} = require("../utils/validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Admin Registration
const registerAdmin = async (req, res) => {
  try {
    let adminData = req.body;

    // Validation
    if (!adminData || Object.keys(adminData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Found" });
    }

    const { email, password } = adminData;
    if (!isValid(email) || !isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid or missing email" });
    }

    let existingAdmin = await adminModel.findOne({ email: email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ msg: "Admin with this email already exists" });
    }

    if (!isValid(password) || !isValidPassword(password)) {
      return res.status(400).json({
        msg: "Invalid or missing password. Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    adminData.password = hashedPassword;

    const newAdmin = await adminModel.create(adminData);
    return res
      .status(201)
      .json({ msg: "Admin registered successfully", data: newAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin Login

const loginAdmin = async (req, res) => {
  try {
    let adminData = req.body;

    // Validation
    if (!adminData || Object.keys(adminData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Found" });
    }

    const { email, password } = adminData;

    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }

    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }

    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ msg: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
