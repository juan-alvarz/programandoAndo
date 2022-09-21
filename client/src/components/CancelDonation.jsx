import React from "react";
import NavBar from "./NavBar";
import card from "../utils/images/cancel-payment.png";

export default function CancelDonation() {
  return (
    <div
      style={{
        background: "rgb(240, 240, 240)",
        height: "100vh",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          margin: "auto",
        }}
      >
        <img src={card} alt="" style={{ width: "20vh", margin: "40px" }} />
        <h1 className="text-2xl font-bold my-5" style={{ color: "rgb(55, 109, 109)" }}>Cancel donation</h1>
        <span className="max-w-2xl text-sm text-center md:text-md md:text-center md:text lg:text-lg my-2">
          You have cancelled the donation, do not worry if you cannot donate,
          you can help us in other ways, such as by sharing the page on your
          networks or encouraging its use with your close contacts, remember
          that all the content on the page is totally free, we invite you to
          continue studying and learning.
        </span>
      </div>
    </div>
  );
}
