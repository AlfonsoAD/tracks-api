const express = require("express");
const uploadMiddleware = require("../utils/handlerStorage");
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
const router = express.Router();

// http://localhost:3001/api/storage

// Listar items
router.get("/", getItems);
// Obtener detalle de item
router.get("/:id", validatorGetItem, getItem);
// Crear item
router.post("/", uploadMiddleware.single("myfile"), createItem);
// Eliminar item
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
