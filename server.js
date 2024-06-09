const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/property", require("./routes/propertyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/room", require("./routes/roomRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
