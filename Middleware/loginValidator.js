const Validator = (req, res, next) => {
  const { phone, password } = req.body;

  if (phone == null || password == null) {
    res.status(400).send({ msg: "Username or password is can't empty" });
  } else {
    next();
  }
};

module.exports = Validator;
