import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ForgetPassword() {
  let userLocal = window.localStorage.getItem("user");
  let userObj = userLocal && JSON.parse(userLocal);

  const userRole = userObj && userObj.user.role;
  const userId = userObj && userObj.user._id;

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // react-hook-forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      password: "",
      rePassword: "",
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
    console.log(data);
    if (data.password !== data.rePassword) {
      return Swal.fire({
        title: "Error in Email or Password",
        text: "Check the password or email input",
        icon: "error",
        confirmButtonText: "Back",
      });
    } else {
      let payload = { user: userRole, password: data.password };
      dispatch(updateUser(payload, userId));
      handlelogout();
      return Swal.fire({
        text: "Successfully",
        icon: "success",
        confirmButtonText: "Back",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
    // } else if (
    //   AllUsers.find(
    //     (item) =>
    //       item.username.replace(/\s+/g, "").toLowerCase() ===
    //       data.username.replace(/\s+/g, "").toLowerCase()
    //   )
    // ) {
    //   return Swal.fire({
    //     title: "repeated user",
    //     text: "Check the user exists!!",
    //     icon: "error",
    //     confirmButtonText: "Back",
    //   });
  };

  // const [newPass, setNewPass] = useState({
  //   password: "",
  //   rePassword: "",
  // });
  // const handleChange = (e) => {
  //   console.log(newPass);
  //   setNewPass({
  //     ...newPass,
  //     [e.target.name]: e.target.value,
  //   });
  //   console.log(newPass);
  // };

  const handlelogout = () => {
    window.localStorage.removeItem("user");
    navigate("/");
  };

  if (!userRole) {
    Swal.fire({
      text: "Please, Login",
      icon: "error",
      confirmButtonText: "Back",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  } else {
    return (
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div>
            <a href="/">
              <h3 className="text-4xl font-bold text-black">Forget Password</h3>
            </a>
          </div>
          {/* Form */}
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className=" text-xl font-bold text-black undefined flex justify-between"
                >
                  {userObj.user.email}
                  <Link to={"/login"}>
                    <span className="font-normal text-xs text-purple-600 hover:underline">
                      To Login
                    </span>
                  </Link>
                </label>
                {/* <div className="flex flex-col items-start">
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
              </div> */}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-black undefined"
                >
                  New Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type={pass}
                    name="password"
                    className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="New Password"
                    // onChange={(e) => handleChange(e)}
                    {...register("password", {
                      required: true,
                      pattern:
                        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g,
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
                  Confirm New Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type={passTwo}
                    name="rePassword"
                    className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Confirm New Password"
                    // onChange={(e) => handleChange(e)}
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
                </div>
              </div>
              <div className="flex items-center mt-4">
                <button
                  className="w-full px-4 py-2 tracking-wide font-bold text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  style={{ backgroundColor: "#113452" }}
                  disabled={Object.entries(errors).length === 0 ? "" : true}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
