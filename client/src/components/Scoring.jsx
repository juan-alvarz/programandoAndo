import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions";
import Loader from "./Loader";

function Scoring() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.programandoando);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const idGet = currentUser.user._id;
  useEffect(() => {
    if (idGet) {
      dispatch(getUser(idGet));
    }
  }, [dispatch]);

  if (user) {
    return (
      <div>
        {user.scoring.map((score) => (
          <div>
            <h2>{score.course.name}</h2>
            <h4>
              <strong>Score: </strong>
              {score.score}
            </h4>
          </div>
        ))}
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default Scoring;
