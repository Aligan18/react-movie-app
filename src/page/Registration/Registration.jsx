import React from 'react'
import Form from '../../components/Form/Form'
import classes from './Registration.module.css'
import GoHomeButton from '../../components/GoHomeButton/GoHomeButton'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import {auth} from '../../firebase/firebase'

const Registration = () => {

  
  const { register,
    handleSubmit,
    formState:{errors},
   } = useForm({
     mode:"onBlur"
   });

  const signUp = [
    {placeholder:'name',
    validate:{...register("name", { required: 'Поле обязательно к заполнению ' ,
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]/i,
                                      message:"Используйте латинский алфавит",
                                }, 
  })}},
    {placeholder:'email',
   
    validate:{...register("email", { required: 'Поле обязательно к заполнению ', 
                                    pattern: {
                                        value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message:"Не верный Email адрес",
                                  }, 
    })}
    },
    {placeholder:'password',
    validate:{...register("password", { required: 'Поле обязательно к заполнению ', 
                                        minLength: {value:8 ,message: "Минимум  8 знаков "}} )}
    }

 ]

 const onSubmit = (data) => {
  console.log(data)
  const email = data.email
  const password = data.password
  const displayName = data.name
  
  createUserWithEmailAndPassword(auth, email, password, displayName)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      
      console.log(user)


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // ..
    });
}



  return (<div className={classes.wrapper}>
    <div className={classes.goBack}>
        <GoHomeButton/>
    </div>
    <div className ={classes.form}>
        <Form handleSubmit={handleSubmit} typeForm={signUp} errors={errors} onSubmit={onSubmit} typePage={'Sign Up'}/>
    </div>
</div>
  )
}

export default Registration