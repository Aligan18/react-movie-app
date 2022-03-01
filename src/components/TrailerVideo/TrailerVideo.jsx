import React from 'react';
import classes from './TrailerVideo.module.css';

const TreilerVideo = ({treilerKey}) => {
  return <div className={classes.videoBox}>
            <iframe className={classes.iframe} src={`https://www.youtube.com/embed/${treilerKey}`} frameborder="0" allowfullscreen/>
         
        </div>
};

export default TreilerVideo;
