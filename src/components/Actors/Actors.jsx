import React from 'react';
import MovieCard from '../MovieCard/MovieCard'
import classes from './Actors.module.css'

const Actors = ({actors}) => {
 

    
  return <div>
  
        {actors  && <div>
            <div className={classes.movieCards}>
                {actors.map(actor=>
                        
                    actor.profile_path && <MovieCard info={actor}/>
                    
                    )}     
            </div>

            </div>
        }
    </div>
}

export default Actors;
