import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import connectionReducer from "./connectionSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedSlice,
    connections:connectionReducer
  },
});

export default appStore;
