const express = require("express");
const router = express.Router();

const { createEvent } = require("../controllers/eventController");

router.post("/addEvents", createEvent);

module.exports = router;
