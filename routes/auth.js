const express = require("express");
const router = express.Router();
const { validatorLogin, validatorRegister } = require("../validators/auth");
const { loginController, registerController } = require("../controllers/auth");
// http:localhost:3001/api/auth/login
// http: localhost:3001/api/auth/register;

router.post("/signup", validatorRegister, registerController);
router.post("/login", validatorLogin, loginController);

module.exports = router;
