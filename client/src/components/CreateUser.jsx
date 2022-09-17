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
      image: { url: "", public_id: "" },
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

    if (data.password !== data.rePassword || data.email !== data.reEmail) {
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
    } else if (
      users.find(
        (item) =>
          item.username.replace(/\s+/g, "").toLowerCase() ===
          data.username.replace(/\s+/g, "").toLowerCase()
      )
    ) {
      return Swal.fire({
        title: "repeated user",
        text: "Check the user exists!!",
        icon: "error",
        confirmButtonText: "Back",
      });
    } else {
      // console.log(data);
      const infoUser = [get].map((user) => {
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
        title: "Create User",
        text: "Create User Successfully",
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
                      pattern: /^[\w]+@{1}[\w]+\.[a-z]{2,3}$/,
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
                      pattern: /^[\w]+@{1}[\w]+\.[a-z]{2,3}$/,
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
            <div className="relative flex items-center justify-center w-full mt-6 border border-t">
              <div className="absolute px-5 bg-white">Or</div>
            </div>
            <div className="flex mt-4 gap-x-2">
              <button
                type="button"
                className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 text-red-500 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 text-indigo-800 fill-current"
                >
                  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                <svg
                  className="w-6 h-6 text-blue-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
