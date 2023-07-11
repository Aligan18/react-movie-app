import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import classes from "./Overview.module.scss";
import { useNavigate } from "react-router-dom";
import MovieLineList from "../MovieLineList/MovieLineList";

const Overview = ({ movieInfo, similarMovie, pagination }) => {
  console.log(similarMovie);
  const navigate = useNavigate();
  const goToMoviePage = (info) => {
    console.log("info", info);
    const type = info.media_type ? info.media_type : "movie";

    navigate(`/movie/info/${type}-${info.id}`);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.description}>
        <h2 className={classes.h2}>{movieInfo.overview}</h2>
      </div>
      <div className={classes.related_movie}>
        <div className={classes.movieCards}>
          <MovieLineList
            cards={similarMovie}
            pagination={pagination}
            clickToCard={goToMoviePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
