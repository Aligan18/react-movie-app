
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startLoading , finishLoading } from "../redux/slices/loadingSlice";

export default function useLoading (type){
    const dispatch = useDispatch()
  const { loading} =  useSelector(state=>state.loading)
  
  

    const changeLoading = useCallback((type)=>
        {
            if (type===true){
              dispatch( startLoading())
            }
            else if (type===false){
              dispatch( finishLoading())
            }
            else{
              return loading
            }
        },[])
    return changeLoading  
  
  
}