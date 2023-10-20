const jwt = require("jsonwebtoken");
const getProperties = require("../utils/handlerPropertiesEngine");
const propertiesKey = getProperties();
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Se debe pasar el objeto del usuario
 * @param {*} user
 */
const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "16h",
    }
  );

  return sign;
};

/**
 * Se debe pasar el token de sesión (JWT)
 * @param {*} token
 * @returns
 */
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
