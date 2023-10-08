// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loading: false,
//   userInfo: {}, // for user object
//   userToken: null, // for storing the JWT
//   error: null,
//   success: false, // for monitoring the registration process.
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: {},
// });

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    // getAccessToken:
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
