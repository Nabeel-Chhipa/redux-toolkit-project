import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIKEY } from '../../common/apis/MovieApiKey'

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
  const movieText = 'Harry'
  const res = await movieApi.get(`?apikey=${APIKEY}&s=${movieText}&type=movie`)
  return res.data
})

const initialState = {
  movies: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('Pending')
    },
    [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
      console.log('Fetched Successfully')
      return {...state, movies: payload}
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('Rejected')
    }
  }
});

export const { addMovies } = movieSlice.actions
export const getAllMovies = state => state.movies.movies
export default movieSlice.reducer