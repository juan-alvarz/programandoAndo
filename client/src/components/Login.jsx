import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ver from "../utils/images/ver.png"
import ocultar from "../utils/images/ojo.png"

export default function Login() {


  //const {user}= useSelector(state => state.programandoando)
  //console.log(user)
  const [usuario,setUsuario]= useState({
      email:"",
      password:""
  })
  window.localStorage.setItem(
    "loginUser", JSON.stringify(usuario)
  )


  useEffect(()=>{
    const loggedUser= window.localStorage.getItem("loginUser")
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUsuario(user)
      console.log(user)
      
    }
  },[])

  //LOGOUT  windows.localStorage.removeItem("loginUser")

  
  const handlelogout=(e)=>{
    e.preventDefault()
    setUsuario(null)
    window.localStorage.removeItem("loginUser")
  }





  const [password,setPassword]= useState("")
  const [email,setEmail]= useState("")
  
  const [verPassword,setVerPassword]=useState("password")
  const [imagenVer,setImagenVer]=useState(ver)

  

  const handleChange=(e)=>{
      if(e.target.name==="email"){
        setEmail(e.target.value)
      }
      if(e.target.name==="password"){
        setPassword(e.target.value)
      }
  }
  const handleLogin=(e)=>{
    e.preventDefault()
     setUsuario(
      {
        email,password
      }
      
     )
     setPassword("")
     setEmail("")
     
  }
  const handleVer=()=>{
    if(verPassword==="password"){
      setImagenVer(ver)
      setVerPassword("text")
    }else if(verPassword==="text"){
      setImagenVer(ocultar)
      setVerPassword("password")
    }

  }
  if(usuario){
    return <button onClick={handlelogout} >logout</button>
  }else if(usuario===null){

    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-black uppercase">
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
                placeholder="Password"
                onChange={handleChange}
              />
              <img className="p-3" src={imagenVer} onClick={handleVer}></img>
              </div>
            </div>
            <a
              href="#"
              className="text-xs text-purple-600 hover:underline"
              style={{ color: "#A84C65" }}
            >
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                style={{ backgroundColor: "#113452" }}
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            
          </form>
  
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white font-bold">Or</div>
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
  
          <p className="mt-8 text-xs font-medium text-center text-black">
            Don't have an account?
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    );
  }


}
