import React, {useEffect,  useState} from 'react';
import SearchString from '../../components/SearchString/SearchString'
import SideBar from '../../components/SideBar/SideBar'
import IconSideBar from '../../components/IconSideBar/IconSideBar';
import classes from './HomePage.module.scss'

import fetchMovie from '../../fetching/fetchMovie'
import fetchGenre from '../../fetching/fetchGenre'
import { useNavigate} from 'react-router-dom'
import MovieLineList from '../../components/MovieLineList/MovieLineList';
 import useLoading from '../../hooks/useLoading';
import AuthButtons from '../../components/AuthButtons/AuthButtons';
import useWindow from '../../hooks/useWindow';






const HomePage = () => {
    const changeLoading = useLoading()
   
  
    const navigate = useNavigate()
    const [tvSerials, setTvSerials] = useState([{movies:[]}])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genresList, setGenresList] = useState([])
    const [movieByGenres, setMovieByGenres] = useState([{movies:[{genre_ids:[]}]}])
    const [popularMovie, setPopularMovie] = useState([{movies:[]}])


    const [WindowDimensions,desktopSize] = useWindow()
    const [showLeftSideBar , setShowLeftSideBar] = useState(window.innerWidth > 789)
    console.log(WindowDimensions)
    const [ setWindowDimensions] = useState( getWindowDimensions())
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }



    // переход на страницу с информацией 
    const goToMoviePage=(info)=>{
        const type = info.media_type?  info.media_type :'movie'
        navigate(`/movie/info/${type}-${info.id}`)
    }
    // запрос списка жанров с Api 
    const getGenresList = async()=>{
        const res = await fetchGenre.getGenresList()
        setGenresList(res)
    }

    // запрос списка фильмов или сериалов в зависимости от type
    const getTvSerials= async( page) =>{
       
        const res =  await fetchMovie.getTvSerials(page) 
        res && changeLoading(false)
        const newMovieList =[{title:'TV Serials',movies:[...tvSerials[0].movies,...res]}]
      
        setTvSerials(newMovieList)

    }

    // запрос списка фильмов по выбранным жанрам 
    const getMovieListByGenres= async(page)=>{
        function diff(a, b) {
            return a.filter(function(i) {return b.indexOf(i) < 0;});
            
        };
        const res = await fetchGenre.getMovieListByGenres(selectedGenres,page)
        res && changeLoading(false);
       console.log( diff(res[res.length-1].genre_ids, movieByGenres[0].movies[movieByGenres[0].movies.length-1]?.genre_ids))
        const newMovieListById = [{title:'Movies by genres',movies:[...movieByGenres[0].movies,...res]}]
        setMovieByGenres(newMovieListById)

    }

    //запрос списка популярных фильмов 
    const getPopularMovie= async(page)=>{


        const res =  await fetchMovie.getPopularMovie(page)
        res && changeLoading(false)
        const popMovie = [{ title:'Popular Movies',movies:  [...popularMovie[0].movies, ...res]}]
        setPopularMovie(popMovie)

    }

    // useEffect(()=>{
    //     Promise.all(getTvSerials(1))
    //     // дождаться выполнения всех
    //     .then((results) => {
    //         console.log('result',results)
    //      setMovieList(results)
    //     })
    //     // минус в том, что если хоть один руганется, то слетит всё. Но как я понял, 404 или 500 это не ошибка
    //     .catch(err => console.error(err))
    // },[])

   

    useEffect(()=>{
        setMovieByGenres([{movies:[{genre_ids:[]}]}])
        getMovieListByGenres(1)
    },[selectedGenres])
    
   
    useEffect(()=>{
       
        getTvSerials(1)
        getGenresList()
        getPopularMovie(1)
    },[])

   
  useEffect(() => {
    setShowLeftSideBar(window.innerWidth > 789)

    window.addEventListener('resize',()=>setShowLeftSideBar(window.innerWidth > 789) );
    return () => window.removeEventListener('resize',()=>setShowLeftSideBar(window.innerWidth > 789));
  }, []);
    
    
    

  return <div className={classes.home}>
            { showLeftSideBar?
                <div className={classes.sideBar}>
                    <SideBar changeFlag={setShowLeftSideBar} flag={showLeftSideBar}  genresList={genresList} setSelectedGenres={setSelectedGenres}/>
                </div>
                :<></>
            }
              
              <div className={classes.movieList}>
                <div className={classes.search_sticky}>
                    <div className={classes.input_wrapper}>
                    <IconSideBar changeFlag={setShowLeftSideBar} flag={showLeftSideBar} className={classes.icon}/>
                        <div className={classes.search}>
                            <SearchString  />
                        </div>
                        <AuthButtons/>
                    </div>
                </div>

                <MovieLineList cards={popularMovie} pagination = {getPopularMovie} clickToCard={goToMoviePage}/>
                <MovieLineList cards={tvSerials}  pagination = {getTvSerials} clickToCard={goToMoviePage}/>
                <MovieLineList cards={movieByGenres} pagination = {getMovieListByGenres} clickToCard={goToMoviePage}/>
                
              </div>
        </div>;
};

export default HomePage;
