const Order = require('../models/Order');
const error = require('../utils/error');

module.exports.getAll = async (req, res) => {
  const query = {
    user: req.user.id
  }
  // Больше либо равно
  if (req.query.start) {
    query.date = {
      $gte: req.query.start
    }
  }
  // Меньше либо равно
  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }
    query.date.$lte = req.query.end
  }

  if (req.query.order) {
    query.order = +req.query.order
  }

  try {
    const orders = await Order.find(query)
      .sort({
        date: -1
      })
      .skip(+req.query.offset)
      .limit(+req.query.limit);
    res.status(200).json(orders);
  } catch (e) {
    error(res, e);
  }

};
module.exports.create = async (req, res) => {
  try {
    const lastOrder = Order.findOne({
      user: req.user.id
    }).sort({
      date: -1
    });
    const maxOrder = lastOrder ? lastOrder.order : 0
    const order = await new Order({
      order: maxOrder + 1,
      list: req.body.list,
      user: req.user.id
    }).save();
    res.status(201).json(order);
  } catch (e) {
    error(res, e);
  }
};