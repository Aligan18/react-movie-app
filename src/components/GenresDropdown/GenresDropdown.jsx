import React, {useState, useRef,} from 'react';
import classes from './GenresDropdown.module.css'


const GenresDropdown = ({genresList , setSelectedGenres}) => {
  const form = useRef()
  const [show, setShow]= useState(false);
  let timer 

  const handleChange=()=>{ // при нажатии на жанр фильма записывает его в массив 
      clearTimeout(timer)
      timer= setTimeout(()=>{
        
              const counter = form.current.childElementCount // количество checkbox
              const inputs =  form.current 
              let newArray =[]
              
              for (let index = 0; index < counter; index++) {

                  const key= inputs[index].value
                  const value = inputs[index].checked // 
                  value &&(genresList.forEach(genre=>{
                            if(key=== genre.name){
                                  newArray.push(genre.id)
                            }
                          })) 

              }
              setSelectedGenres(newArray)

      },1000)
    }

  




  

  return (
        <div>
          <div onClick={()=>setShow(!show)} className={classes.public}>
              <i className="fas fa-chevron-circle-down"></i>
              <h6 className={classes.title}>Genres</h6>
          </div>
           
           {show &&
                    <div className={classes.hide}>
                      <form ref={form}>
                          { genresList.map(genre=>
                          
                            <div key={genre.id} className={classes.line}>
                                <h6>{genre.name}</h6>
                                <input onChange={()=>handleChange()} type="checkbox" value={genre.name}/>
                            </div>
                          
                          )}
                          
                      </form>
                    </div>
           } 
        </div>
 
  )};

export default GenresDropdown;
