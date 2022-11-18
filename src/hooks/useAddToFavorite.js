
import { useAuth } from "./useAuth";
import axios from "axios";



const useAddToFavorite =(id , type ,title,name,poster_path )=>{
  const { email , isAuth} =  useAuth()
  const data = {
    id,
    type,
    title,
    poster_path,
    name,
  
}
   const addToFavorite =async()=>{
    const  emailArray = email.split(".")
   
    const response = await axios.put(`https://react-movie-app-337b2-default-rtdb.europe-west1.firebasedatabase.app/favorite_movie/${emailArray[0]}/${id}.json`, data)
    

}
if (isAuth) { return addToFavorite}

}

export default useAddToFavorite