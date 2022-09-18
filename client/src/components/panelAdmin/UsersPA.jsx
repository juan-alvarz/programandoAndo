import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getUsers,
  createsUser,
  deleteUserById,
  createNotification,
} from "../../redux/actions";

// import NavbarPA from "./NavbarPA";

function CoursesPA() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      URL: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    const get = getValues();
    console.log(get);

    console.log(data);
    dispatch(createsUser(get));

    Swal.fire({
      title: "Create Course",
      text: "Course Created Successfully",
      icon: "success",
      confirmButtonText: "Back",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate("/userspa");
        window.location.reload();
      }
    });
  };

  // const [course, setCourse] = useState([]);
  const [videoDelete, setVideoDelete] = useState();
  function handleSelectDelete(data) {
    setVideoDelete(data);
  }

  const [courseEdit, setEditCourse] = useState();
  function handleSelectEdit(data) {
    setEditCourse(data);
  }

  const handleCreateNotification = () => {
    const { name, description } = getValues();
    const notification = { title: name, description };
    // console.log(notification)
    dispatch(createNotification(notification));
    reset({
      name: "",
      image: "",
      URL: "",
      description: "",
    });
    Swal.fire({
      title: "Create Notification",
      text: "Notification Created Successfully",
      icon: "success",
      confirmButtonText: "Back",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate("/userspa");
        window.location.reload();
      }
    });
  };
  const optionListUsers = users?.map((user) => {
    return {
      value: user._id,
      label: user.name,
    };
  });

  // ============ Delete =================
  const handleDeleteUser = (id) => {
    dispatch(deleteUserById(id));
    Swal.fire({
      title: "Delete User",
      text: "User Deleted Successfully",
      icon: "success",
      confirmButtonText: "Back",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate("/userspa");
        window.location.reload();
      }
    });
    setVideoDelete("Select User");
  };
  return (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div
        className="w-full h-full flex justify-around"
        style={{ backgroundColor: "rgb(240, 240, 240)" }}
      >
        {/* Create School */}
        <div>
          {/* <NavbarPA /> */}
          <div className="h-screen">
            <form
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              onSubmit={handleSubmit(handleCreateNotification)}
              action="#"
              method="POST"
            >
              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Notification
              </h2>

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Title
              </label>
              <input
                name="name"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="Title"
                {...register("name", {
                  required: true,
                  validate: {
                    repeat: (v) =>
                      !users.includes(
                        users.find(
                          (c) =>
                            c.name.replace(/\s+/g, "").toLowerCase() ===
                            v.replace(/\s+/g, "").toLowerCase()
                        )
                      ),
                  },
                })}
              />
              {errors.name?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Description
              </label>
              <textarea
                // style={{ resize: "none" }}
                name="description"
                className="text-gray-700 font-light shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              <div className="flex justify-end items-center my-4 mt-10">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  disabled={Object.entries(errors).length === 0 ? "" : true}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Edit School */}
        <div>
          <div className="h-screen">
            <form
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              action=""
            >
              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Edit User
              </h2>
              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select User
              </label>
              <Select
                options={optionListUsers}
                placeholder="Select users"
                value={courseEdit}
                onChange={handleSelectEdit}
                isSearchable={true}
                className='font-light'
              />
              <div className="flex justify-end items-center my-4 mt-10">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 ">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete User */}
        <div>
          <div className="h-screen">
            <form
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              action=""
            >
              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Delete User
              </h2>
              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select User
              </label>
              <Select
                options={optionListUsers}
                placeholder="Select users"
                value={videoDelete}
                onChange={handleSelectDelete}
                isSearchable={true}
                className='font-light'
              />

              <div className="flex justify-end items-center my-4 mt-10">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  type="button"
                  onClick={() => handleDeleteUser(videoDelete["value"])}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesPA;
