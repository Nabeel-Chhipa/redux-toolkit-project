import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKEY } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const res = await movieApi.get(
      `?apikey=${APIKEY}&s=${term}&type=movie`
    );
    return res.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term) => {
    const res = await movieApi.get(
      `?apikey=${APIKEY}&s=${term}&type=series`
    )
    return res.data
  }
)

export const fetchAsyncMoviesOrShowsData = createAsyncThunk(
  'movies/fetchAsyncMoviesOrShowsData',
  async (id) => {
    const res = await movieApi.get(
      `?apikey=${APIKEY}&i=${id}&Plot=full`
    )
    return res.data
  }
)

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {}
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {}
    }
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncMoviesOrShowsData.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow
export default movieSlice.reducer;
