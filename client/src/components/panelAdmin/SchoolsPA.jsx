import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getAllSchools,
  getAllCourses,
  deleteSchoolById,
  createsSchool,
} from "../../redux/actions";

// import NavbarPA from "./NavbarPA";

function CoursesPA() {
  const dispatch = useDispatch();

  const { schools, courses } = useSelector((state) => state.programandoando);

  console.log(schools);

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

    Swal.fire({
      title: "Create Course",
      text: "Course Created Successfully",
      icon: "success",
      confirmButtonText: "Back",
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
    console.log(findSelect);
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

  const [courseEdit, setCourseEdit] = useState([]);
  function handleSelectCourses(value) {
    const find = course.find((i) => i.value === value.value);
    if (!find) {
      setCourseEdit([...courseEdit, value]);
      //  setVideoEdit(
      //    "videos",
      //    [...videoEdit, value].map((e) => e.value)
      //  );
    }
  }

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
    setCourseEdit(courseFilter); // este borra todo.
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
                Create School
              </h2>

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
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

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Image Course
              </label>
              <input
                name="image"
                type="text"
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="http://..."
                {...register("image", {
                  required: true,
                  pattern:
                    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
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

              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Courses
              </label>
              <Select
                name="course"
                options={optionListCourses}
                placeholder="All Courses"
                value={course}
                onChange={handleSelect}
                isSearchable={true}
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

              <div className="flex justify-end items-center my-4 mt-10">
                <button
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
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              action=""
            >
              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Edit School
              </h2>
              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select Schools
              </label>
              <Select
                options={optionListSchools}
                placeholder="Select school"
                value={schoolSelectValue}
                onChange={handleSelectEdit}
                isSearchable={true}
              />

              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Form to Edit
              </h2>
              <input
                name="name"
                type="text"
                value={render.name}
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
              />

              <input
                name="image"
                type="text"
                value={render.image}
                className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                placeholder="http://..."
                onChange={(e) => handleChange(e)}
              />

              <textarea
                style={{ resize: "none" }}
                name="description"
                value={render.description}
                className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
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
                      onClick={() => handleDeleteSelect(v)}
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
                      onClick={() => handleDeleteSelect(v)}
                    >
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center my-4 mt-10">
                <button
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
              className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
              action=""
            >
              <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
                Delete Schools
              </h2>
              <label className="text-gray-700 font-bold py-2" htmlFor="">
                Select school
              </label>
              <Select
                options={optionListSchools}
                placeholder="Select course"
                value={schoolDelete}
                onChange={handleSelectDelete}
                isSearchable={true}
              />

              <div className="flex justify-end items-center my-4 mt-10">
                <button
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
  );
}

export default CoursesPA;
