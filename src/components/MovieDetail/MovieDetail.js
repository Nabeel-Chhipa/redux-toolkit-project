import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchAsyncMoviesOrShowsData,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";
import './MovieDetail.scss'

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  console.log("Data :", data);
  useEffect(() => {
    dispatch(fetchAsyncMoviesOrShowsData(imdbID));

    return () => {
      dispatch(removeSelectedMovieOrShow())
    }
  }, [dispatch, imdbID]);

  return (
    <>
      <div className="detailsMainWrapper">
        {
          Object.keys(data).length === 0 ?
          '...Loading' :
          <>
        <div className="detailsMainWrapper__image_wrapper">
          <img src={data.Poster} />
        </div>
        <div className="detailsMainWrapper__content_wrapper">
          <small style={{textTransform: 'capitalize'}}>{data.Type}</small>
          <h1 className="detailsMainWrapper__content_wrapper__title">
            Title: {data.Title}
          </h1>
          <h3>Actors: {data.Actors}</h3>
          <p>{data.Plot}</p>
          <p>Genre: {data.Genre}</p>
        </div>
        </>
        }
      </div>
    </>
  );
};

export default MovieDetail;
