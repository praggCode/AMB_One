const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ambulance_no: {
    type: String,
    required: true,
    unique: true,
  },
  driver_image: {
    type: String,
  },
  driving_license: {
    type: String,
    required: true,
  },
  is_available: {
    type: Boolean,
    default: true,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
