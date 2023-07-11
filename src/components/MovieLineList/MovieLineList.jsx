import React, { useState, useRef, useEffect } from "react";
import classes from "./MovieLineList.module.scss";
import MovieCard from "../MovieCard/MovieCard";
import Loading from "../Loading/Loading";
import useLoading from "../../hooks/useLoading";

const MovieLineList = ({ clickToCard, cards, pagination }) => {
  const changeLoading = useLoading();
  const isLoading = changeLoading();
  const [page, setPage] = useState(1);
  let endRef = useRef();
  let observer = useRef();

  useEffect(() => {
    console.log("isLoading", isLoading);
    if (isLoading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }

    const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
        setPage(page + 1);
        changeLoading(true);

        pagination(page);
      }
    };
    observer.current = new IntersectionObserver(callback);
    endRef.current && observer.current.observe(endRef.current);
  }, [cards, isLoading]);

  return (
    <>
      {cards.map((info) => (
        <div key={info.title}>
          <div className={classes.title}>
            <h4>{info.title}</h4>
          </div>

          <div className={classes.movieCards}>
            {info.movies.map((movie) => (
              <MovieCard key={movie.id} info={movie} />
            ))}
            <Loading />
            <div ref={endRef} />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieLineList;
