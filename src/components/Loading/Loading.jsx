import React from 'react'
import classes from './Loading.module.css'

const Loading = () => {
  return (
    <div className={classes.wrapper}><i className={classes.loading+" fa-solid fa-atom"}></i></div> 
  )
}

export default Loading