const request = require("request");
const {
  CLIENT,
  SECRET,
  PAYPAL_API,
} = require("../config/paypalcredentials.js");
const auth = { user: CLIENT, pass: SECRET };
const PORT = 3001;

//Crea la orden de compra, se debe hacer un post con un body, EJ: ({"value":"45"})
const createPayment = (req, res) => {
  const { value } = req.body;
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: value,
        },
        description: "You are contribute with open knowledge",
      },
    ],
    application_context: {
      brand_name: "programandoando.com",
      landing_page: "LOGIN",
      user_action: "PAY_NOW",
      return_url: `http://localhost:${PORT}/api/paypal/execute-payment`,
      cancel_url: `http://localhost:${PORT}/api/paypal/cancel-payment`,
    },
  };
  const data = request.post(
    `${PAYPAL_API}/v2/checkout/orders`,
    {
      auth,
      body,
      json: true,
    },
    (err, response) => {
      //console.log(response.body);
      const link = response.body.links.filter((e) => e.rel === "approve");
      const linkToPay = link[0].href;
      //devuelve el 'href' para que el usuario pague
      console.log(linkToPay);
      //console.log(linkToPay);
      //return res.status(200).json({ data: response.body });
      return res.status(200).json({ linkPay: linkToPay });
    }
  );
};

//ejecuta el pago
const executePayment = (req, res) => {
  const token = req.query.token;
  request.post(
    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {
      auth,
      body: {},
      json: true,
    },
    (err, response) => {
      if (err) {
        return res.send("something bad happend");
      }
      //const name = response.body.data.payment_source.name.given_name;
      //const lastname = response.body.data.payment_source.name.surname;

      return res
        .status(200)
        .send(`Thank you so much for contribute with open knowledge!`);
      //return res.json({ data: response.body.data });
    }
  );
};

const cancelPayment = (req, res) => {
  res.status(200).json({ msg: "cancel payment" });
};

module.exports = {
  createPayment,
  executePayment,
  cancelPayment,
};
