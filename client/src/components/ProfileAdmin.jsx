import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUsers, getUser } from "../redux/actions";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import ModifyProfileUser from "./ModifyProfileUser";
import Cloudinary from "./Cloudinary";
import ImageDefault from "../utils/images/userDefault.jpg";

function ProfilelAdmin() {
  let userLocal = window.localStorage.getItem("user");
  let userObj = userLocal && JSON.parse(userLocal);

  const userRole = userObj && userObj.user.role;
  const userId = userObj && userObj.user._id;
  const userImage = userObj && userObj.user.image.url;

  console.log(userId);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getUsers());

    (async function() {
      const id = userId;
      if (id) {
        console.log(id);
        dispatch(getUser(id));
      }
    })();
  }, [dispatch, getUsers]);

  // const [input, setInput] = useState({
  //   name: "",
  //   username: "",
  //   email: "",
  //   password: "",
  //   biography: "",
  //   preferences: "",
  //   country: "",
  //   studyStatus: "",
  //   birthday: "",
  // });

  const [render, setRender] = useState(false);
  const handleRender = () => {
    setRender(render ? false : true);
  };

  const [cloudinary, setCloudinary] = useState({});

  const handleSubmit = () => {
    const id = userId;
    dispatch(updateUser(cloudinary, id)).then((r) => console.log(r));
    window.location.reload();
  };
  console.log(cloudinary);

  return (
    <div>
      <div className=" bg-gray-200 flex flex-wrap items-center justify-center">
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
          <div className="flex justify-start px-5 -mt-12 mb-5">
            <span clspanss="block relative h-32 w-32">
              <img
                alt="Photo by aldi sigun on Unsplash"
                src={user.image ? user.image.url : ImageDefault}
                className="mx-auto object-cover rounded-full h-40 w-40 bg-white p-1"
              />
            </span>
          </div>
          <div className="">
            <div className="px-7 mb-8">
              <h2 className="text-3xl font-bold text-green-800 ">
                {userObj && userObj.user.name}
              </h2>
              <p className="text-gray-400 mt-2">
                {userObj && userObj.user.country}
              </p>
              <p className="mt-2 text-gray-600 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Asperiores molestiae vitae odio non commodi itaque quisquam
                incidunt doloribus fugit nesciunt.
              </p>
              <h2 className="my-5 text-xl text-center font-bold text-green-800">
                {userObj && userObj.user.email}
              </h2>
              <div className="flex justify-center">
                <NavLink to="/modifyProfileUser">
                  <button
                    className="justify-center px-4 py-2 cursor-pointer bg-green-900 w-max mx-auto mt-8 rounded-lg text-gray-300 hover:bg-green-800 hover:text-gray-100 "
                    onClick={handleRender}
                  >
                    Profile Edit
                  </button>
                </NavLink>

                <button
                  disabled={
                    Object.entries(cloudinary).length === 0 ? true : false
                  }
                  className="rounded-xl border-red-900 border-2"
                  onClick={() => handleSubmit()}
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8"></div>
            </div>
            <Cloudinary setCloudinary={setCloudinary} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilelAdmin;
