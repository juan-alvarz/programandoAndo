import React from "react";
import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <NavLink to="/home">
        <button>Entrar</button>
      </NavLink>
    </div>
  );
}

export default LandingPage;
