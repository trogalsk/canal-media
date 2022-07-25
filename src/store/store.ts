import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import mediaReducer from "./mediaSlice";
import configurationReducer from "./configurationSlice";

export function createStore() {
  return configureStore({
    reducer: {
      media: mediaReducer,
      configuration: configurationReducer,
    },
  });
}

export const store = createStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
