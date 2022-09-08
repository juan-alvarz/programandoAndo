import React from "react";
import NavBar from "./NavBar";

export default function SuccessDonation() {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <h1>Success Donation!</h1>
        <span>
          thanks for contributing to the page, remember that all the content is
          totally free, the donation helps to keep the page on the air and now
          you enter the list of people who have helped keep it going
        </span>
      </div>
    </div>
  );
}
