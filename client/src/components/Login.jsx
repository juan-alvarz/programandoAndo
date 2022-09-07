import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ver from "../utils/images/ver.png"
import ocultar from "../utils/images/ojo.png"
import {userLogin} from "../redux/actions"
import { useNavigate } from "react-router-dom";
import Google from "./Google";

export default function Login() {
  const navigate=useNavigate()
   const dispatch= useDispatch()
   const {user} = useSelector(state=> state.programandoando)
  
  const [usuario,setUsuario]= useState({
     
  })
  


  useEffect(()=>{
    

    
  },[])

  

  
  const handlelogout=(e)=>{
    e.preventDefault()
    
    window.localStorage.removeItem("user")
    /*setTimeout(function () {
    
      navigate("/");
  }, 2000
  )*/
  }





  const [password,setPassword]= useState("")
  const [email,setEmail]= useState("")
  
  const [verPassword,setVerPassword]=useState("password")
  const [imagenVer,setImagenVer]=useState(ver)

  const [error,setError]=useState("")

  

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
    
     dispatch(userLogin({email,password}))
     setPassword("")
     setEmail("")

     setTimeout(function () {
        let usuarioLocal=window.localStorage.getItem("user")
        
        if(usuarioLocal){
          setError("login exitoso")
          setTimeout(function () {
    
            navigate("/");
        }, 2000
        )
        }else{
          setError("login incorrecto")
        }
      }, 500
      )
     
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
 

    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <button onClick={handlelogout} >logout</button>
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
              <span>{error}</span>
            </div>
            
          </form>
  
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white font-bold">Or</div>
          </div>
          <div className="flex mt-4 gap-x-2">
          <Google></Google>
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
