const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handlerError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
/**
 *Listar registros
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
/**
 * Obtener registro especifico
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ ok: true, results: data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};
/**
 * Crear registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ ok: true, results: data });
  } catch (err) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

/**
 * Eliminar registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    // Obtener ruta fisica del archivo
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne(id);
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;

    // Eliminar fisicamente el archivo
    fs.unlinkSync(filePath);
    const data = { filePath, deleted: 1 };
    res.send({ ok: true, results: data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };
