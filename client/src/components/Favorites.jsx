import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './NavBar'
import { favorite, getUser, updateUser } from '../redux/actions'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


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
       <NavBar/>
       {
         Object.entries(userActualizado).length === 0 ? <span>CARGANDO</span>  :favoritosUnicos.map(elemento => {
          
          return (
            <div key={elemento._id} className='grid grid-cols-3 gap-4 content-start'>
            <div class="p-6 m-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{elemento.name}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{elemento.description}</p>
            <button 
                        >
                        <NavLink
                          to={`/course/${elemento._id}`}
                          style={{
                            backgroundColor: "rgb(17, 52, 82)",
                            color: "rgb(201, 196, 184)",
                          }}
                            className="py-2.5 px-5 mr-2 mb-2 text-sm font-semi-bold focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                        >
                              Read more
                        </NavLink>
                      </button>
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