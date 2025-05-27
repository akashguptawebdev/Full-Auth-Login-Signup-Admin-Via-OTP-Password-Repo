// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // uses localStorage by default
import { persistReducer, persistStore } from "redux-persist";
import { userReducer } from "./reducers/user/userReducer";
import { appReducer } from "./reducers/user/appReducer";

// Combine reducers with semantic keys
const rootReducer = combineReducers({
  user: userReducer,       // Renamed for cleaner access (e.g. state.user)
  app: appReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // persist only the user slice
};

// Wrap the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Export both store and persistor
export const persistor = persistStore(store);
export default store;
