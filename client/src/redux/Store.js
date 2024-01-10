import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/userReducer";
import { alertsSlice } from "./reducers/alertsSlice";
import otherProfileSlice from "./reducers/otherProfileReducer";

const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alerts: alertsSlice.reducer,
    allUsers: otherProfileSlice.reducer,
  },
});

export default Store;
