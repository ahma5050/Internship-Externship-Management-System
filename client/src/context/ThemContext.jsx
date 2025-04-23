import { Children, createContext, useEffect, useState } from "react";
export const ThemContext=createContext()
export const ThemContextProvider=({children})=>{
const [darkMode, setDarkMode]=useState(false)
const darkModehandle=()=>{
      setDarkMode((prev)=> !prev);
}

//to ckeak if there are amode saved locatStorage !!
useEffect(()=>{
const savedMode=localStorage.getItem("Mode")
if(savedMode==="dark"){
      setDarkMode(true);
}
},[])

 //add or revmove darkMode to entair html and save the add mode to localstorage
useEffect(()=>{

      if(darkMode){
           document.documentElement.classList.add("dark") 
      }else{
            document.documentElement.classList.remove("dark")
            
      }

      localStorage.setItem("Mode", darkMode ? "dark" : "light")

},[darkMode])




return <ThemContext.Provider value={{darkModehandle, darkMode}}>{children}</ThemContext.Provider>
}

