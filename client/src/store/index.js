import { configureStore } from "@reduxjs/toolkit";
import { apiRegistration } from "./registration.api";
import userSlice from "./userSlice";
import fileSlice from "./fileSlice";

export const store = configureStore({
  reducer: {
    [apiRegistration.reducerPath]: apiRegistration.reducer,
    user: userSlice,
    file: fileSlice
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(apiRegistration.middleware)
})
