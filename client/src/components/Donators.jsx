import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Donators() {
  const [amount, setAmount] = useState(0); // el monto a donar
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.user);

  // window.localStorage.removeItem
  //
  //actualiza el monto cada que cambia
  const handleChange = (e) => {
    setAmount(e.target.value);
    console.log(amount);
  };

  //manda lo que se tiene en el input
  async function handleSubmit(e) {
    e.preventDefault();

    const link = await axios
      .get(`http://localhost:3001/api/paypal/create-payment/${amount}`)
      .then((r) => r.data);
    //console.log(link);
    window.localStorage.setItem("amount", amount);
    setAmount(0);
    Swal.fire({
      title: "Order create",
      text: "Now you can continue with the payment in PayPal",
      icon: "success",
      confirmButtonText: "Pay Now",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = link.linkPay;
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Donation</h2>
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleChange(e)}
            min="0"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Donators;
