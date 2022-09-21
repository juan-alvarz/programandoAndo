import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ver from "../utils/images/ver.png";
import ocultar from "../utils/images/ojo.png";
import { Link } from "react-router-dom";
import { userLogin } from "../redux/actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import Google from "./Google";
import GitHub from "./GitHub";
import NavBar from "./NavBar";
import Swal from "sweetalert2";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);
  const [searchParams, setSearchParams] = useSearchParams();
  const [usuario, setUsuario] = useState({});
  const query = searchParams.get("message");
  useEffect(() => {}, []);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [verPassword, setVerPassword] = useState("password");
  const [imagenVer, setImagenVer] = useState(ver);

  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleLogin = (e) => {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
      setTimeout(function() {
        setEmailError("");
      }, 3000);
    }

    if (password.length > 64 || password.length < 8) {
      setPassError("The password must be between 8 and 64 characters");
      setTimeout(function() {
        setPassError("");
      }, 3000);
    } else if (emailRegex.test(email)) {
      setEmailError("");
      setPassError("");

      dispatch(userLogin({ email, password }));
      setPassword("");
      setEmail("");

      setTimeout(function() {
        let usuarioLocal = window.localStorage.getItem("user");

        if (usuarioLocal) {
          // setError("login exitoso");
          setTimeout(function() {
            navigate("/");
          }, 2000);
          Swal.fire({
            title: "Successful login",
            text: "You are being redirected to the home",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          // setError("login incorrecto");
          // setTimeout(function() {
          //   setError("");
          // }, 2000);
          // Swal.fire({
          //   title: "Unsuccessful login",
          //   text: "You must log in with an existing account",
          //   icon: "error",
          //   timer: 2000,
          //   showConfirmButton: false,
          // });
        }
      }, 500);
    }
  };

  const handleVer = () => {
    if (verPassword === "password") {
      setImagenVer(ver);
      setVerPassword("text");
    } else if (verPassword === "text") {
      setImagenVer(ocultar);
      setVerPassword("password");
    }
  };
  useEffect(() => {
    (async function() {
      const usr = await axios
        .get(`http://localhost:3001/api/auth/me`, {
          withCredentials: true,
        })
        .then((res) => res.data);
      if (usr) {
        // Swal.fire({
        //   title: "Successful login",
        //   text: "You are being redirected to the home",
        //   icon: "success",
        //   timer: 2000,
        //   showConfirmButton: false,
        // });
        Swal.fire({
          title: "Successful login",
          text: "You are being redirected to the home",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (query === "Pending_Account_Please_Verify_Your_Email!") {
      Swal.fire({
        title: "Ups Something Happens",
        // text: "Can't create video please try again",
        text: "Pending Account. Please Verify Your Email!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, []);

  useEffect(() => {
    if (query === "Thanks_for_register") {
      Swal.fire({
        title: "Thanks for register",
        // text: "Can't create video please try again",
        text: "Now please check your email for verify your account",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  }, []);
  return (
    <div
      style={{ backgroundColor: "rgb(240, 240, 240)" }}
      className="relative flex flex-col justify-center min-h-screen overflow-hidden"
    >
      <NavBar />
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1
          style={{ color: "rgb(17, 52, 82)" }}
          className="text-3xl font-semibold text-center text-black uppercase"
        >
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              value={email}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <small className="text-red-600 font-bold">{emailError}</small>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <div>
              <input
                value={password}
                type={verPassword}
                className="block w-full px-4 py-2 mt-2 text-black font-light bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="password"
                placeholder="Password 8 min - 64 max"
                onChange={handleChange}
              />
              <img className="p-3" src={imagenVer} onClick={handleVer}></img>
              <small className="text-red-600 font-bold">{passError}</small>
            </div>
          </div>
          <Link
            to="/forgetPassword"
            className="text-xs text-purple-600 hover:underline"
            style={{ color: "#A84C65" }}
          >
            Forget Password?
          </Link>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              style={{ backgroundColor: "#113452" }}
              onClick={handleLogin}
            >
              Login
            </button>
            <span>{error}</span>
          </div>
        </form>

        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white font-bold">Or</div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="flex mt-4 ">
            <Google />
          </div>
          <div className="flex mt-3.5 " style={{ paddingLeft: 10 }}>
            <GitHub />
          </div>
        </div>
        <p className="mt-8 text-xs font-medium text-center text-black">
          Don't have an account?
          <a
            href="/register"
            className="font-medium text-blue-600 hover:underline ml-2"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
