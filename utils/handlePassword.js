const bcrypt = require("bcryptjs");

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 12);
  return hash;
};

/**
 * Pasar contraseña sin encriptar y contraseña encriptada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
