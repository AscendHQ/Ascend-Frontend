import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDefaultMiddleware().concat(api.middleware as any),
  // devTools:
  //   process.env.NODE_ENV !== "production" &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__(),
});
