import React, { useEffect, useState } from "react";
import SearchString from "../../components/SearchString/SearchString";
import SideBar from "../../components/SideBar/SideBar";
import IconSideBar from "../../components/IconSideBar/IconSideBar";
import classes from "./HomePage.module.scss";

import fetchMovie from "../../fetching/fetchMovie";
import fetchGenre from "../../fetching/fetchGenre";

import MovieLineList from "../../components/MovieLineList/MovieLineList";
import useLoading from "../../hooks/useLoading";
import AuthButtons from "../../components/AuthButtons/AuthButtons";
import useWindow from "../../hooks/useWindow";

const HomePage = () => {
  const changeLoading = useLoading();

  const [tvSerials, setTvSerials] = useState([{ movies: [] }]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [movieByGenres, setMovieByGenres] = useState([
    { movies: [{ genre_ids: [] }] },
  ]);
  const [popularMovie, setPopularMovie] = useState([{ movies: [] }]);

  const [WindowDimensions] = useWindow();
  const [showLeftSideBar, setShowLeftSideBar] = useState(
    window.innerWidth > 789
  );
  console.log(WindowDimensions);

  // переход на страницу с информацией

  // запрос списка жанров с Api
  const getGenresList = async () => {
    const res = await fetchGenre.getGenresList();
    setGenresList(res);
  };

  // запрос списка фильмов или сериалов в зависимости от type
  const getTvSerials = async (page) => {
    const res = await fetchMovie.getTvSerials(page);
    res && changeLoading(false);
    const newMovieList = [
      { title: "TV Serials", movies: [...tvSerials[0].movies, ...res] },
    ];

    setTvSerials(newMovieList);
  };

  // запрос списка фильмов по выбранным жанрам
  const getMovieListByGenres = async (page) => {
    function diff(a, b) {
      return a.filter(function (i) {
        return b.indexOf(i) < 0;
      });
    }
    const res = await fetchGenre.getMovieListByGenres(selectedGenres, page);
    res && changeLoading(false);
    console.log(
      diff(
        res[res.length - 1].genre_ids,
        movieByGenres[0].movies[movieByGenres[0].movies.length - 1]?.genre_ids
      )
    );
    const newMovieListById = [
      {
        title: "Movies by genres",
        movies: [...movieByGenres[0].movies, ...res],
      },
    ];
    setMovieByGenres(newMovieListById);
  };

  //запрос списка популярных фильмов
  const getPopularMovie = async (page) => {
    const res = await fetchMovie.getPopularMovie(page);
    res && changeLoading(false);
    const popMovie = [
      { title: "Popular Movies", movies: [...popularMovie[0].movies, ...res] },
    ];
    setPopularMovie(popMovie);
  };

  useEffect(() => {
    setMovieByGenres([{ movies: [{ genre_ids: [] }] }]);
    getMovieListByGenres(1);
  }, [selectedGenres]);

  useEffect(() => {
    getTvSerials(1);
    getGenresList();
    getPopularMovie(1);
  }, []);

  useEffect(() => {
    setShowLeftSideBar(window.innerWidth > 789);

    window.addEventListener("resize", () =>
      setShowLeftSideBar(window.innerWidth > 789)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setShowLeftSideBar(window.innerWidth > 789)
      );
  }, []);

  return (
    <div className={classes.home}>
      {showLeftSideBar ? (
        <div className={classes.sideBar}>
          <SideBar
            changeFlag={setShowLeftSideBar}
            flag={showLeftSideBar}
            genresList={genresList}
            setSelectedGenres={setSelectedGenres}
          />
        </div>
      ) : (
        <></>
      )}

      <div className={classes.movieList}>
        <div className={classes.search_sticky}>
          <div className={classes.input_wrapper}>
            <IconSideBar
              changeFlag={setShowLeftSideBar}
              flag={showLeftSideBar}
              className={classes.icon}
            />
            <div className={classes.search}>
              <SearchString />
            </div>
            <AuthButtons />
          </div>
        </div>

        <MovieLineList cards={popularMovie} pagination={getPopularMovie} />
        <MovieLineList cards={tvSerials} pagination={getTvSerials} />
        <MovieLineList
          cards={movieByGenres}
          pagination={getMovieListByGenres}
        />
      </div>
    </div>
  );
};

export default HomePage;
