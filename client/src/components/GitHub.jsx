import React from "react";
import { GITHUB, gitHubRedirectURL, path } from "../utils/gitHubCredentials.js";
import github from "../utils/images/4e309bf2-8d38-11e5-8d46-b347b2bd242e.png";

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
