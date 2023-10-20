const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handlerError");
const { tracksModel } = require("../models");

/**
 *Listar registros
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await tracksModel.findAllData({});
    res.send({ data });
  } catch (e) {
    console.log(e);
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
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findOneData(id);
    res.send({ ok: true, results: data });
  } catch (e) {
    console.log(e);
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
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ ok: true, results: data });
  } catch (err) {
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};
/**
 * Actualizar registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findByIdAndUpdate(id, body);
    res.send({ ok: true, results: data });
  } catch (err) {
    handleHttpError(res, "ERROR_UPDATE_ITEM");
  }
};
/**
 * Eliminar registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.delete({ _id: id });
    console.log(data);
    res.send({ ok: true, results: data });
  } catch (err) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
