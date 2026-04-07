const express = require("express");
const router = express.Router();

const {
  createInventory,
  getInventory,
  getGroupedInventory
} = require("../controllers/inventoryController");


router.post("/inventory", createInventory);
router.get("/inventory", getInventory);
router.get("/inventory/grouped", getGroupedInventory);

module.exports = router;