const { check } = require("express-validator");
const { validateResults } = require("../utils/handlerValidator");

const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];
module.exports = { validatorGetItem };
