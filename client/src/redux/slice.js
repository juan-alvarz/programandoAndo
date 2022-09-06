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
    filters: [],
  },
  reducers: {
    // ========= Courses ===========
    getCourses: (state, action) => {
      state.courses = action.payload;
      state.filters = action.payload;
    },
    //
    getCourse10more: (state, action) => {
      state.courses = action.payload.filter(
        (course) => course.duration > 36000
      );
    },
    getCourse10h: (state, action) => {
      state.courses = action.payload.filter(
        (course) => course.duration < 36000
      );
    },
    getCourse5h: (state, action) => {
      state.courses = action.payload.filter(
        (course) => course.duration < 18000
      );
    },
    getCourse3h: (state, action) => {
      state.courses = action.payload.filter(
        (course) => course.duration < 10800
      );
    },
    //
    getCoursesByAZ: (state, action) => {
      state.filters = action.payload.sort(function (a, b) {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        if (b.name.toUpperCase() > a.name.toUpperCase()) {
          return -1;
        }
        return 0;
      });
      state.courses = action.payload;
    },
    getCoursesByZA: (state, action) => {
      state.filters = action.payload.sort(function (a, b) {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return -1;
        }
        if (b.name.toUpperCase() > a.name.toUpperCase()) {
          return 1;
        }
        return 0;
      });
      state.courses = action.payload;
    },
    getCourseById: (state, action) => {
      state.course = action.payload;
    },
    createCourse: (state) => {
      return { ...state };
    },
    getCourseByName: (state, action) => {
      state.courses = action.payload;
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
    getSchoolsByName: (state, action) => {
      state.courses = action.payload;
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
    getVideosByName: (state, action) => {
      state.courses = action.payload;
    },
    // getSchoolsByName: (state, action) => {
    //   state.courses = action.payload;
    // },

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
  getCourseByName,
  getSchoolsByName,
  getVideosByName,
  getCoursesByAZ,
  getCoursesByZA,

  getCourse10more,
  getCourse10h,
  getCourse5h,
  getCourse3h,
} = slice.actions;

export default slice.reducer;
