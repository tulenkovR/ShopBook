module.exports.login = (req, res) => {
  res.status(200).json({
    login: true
  })
};

module.exports.register = (req, res) => {
  res.status(200).json({
    register: false
  })
};