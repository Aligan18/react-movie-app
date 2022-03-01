import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import loadingReducer from '../slices/loadingSlice'

 const store = configureStore({
    reducer:{
        user: userReducer,
        loading:loadingReducer,
    }
})
export default store
