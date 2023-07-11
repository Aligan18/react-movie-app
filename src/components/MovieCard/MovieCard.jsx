import React from "react";
import classes from "./MovieCard.module.css";
import useAddToFavorite from "../../hooks/useAddToFavorite";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteRouteId } from "../../lib/deleteRouteId/deleteRouteId";
import { routersPath } from "../../router/router";

const MovieCard = ({ info, handleDeleteFromFavorite }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const goToMoviePage = (info) => {
    const type = info.media_type ? info.media_type : "movie";
    navigate(`/movie/info/${type}-${info.id}`);
  };
  const { email, isAuth } = useAuth();

  const checkType = () => {
    if (info.poster_path !== undefined) {
      return info.poster_path;
    } else if (info.profile_path !== undefined) {
      return info.profile_path;
    }
  };

  const renderBookmarkButton = () => {
    if (deleteRouteId(location.pathname) === routersPath.FAVORITE_MOVIE) {
      return (
        <div
          onClick={() => handleDeleteFromFavorite(email, info.id)}
          className={classes.bookmark}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </div>
      );
    } else {
      return (
        <div onClick={() => addToFavorite()} className={classes.bookmark}>
          <i className="fa-solid fa-bookmark"></i>
        </div>
      );
    }
  };

  const addToFavorite = useAddToFavorite(
    info.id,
    info.type,
    info.title,
    info.name,
    checkType()
  );

  return (
    <>
      {(info.title || info.name) && (
        <div className={classes.main_wrapper}>
          <div className={classes.card}>
            <div className={classes.imgBox}>
              <img
                className={classes.img}
                alt=""
                src={`https://image.tmdb.org/t/p/w500/${checkType()}`}
              />
            </div>
            <div className={classes.hideTitle}>
              <div
                className={classes.link_wrapper}
                onClick={() => goToMoviePage(info)}
              >
                <div>
                  <h5> {info?.title}</h5>
                  <h5> {info?.name}</h5>
                  <h5> /{info?.character}</h5>
                </div>
              </div>
              {isAuth && renderBookmarkButton()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
