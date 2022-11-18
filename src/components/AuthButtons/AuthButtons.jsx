import React from 'react'
import { useNavigate} from 'react-router-dom'
import classes from './AuthButtons.module.scss'
import {useAuth} from '../../hooks/useAuth'
import { removeUser } from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'

const AuthButtons = () => {
    const dispatch = useDispatch()
    const {isAuth} = useAuth()

    const navigate = useNavigate()
    const goToLogin=()=>{
        navigate('/login')
    }
    const goToSignUp=()=>{
        navigate('/registration')
    }
    const Logout = () =>{
        dispatch(removeUser())
    }


  return (<>
            {isAuth ?
                <button onClick={Logout} className={classes.buttons} >Logout</button>
            :
            <div >
                <button onClick={goToLogin} className={classes.buttons} >Login</button>
                <button onClick={goToSignUp} className={classes.buttons}> Sign Up</button>
            </div>

            }
        </>
  )
}

export default AuthButtons