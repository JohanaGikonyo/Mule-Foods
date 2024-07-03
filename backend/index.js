const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: ["https://mulefoods.com", "https://mulefoods.vercel.app", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors(corsOptions));

// Handle Preflight Requests
app.options("*", cors(corsOptions));

// Define routes
app.use("/api", require("./routes/api.route"));
app.use("/orderapi", require("./routes/order"));
app.use("/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  res.json({
    message: "Server Is running Here!",
  });
});

const Port = process.env.PORT || 3001;

app.listen(Port, () => console.log(`App running at port ${Port}`));
