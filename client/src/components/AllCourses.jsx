import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

export default function AllCourses() {
  const { courses } = useSelector((state) => state.programandoando);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <SearchBar />
      <div className="grid gap-8 lg:gap-16 sm:grid-cols-1 lg:grid-cols-2 justify-items-center">
        {courses.map((course) => (
          <div
            class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            style={{ maxHeight: 700, maxWidth: 500 }}
          >
            <NavLink to={`/course/${course._id}`}>
              <img
                class="rounded-t-lg object-cover"
                src={course.image}
                alt=""
                style={{ maxHeight: 300, maxWidth: 500 }}
              />
            </NavLink>
            <div class="p-5">
              <NavLink to={`/course/${course._id}`}>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {course.name}
                </h5>
              </NavLink>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {course.description}
              </p>
              <NavLink to={`/course/${course._id}`}>
                <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Read more
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</a> */
