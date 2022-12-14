import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "programandoando",
  initialState: {
    userBanned: [],
    stateFilter: [],
    courses: [],
    course: {},
    schools: [],
    school: {},
    users: [],
    user: {},
    videos: [],
    video: {},
    foro: {},
    foros: [],
    filters: [],
    favoritesUser: [],
    notifications: [],
    chat: {},
    scoring: [],
    ownPath: [],
    usersHome:[]
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
      state.filters = action.payload.sort(function(a, b) {
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
      state.filters = action.payload.sort(function(a, b) {
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

    getFavoriteCourse: (state, action) => {
      state.favoritesUser = action.payload;
    },

    getScoringCourse: (state, action) => {
      state.scoring = action.payload;
    },
    getownPath: (state, action) => {
      state.ownPath = action.payload;
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
    getUsersHome: (state, action) => {
      let usuarios=[]
      for (let i = 0; i < 5; i++) {
        usuarios.push(action.payload[i]);
      }
      state.usersHome = usuarios;
    },
    getUserById: (state, action) => {
      state.user = action.payload;
    },

    loginUser: (state, action) => {
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

    //======== foros ==============
    getForos: (state, action) => {
      state.foros = action.payload;
    },
    getForo: (state, action) => {
      state.foro = action.payload;
    },
    // getSchoolsByName: (state, action) => {
    //   state.courses = action.payload;
    // },

    // filterByName: (state, action) => {
    //   state.stateFilter = action.payload;
    // },

    // ============SESSION=====================
    getSession: (state, action) => {
      state.user = action.payload;
    },

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
    // ============== Edit =====================
    updateSchool: (state) => {
      return { ...state };
    },
    updateCourse: (state) => {
      return { ...state };
    },
    updateVideo: (state) => {
      return { ...state };
    },
    updateUser: (state) => {
      return { ...state };
    },

    // ============== Delete ====================
    deleteSchool: (state) => {
      return { ...state };
    },
    deleteCourse: (state) => {
      return { ...state };
    },
    deleteVideo: (state) => {
      return { ...state };
    },
    deleteUser: (state) => {
      return { ...state };
    },
    deleteNotifications: (state) => {
      return { ...state };
    },
    // ============== Notification ====================
    getNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    // ============== Banned ==========================
    getAllUsersBanned: (state, action) => {
      state.userBanned = action.payload;
    },
    // ============== getChat ======================
    getChat: (state, action) => {
      state.chat = action.payload;
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
  getUsersHome,
  getUserById,
  createUser,
  getVideos,
  getVideo,
  getForo,
  getForos,
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
  getSession,
  getFavoriteCourse,
  getScoringCourse,
  getownPath,
  deleteSchool,
  deleteCourse,
  deleteVideo,
  deleteUser,
  deleteNotifications,
  getNotifications,
  uppdateSchool,
  uppdateCourse,
  uppdateVideo,
  uppdateUser,
  favoriteCourse,
  getAllUsersBanned,
  getChat,
} = slice.actions;

export default slice.reducer;
