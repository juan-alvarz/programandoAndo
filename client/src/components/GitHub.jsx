import React from 'react'
import {GITHUB,gitHubRedirectURL,path} from "../utils/gitHubCredentials.js"
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { createsUser, googleUserLogin } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GitHub() {

  const handleClick = () =>{

  }
  return (
    <div>
         <a
          href={`https://github.com/login/oauth/authorize?client_id=${GITHUB}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
          
        >
        Login with GitHub
        </a>
        </div>
  )
}
