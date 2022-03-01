import React, {useState, useEffect} from 'react';
import classes from './SearchString.module.css';
import fetchMovie from '../../fetching/fetchMovie';
import { useNavigate } from 'react-router-dom';

const SearchString = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState()
    const [resultList, setResultList] = useState([])
    let timer
    const handleChange =(event)=>{
        clearTimeout(timer)

        setTimeout(()=>{
            setValue(event.target.value)
        },500)
        
    }

    const searchMovie =async(value)=>{

        const res = await fetchMovie.Search(value)
        setResultList(res)
    }

    useEffect(()=>{
        searchMovie(value)

    },[value])

    const handlerClick= (info)=>{
        setValue('')
        const type = info.media_type?  info.media_type :'movie'
        navigate(`/movie/info/${type}-${info.id}`)
       
    }

 

return <div className={classes.wrapper}>
            <div className={classes.searchBox}>

                <input onChange={(event)=>handleChange(event)} className={classes.search} type={'text'} /> 

            </div>
            { resultList && <div classes={classes.resultBox}>
                                {resultList.map(item=>
                                    {return item.title!=='UNdefined'&&
                                        <div className={classes.line} onClick={()=>handlerClick(item)}>
                                            <h5 > {item?.title}</h5>
                                            <h5 > {item?.name}</h5>
                                        </div>
                                    }   
                                )}
                            </div>
            }
        </div>
};

export default SearchString;
