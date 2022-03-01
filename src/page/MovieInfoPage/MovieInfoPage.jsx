import React, {useState, useEffect} from 'react';
import SideBar from '../../components/SideBar/SideBar'
import classes from './MovieInfoPage.module.css'

import Actors from '../../components/Actors/Actors'
import SearchString from '../../components/SearchString/SearchString';
import {Tabs , Tab } from 'react-bootstrap'
import Overview from '../../components/Overview/Overview';
import {useLocation} from 'react-router-dom'
import fetchMovie from '../../fetching/fetchMovie'
import TrailerVideo from '../../components/TrailerVideo/TrailerVideo';



import GoHomeButton from '../../components/GoHomeButton/GoHomeButton';
import useLoading from '../../hooks/useLoading';

const MoveInfoPage = () => {
    const changeLoading = useLoading()
   
   
    const location = useLocation()
    const  typeAndId = location.pathname.split('/')[3]
    const movieId = typeAndId.split('-')[1]

    const [movieType, setMovieType] = useState( typeAndId.split('-')[0])
   

    const [movieInfo , setMovieInfo] = useState([])
    const [similarMovie, setSimilarMovie] = useState([{movies:[]}])
    const [trailerKey , setTrailerKey] = useState('')
    const [actorsInfo , setActorsInfo] = useState()

    

    const getMovieInfoById= async(id, type)=>{

      const res = await fetchMovie.getMovieInfoById(id, type)
      if(res){
          setMovieInfo(res)
      }
      else{
        setMovieType('tv')
      }

    }
    const getSimilarMovieById =async( page )=>{
     
      const res = await fetchMovie.getSimilarMovieById(page,movieId,movieType )
      res && changeLoading(false)
      let newMovieList
      if (page ===1 ){
        newMovieList =[{title:'Similar Movies',movies:[...res]}]
      }
      else{
        newMovieList =[{title:'Similar Movies',movies:[...similarMovie[0].movies,...res]}]
      }

      setSimilarMovie(newMovieList)
    }

    const  getTrailerList = async (id, type) =>{
        const res = await fetchMovie.getTrailerList(id, type )
        setTrailerKey(res)
    }

    const  getActorsInfo= async(id,type) =>{
      const res = await fetchMovie.getActors(id, type )
      setActorsInfo(res)
    }

    useEffect(()=>{
        getMovieInfoById(movieId,movieType)
        getSimilarMovieById(1)
        getTrailerList(movieId,movieType)
        getActorsInfo(movieId,movieType)
    },[movieId,movieType])

   
  console.log( 'actors', actorsInfo)  

  return ( 
    <div className={classes.wrapper}>
        <div className={classes.posterBox}>
        <div>
               <GoHomeButton/>

            <div className={classes.poster}>
                <img className={classes.img} src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} />
            </div>  
        </div>  
        </div>
        <div className={classes.info}>
          <SearchString  />
          <div className={classes.titleBox}>
              <h1 className={classes.title}>{movieInfo?.title}</h1>
              <h1 className={classes.title}>{movieInfo?.name}</h1>
          </div>
          <div className={classes.infoTab}>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Home">
                  <Overview movieInfo={movieInfo} similarMovie={similarMovie} pagination={getSimilarMovieById}/>
                </Tab>
                <Tab eventKey="trailer" title="Trailer">
                  <TrailerVideo treilerKey= {trailerKey}/>
                </Tab>
                <Tab eventKey="actors" title="Actors">
                  <Actors actors={actorsInfo}/>
                </Tab>
            </Tabs>
          </div>

        </div>
     
    </div>

  ) 
}

export default MoveInfoPage;
