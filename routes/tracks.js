const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/role");

const express = require("express");
const router = express.Router();

//http:localhost/tracks GET, POST, DELTE, PUT

// Listar items
router.get("/", authMiddleware, getItems);
// Obtener detalle de item
router.get("/:id", authMiddleware, validatorGetItem, getItem);
// Crear item
router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateItem,
  createItem
);
// Actualizar item
router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
// Eliminar item
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
