import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import movieApi from '../../common/apis/movieApi'
import { APIKEY } from '../../common/apis/MovieApiKey'

const Home = () => {

  useEffect(() => {
    const movieText = 'Harry'
    const fetchMovie = async () => {
      const res = await movieApi.get(`?apikey=${APIKEY}&s=${movieText}&type=movie`)
        .catch(err => console.log('Error ', err))
        console.log('Movies ', res)
    }
    fetchMovie()
  }, [])

  return (
    <>
      <div className='banner-img'>
        <MovieListing />
      </div>
    </>
  )
}

export default Home