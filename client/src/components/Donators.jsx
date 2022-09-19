import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Error404 from "./Error404";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUser } from "../redux/actions";
import Footer from "./Footer";
import logo from "../utils/images/PayPalLogo.png";

function Donators() {
  const [amount, setAmount] = useState(0); // el monto a donar
  const user = JSON.parse(localStorage.getItem("user"));

  let idUser = user.user._id;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.programandoando.users);

  const amounts = users.map((e) => e.contributor);
  let totalAmount = 0;

  for (let i = 0; i < amounts.length; i++) {
    totalAmount = totalAmount + amounts[i];
  }
  // console.log(totalAmount);

  //actualiza el monto cada que cambia
  const handleChange = (e) => {
    setAmount(e.target.value);
    console.log(amount);
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUser(idUser));
  }, [dispatch]);

  //manda lo que se tiene en el input
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("me disparé");
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
      <div
        className="w-full h-full"
        style={{ backgroundColor: "rgb(240, 240, 240)" }}
      >
        <div className="h-screen ">
          <NavBar />
          <div
            style={{ backgroundColor: "rgb(240, 240, 240)" }}
            className="sm:flex justify-center content-center md:mx-24 lg:my-10 py-10 xl:mx-96 rounded-lg"
          >
            <div className="grid grid-cols-1 md:flex my-10 items-center">
              <form
                className="w-full max-w-xs bg-white flex flex-col py-4 px-8 rounded-lg drop-shadow-xl"
                onSubmit={handleSubmit}
                style={{
                  margin: "auto",
                  backgroundColor: "rgb(240, 240, 240)",
                }}
              >
                <h2
                  style={{ color: "rgb(17, 52, 82)" }}
                  className="text-gray-700 font-bold text-center text-xl"
                >
                  Donation
                </h2>
                <label
                  style={{ color: "rgb(17, 52, 82)" }}
                  className="text-gray-700 text-center font-bold py-4"
                >
                  Amount
                </label>
                <input
                  className="text-gray-700 shadow border rounded border-gray-400 focus:outline-none focus:shadow-outline py-1 px-4 mb-3"
                  type="number"
                  value={amount}
                  onChange={(e) => handleChange(e)}
                  min="0"
                  style={{ backgroundColor: "rgb(240, 240, 240)" }}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  style={{
                    margin: "auto",
                    backgroundColor: "rgb(55, 109, 109)",
                  }}
                >
                  Donate
                </button>
              </form>
              <div className="mx-8 mt-10 md:mt-0">
                <div
                  style={{ color: "rgb(55, 109, 109)" }}
                  className="text-sm text-center md:text-md md:text-left md:text lg:text-xl font-bold leading-tight my-2 uppercase"
                >
                  With this donation you are helping us to maintain the platform
                  and keep growing to provide the best content possible
                </div>
                <div
                  style={{ color: "rgb(168, 76, 101)" }}
                  className="text-xs text-center md:text-left md:text-md mt-3 sm:text-md font-bold uppercase"
                >
                  {`The community has donated ${totalAmount} usd so far. Thank you all for continuing to help make this possible!`}
                </div>
                <div className="flex justify-center md:justify-start">
                  <img src={logo} alt="image paypal" className="w-24 mt-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Donators;
