const { check } = require("express-validator");
const { validateResults } = require("../utils/handlerValidator");

const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("age").exists().notEmpty().isNumeric({ min: 15, max: 99 }),
  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
  check("email").exists().notEmpty().isEmail(),

  (req, res, next) => validateResults(req, res, next),
];

const validatorLogin = [
  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
  check("email").exists().notEmpty().isEmail(),

  (req, res, next) => validateResults(req, res, next),
];

module.exports = { validatorRegister, validatorLogin };
