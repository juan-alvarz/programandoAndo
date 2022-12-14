import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { languages } from "../utils/languages";
import { countries } from "../utils/countries";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUser, createsUser } from "../redux/actions";
import NavBar from "./NavBar";

export default function CreateUser() {
  const { users } = useSelector((state) => state.programandoando);

  console.log(users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const navigate = useNavigate();
  // react-hook-forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      reEmail: "",
      password: "",
      rePassword: "",
      date: "",
      language: "",
      country: "",
      image: {
        url: "",
        public_id: "",
      },
    },
  });
  // Modificar la vista del inpit password
  const [pass, setPass] = React.useState("password");
  const [passTwo, setPassTwo] = React.useState("password");

  function handlePass() {
    setPass(pass === "password" ? "text" : "password");
  }

  function handlePassTwo() {
    setPassTwo(passTwo === "password" ? "text" : "password");
  }

  const onSubmit = (data) => {
    const get = getValues();
    console.log(data.username);
    const findUser =
      users &&
      users.find(
        (item) =>
          item.username.replace(/\s+/g, "").toLowerCase() ===
          data.username.replace(/\s+/g, "").toLowerCase()
      );
    const findEmail =
      users &&
      users.find(
        (item) => item.email.toLowerCase() === data.email.toLowerCase()
      );
    if (findUser && findUser.length > 0) {
      return Swal.fire({
        title: "This user already exists!",
        icon: "error",
        confirmButtonText: "ok",
      });
    } else if (findEmail && findEmail.lenght > 0) {
      return Swal.fire({
        title: "This email already exists!",
        text: "Check the password or email input",
        icon: "error",
        confirmButtonText: "ok",
      });
    } else if (
      data.password !== data.rePassword ||
      data.email !== data.reEmail
    ) {
      return Swal.fire({
        title: "Error in Email or Password",
        text: "Check the password or email input",
        icon: "error",
        confirmButtonText: "Back",
      });
    } else if (!data.language || !data.country) {
      return Swal.fire({
        title: "Error in Language or Country",
        text: "Check the Language or Country input",
        icon: "error",
        confirmButtonText: "Back",
      });
    } else {
      console.log(data);
      const infoUser = [get].map((user) => {
        const dataUser = user.date;
        console.log(dataUser);
        const date = dataUser.split("-");
        console.log(date);
        const newDate = new Date(date[0], date[1] - 1, date[2]);
        console.log(newDate);
        return {
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
          date: user.date,
          language: user.language.toLowerCase(),
          country: user.country,
          image: { url: "", public_id: "" },
        };
      });

      console.log(infoUser);
      dispatch(createsUser(infoUser[0]));
      console.log(infoUser[0]);
      return Swal.fire({
        title: "Checked email for use our website",
        icon: "success",
        confirmButtonText: "Back",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  function handleSelectLanguage(data) {
    setSelectedLanguage(data);
    setValue("language", data.label);
  }

  function handleSelectCountry(data) {
    setSelectedCountry(data);
    setValue("country", data.label);
  }

  const uppInitial = (str) => str[0].toUpperCase() + str.slice(1);
  const optionLanguages = languages?.map((leng) => {
    return {
      value: leng,
      label: uppInitial(leng),
    };
  });

  const optionCountries = countries?.map((contry) => {
    return {
      value: contry,
      label: contry,
    };
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <NavBar />
      <div
        style={{ backgroundColor: "rgb(240, 240, 240)" }}
        className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50"
      >
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <div>
            <a href="/">
              <h3
                style={{ color: "rgb(17, 52, 82)" }}
                className="text-3xl font-semibold text-center text-black uppercase"
              >
                Create User
              </h3>
            </a>
          </div>
          {/* Form */}
          <div className="mt-8 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-black undefined"
                >
                  Full Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Full Name"
                    {...register("name", {
                      required: true,
                      pattern: /^[A-Z a-z]+$/i,
                    })}
                  />
                  {errors.name?.type === "required" && (
                    <small className="text-red-600 font-bold">
                      Name is required
                    </small>
                  )}
                  {errors.name?.type === "pattern" && (
                    <small className="text-red-600 font-bold">
                      Input only letters
                    </small>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold text-black undefined"
                >
                  User Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="username"
                    className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="User Name"
                    {...register("username", {
                      required: true,
                      pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
                    })}
                  />
                  {errors.username?.type === "required" && (
                    <small className="text-red-600 font-bold">
                      User is required
                    </small>
                  )}
                  {errors.username?.type === "pattern" && (
                    <small className="text-red-600 font-bold">
                      Invalid user
                    </small>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-black undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email"
                    className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <small className="text-red-600 font-bold">
                      Email required
                    </small>
                  )}
                  {errors.email?.type === "pattern" && (
                    <small className="text-red-600 font-bold">
                      You must enter your email correctly
                    </small>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="reEmail"
                  className="block text-sm font-bold text-black undefined"
                >
                  Confirm Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="reEmail"
                    className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Re-Email"
                    {...register("reEmail", {
                      required: true,
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    })}
                  />
                  {errors.reEmail?.type === "required" && (
                    <small className="text-red-600 font-bold">
                      Confirm email is required
                    </small>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-black undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type={pass}
                    name="password"
                    className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                      pattern: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g,
                    })}
                  />
                  <div className="flex justify-end mt-0.5 w-full">
                    <button
                      type="button"
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  px-0.5 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => setPass(handlePass)}
                    >
                      view
                    </button>
                  </div>

                  {errors.password?.type === "required" && (
                    <small className="text-red-600 font-bold">
                      Password is required
                    </small>
                  )}
                  {errors.password?.type === "pattern" && (
                    <small className="text-red-600 font-bold">
                      password 8 to 64 characters with upper and lower case,
                      numbers and special characters
                    </small>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-bold text-black undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type={passTwo}
                    name="rePassword"
                    className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Re-Password"
                    {...register("rePassword", { required: true })}
                  />
                  <div className="flex justify-end mt-0.5 w-full">
                    <button
                      type="button"
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  px-0.5 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => setPassTwo(handlePassTwo)}
                    >
                      view
                    </button>
                  </div>

                  {errors.rePassword?.type === "required" && (
                    <small className="text-red-600 font-bold">
                      Confirm password is required
                    </small>
                  )}
                  {/* {errors.rePassword?.type === "pattern" && (
                    <small className="text-red-600 font-bold">
                      Incorrect password
                    </small>
                  )} */}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-bold text-black undefined"
                  >
                    Date of Birthday
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="date"
                      name="date"
                      className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      {...register("date", { required: true })}
                    />
                    {errors.date?.type === "required" && (
                      <small className="text-red-600 font-bold">
                        Date birthday is required
                      </small>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="language"
                    className="block text-sm font-bold text-black undefined"
                  >
                    Language
                  </label>
                  <Select
                    name="language"
                    options={optionLanguages}
                    placeholder="Language"
                    value={selectedLanguage}
                    onChange={handleSelectLanguage}
                    isSearchable={false}
                    className="font-light"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="country"
                    className="block text-sm font-bold text-gray-700 undefined"
                  >
                    Country
                  </label>
                  <Select
                    name="country"
                    options={optionCountries}
                    placeholder="Countries"
                    value={selectedCountry}
                    onChange={handleSelectCountry}
                    isSearchable={true}
                    className="font-light"
                  />
                </div>
              </div>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Forget Password?
              </a>
              <div className="flex items-center mt-4">
                <button
                  className="w-full px-4 py-2 tracking-wide font-bold text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  style={{ backgroundColor: "#113452" }}
                  disabled={Object.entries(errors).length === 0 ? "" : true}
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-4 text-grey-600">
              Already have an account?
              <span>
                <span> </span>
                <a className="text-blue-600 hover:underline" href="/login">
                  Log in
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
