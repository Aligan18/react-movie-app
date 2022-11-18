import React from 'react';
import classes from './MovieCard.module.css'
import useAddToFavorite from '../../hooks/useAddToFavorite'
import {useAuth} from '../../hooks/useAuth'


const MovieCard = ({info, handleClick}) => { 
  const {isAuth} = useAuth()

 const  checkType=()=>{

      if (info.poster_path !== undefined){
    
        return info.poster_path
      }
      else if (info.profile_path !== undefined){
        return info.profile_path
      }

  }

  const addToFavorite = useAddToFavorite(info.id , info.type,info.title,info.name, checkType())



  return<> {(info.title||info.name) && <div className={classes.main_wrapper}><div  className={classes.card}>
            <div className={classes.imgBox}>
              <img className={classes.img} alt='' src={`https://image.tmdb.org/t/p/w500/${checkType()}`} />
            </div>
            <div  className={classes.hideTitle}>
              <div className={classes.link_wrapper} onClick={()=>handleClick(info)}>
                  <div>
                    <h5 > {info?.title}</h5>
                    <h5 > {info?.name}</h5>
                    <h5> /{info?.character}</h5>
                  </div>
              </div>
              { isAuth && <div onClick={()=>addToFavorite()} className={classes.bookmark}><i className="fa-solid fa-bookmark"></i></div>}
            </div>  
        </div>
        </div>}
    </> 
  
};

export default MovieCard;
