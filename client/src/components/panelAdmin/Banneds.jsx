import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Error404 from "../Error404";

import { getUsersBanned, restoreUser } from "../../redux/actions";

function Banned() {
  const dispatch = useDispatch();
  const { userBanned } = useSelector((state) => state.programandoando);

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  let role = userObj && userObj.user.role;

  useEffect(() => {
    dispatch(getUsersBanned());
  }, [dispatch]);

  // ============ Banned =================
  const optionListUsers = userBanned?.map((banne) => {
    return {
      value: banne._id,
      label: banne.name,
    };
  });

  const [bannedDelete, setBannedDelete] = useState();
  function handleSelectRestore(data) {
    setBannedDelete(data);
  }

  const handleRestoreUser = (id) => {
    dispatch(restoreUser(id));
    Swal.fire({
      title: "User Restore Successfully",
      icon: "success",
      confirmButtonText: "Back",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate("/userspa");
        window.location.reload();
      }
    });
    setBannedDelete("Select User");
  };

  return role === "admin" ? (
    <div
      style={{ backgroundColor: "rgb(240, 240, 240)" }}
      className="text-2x1 font-semibold flex"
    >
      <Sidebar />
      <div className="h-full w-full flex justify-center">
        <div className="h-screen">
          <form
            className="w-96 max-w-xs bg-white flex flex-col mt-5 py-2 px-8 rounded-lg shadow-lg"
            action=""
          >
            <h2
              style={{ backgroundColor: "rgb(17, 52, 82)" }}
              className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl"
            >
              Restore User
            </h2>
            {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
              Select User
            </label> */}
            <Select
              options={optionListUsers}
              placeholder="Select users"
              value={bannedDelete}
              onChange={handleSelectRestore}
              isSearchable={true}
            />

            <div className="flex justify-end items-center my-4 mt-10">
              <button
                style={{ backgroundColor: "rgb(55, 109, 109)" }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                type="button"
                onClick={() => handleRestoreUser(bannedDelete["value"])}
              >
                Restore
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Error404 />
  );
}

export default Banned;
