require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const swaggerUI = require("swagger-ui-express");
const openAPIConfiguration = require("./docs/swagger");
const loggerStream = require("./utils/handlerLogger");
const dbConnect = require("./config/mongo");
const { dbConnectMySQL } = require("./config/mysql");
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400; //Omitir status 2xx, 3xx solo para enviar mensajes de error a slack
  },
});

const port = process.env.PORT || 3000;

/**
 * DEFINIR RUTA DE DOCUMENTACION
 */

app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openAPIConfiguration)
);

app.use("/api", require("./routes"));
app.listen(port, () => console.log(`http://localhost:${port}`));

ENGINE_DB === "nosql" ? dbConnect() : dbConnectMySQL();
