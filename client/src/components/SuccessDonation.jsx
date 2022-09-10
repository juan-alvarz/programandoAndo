import axios from "axios";
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { getUser, updateUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import logo from "../utils/images/LOGOPA.png";

export default function SuccessDonation() {
  const dispatch = useDispatch();

  const userToUpdate = useSelector((state) => state.programandoando.user);

  const user = JSON.parse(localStorage.getItem("user"));
  const userUpdateId = user.user._id;
  console.log(userUpdateId);

  useEffect(() => {
    dispatch(getUser(userUpdateId));
  }, [dispatch]);

  const currentAmount = userToUpdate.contributor;
  if (currentAmount) {
    console.log(currentAmount);
  }
  console.log(userToUpdate);

  var amount = JSON.parse(localStorage.getItem("amount"));
  console.log(amount);
  if (Object.keys(userToUpdate).length === 0) {
    return <Loader />;
  } else {
    if (currentAmount && amount !== 0 && amount !== null) {
      console.log("el amount existe y no es nulo");
      const payload = { contributor: amount + currentAmount };
      console.log(payload);
      dispatch(updateUser(payload, userUpdateId))
        .then(console.log("actualizado con exito"))
        .then(
          axios.post(`http://localhost:3001/api/users/emailDonationSuccess/`, {
            name: userToUpdate.name,
            email: userToUpdate.email,
            amount: amount,
          })
        )
        .then(localStorage.removeItem("amount"));

      /* Renderizado */
      return (
        <div>
          <NavBar />
          <div style={{ display: "flex" }}>
            <div>
              <h1>Success Donation!</h1>
            </div>
            <div>
              <span>
                thanks for contributing to the page, remember that all the
                content is totally free, the donation helps to keep the page on
                the air and now you enter the list of people who have helped
                keep it going
              </span>
              <div>
                <a
                  href="#"
                  class="flex flex-col items-center rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
                >
                  <img
                    class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={logo}
                    alt="not found"
                  />
                  <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {userToUpdate.username} is a new contributor!
                    </h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      we want to thank {userToUpdate.username} for contributing
                      to <strong>programandoando</strong> and help support it,
                      voluntarily contributing {amount} USD at this time and has
                      collaborated {userToUpdate.contributor} USD in total
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log("no hay nada para actualizar pilluelo");
      return (
        /* renderizado */
        <div>
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
              }}
            >
              on this page you can get a special and personalized card for
              yourself when you donate and contribute to the maintenance of the
              page, at this time you have not donated. if you want contribute,
              follow this
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
