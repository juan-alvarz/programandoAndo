import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "programandoando",
  initialState: {
    courses: [],
    users: [],
    detail: {},
  },
  reducers: {
    // getAllCharacters: (state, action) => {
    //   state.characters = action.payload;
    // },
    // getCharacterById: (state, action) => {
    //   state.detail = action.payload;
    // },
  },
});

// export const { getAllCharacters, getCharacterById } = characterSlice.actions;

export default slice.reducer;
