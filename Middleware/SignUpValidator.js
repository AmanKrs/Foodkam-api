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
    let phoneformat = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    let formatmatch = email.match(mailformat) && phoneformat.test(phone);

    if (formatmatch) {
      next();
    } else {
      if (!email.match(mailformat)) {
        res.status(400).send({ msg: "email is invalid format" });
      }
      if (!phoneformat.test(phone)) {
        res.status(400).send({ msg: "Invalid Phone Number" });
      }
    }
  }
};

module.exports = ValidatorSignup;
