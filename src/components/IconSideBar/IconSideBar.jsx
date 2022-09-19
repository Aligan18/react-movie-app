import React from 'react'
import classes from './IconSideBar.module.scss'

const IconSideBar = ( {changeFlag, flag}) => {
  return (
     <i onClick={()=>changeFlag(!flag)} className={classes.wrapper + " fa-solid fa-align-justify"}></i>
  )
}

export default IconSideBar