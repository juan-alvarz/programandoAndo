import axios from "axios";
import Swal from "sweetalert2";
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
  getFavoriteCourse,
  getNotifications,
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

export const getFavorites = (id) => async (dispatch) => {
  const user = await axios.get(`http://localhost:3001/api/users/${id}`);
  console.log(user);
  dispatch(getFavoriteCourse(user.data.favorites));
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
  const response = await axios.get(
    `http://localhost:3001/api/users/ath/confirm/${code}`
  );
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
  const response = await axios
    .post("http://localhost:3001/api/videos", payload)
    .then(() => {
      Swal.fire({
        title: "Create Video",
        text: "Create Video Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      return dispatch({
        type: "DELETE_SCHOOL",
      });
    })
    .catch((error) =>
      Swal.fire({
        title: "Ups Something Happens",
        // text: "Can't create video please try again",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "OK",
      }).then(console.log(error))
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

// =========================== Update ===========================
export const updateVideo = (payload, id) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:3001/api/videos/${id}`,
    payload
  );
  return response;
};

export const updateCourse = (payload, id) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:3001/api/courses/${id}`,
    payload
  );
  return response;
};

export const updateSchool = (payload, id) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:3001/api/schools/${id}`,
    payload
  );
  return response;
};

export const updateUser = (payload, id) => async (dispatch) => {
  const response = await axios.put(
    `http://localhost:3001/api/users/${id}`,
    payload
  );
  return response;
};

// =========================== Delete ===========================
export function deleteSchoolById(id) {
  return async function (dispatch) {
    await axios
      .delete(`http://localhost:3001/api/schools/${id}`)
      .then(() => {
        Swal.fire({
          title: "Delete School",
          text: "Delete School Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        return dispatch({
          type: "DELETE_SCHOOL",
        });
      })
      .catch((error) => console.log(error));
  };
}

export function deleteCourseById(id) {
  return async function (dispatch) {
    await axios
      .delete(`http://localhost:3001/api/courses/${id}`)
      .then(() => {
        Swal.fire({
          title: "Course Delete",
          text: "Course Deleted Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        return dispatch({
          type: "DELETE_COURSE",
        });
      })
      .catch((error) => console.log(error));
  };
}

export function deleteVideoById(id) {
  return async function (dispatch) {
    await axios
      .delete(`http://localhost:3001/api/videos/softDelete/${id}`)
      .then(() => {
        Swal.fire({
          title: "Delete Video",
          text: "Delete Video Successfully",
          icon: "success",
          confirmButtonText: "Back",
        });

        return dispatch({
          type: "DELETE_VIDEO",
        });
      })
      .catch((error) => console.log(error));
  };
}

export function deleteUserById(id) {
  return async function (dispatch) {
    await axios
      .delete(`http://localhost:3001/api/users/${id}`)
      .then(() => {
        alert("Se elimino");
        return dispatch({
          type: "DELETE_USER",
        });
      })
      .catch((error) => console.log(error));
  };
}

// =========================== Notification ===========================

export function deleteNotificationById(id) {
  return async function (dispatch) {
    await axios
      .delete(`http://localhost:3001/api/notifications/${id}`)
      .then(() => {
        alert("Se elimino");
        return dispatch({
          type: "DELETE_NOTIFICATION",
        });
      })
      .catch((error) => console.log(error));
  };
}

export const getAllNotifications = () => (dispatch) => {
  axios
    .get("http://localhost:3001/api/notifications")
    .then((res) => dispatch(getNotifications(res.data)))
    .catch((e) => console.log(e));
};

export const createNotification = (payload) => async (dispatch) => {
  const response = await axios.post(
    "http://localhost:3001/api/notifications",
    payload
  );
  return response;
};

// ============================ Clear ============================
// export function clearFilter() {
//   return {
//     type: "CLEAR_FILTER",
//     payload: { array: [], object: {} },
//   };
// }
