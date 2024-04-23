import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/AuthSlice";
import InAppSlice from "../reducers/InAppSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    inapp: InAppSlice,
  },
});
