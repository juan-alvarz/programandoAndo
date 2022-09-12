import React from "react";
import NavBar from "./NavBar";
import card from "../utils/images/cancel-payment.png";

export default function CancelDonation() {
  return (
    <div
      style={{
        background: "rgb(198, 198, 198)",
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
        <img src={card} alt="" style={{ width: "30vh", padding: "10px" }} />
        <h1 style={{ padding: "10px", fontSize: "1.3rem" }}>Cancel donation</h1>
        <span>
          you have cancelled the donation, do not worry if you cannot donate,
          you can help us in other ways, such as by sharing the page on your
          networks or encouraging its use with your close contacts, remember
          that all the content on the page is totally free, we invite you to
          continue studying and learning
        </span>
      </div>
    </div>
  );
}
