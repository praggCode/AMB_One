const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const driverRoutes = require("./routes/driver.route");
const bookingRoutes = require("./routes/booking.route");


const helmet = require("helmet");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/users", userRoutes);
app.use("/driver", driverRoutes);
app.use("/bookings", bookingRoutes);

module.exports = app;
