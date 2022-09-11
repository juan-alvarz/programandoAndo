import React from "react";
import Sidebar from "./Sidebar";

function UsersPA() {
  return (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div className="w-full h-full flex justify-center items-center">
        <p>Users</p>
      </div>
    </div>
  );
}

export default UsersPA;
