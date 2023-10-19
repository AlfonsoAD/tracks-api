const { handleHttpError } = require("../utils/handlerError");

/**
 * Array con los roles permitidos
 * @param {*} roles
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolesByUser = user.role;
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    if (!checkValueRol) {
      handleHttpError(res, "ERROR_USER_NOT_PERMISSIONS");
      return;
    }

    next();
  } catch (err) {
    handleHttpError(res, "ERROR_PERMISSIONS");
  }
};

module.exports = { checkRol };
