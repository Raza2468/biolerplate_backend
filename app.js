const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const product_routes = require("./routes/productRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/products", product_routes);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log("===================**===================");
  console.log("start server....", `http://localhost:${PORT}`);
});
