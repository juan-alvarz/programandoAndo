import axios from "axios";
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { getUser, updateUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import logo from "../utils/images/LOGOPA.png";
import Footer from "./Footer";

//version alternativa
function SuccessDonation() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const idUpdate = currentUser.user._id;
  useEffect(() => {
    dispatch(getUser(idUpdate));
  }, [dispatch]);
  const userToUpdate = useSelector((state) => state.programandoando.user);
  if (Object.keys(userToUpdate).length === 0) {
    return <Loader />;
  } else {
    const currentAmount = userToUpdate.contributor;
    const amount = JSON.parse(localStorage.getItem("amount"));
    //si hay amount, se dispacha lo siguiente
    if (amount) {
      console.log("el amount existe y no es nulo");
      const payload = { contributor: amount + currentAmount };
      console.log(payload);
      dispatch(updateUser(payload, idUpdate))
        .then(console.log("actualizado con exito"))
        .then(
          axios.post(`http://localhost:3001/api/users/emailDonationSuccess/`, {
            name: userToUpdate.name,
            email: userToUpdate.email,
            amount: amount,
          })
        )
        .then(localStorage.removeItem("amount"));
      return (
        <div style={{ background: "#C6C6C6", height: "100vh" }}>
          <NavBar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "x-large" }}>
              <h1>Success Donation!</h1>
            </div>
            <div
              style={{
                textAlign: "center",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
            >
              <span>
                thanks for contributing to the page, remember that all the
                content is totally free, the donation helps to keep the page and
                now you enter the list of people who have helped keep it going,
                here you are a special gift for you, keep it learning!
              </span>
            </div>
            <div>
              <a
                href="#"
                className="flex flex-col items-center rounded-lg border shadow-md md:flex-row md:max-w-xl bg-gradient-to-r from-sky-200 to-red-200"
                style={{
                  border: "1px solid #113452",
                }}
              >
                <img
                  class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={logo}
                  alt="not found"
                  style={{ padding: "2px" }}
                />
                <div class="flex flex-col justify-between p-4 leading-normal">
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight"
                    style={{ color: "#113452" }}
                  >
                    {userToUpdate.username} is a new contributor!
                  </h5>
                  <p class="mb-3 font-normal" style={{ color: "#113452" }}>
                    we want to thank <strong>{userToUpdate.username}</strong>{" "}
                    for contributing to <strong>programandoando</strong> and
                    help support it, voluntarily contributing {amount} USD and
                    has collaborated with {amount + currentAmount} USD in total.
                    <br />
                    Thanks you so much {userToUpdate.username}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      console.log("nada para donar");
      return (
        <div style={{ background: "#C6C6C6", height: "100vh" }}>
          <div>
            <NavBar />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              margin: "auto",
              paddingTop: "35px",
            }}
          >
            <h1 className="text-2xl">Donate Section</h1>
            <span
              style={{
                paddin: "35px",
                marginTop: "20px",
                textAlign: "justify",
              }}
            >
              <strong>programandoando</strong> manages to stay with the help of
              donations, remember that all content is available for free if you
              do not want to donate on this page you can get a special and
              personalized card for yourself when you donate and contribute to
              the maintenance of the page, at this time you have not donated. if
              you want contribute, follow this
            </span>
            <div>
              <NavLink to="/donators">
                <button
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  style={{ marginTop: "40px" }}
                >
                  Donate
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SuccessDonation;
