const { handleHttpError } = require("../utils/handlerError");
const { verifyToken } = require("../utils/handlerjwt");
const { userModel } = require("../models");
const getProperties = require("../utils/handlerPropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "TOKEN_NOT_EXISTS", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };

    const user = await userModel.findOne(query);
    req.user = user;
    next();
  } catch (err) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = { authMiddleware };
