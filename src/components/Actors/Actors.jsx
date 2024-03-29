import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import classes from "./Actors.module.scss";

const Actors = ({ actors }) => {
  return (
    <div>
      {actors && (
        <div>
          <div className={classes.movieCards}>
            {actors.map(
              (actor) =>
                actor.profile_path && <MovieCard info={actor} actors={true} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Actors;
