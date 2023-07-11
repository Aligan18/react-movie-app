import React, { useEffect, useState } from "react";
import { fetchAllFavorite } from "../../fetching/fetchFavorite";
import classes from "./FavoriteMovie.module.scss";
import { useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard/MovieCard";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import { deleteFromFavorite } from "../../fetching/fetchFavorite";

const FavoriteMovie = () => {
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const { email } = useSelector((state) => state.user);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDeleteFromFavorite = async (email, id) => {
    await deleteFromFavorite(email, id);
    setIsRefreshing(!isRefreshing);
  };

  useEffect(() => {
    const getFavoriteMovie = async () => {
      const data = await fetchAllFavorite(email);
      const arrayData = Object.values(data);
      console.log(arrayData);
      setFavoriteMovie(arrayData);
    };

    getFavoriteMovie();
  }, [isRefreshing]);

  return (
    <div className={classes.wrapper}>
      <GoHomeButton />

      <div className={classes.list}>
        {favoriteMovie.map((movie) => (
          <MovieCard
            handleDeleteFromFavorite={handleDeleteFromFavorite}
            info={movie}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovie;
