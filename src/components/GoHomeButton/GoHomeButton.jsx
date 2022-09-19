import React from 'react'
import classes from './GoHomeButton.module.scss'
import  {useNavigate}  from 'react-router-dom'
import image from '../../source/logo.png'
import {routersPath } from '../../router/router'


const GoHomeButton = () => {

    const navigate = useNavigate()
    const goHome= ()=>{
        navigate(routersPath.HOME)
      }

      
  return (
    <div onClick={()=>goHome()} className={classes.logoBox}>
        <div className={classes.imgBox}>
            <img className={classes.logo} alt='' src={image}/>
        </div>
        <div className={classes.titleLogo}><h4>REACT MOVIE APP</h4></div>
    </div>
  )
}

export default GoHomeButton