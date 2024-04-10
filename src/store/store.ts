import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import { rootReducer } from "./rootReducer";

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = !import.meta.env.PROD ? [logger] : [];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
});