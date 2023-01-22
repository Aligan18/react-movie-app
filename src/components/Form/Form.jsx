import React from 'react'
import classes from './Form.module.scss'


const Form = ({handleSubmit, typeForm, errors,onSubmit,typePage}) => {

  
   
      
  

  return (
    <div className={classes.body}>
    <div className={classes.wrapper}>
    
     <h1 className={classes.h1}>{typePage}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            
            {typeForm.map(form=>
              <div>

                <input {...form.validate}
                       
                        placeholder={form.placeholder}
                        key={form.placeholder}
                        className={classes.input} 
                />
                {[form.placeholder] in errors && <p className={classes.p}>{ errors[form.placeholder]?.message||"Error!" }</p>}
              </div>
            )}
          
            <input className={classes.input} type ='submit'/>
            <hr/>
            
                <h4 className={classes.p}>For testing use this</h4>
            <div className={classes.flex}>
                <h5 className={classes.h1}>Login : test@gmail.com </h5>
                <h5 className={classes.h1}>Password : testtest </h5>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Form