const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
  //const maxAge = "1h"; //1 * 24 * 60 * 60 * 1000;
  const jwtSecretKey = process.env.SECRET_TOKEN;
  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      //isAdmin: user.isAdmin,
      image: user.image,
    },
    jwtSecretKey,
    //{ expiresIn: maxAge }
  );

  return token;
};

module.exports = generateAuthToken;
