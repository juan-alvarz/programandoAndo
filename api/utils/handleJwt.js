const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EMAIL_SECRET = process.env.SECRET;



const tokenSign = async (user) => { 
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,   
  );
  return sign;
};

const verifyToken = async (tokenJwt) => {
  try {
    decoded = jwt.verify(tokenJwt, JWT_SECRET);
    console.log("Token is real"); 
    const localStorage = {tokenJwt,decoded}
    // console.log(localStorage)
    return(localStorage);
  } catch (error) {
    console.log(error.message);
  }
};

const verifyEmailToken = async (email) => {
  const sign = jwt.sign(
    {
      email,
    },
    JWT_EMAIL_SECRET
  );
  return sign;
};

const verifyChangeToken = async (email) => {
  const changePassToken = jwt.sign(
    {
      email,
    },
    JWT_EMAIL_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return changePassToken;
};

module.exports = { tokenSign, verifyEmailToken, verifyChangeToken,verifyToken };
