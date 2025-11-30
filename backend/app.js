const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const driverRoutes = require("./routes/driver.route");
const bookingRoutes = require("./routes/booking.route");
const { generalLimiter, authLimiter, } = require("./middlewares/rateLimit.middleware")

const helmet = require("helmet");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(generalLimiter)
app.use("/users", authLimiter, userRoutes);
app.use("/driver", authLimiter, driverRoutes);
app.use("/bookings", bookingRoutes);

module.exports = app;
