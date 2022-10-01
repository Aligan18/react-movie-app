import React, {useEffect, useState} from 'react'
import fetchAllFavorite from '../../fetching/fetchFavorite'
import classes from './FavoriteMovie.module.css'
import {useSelector} from 'react-redux'
import MovieCard from '../../components/MovieCard/MovieCard'

const FavoriteMovie = () => {
const [favoriteMovie , setFavoriteMovie] = useState([])
  const {email} = useSelector(state=>state.user)
  
  useEffect(()=>{
   const getFavoriteMovie = async()  =>{  
    const data = await fetchAllFavorite(email)
    const arrayData = Object.values(data)
    console.log(arrayData)
    setFavoriteMovie(arrayData)
  
  }
   getFavoriteMovie() 

  },[])

  return (
    <div className={classes.wrapper}>
      <div className={classes.background}>REACT MOVIE </div>
      
      <div className={classes.list}>
          {favoriteMovie.map(movie=>
            <MovieCard info={movie}/>
          )}
      </div>

    </div>
  )
}

export default FavoriteMovie