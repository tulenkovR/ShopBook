const Category = require('../models/Category');
const Position = require('../models/Position');
const error = require('../utils/error');

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({
      user: req.user.id
    });
    res.status(200).json(categories);
  } catch (e) {
    error(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (e) {
    error(res, e);
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Category.remove({
      _id: req.params.id
    })
    await Position.remove({
      category: req.params.id
    })
    res.status(200).json({
      message: 'Category delete'
    });
  } catch (e) {
    error(res, e);
  }
};

module.exports.create = async (req, res) => {

};

module.exports.update = async (req, res) => {

};