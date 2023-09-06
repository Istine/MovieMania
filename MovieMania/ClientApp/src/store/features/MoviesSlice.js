import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searches: [],
  movies: [],
  currentMovie: {},
  isLoading: false,
  errorState: {
    status: false,
    heading: "",
    message: "",
  },
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSearches(state, action) {
      state.searches = action.payload;
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },

    setCurrentMovie(state, action) {
      state.currentMovie = action.payload;
    },

    setErrorStatus(state, action) {
      state.errorState = action.payload;
    },

    setMovies(state, action) {
      state.movies = action.payload;
    },
  },
});

export const {
  setSearches,
  setMovies,
  setLoading,
  setCurrentMovie,
  setErrorStatus,
} = movieSlice.actions;

export default movieSlice.reducer;
