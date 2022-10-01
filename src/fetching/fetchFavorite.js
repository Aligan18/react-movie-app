import axios from 'axios';


const fetchAllFavorite =async( email) =>{
    const response = await axios.get(`https://react-movie-app-337b2-default-rtdb.europe-west1.firebasedatabase.app/favorite_movie/${email.split('.')[0]}.json`)
    return response.data

}

export default fetchAllFavorite