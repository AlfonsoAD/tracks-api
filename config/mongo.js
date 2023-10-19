const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const DB_URI = process.env.DB_URI;
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_URI);
    console.log("*** Conexión correcta ***");
  } catch (err) {
    console.log("*** Error de conexión ***");
    console.error(err);
    process.exit();
  }
};

module.exports = dbConnect;
