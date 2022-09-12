import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getAllVideos,
  deleteVideoById,
  createsVideo,
  getUsers,
  getUser,
  createsUser,
  deleteUserById,
  deleteNotificationById,
} from "../../redux/actions";

// import NavbarPA from "./NavbarPA";

function CoursesPA() {
  const dispatch = useDispatch();

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
    });
  };

  // function handleSelectPrueba(value) {
  //   const find = course.find((i) => i.value === value.value);
  //   if (!find) {
  //     setCourse(value);
  //  setValue(
  //    "videos",
  //    [...video, value].map((e) => e.value)
  //  );
  //     console.log(course);
  //   }
  // }

  // const optionListCourses = courses?.map((course) => {
  //   return {
  //     value: course._id,
  //     label: course.name,
  //   };
  // });

  // const [course, setCourse] = useState([]);
  const [videoDelete, setVideoDelete] = useState();
  function handleSelectDelete(data) {
    // const find = course.find((i) => i.value === data.value);
    // if (!find) {
    //   setCourse(data);
    //   console.log(course);
    // }
    setVideoDelete(data);
  }

  const [courseEdit, setEditCourse] = useState();
  function handleSelectEdit(data) {
    setEditCourse(data);
  }

  // Create Course
  // const [video, setVideo] = useState([]);
  // function handleSelect(value) {
  //   const find = video.find((i) => i.value === value.value);
  //   if (!find) {
  //     setVideo([...video, value]);
  // setValue(
  //   "videos",
  //   [...video, value].map((e) => e.value)
  // );
  //     console.log(video);
  //   }
  // }

  const optionListUsers = users?.map((user) => {
    return {
      value: user._id,
      label: user.name,
    };
  });

  // const handleDeleteSelect = (value) => {
  //   const videoFilter = video.filter((v) => v !== value);
  //   setVideo(videoFilter);
  // };

  // ============ Delete =================
  const handleDeleteCourse = (id) => {
    dispatch(deleteUserById(id));
  };
  return (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div
        className="w-full h-full flex justify-around"
        style={{ backgroundColor: "#C9C4B8" }}
      >
        {/* Create School */}
        <div>
          {/* <NavbarPA /> */}
          <div className="h-screen">
            <form
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              onSubmit={handleSubmit(onSubmit)}
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
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
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
                className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
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
              />
              <div className="flex justify-end items-center my-4 mt-10">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 ">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete School */}
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
              />

              <div className="flex justify-end items-center my-4 mt-10">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  type="button"
                  onClick={() => handleDeleteCourse(videoDelete["value"])}
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
