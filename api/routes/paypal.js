<<<<<<< HEAD
const express = require("express");
const {
  createPayment,
  executePayment,
  cancelPayment,
} = require("../controllers/paypal");
const router = express.Router();

// http://localhost:3001/api/paypal/[ROUTE]
router.post("/create-payment", createPayment);
router.get("/execute-payment", executePayment);
router.get("/cancel-payment", cancelPayment);

module.exports = router;
=======
const express = require("express");
const {
  createPayment,
  executePayment,
  cancelPayment,
} = require("../controllers/paypal");
const router = express.Router();

// http://localhost:3001/api/paypal/[ROUTE]
router.post("/create-payment", createPayment);
router.get("/execute-payment", executePayment);
router.get("/cancel-payment", cancelPayment);

module.exports = router;
>>>>>>> back
