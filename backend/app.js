const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const connectDB = require("./db");
connectDB();

const eventRoutes = require("./routes/eventRoutes");
app.use("/events", eventRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
