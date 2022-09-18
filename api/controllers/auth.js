require("dotenv").config();
const { handleHtppError } = require("../utils/handleError");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const querystring = require("node:querystring");
const {
  tokenSign,
  verifyEmailToken,
  verifyToken,
} = require("../utils/handleJwt");
const { usersModel } = require("../models/index");
const { sendConfirmationEmail } = require("../config/nodemailer.config");

const { GITHUB, GITHUB_SECRET, SECRET } = process.env;
const COOKIE_NAME = "github-jwt";
const url = require("url");

const getGitHubUser = async (code) => {
  // console.log(GITHUB);
  // console.log(GITHUB_SECRET);
  // console.log(SECRET);
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB}&client_secret=${GITHUB_SECRET}&code=${code}`
    )
    .then((res) => res.data)

    .catch((error) => {
      console.log(error.message);
    });
  // console.log(githubToken);

  const decoded = querystring.parse(githubToken);
  // console.log(decoded);

  const accessToken = decoded.access_token;
  // console.log(accessToken);

  return axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Error getting user from GitHub`);
      throw error;
    });
};

const gitHubData = async (req, res, next) => {
  const { code } = req.query;
  const { path } = req.query;
  console.log(code);
  console.log(path);

  if (!code) {
    handleHtppError(res, "No code!", 404);
  }
  const gitHubUser = await getGitHubUser(code);
  const token = jwt.sign(gitHubUser, SECRET);

  let { login, name, email } = jwt_decode(token);
  let username = login;

  req.body = { email, name, username };
  // console.log(req.body);
  next();
  // res.send(token);
};

const gitHubCreate = async (req, res, next) => {
  const { name, username, email, path } = req.body;
  console.log(req.body);

  let find = await usersModel.findOne({ email });
  // console.log(find);

  if (!find) {
    const emailToken = await verifyEmailToken(email);

    let user = await usersModel.create({
      name,
      username,
      email,
      confirmationCode: emailToken,
    });
    user.set("password", undefined, { strict: false }); // oculto la password

    const data = {
      token: await tokenSign(user),
      user,
    };
    sendConfirmationEmail(user.username, user.email, user.confirmationCode);
    res.redirect("http://localhost:3000");
  } else {
    if (find.status !== "active") {
      // handleHtppError(res, "Pending Account. Please Verify Your Email!", 401);
      res.redirect(
        url.format({
          pathname: "http://localhost:3000",
          query: {
            message: "Pending_Account_Please_Verify_Your_Email!",
          },
        })
      );
    } else {
      const dataGithub = {
        token: await tokenSign(find),
        user: find,
      };
      res.cookie(COOKIE_NAME, dataGithub.token);
      res.redirect("http://localhost:3000");
    }
  }
};

const isLogin = async (req, res) => {
  try {
    if (req.headers.cookie) {
      // console.log(req.headers.cookie);
      const cookie = req.headers.cookie.split("; ");
      const findToken = cookie
        .find((e) => e.includes("github-jwt"))
        .split("=")[1];
      console.log(findToken);
      const decode = await verifyToken(findToken);
      // console.log(decode)
      return res.send(decode);
    }
  } catch (error) {
    res.status(403).send({ msg: "Session expired please login again" });
  }
};

module.exports = { gitHubData, gitHubCreate, isLogin };
