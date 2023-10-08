import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";

const rootReducer = combineReducers({
  //   counter: counterReducer,
  //   todos: todosReducer,
  user: userReducer,
});

export default rootReducer;
