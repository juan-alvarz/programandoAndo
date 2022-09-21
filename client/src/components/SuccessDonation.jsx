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
        <div style={{ backgroundColor: "rgb(240, 240, 240)", height: "100vh" }}>
      <NavBar />
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
          <h1 className="text-2xl font-bold" style={{ color: "rgb(55, 109, 109)" }}>Success Donation!</h1>
        <div
          className="max-w-2xl text-sm text-center md:text-md md:text-left md:text lg:text-lg leading-tight my-2"
          style={{
            textAlign: "center",
            paddingTop: "15px",
            paddingBottom: "15px",
          }}
        >
          <span>
            Thanks for contributing to the page, remember that all the content
            is totally free, the donation helps to keep the page and now you
            enter the list of people who have helped keep it going, here you are
            a special gift for you, keep it learning!
          </span>
        </div>
        <div className="flex rounded-lg border border-blue-800 border shadow-md md:flex-row md:max-w-xl" style={{marginTop: 40}}>
              <div className="flex items-center rounded-l-lg" style={{backgroundColor: "rgb(17, 52, 82)", padding: "5px", width: 350}}>
                <img
                  style={{backgroundColor: "rgb(17, 52, 82)"}}
                  class="px-3 h-96 rounded-l-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={logo}
                  alt="not found"
                />
              </div>
              <div className="p-5 bg-white">
                <div
                  class="flex flex-col justify-between p-4 leading-normal"
                >
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight"
                    style={{ color: "rgb(55, 109, 109)" }}
                  >
                    {userToUpdate.username} is a new contributor!
                  </h5>
                  <p
                    class="mb-3 font-normal"
                    
                  >
                    We want to thank <strong>{userToUpdate.username}</strong> for
                    contributing to <strong style={{ color: "rgb(168, 76, 101)" }}>ProgramandoAndo</strong> and help
                    support it, voluntarily contributing {amount} USD and has
                    collaborated with {amount + currentAmount} USD in total.
                    <br />
                    Thanks you so much {userToUpdate.username}
                  </p>
                </div>
              </div>
        </div>
      </div>
    </div>
      );
    } else {
      console.log("nada para donar");
      return (
        <div style={{ backgroundColor: "rgb(240, 240, 240)", height: "100vh" }}>
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
            <h1
              className="text-2xl font-bold"
              style={{ color: "rgb(55, 109, 109)" }}
            >
              Donate Section
            </h1>
            <span
              className="max-w-2xl text-sm text-center md:text-md md:text-center md:text lg:text-lg leading-tight my-2"
              style={{
                paddin: "35px",
                marginTop: "20px",
                textAlign: "justify",
              }}
            >
              <strong style={{ color: "rgb(168, 76, 101)" }}>
                ProgramandoAndo
              </strong>{" "}
              manages to stay with the help of donations, remember that all
              content is available for free if you do not want to donate on this
              page you can get a special and personalized card for yourself when
              you donate and contribute to the maintenance of the page, at this
              time you have not donated. if you want contribute, follow this
            </span>
            <div>
              <NavLink to="/donators">
                <button
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  style={{
                    marginTop: 20,
                    backgroundColor: "rgb(55, 109, 109)",
                  }}
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
