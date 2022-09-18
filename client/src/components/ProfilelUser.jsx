import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUsers, getUser } from "../redux/actions";
import { NavLink } from "react-router-dom";
import Cloudinary from "./Cloudinary";
import ImageDefault from "../utils/images/userDefault.jpg";
import NavBar from "./NavBar";

function ProfilelUser() {
  let userLocal = window.localStorage.getItem("user");
  let userObj = userLocal && JSON.parse(userLocal);

  // const userRole = userObj && userObj.user.role;
  const userId = userObj && userObj.user._id;
  // const userImage = userObj && userObj.user.image.url;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getUsers());

    (async function() {
      const id = userId;
      if (id) {
        dispatch(getUser(id));
      }
    })();
  }, [dispatch, getUsers]);

  const [render, setRender] = useState(false);
  const handleRender = () => {
    setRender(render ? false : true);
  };

  const [cloudinary, setCloudinary] = useState({});

  const handleSubmit = () => {
    const reload = () => {
      window.location.reload();
    };
    setTimeout(reload, 100);
    const id = userId;
    dispatch(updateUser(cloudinary, id)).then((r) => console.log(r));
    window.location.reload();
  };

  return (
    <div>
        <NavBar/>
      <div style={{ backgroundColor: "rgb(240, 240, 240)", height: '100%', paddingBottom: 90}} className=" flex flex-wrap items-center justify-center">
        <div className="container max-w-lg bg-white rounded shadow-lg transform duration-200 easy-in-out m-12">
          <div className="h-2/4 sm:h-64 overflow-hidden">
            <img
              className="w-full rounded-t"
              src={
                "https://toppng.com/uploads/preview/code-text-programming-letters-symbols-11569818411fpnugmoo1n.jpg"
              }
              alt="Photo by aldi sigun on Unsplash"
            />
          </div>
          <div className="relative flex justify-start px-5 -mt-12 mb-5">
            <span clspanss="block relative h-32 w-32">
              <img
                alt="Photo by aldi sigun on Unsplash"
                src={user.image ? user.image.url : ImageDefault}
                className="mx-auto object-cover rounded-full h-40 w-40 bg-white p-1"
              />
            </span>

            <button
              disabled={Object.entries(cloudinary).length === 0 ? true : false}
              className=""
              onClick={() => handleSubmit()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 absolute bottom-5 left-5 text-red-800 font-bold bg-gray-400 rounded-full p-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
            <Cloudinary setCloudinary={setCloudinary} />
          </div>
          <div className="">
            <div className="px-7 mb-8">
              <h2 style={{color: 'rgb(55, 109, 109)'}} className="text-3xl font-bold text-green-800 ">
                {user.name && user.name}
              </h2>
              <p className="text-gray-400 mt-2">
                {user.country && user.country}
              </p>
              {user.biography ? (
                user.biography
              ) : (
                <p className="mt-2 text-gray-600 ">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Asperiores molestiae vitae odio non commodi itaque quisquam
                  incidunt doloribus fugit nesciunt.
                </p>
              )}
              <h2 style={{color: 'rgb(55, 109, 109)'}} className="my-3 text-md font-bold text-green-800">
                {user.email && user.email}
              </h2>
              <div className="flex justify-center">
                <NavLink to="/modifyProfileUser">
                  <button
                  style={{backgroundColor: 'rgb(55, 109, 109)'}}
                    className="justify-center px-4 py-2 cursor-pointer bg-green-900 w-max mx-auto mt-8 rounded-lg text-white hover:bg-green-800 hover:text-gray-100 "
                    onClick={handleRender}
                  >
                    Profile Edit
                  </button>
                </NavLink>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilelUser;
