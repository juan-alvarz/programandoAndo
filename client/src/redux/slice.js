import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "programandoando",
  initialState: {
    courses: [],
    course: {},
    schools: [],
    school: {},
    users: [],
    user: {},
    videos: [],
    video: {},
    filters: [],
  },
  reducers: {
    // ========= Courses ===========
    getCourses: (state, action) => {
      state.courses = action.payload;
      state.filters = action.payload;
    },
    getCourseById: (state, action) => {
      state.course = action.payload;
    },
    // createCourse: (state) => {
    //   state;
    // },

    // ========= schools ===========
    getAllSchool: (state, action) => {
      state.schools = action.payload;
    },
    getSchoolId: (state, action) => {
      state.school = action.payload;
    },
    // createSchool: (state) => {
    //   state;
    // },

    // ========= users ===========
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getUserById: (state, action) => {
      state.user = action.payload;
    },
    // createUser: (state) => {
    //   state;
    // },

    // ========= videos ===========
    getVideos: (state, action) => {
      state.videos = action.payload;
    },
    getVideo: (state, action) => {
      state.video = action.payload;
    },
    // createVideo: (state) => {
    //   state;
    // },
    // ========== filters =========
    sortAlpha: (state, action) => {
      const allCourses = state.filters;
    },
  },
});

export const {
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
  sortAlpha,
} = slice.actions;

export default slice.reducer;
