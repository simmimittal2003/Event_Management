const eventModel = require("../models/eventModel");
const {
  isValid,
  isValidPositiveNumber,
  isValidDate,
} = require("../utils/validator");

const createEvent = async (req, res) => {
  try {
    let eventData = req.body;

    // Validation
    if (!eventData || Object.keys(eventData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Found" });
    }

    let { title, description, location, date, total_seats, price, image } =
      eventData;

    if (!isValid(title)) {
      return res.status(400).json({ msg: "Event title is required" });
    }

    if (!isValid(description)) {
      return res.status(400).json({ msg: "Event description is required" });
    }

    if (!isValid(location)) {
      return res.status(400).json({ msg: "Event location is required" });
    }

    if (!isValidPositiveNumber(total_seats)) {
      return res
        .status(400)
        .json({ message: "Total seats must be greater than 0" });
    }

    if (!isValidPositiveNumber(price)) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({ message: "Invalid event date" });
    }

    eventData.available_seats = total_seats;

    let createdEvent = await eventModel.create(eventData);
    return res
      .status(201)
      .json({ message: "Event created successfully", data: createdEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createEvent,
};
