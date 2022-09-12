import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Error404 from "./Error404";
import NavBar from "./NavBar";

function Donators() {
  const [amount, setAmount] = useState(0); // el monto a donar
  const user = JSON.parse(localStorage.getItem("user"));

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

  if (!user) {
    //si no está loggeado, no existe la página
    return <Error404 />;
  } else {
    return (
      <div className="w-full h-full" style={{backgroundColor: 'rgb(240, 240, 240)'}}>
        <NavBar/>
        <div className="h-screen">
          <form
            className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
            style={{ margin: "auto" }}
          >
            <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
              Donation
            </h2>
            <label className="text-gray-700 text-center font-bold py-2">
              Amount
            </label>
            <input
              className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
              type="number"
              value={amount}
              onChange={(e) => handleChange(e)}
              min="0"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              style={{ margin: "auto" }}
            >
              Donate
            </button>
          </form>
        </div>
      </div>
    );
  }
  //return (
  /* <div>
      <div className="w-full h-full" style={{ backgroundColor: "#C9C4B8" }}>
        <div className="h-screen">
          <form
            className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
            action=""
          >
            <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
              Donation
            </h2>
            <label className="text-gray-700 font-bold py-2" for=""></label>
            <input
              className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
              type="number"
              placeholder="Donation $ 0.000"
            />

            <div className="flex justify-center items-center my-4 mt-10">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 ">
                <a href="#" target="_blank">
                  Done
                </a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    ) */
}

export default Donators;
