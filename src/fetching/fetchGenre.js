import axios from "axios";

const key = '126c9b63ad6643b0be5be605e45bf5d5'

class FetchGenre{

    getGenresList =async()=>{
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`)
            return res.data.genres
        } catch (error) {
            return error
        }
       
    }

    getMovieListByGenres =async(genresId,page)=>{
        try {
            const id = genresId.join(',')
           
            const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&page=${page}&with_genres=${id}`)
            return res.data.results
        } catch (error) {
            return error
        }


    }


}

export default new FetchGenre()