import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "programandoando",
  initialState: {
    stateFilter: [],
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
    createCourse: (state) => {
      return { ...state };
    },

    // ========= schools ===========
    getAllSchool: (state, action) => {
      state.schools = action.payload;
    },
    getSchoolId: (state, action) => {
      state.school = action.payload;
    },
    createSchool: (state, action) => {
      return { ...state };
    },

    // ========= users ===========
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    getUserById: (state, action) => {
      state.user = action.payload;
    },
    createUser: (state) => {
      return { ...state };
    },

    // ========= videos ===========
    getVideos: (state, action) => {
      state.videos = action.payload;
    },
    getVideo: (state, action) => {
      state.video = action.payload;
    },
    createVideo: (state) => {
      return { ...state };
    },
    clearVideo: (state, action) => {
      state.video = action.payload.object;
      state.videos = action.payload.array;
    },
    // filterByName: (state, action) => {
    //   state.stateFilter = action.payload;
    // },
    orderFilter: (state, action) => {
      const sortedAlf =
        action.payload === "value"
          ? state.stateFilter.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.stateFilter.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });

      state.stateFilter = sortedAlf;
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
  clearVideo,
  orderFilter,
} = slice.actions;

export default slice.reducer;
