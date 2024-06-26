const registerValidator = (req, res, next) => {
  
  const {
    resName,
    address,
    phone,
    resowner,
    password,
    resopentime,
    resclosetime,
    restype,
    cuisine,
    resprofilepic,
  } = req.body;

  if (
    resName == null ||
    address == null ||
    phone == null ||
    resowner == null ||
    password == null ||
    resopentime == null ||
    resclosetime == null ||
    restype == null ||
    cuisine == null ||
    resprofilepic == null
  ) {
    res.status(400).send({ msg: "Plese enter all details, it can't be empty" });
  } else {
    let phoneformat = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    let formatmatch = phoneformat.test(phone);

    if (formatmatch) {
      next();
    } else {
      res.status(400).send({ msg: "Invalid Phone Number" });
    }
  }
};

module.exports = registerValidator;
