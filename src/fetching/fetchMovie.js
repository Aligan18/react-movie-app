import axios from "axios";

const key = '126c9b63ad6643b0be5be605e45bf5d5'

class FetchMovie{

    getTvSerials =async( page)=>{
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${key}&language=en-US&page=${page}`)
           
            return res.data.results
            
        } catch (error) {
            return error
        }
       
    }

    getPopularMovie =async(page)=>{
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`)
            return res.data.results
        } catch (error) {
            return error
        }
       
    }

    getMovieInfoById = async(id,type)=>{


        try {   
            const res = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en`)
          
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    getSimilarMovieById= async(page,id, type )=>{
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${key}&language=en-US&page=${page}`)
          
            return res.data.results
            
        } catch (error) {
            
        }
    }

    getTrailerList = async(id, type)=>{
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${key}&language=en-US`)
          
           
            return res.data.results[0].key

        } catch (error) {
            
        }
    }

    Search = async(title)=>{
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${title}&page=1&include_adult=false`)
        
            return res.data.results
            

        } catch (error) {
            
        }
    }

    getActors =async(id , type )=>{
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${key}&language=en-US`)
            return res.data.cast
        } catch (error) {
            
        }
    }
    

}

export default new FetchMovie()