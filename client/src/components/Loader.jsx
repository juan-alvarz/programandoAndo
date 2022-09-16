import React from "react";
import loader from "../utils/images/loader.gif";

export default function Loader() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <img src={loader} alt="loaderNotFound" />
    </div>
  );
}
