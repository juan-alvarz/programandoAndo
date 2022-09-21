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
const uwuToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE5YWI4MWRkM2JlZDFhYzZhNjA1ZTkiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2MjYyNjg4MCwiZXhwIjoxNjYyNjcwMDgwfQ.fsbWMOetmyBPPDP7dd-YQfKI9BqQtu5Kk1bh9HWBRrY"

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
verifyToken(uwuToken)

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
