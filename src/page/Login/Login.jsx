import React from 'react'
import classes from './Login.module.css'
import GoHomeButton from '../../components/GoHomeButton/GoHomeButton'
import Form from '../../components/Form/Form'
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form'
import auth from '../../firebase/firebase'

import {setUser} from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux';




const Login = () => {
    const dispatch = useDispatch()
    const { register,
        handleSubmit,
        formState:{errors},
       } = useForm({
         mode:"onBlur"
       });

    const signIn = [
       
        {placeholder:'email',
        validate:{...register("email", { required: 'Поле обязательно к заполнению ', 
                                        pattern: {
                                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message:"Не верный Email адрес",
                                      }, })}
        },
        {placeholder:'password',
        validate:{...register("password", { required: 'Поле обязательно к заполнению ', 
                                            minLength: {value:8 ,message: "Минимум  8 знаков "}} )}
        }
     ]

    const onSubmit =(data)=>{
        const email = data.email
        const password = data.password

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
           console.log(user)
           dispatch(setUser({ email:user.email,
                              id:user.uid, 
                              token:user.accessToken
                            }))
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    }
 
  return (<div className={classes.wrapper}>
    <div className={classes.goBack}>
        <GoHomeButton/>
    </div>
    <div className ={classes.form}>
        <Form handleSubmit={handleSubmit} typeForm={signIn} errors={errors} onSubmit={onSubmit} typePage={'Login'}/>
    </div>
</div>
  
  )
}

export default Login