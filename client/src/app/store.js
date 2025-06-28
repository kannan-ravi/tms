import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import messageReducer from "./features/messageSlice";
import toastReducer from "./features/toastSlice";
import loadingReducer from "./features/loadingSlice";
import teamReducer from "./features/teamSlice";
import chatReducer from "./features/chatSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  toast: toastReducer,
  loading: loadingReducer,
  team: teamReducer,
  chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
