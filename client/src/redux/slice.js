import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "programandoando",
  initialState: {
<<<<<<< HEAD
    courses: [],
    course: {},
    schools: [],
    school: {},
    users: [],
    user: {},
    videos: [],
    video: {},
  },
  reducers: {
    // ========= Courses ===========
    getCourses: (state, action) => {
      state.courses = action.payload;
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
=======
    courses: ["uñas acrilicas"],
    users: [],
    detail: {},
  },
  reducers: {
    // getAllCharacters: (state, action) => {
    //   state.characters = action.payload;
    // },
    // getCharacterById: (state, action) => {
    //   state.detail = action.payload;
>>>>>>> 5789ac6 (redux and navbar)
    // },
  },
});

<<<<<<< HEAD
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
} = slice.actions;
=======
// export const { getAllCharacters, getCharacterById } = characterSlice.actions;
>>>>>>> 5789ac6 (redux and navbar)

export default slice.reducer;
