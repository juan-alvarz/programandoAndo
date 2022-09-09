import axios from "axios";
import {
  getCourses,
  getCourseById,
  createCourse,
  getAllSchool,
  getSchoolId,
  createSchool,
  getAllUsers,
  getUserById,
  createUser,
  getVideos,
  getVideo,
  createVideo,
  clearVideo,
  getCourseByName,
  getSchoolsByName,
  getVideosByName,
  getCoursesByAZ,
  getCoursesByZA,
  getCourse10more,
  getCourse10h,
  getCourse5h,
  getCourse3h,
  getSession,
  favoriteCourse,
} from "./slice";

// ============================ Courses ============================

export const getAllCourses = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/courses")
    .then((res) => dispatch(getCourses(res.data)))
    .catch((e) => console.log(e));
};
//=======
export const getCourses10more = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/courses")
    .then((res) => dispatch(getCourse10more(res.data)))
    .catch((e) => console.log(e));
};

export const getCourses10h = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/courses")
    .then((res) => dispatch(getCourse10h(res.data)))
    .catch((e) => console.log(e));
};

export const getCourses5h = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/courses")
    .then((res) => dispatch(getCourse5h(res.data)))
    .catch((e) => console.log(e));
};

export const getCourses3h = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/courses")
    .then((res) => dispatch(getCourse3h(res.data)))
    .catch((e) => console.log(e));
};
//======
export const getAllCoursesAZ = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/courses")
    .then((res) => dispatch(getCoursesByAZ(res.data)))
    .catch((e) => console.log(e));
};

export const getAllCoursesZA = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/courses")
    .then((res) => dispatch(getCoursesByZA(res.data)))
    .catch((e) => console.log(e));
};

export const getCourse = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/api/courses/${id}`)
    .then((res) => dispatch(getCourseById(res.data)))
    .catch((e) => console.log(e));
};
export const favorite = (course) => (dispatch) => {
  dispatch(favoriteCourse(course));
};

export const createsCourse = (payload) => async (dispatch) => {
  const response = await axios.post(
    "http://localhost:3001/api/courses",
    payload
  );
  return response;
};

export const getCoursesByName = (name) => (dispatch) => {
  axios
    .get(`http://localhost:3001/api/courses?name=${name}`)
    .then((res) => dispatch(getCourseByName(res.data)))
    .catch((e) => console.log(e));
};

// ============================ Schools ============================

export const getAllSchools = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/schools")
    .then((res) => dispatch(getAllSchool(res.data)))
    .catch((e) => console.log(e));
};

export const getAllSchoolByName = (name) => (dispatch) => {
  axios
    .get(`http://localhost:3001/api/schools?name=${name}`)
    .then((res) => dispatch(getSchoolsByName(res.data)))
    .catch((e) => console.log(e));
};

export const getSchool = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/api/schools/${id}`)
    .then((res) => dispatch(getSchoolId(res.data)))
    .catch((e) => console.log(e));
};

export const createsSchool = (payload) => async (dispatch) => {
  const response = await axios.post(
    "http://localhost:3001/api/schools",
    payload
  );
  return response;
};

// ============================ Users ============================
export const getUsers = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/users")
    .then((res) => dispatch(getAllUsers(res.data)))
    .catch((e) => console.log(e));
};

export const getUser = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/api/users/${id}`)
    .then((res) => dispatch(getUserById(res.data)))
    .catch((e) => console.log(e));
};

export const createsUser = (payload) => async (dispatch) => {
  const response = await axios.post(
    "http://localhost:3001/api/users/register",
    payload
  );
  return response;
};

export const updateUser = (payload, id) => async (dispatch) => {
  const response = await axios.post(
    `http://localhost:3001/api/users/${id}`,
    payload
  );
  return response;
};

export const userLogin = (payload) => async (dispatch) => {
  const response = await axios
    .post("http://localhost:3001/api/users/login", payload)
    .then((res) => {
      window.localStorage.setItem("user", JSON.stringify(res.data));

      dispatch(getSession(res.data));
    })

    .catch((e) => console.log(e));
  return response;
};

export const googleUserLogin = (payload) => async (dispatch) => {
  const response = await axios
    .post("http://localhost:3001/api/users/google_login", payload)
    .then((res) => {
      dispatch(getSession(res.data));
      window.localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((e) => console.log(e));

  return response;
};

export const verifyUser = async (code) => {
  const response = await axios.get(`http://localhost:3001/api/users/ath/confirm/${code}`);
  return response.data;
};

// ============================ Videos ============================
export const getAllVideos = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/videos")
    .then((res) => dispatch(getVideos(res.data)))
    .catch((e) => console.log(e));
};

export const getVideoById = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/api/videos/${id}`)
    .then((res) => dispatch(getVideo(res.data)))
    .catch((e) => console.log(e));
};

export const createsVideo = (payload) => async (dispatch) => {
  const response = await axios.post(
    "http://localhost:3001/api/videos",
    payload
  );
  return response;
};

export const getVideoByName = (name) => (dispatch) => {
  axios
    .get(`http://localhost:3001/api/schools?name=${name}`)
    .then((res) => dispatch(getVideosByName(res.data)))
    .catch((e) => console.log(e));
};

// ============================ Order ============================
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

// ============================ Clear ============================
// export function clearFilter() {
//   return {
//     type: "CLEAR_FILTER",
//     payload: { array: [], object: {} },
//   };
// }
