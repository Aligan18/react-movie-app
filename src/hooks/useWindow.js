import React , {useState} from 'react';



export default function useWindow () {
    const [WindowDimensions, setWindowDimensions] = useState( getWindowDimensions())
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
    function desktopSize() {
        setWindowDimensions(getWindowDimensions());
        if(window.innerWidth>789){
          return true
        }
        else{
          return false
        }
      }
      return [WindowDimensions,desktopSize]

}