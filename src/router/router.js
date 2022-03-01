

import Registration from '../page/Registration/Registration'
import Login from '../page/Login/Login'
import HomePage from '../page/HomePage/HomePage'
import MovieInfoPage from '../page/MovieInfoPage/MovieInfoPage'
import FavoriteMovie from '../page/FavoriteMovie/FavoriteMovie'


export const  routersPath ={
    HOME: '/',
    MOVIE_INFO_PAGE:'/movie/info/',
    LOGIN:'/login',
    REGISTRATION:'/registration',
    FAVORITE_MOVIE: '/movie/favorite/'
}
export const dynamicRoutersPath ={
   
    MOVIE_INFO_PAGE:'/movie/info/:id',
    FAVORITE_MOVIE: '/movie/favorite/:id'
}


export const publicRouter =[

    {path:routersPath.HOME , element:<HomePage/> , exact:true},
    {path:dynamicRoutersPath.MOVIE_INFO_PAGE , element:<MovieInfoPage/> , exact:true},
    {path:routersPath.LOGIN , element:<Login/> , exact:true},
    {path:routersPath.REGISTRATION , element:<Registration/> , exact:true},
]

export const privateRouter =[

    {path:routersPath.HOME , element:<HomePage/> , exact:true},
    {path:dynamicRoutersPath.MOVIE_INFO_PAGE , element:<MovieInfoPage/> , exact:true},
    {path:dynamicRoutersPath.FAVORITE_MOVIE , element:<FavoriteMovie/> , exact:true},

]