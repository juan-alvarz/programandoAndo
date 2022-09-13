import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourse, getUser } from "../redux/actions";
import { Videos } from "./Videos";
import NavBar from "./NavBar";
import Loader from "./Loader";

export default function OneCourseDetail() {
  const { idCourse } = useParams();
  const { course, user } = useSelector((state) => state.programandoando);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const idGet = currentUser.user._id;
  window.courseSelect = course;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourse(idCourse));
    dispatch(getUser(idGet));
  }, [dispatch]);

  const idVotados = user?.scoring.map((scor) => scor.course._id);

  const sameVote = idVotados.find((id) => id === idCourse); //el curso actual y busca si el usuario votó

  const votateCourse = user.scoring.filter(
    (scor) => scor.course._id === sameVote
  );

  if (votateCourse) console.log(votateCourse);

  if (sameVote) console.log(sameVote);
  console.log(idVotados);

  let userVote;

  if (!Object.keys(course).length || !Object.keys(user).length) {
    <Loader />;
  } else {
    return (
      <div style={{ backgroundColor: "rgb(240, 240, 240)", height: "100vh" }}>
        <NavBar />
        <div className="justify-center">
          <div
            className="grid mt-8 bg-gray-200 justify-items-center lg:justify-items-start lg:mx-32 lg:flex"
            style={{ backgroundColor: "rgb(240, 240, 240)" }}
          >
            <div>
              <img
                style={{ maxHeight: 100, maxWidth: 150 }}
                className="mb-5"
                src={course.image}
              ></img>
            </div>
            <div className="grid w-96 justify-items-center  lg:justify-items-start lg:w-10/12 lg:ml-10">
              <h2
                style={{ color: "rgb(17, 52, 82)" }}
                className="text-lg font-bold mb-2 text-gray-700"
              >
                {course.name}
              </h2>

              <div className="flex mb-5 font-medium text-sm text-center lg:text-start">
                {course.description}
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingRight: "20px",
                  }}
                >
                  <h6>SCORE</h6>
                  <div
                    style={{
                      display: "flex",
                      borderLeft: "4px solid #FACC15",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>{course.score}/5</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderLeft: "1px dotted #113452",
                    paddingLeft: "20px",
                  }}
                >
                  <h3>YOUR RATING:</h3>
                  <div
                    style={{
                      display: "flex",
                      borderLeft: "4px solid #60A5FA",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>
                      {sameVote ? (
                        <span>{votateCourse[0].score}/5</span>
                      ) : (
                        <h2>No votado</h2>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* <div style={{ display: "flex", padding: "3px" }}>
                <div style={{ padding: "2px" }}>
                  <h2>
                    <strong>Score</strong>
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      borderLeft: "3px solid #FACC15",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>4.3/5</span>
                  </div>
                </div>
                <div>
                  <h3>
                    <strong>Your rate</strong>
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      borderLeft: "3px solid #60A5FA",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>4.3/5</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <Videos videos={window.courseSelect.videos} idCourse={idCourse} />
        </div>
      </div>
    );
  }
}
