import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './NavBar'
import { getUser,updateUser } from '../redux/actions'
import { useEffect } from 'react'
import { useState } from 'react'

export const Favorites = () => {
  const { favoritesUser} = useSelector(state => state.programandoando)
  
  //usuario registrado
  let userLocal=window.localStorage.getItem("user")
  let userObj=JSON.parse(userLocal)
  //////////////////
  const [favoritos,setFavoritos]=useState([])
  const dispatch=useDispatch()
  useEffect(() => {
    if(userObj){

      dispatch(getUser(userObj.user._id));
    }
  }, [dispatch]);
  const { user} = useSelector(state => state.programandoando)
    let userActualizado = JSON.parse(JSON.stringify(user?user:null))
  
  console.log(userActualizado)
  useEffect(() => {
   
  }, [userActualizado.favorites]);  
   
  
  return (
    <div>
      <NavBar></NavBar>
      <h1>Favorites courses!</h1>
      {
        userActualizado.favorites ? userActualizado.favorites.map((el, index) => {
          console.log(el)
          if(el===null){
            <></>
          }else{

         
          return (
            <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{el}</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{"hola"}</p>
              <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
              <button onClick={()=>{
                   console.log(el)
                   
                   
                   for(let i=0;i<userActualizado.favorites.length;i++){
                    if(userActualizado.favorites[i]===el){
                      userActualizado.favorites[i]=undefined
                      
                    }
                   }
                   setFavoritos("actualizado")
                   dispatch(updateUser(userActualizado,userActualizado._id))
                   
              }}>X</button>
            </div>



          )
        }


        })
          : <span>error Debes estar logeado</span>}
    </div>
  )
}
