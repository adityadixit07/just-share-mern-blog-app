import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/userReducer";
import { alertsSlice } from "./reducers/alertsSlice";
import otherProfileSlice from "./reducers/otherProfileReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const Store = configureStore({
  reducer: {
    // auth: authSlice.reducer,
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    alerts: alertsSlice.reducer,
    allUsers: otherProfileSlice.reducer,
  },
});
const persistor = persistStore(Store);

export { Store, persistor };
