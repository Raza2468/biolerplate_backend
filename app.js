const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const product_routes = require("./routes/productRoutes");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("default"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1", product_routes);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log("===================**===================");
  console.log("start server....", `http://localhost:${PORT}`);
});
