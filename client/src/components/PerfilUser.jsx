import React, { useState, useEffect } from "react";
import Select from "react-select";
import { countries } from "../utils/countries";
import { levelEducation } from "../utils/levelEducation";
import { preferences } from "../utils/preferences";
import photoPerfil from "../utils/images/michi-cool.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUsers, getUser } from "../redux/actions";
import Swal from "sweetalert2";

function PerfilUser() {
  let userLocal = window.localStorage.getItem("user");
  let userObj = userLocal && JSON.parse(userLocal);

  const userRole = userObj && userObj.user.role;
  const userId = userObj && userObj.user._id;

  const dispatch = useDispatch();
  const { users, user } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getUsers());
    const id = async () => await users[0]._id;
    dispatch(getUser(id));
  }, [dispatch, getUsers]);

  // useEffect(() => {
  //   (async function () {
  //     const usr = await axios
  //       .get("http://localhost:3001/api/auth/me", {
  //         withCredentials: true,
  //       })
  //       .then((res) => res.data);
  //     if (usr) {
  //       console.log(usr.decoded._id);
  //       dispatch(getUser(usr.decoded._id));
  //       // dispatch(getFavorites(usr.decoded._id));
  //       window.localStorage.setItem(
  //         "user",
  //         JSON.stringify({ token: usr.tokenJwt, user })
  //       );
  //     }
  //   })();
  // }, [Object.keys(user).length !== 0]);

  const [inputUser, setInputUser] = useState({
    name: "",
    username: "",
    email: "",
    emailConf: "",
    password: "",
    passwordConf: "",
    biography: "",
    preferences: "",
    country: "",
    studyStatus: "",
    birthday: "",
    authorizeNotifications: false,
    isWorking: false,
  });

  //  const handlelogout = () => {
  //    window.localStorage.removeItem("user");
  //    navigate("/");
  //  };

  // function handleInputs({ id }) {
  //   const findInputs = users.find((user) => user._id);

  //   if (findInputs) {
  //     setInputUser({
  //       name: findInputs.name,
  //       username: findInputs.username,
  //       emial: findInputs.email,
  //       password: findInputs.email,
  //       biography: findInputs.biography,
  //       preferences: findInputs.preferences,
  //       country: findInputs.country,
  //       studyStatus: findInputs.studyStatus,
  //       birthday: findInputs.birthday,
  //     });
  //   }
  //   // console.log(findSelect.courses);
  // }

  // console.log(handleInputs());
  // const findInputs = users.find((user) => user._id);
  // console.log(findInputs);

  const handleChange = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  // React Select
  const countryList = countries.map((country) => {
    return {
      value: country,
      label: country,
    };
  });

  const levelEducationList = levelEducation.map((educ) => {
    return {
      value: educ,
      label: educ,
    };
  });

  const schoolPreferences = preferences.map((school) => {
    return {
      value: school,
      label: school,
    };
  });

  // let schoolPreferences = [];
  // for (let i = 0; i < users.length; i++) {
  //   const element = users[i].schools;
  //   schoolPreferences.push(element);
  // }

  // console.log(schoolPreferences);

  const [selectedPreference, setSelectedPreference] = useState("");
  function handleSelecPreference(data) {
    setSelectedPreference(data);
    setInputUser({ ...inputUser, preferences: data.label });
  }

  const [selectedCountry, setSelectedCountry] = useState("");
  function handleSelectCountry(data) {
    setSelectedCountry(data);
    setInputUser({ ...inputUser, country: data.label });
  }
  // const country = selectedCountry.label;

  const [selectedEducation, setSelectedEducation] = useState("");
  function handleSelectEducation(data) {
    setSelectedEducation(data);
    setInputUser({ ...inputUser, studyStatus: data.label });
  }
  // const education = selectedEducation.label;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      inputUser.password !== inputUser.passwordConf ||
      inputUser.email !== inputUser.emailConf
    ) {
      return Swal.fire({
        title: "Error in Email or Password",
        text: "Check the password or email input",
        icon: "error",
        confirmButtonText: "Back",
      });
    } else {
      let payloadName = { user: userRole, name: inputUser.name };
      dispatch(updateUser(payloadName, userId));

      let payloadEmail = { user: userRole, username: inputUser.email };
      dispatch(updateUser(payloadEmail, userId));

      let payloadUser = { user: userRole, username: inputUser.username };
      dispatch(updateUser(payloadUser, userId));

      let payloadPass = { user: userRole, password: inputUser.password };
      dispatch(updateUser(payloadPass, userId));

      let payloadBio = { user: userRole, biography: inputUser.biography };
      dispatch(updateUser(payloadBio, userId));

      let payloadPref = { user: userRole, preferences: inputUser.preferences };
      dispatch(updateUser(payloadPref, userId));

      let payloadCountry = { user: userRole, country: inputUser.country };
      dispatch(updateUser(payloadCountry, userId));

      let payloadEdu = { user: userRole, studyStatus: inputUser.studyStatus };
      dispatch(updateUser(payloadEdu, userId));

      let payloadDate = { user: userRole, birthday: inputUser.birthday };
      dispatch(updateUser(payloadDate, userId));
    }

    console.log(inputUser);
  };

  // Modificar la vista del inpit password
  const [pass, setPass] = React.useState("password");
  const [passTwo, setPassTwo] = React.useState("password");

  function handlePass() {
    setPass(pass === "password" ? "text" : "password");
  }

  function handlePassTwo() {
    setPassTwo(passTwo === "password" ? "text" : "password");
  }

  return (
    <section
      className="bg-white0"
      style={{ backgroundColor: "rgb(240,240,240)" }}
    >
      <div className="flex justify-center min-h-screen">
        {/* <div
          className="hidden bg-cover lg:block lg:w-2/5"
          // style={require("backgroundImage: url('../utils/images/fav.png'/)")}
        >
          <img src={photoPerfil} alt="perfil-image" className="w-full h-full" />
        </div> */}

        <div
          className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5"
          style={{
            backgroundColor: "rgb(255,255,255)",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <div className="w-full">
            <h2
              className="text-5xl font-semibold tracking-wider capitalize "
              style={{ color: "#113452", textAlign: "center" }}
            >
              Edit Perfil
            </h2>

            <div className="mt-6">
              <div className="mt-3 md:flex md:items-center md:-mx-2"></div>
            </div>
            <picture className="flex justify-center m-5">
              <img
                src={require("../utils/images/michi-cool.jpg")}
                alt=""
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  // objectFit: "cover",
                }}
              />
            </picture>
            <h2
              className="text-center font-bold text-2xl text-white"
              style={{ color: "#113452", textAlign: "center" }}
            >
              User Data
            </h2>
            <form
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={inputUser.name}
                  placeholder="Full Name"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md       focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  User Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={inputUser.username}
                  placeholder="User Name"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md       focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={inputUser.email}
                  placeholder="Email"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md       focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  Config Email
                </label>
                <input
                  type="email"
                  name="emailConf"
                  value={inputUser.emailConf}
                  placeholder="Email"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md       focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  Password
                </label>
                <input
                  type={pass}
                  name="password"
                  value={inputUser.password}
                  placeholder="Password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md       focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => handleChange(e)}
                />

                <button
                  type="button"
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  px-0.5 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => setPass(handlePass)}
                >
                  view
                </button>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  Confirm password
                </label>
                <input
                  type={passTwo}
                  name="passwordConf"
                  value={inputUser.passwordConf}
                  placeholder="Config password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => handleChange(e)}
                />

                <button
                  type="button"
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  px-0.5 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => setPassTwo(handlePassTwo)}
                >
                  view
                </button>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-gray-600   ">
                  Biography
                </label>
                <textarea
                  placeholder="Biography"
                  name="biography"
                  value={inputUser.biography}
                  className="  w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md       focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  School Preferences
                </label>
                <Select
                  options={schoolPreferences}
                  placeholder="Schools"
                  value={selectedPreference}
                  onChange={handleSelecPreference}
                  isSearchable={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  Country
                </label>
                <Select
                  options={countryList}
                  placeholder="Country"
                  value={selectedCountry}
                  onChange={handleSelectCountry}
                  isSearchable={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  Level of Education
                </label>
                <Select
                  options={levelEducationList}
                  placeholder="Level of Education"
                  value={selectedEducation}
                  onChange={handleSelectEducation}
                  // isSearchable={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600   ">
                  Date Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={inputUser.birthday}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md       focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="">
                <div className="flex justify-between">
                  <label htmlFor="">are you currently working?</label>
                  <input type="checkbox" checked="checked" className="" />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="">
                    Do you want to receive email notifications?
                  </label>
                  <input type="checkbox" checked="checked" className="" />
                </div>
              </div>

              <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Save</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerfilUser;
