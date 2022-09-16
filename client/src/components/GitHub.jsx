import React from "react";
import { GITHUB, gitHubRedirectURL, path } from "../utils/gitHubCredentials.js";
import github from "../utils/images/github.png";

export default function GitHub() { 
  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${GITHUB}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
      >
        <img
          src={github}          
        />
      </a>
    </div>
  );
}
