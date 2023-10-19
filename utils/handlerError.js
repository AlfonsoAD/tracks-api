const handleHttpError = (res, message = "Algo salió mal", code = 403) => {
  res.status(code);
  res.send({ status_code: code, error: message });
};

module.exports = { handleHttpError };
