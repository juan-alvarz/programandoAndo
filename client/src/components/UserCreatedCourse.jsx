import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions";

function UserCreatedCourse() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);

  let userLocal = window.localStorage.getItem("user");
  let userObj = JSON.parse(userLocal);

  useEffect(() => {
    if (userObj) {
      dispatch(getUser(userObj.user._id));
    }
  }, [dispatch]);

  console.log(user);

  return <div>UserCreatedCourse</div>;
}

export default UserCreatedCourse;
