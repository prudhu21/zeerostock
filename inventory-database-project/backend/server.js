const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const supplierRoutes = require("./routes/supplierRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

app.use("/api", supplierRoutes);
app.use("/api", inventoryRoutes);

app.get("/", (req, res) => {
  res.send("Server working");
});


require("./db/initDB");

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});