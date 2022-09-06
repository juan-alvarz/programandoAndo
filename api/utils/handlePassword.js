const bcrypts = require("bcryptjs");

const encrypt = async (password) => {
  const hash = await bcrypts.hash(password, 10);
  return hash;
};

const compare = async (password, hashPassword) => {
  const comparation = await bcrypts.compare(password, hashPassword);
  return comparation;
};

module.exports = { encrypt, compare };
