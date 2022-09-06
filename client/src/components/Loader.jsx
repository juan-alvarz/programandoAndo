import React from "react";
import loader from "../utils/images/loader.gif";

export default function Loader() {
  return (
    <div className="flex justify-items-center" style={{ width: "100%" }}>
      <img src={loader} alt="notFound" />
    </div>
  );
}