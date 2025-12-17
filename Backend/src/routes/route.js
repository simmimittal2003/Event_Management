const express = require("express");
const router = express.Router();

const { createEvent } = require("../controllers/eventController");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

// Events
router.post("/addEvents", adminAuth, createEvent);

// Admins
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);

module.exports = router;
