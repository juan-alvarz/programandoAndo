import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './NavBar'
import { favorite, getUser, updateUser } from '../redux/actions'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const Favorites = () => {

  

  //usuario registrado
  let userLocal = window.localStorage.getItem("user")
  let userObj = JSON.parse(userLocal)
  
  //////////////////
  const[elminado,setEliminado]=useState()
 
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(userObj){

      dispatch(getUser(userObj.user._id))
    }
    
  }, [dispatch]);
  const { user } = useSelector(state => state.programandoando)
  dispatch(favorite(user.favorites))
  const {favoritesUser}= useSelector(state => state.programandoando)
  let userActualizado = JSON.parse(JSON.stringify(user?user:null))
  console.log(favoritesUser)
  
  let favoritos=userActualizado.favorites.map(cursos =>{
    return [JSON.stringify(cursos),cursos]
  })
 let favoritosMap= new Map(favoritos)

 let favoritosUnicos=[...favoritosMap.values()]


  /*let personasMap = personas.map(persona => {
    return [JSON.stringify(persona), persona]
});
let personasMapArr = new Map(personasMap); // Pares de clave y valor

let unicos = [...personasMapArr.values()];*/


  return(
    <div>
       <NavBar></NavBar>
       {
         Object.entries(userActualizado).length === 0 ? <span>CARGANDO</span>  :favoritosUnicos.map(elemento => {
          
          return (
            <div key={elemento._id} className='grid grid-cols-3 gap-4 content-start'>
            <div class="p-6 m-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{elemento.name}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{elemento.description}</p>
            <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
            <button
              onClick={()=>{
                const filteredfavorites = userActualizado.favorites.filter((item) => item._id !== elemento._id)
                
                userActualizado.favorites=filteredfavorites
                
                dispatch(updateUser(userActualizado,userActualizado._id))
                dispatch(favorite(userActualizado.favorites))
                setTimeout(function () {
                  dispatch(getUser(userActualizado._id))
                },500);
                
                
              }}
            >X</button>
          </div>
          </div>

          )



        }) 
       }
     </div>
    
  )
 
 
}
