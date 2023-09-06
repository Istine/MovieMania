import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/MoviesSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
