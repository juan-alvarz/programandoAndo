import React, { useState, useEffect } from "react";
import Select from "react-select";
import { countries } from "../utils/countries";
import { levelEducation } from "../utils/levelEducation";
import { preferences } from "../utils/preferences";
import photoPerfil from "../utils/images/michi-cool.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUsers, getUser } from "../redux/actions";
import Swal from "sweetalert2";
import ModifyProfileUser from "./ModifyProfileUser";
import Cloudinary from "./Cloudinary";

function ProfilelUser() {
  let userLocal = window.localStorage.getItem("user");
  let userObj = userLocal && JSON.parse(userLocal);

  const userRole = userObj && userObj.user.role;
  const userId = userObj && userObj.user._id;
  const userName = userObj && userObj.user.name;
  const prueba = userObj && userObj.user;
  console.log(prueba);

  const dispatch = useDispatch();
  const { users, user } = useSelector((state) => state.programandoando);

  useEffect(() => {
    dispatch(getUsers());

    (async function() {
      const id = users && users[0]._id;
      if (id) {
        console.log(id);
        dispatch(getUser(id));
      }
    })();
  }, [dispatch, getUsers]);

  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    biography: "",
    preferences: "",
    country: "",
    studyStatus: "",
    birthday: "",
  });

  const [render, setRender] = useState(false);
  const handleRender = () => {
    setRender(render ? false : true);
  };

  const [cloudinary, setCloudinary] = useState({});

  const handleSubmit = () => {
    dispatch(updateUser(cloudinary, userId));
  };

  return render === false ? (
    <div>
      <div className=" bg-gray-200 flex flex-wrap items-center justify-center">
        <div className="container max-w-lg bg-white rounded shadow-lg transform duration-200 easy-in-out m-12">
          <div className="h-2/4 sm:h-64 overflow-hidden">
            <img
              className="w-full rounded-t"
              src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt="Photo by aldi sigun on Unsplash"
            />
          </div>
          <div className="flex justify-start px-5 -mt-12 mb-5">
            <span clspanss="block relative h-32 w-32">
              <img
                alt="Photo by aldi sigun on Unsplash"
                src={cloudinary.url && cloudinary.url}
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
                <button
                  className="justify-center px-4 py-2 cursor-pointer bg-green-900 w-max mx-auto mt-8 rounded-lg text-gray-300 hover:bg-green-800 hover:text-gray-100 "
                  onClick={handleRender}
                >
                  Profile Edit
                </button>
                <button
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
  ) : (
    <div className="transition-transform">
      <ModifyProfileUser />
    </div>
  );
}
export default ProfilelUser;
