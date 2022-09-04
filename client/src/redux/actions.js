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
<<<<<<< HEAD
  clearVideo,
=======
  sortAlpha,
>>>>>>> cf4d7cbe845127f418903bf0437fbc761fced7f9
} from "./slice";

// ============================ Courses ============================

export const getAllCourses = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/courses")
    .then((res) => dispatch(getCourses(res.data)))
    .catch((e) => console.log(e));
};

export const getCourse = (id) => (dispatch) => {
  axios
    .get(`http://localhost:3001/api/courses/${id}`)
    .then((res) => dispatch(getCourseById(res.data)))
    .catch((e) => console.log(e));
};

export const createsCourse = (payload) => async (dispatch) => {
  const response = await axios.post(
    "http://localhost:3001/api/courses",
    payload
  );
  return response;
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
    .then((res) => dispatch(getAllSchool(res.data)))
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
  const response = await axios.post("http://localhost:3001/api/users", payload);
  return response;
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
