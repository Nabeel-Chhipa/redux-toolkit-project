import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncShows } from "../../features/movies/movieSlice";
import user from "../../images/user.jpg";
import "./Header.scss";

const Header = () => {

  const [term, setTerm] = useState()
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(fetchAsyncMovies(term))
    dispatch(fetchAsyncShows(term))
    setTerm('')
  }

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">Movie app</Link>
        </div>
        <div className="searchBar">
          <form onSubmit={handleSearch}>
            <input type='text' value={term} onChange={e => setTerm(e.target.value)} placeholder="Search Movies Or Shows"/>
          </form>
        </div>
        <div className="user-image">
          <img src={user} alt="user" />
        </div>
      </div>
    </>
  );
};

export default Header;
