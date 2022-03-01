import React from 'react';
import classes from './MovieCard.module.css'


const MovieCard = ({info, handleClick}) => { 

 const  checkType=()=>{

      if (info.poster_path !== undefined){
        return info.poster_path
      }
      else if (info.profile_path !== undefined){
        return info.profile_path
      }

  }



  return<> {(info.title||info.name) && <div onClick={()=>handleClick(info)} className={classes.card}>
            <div className={classes.imgBox}>
              <img className={classes.img} alt='' src={`https://image.tmdb.org/t/p/w500/${checkType()}`} />
            </div>
            <div className={classes.hideTitle}>
              <div>
              <h5 > {info?.title}</h5>
              <h5 > {info?.name}</h5>
              <h5> /{info?.character}</h5>
              </div>
            </div>  
        </div>}
    </> 
  
};

export default MovieCard;
