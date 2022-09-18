import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Error404 from "../Error404";

import {
  getAllSchools,
  getAllCourses,
  deleteSchoolById,
  createsSchool,
  updateSchool,
} from "../../redux/actions";

// import NavbarPA from "./NavbarPA";

function SchoolsPA() {
  const dispatch = useDispatch();

  const { schools, courses } = useSelector((state) => state.programandoando);

  // console.log(schools);
  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  let role = userObj && userObj.user.role;

  useEffect(() => {
    dispatch(getAllSchools());
    dispatch(getAllCourses());
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
      description: "",
      courses: [],
    },
  });

  const onSubmit = (data) => {
    const get = getValues();
    console.log(get);

    handleSelect(course);
    console.log(data);
    dispatch(createsSchool(get));
    reset({
      name: "",
      image: "",
      description: "",
      courses: [],
    });
    setCourse([]);

    Swal.fire({
      title: "Create School",
      text: "School Created Successfully",
      icon: "success",
      confirmButtonText: "Back",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate("/userspa");
        window.location.reload();
      }
    });
  };

  const optionListSchools = schools?.map((school) => {
    return {
      value: school._id,
      label: school.name,
    };
  });

  // ============ Edit School ============
  const [schoolSelectValue, setSchoolSelectValue] = useState();
  const [render, setRender] = useState({
    name: "",
    description: "",
    image: "",
    courses: [],
  });

  function handleSelectEdit(value) {
    const findSelect = schools.find((school) => school._id === value.value);

    setSchoolSelectValue(value);

    if (findSelect) {
      setRender({
        name: findSelect.name,
        description: findSelect.description,
        image: findSelect.image,
        courses: findSelect.courses,
      });
    }
    // console.log(findSelect.courses);
  }
  console.log(schoolSelectValue);
  const [courseEdit, setCourseEdit] = useState([]);
  function handleSelectCourses(value) {
    console.log(value);
    const find = course.find((i) => i.value === value.value);
    if (!find) {
      setCourseEdit([...courseEdit, value]);
      //  setVideoEdit(
      //    "videos",
      //    [...videoEdit, value].map((e) => e.value)
      //  );
    }
  }
  function handleSelectCourses(value) {
    const find = courses.find((i) => i.value === value.value);
    if (!find) {
      setCourseEdit([...courseEdit, value]);
    }
  }
  // console.log(courseEdit)

  const handleDeleteEditSchoold = (value) => {
    console.log(value);
    // console.log(render.courses)
    // console.log(courseEdit)
    const courseFilter = courseEdit.filter((v) => v.value !== value.value);

    setCourseEdit(courseFilter);
    // setCourseEdit(courseFilter); // este borra todo.
  };
  // console.log(courseEdit)
  let [contador, setContador] = useState(0);
  const handleDeleteRenderVideo = (e) => {
    console.log(render.courses);
    console.log(e);
    const courseFilter = render.courses.filter((v) => v._id !== e._id);
    console.log(courseFilter);
    const uwu = render;
    uwu.courses = courseFilter;
    setRender(uwu);
    setContador(contador + 1);
    console.log(render);
  };

  const renderuwu = render;
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const idCoursesEdit = courseEdit.map((e) => {
      return { _id: e.value };
    });
    const idCoursesRender = render.courses.map((e) => {
      return { _id: e._id };
    });

    const newCourses = [...idCoursesRender, ...idCoursesEdit];
    const coursesAdd = newCourses.map((e) => e._id);
    const uwu2 = { ...renderuwu, addCourses: coursesAdd };
    // setRender({
    //   ...render,
    //   ["addVideos"]: uwu2
    // });
    console.log(uwu2);
    // console.log(schoolSelectValue)
    dispatch(updateSchool(uwu2, schoolSelectValue.value));
    setRender({ name: "", description: "", image: "", courses: [] });
    setCourseEdit([]);
    setSchoolSelectValue("Select School");
    Swal.fire({
      title: "Edit School",
      text: "Course Edited Successfully",
      icon: "success",
      confirmButtonText: "Back",
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate("/userspa");
        window.location.reload();
      }
    });
  };

  function handleChange(e) {
    console.log(render);
    setRender({
      ...render,
      [e.target.name]: e.target.value,
    });
  }

  // const [courseEdit, setEditCourse] = useState();
  // function handleSelectEdit(data) {
  //   setEditCourse(data);
  // }

  // ========== Delete School ===========
  const [schoolDelete, setSchoolDelete] = useState();
  function handleSelectDelete(data) {
    setSchoolDelete(data);
  }

  const handleDeleteCourse = (id) => {
    dispatch(deleteSchoolById(id));
    // Swal.fire({
    //   title: "Delete School",
    //   text: "School Deleted Successfully",
    //   icon: "success",
    //   confirmButtonText: "Back",
    // });
    setSchoolDelete("Select School");
  };

  // ============ Create School =================
  const [course, setCourse] = useState([]);
  function handleSelect(value) {
    const find = course.find((i) => i.value === value.value);
    if (!find) {
      setCourse([...course, value]);
      setValue(
        "courses",
        [...course, value].map((e) => e.value)
      );
      console.log(course);
    }
  }

  const optionListCourses = courses?.map((course) => {
    return {
      value: course._id,
      label: course.name,
    };
  });

  const handleDeleteSelect = (value) => {
    const courseFilter = course.filter((v) => v !== value);
    setCourse(courseFilter);
    // setCourseEdit(courseFilter); // este borra todo.
  };
  // const handleDeleteSelect = (value) => {
  //   const videoFilter = video.filter((v) => v !== value);
  //   setVideo(videoFilter);
  // };

  return role === "admin" ? (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div
        className="w-full h-full flex justify-around"
        style={{ backgroundColor: "rgb(240, 240, 240)" }}
      >
        {/* 1hool */}
        <div>
          {/* <NavbarPA /> */}
          <div className="h-screen">
            <form
              className="w-96 max-w-xs bg-white flex flex-col mt-5 py-2 px-8 rounded-lg shadow-lg"
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              method="POST"
            >
              <h2 style={{backgroundColor: 'rgb(17, 52, 82)'}} className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl">
                Create School
              </h2>

              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Name
              </label> */}
              <input
                name="name"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="Name"
                {...register("name", {
                  required: true,
                  validate: {
                    repeat: (v) =>
                      !courses.includes(
                        courses.find(
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

              <label className="text-gray-700 font-bold mb-1" htmlFor="">
                Image School
              </label>
              <input
                name="image"
                type="text"
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="http://..."
                {...register("image", {
                  required: true,
                  pattern: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                  pattern: /.*(png|jpg|jpeg|gif)$/,
                })}
              />
              {errors.image?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}
              {errors.image?.type === "pattern" && (
                <small className="text-red-600 font-bold">
                  URL Not Valid or Format not Valid
                </small>
              )}

              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Description
              </label> */}
              <textarea
                style={{ resize: "none" }}
                name="description"
                className="text-gray-700 font-light shadow border rounded border-gray-300 mb-2 py-1 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Description"
                {...register("description", { required: true })}
              />
              {errors.description?.type === "required" && (
                <small className="text-red-600 font-bold">Input empty</small>
              )}

              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Courses
              </label> */}
              <div className="mb-2">
              <Select
                name="course"
                options={optionListCourses}
                placeholder="All Courses"
                value={course}
                onChange={handleSelect}
                isSearchable={true}
                className="font-light"
              />
              </div>
              <div
                style={{
                  overflow: "scroll",
                  height: "160px",
                  backgroundColor: "rgb(198, 198, 198)",
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "white",
                }}
                className=""
              >
                {course.map((v, index) => (
                  <div key={index} className="text-center">
                    <span
                      className="cursor-pointer bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-pink-800 hover:text-gray-200"
                      onClick={() => handleDeleteSelect(v)}
                    >
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center my-4 mt-5">
                <button
                style={{backgroundColor: 'rgb(55, 109, 109)'}}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  disabled={Object.entries(errors).length === 0 ? "" : true}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Edit School */}
        <div>
          <div className="h-screen">
            <form
              className="w-96 max-w-xs bg-white flex flex-col mt-5 py-2 px-8 rounded-lg shadow-lg"
              action=""
              onSubmit={(e) => handleSubmitEdit(e)}
            >
              <h2 style={{backgroundColor: 'rgb(17, 52, 82)'}} className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl">
                Edit School
              </h2>
              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select Schools
              </label> */}
              <Select
                options={optionListSchools}
                placeholder="Select school"
                value={schoolSelectValue}
                onChange={handleSelectEdit}
                isSearchable={true}
                className="font-light"
              />

              <h2 style={{backgroundColor: 'rgb(17, 52, 82)'}} className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl">
                Form to Edit
              </h2>
              <input
                name="name"
                type="text"
                value={render.name}
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
              />

              <input
                name="image"
                type="text"
                value={render.image}
                className="text-gray-700 font-light shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-2"
                placeholder="http://..."
                onChange={(e) => handleChange(e)}
              />

              <textarea
                style={{ resize: "none" }}
                name="description"
                value={render.description}
                className="text-gray-700 font-light shadow border rounded border-gray-300 mb-2 py-1 px-3 focus:outline-none focus:shadow-outline"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
              />
              <div
                style={{
                  overflow: "scroll",
                  height: "160px",
                  backgroundColor: "rgb(198, 198, 198)",
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "white",
                }}
                className=""
                // onChange={(e) => handleChange(e)}
              >
                {render.courses.map((v, index) => (
                  <div key={index} className="text-center">
                    <span
                      className="cursor-pointer bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-pink-800 hover:text-gray-200"
                      onClick={() => handleDeleteRenderVideo(v)}
                    >
                      {v.name}
                    </span>
                  </div>
                ))}
              </div>

              <Select
                name="course"
                options={optionListCourses}
                placeholder="All Courses"
                value={courseEdit}
                onChange={handleSelectCourses}
                isSearchable={true}
                className="font-light my-2"
              />
              <div
                style={{
                  overflow: "scroll",
                  height: "160px",
                  backgroundColor: "rgb(198, 198, 198)",
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "white",
                }}
                className=""
                // onChange={(e) => handleChange(e)}
              >
                {/* {courseEdit.map((e) => e)} */}
                {courseEdit.map((v, index) => (
                  <div key={index} className="text-center">
                    <span
                      className="cursor-pointer bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-pink-800 hover:text-gray-200"
                      onClick={() => handleDeleteEditSchoold(v)}
                    >
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center my-4 mt-5">
                <button
                style={{backgroundColor: 'rgb(55, 109, 109)'}}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  disabled={Object.entries(errors).length === 0 ? "" : true}
                >
                  Edit Course
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete School */}
        <div>
          <div className="h-screen">
            <form
              className="w-96 max-w-xs bg-white flex flex-col mt-5 py-2 px-8 rounded-lg shadow-lg"
              action=""
            >
              <h2 style={{backgroundColor: 'rgb(17, 52, 82)'}} className="text-gray-300 font-bold my-2 p-2 rounded-md bg-gray-200 text-center text-xl">
                Delete Schools
              </h2>
              {/* <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select school
              </label> */}
              <Select
                options={optionListSchools}
                placeholder="Select School"
                value={schoolDelete}
                onChange={handleSelectDelete}
                isSearchable={true}
                className="font-light"
              />

              <div className="flex justify-end items-center my-4 mt-5">
                <button
                style={{backgroundColor: 'rgb(55, 109, 109)'}}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 "
                  type="button"
                  onClick={() => handleDeleteCourse(schoolDelete["value"])}
                >
                  Delete
                </button>
              </div>
            </form>

            {/* <div>
              {videos.map((v, index) => (
                <div key={index} className="w-60 my-10">
                  <span
                    className="cursor-pointer bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-pink-800 hover:text-gray-200"
                    onClick={() => handleDeleteSelect(v)}
                  >
                    {v.url}
                  </span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Error404 />
  );
}

export default SchoolsPA;
