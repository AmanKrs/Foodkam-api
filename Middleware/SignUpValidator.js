const ValidatorSignup = (req, res, next) => {
  //   const { phone, firstName, lastName, email, city, password } = req.body;
  const { firstName, lastName, phone, email, password } = req.body;
  if (
    phone == null ||
    firstName == null ||
    lastName == null ||
    email == null ||
    password == null
  ) {
    res.status(400).send({ msg: "Plese enter details, it is can't be empty" });
  } else {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(mailformat)) {
      next();
    } else {
      res.status(400).send({ msg: "email is invalid format" });
    }
  }
};

module.exports = ValidatorSignup;
