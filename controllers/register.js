exports.register = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const registerEmpolyee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: password,
        confirmpassword: cpassword,
      });

      const token = await registerEmpolyee.generateAuthToken();
      console.log(token);

      const registered = await registerEmpolyee.save();
      req.status(200).send(registered);
    } else {
      res.send("password are not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userEmail =await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password,userEmail.password)

    // const token = await userEmail.generateAuthToken();
    // console.log(token);
    
    if (isMatch) {
        res.status(200).send(userEmail);
    } else {
        res.send("invalid Password Details");
    }
  } catch (error) {
    res.status(400).send("invalid login Details");
  }
};
