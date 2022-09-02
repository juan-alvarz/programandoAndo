const handleHtppError = (res, message = "Somethings happens", code = 403) => {
  res.status(code);
  res.status({ error: message });
};

module.exports = { handleHtppError };

//
