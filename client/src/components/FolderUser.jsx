import React from 'react'
import { useState } from 'react';
import { Favorites } from './Favorites'
import NavBar from './NavBar';
import UserCreatedCourse from './UserCreatedCourse';
import UserScoringCourse from "./UserScoringCourse";


export const FolderUser = () => {
   const[creados,setCreados]=useState("")
   const[score,setScore]=useState("")
   const[favoritos,setFavoritos]=useState("")

   const handleCreados=()=>{
     if(creados===""){
      setCreados("none")
     }else{
      setCreados("")
     }
   }
   const handleScore=()=>{
    if(score===""){
     setScore("none")
    }else{
     setScore("")
    }
  }

  const handleFavoritos=()=>{
    if(favoritos===""){
      setFavoritos("none")
    }else{
      setFavoritos("")
    }
  }



  return (
    <div >
      <NavBar></NavBar>
      <div  style={{marginLeft:"5%"}}>
      <div className='mt-10'>
        <div>
          <button onClick={handleCreados} className='mb-10 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>Cursos creados</button>
        </div>
            <div style={{display:creados}}>
             <UserCreatedCourse></UserCreatedCourse>
             </div>
      </div>
        <div>
        <div>
        <button onClick={handleScore} className='mb-10 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>Cursos votados</button>
        </div>
             <div style={{display:score}}>
            <UserScoringCourse></UserScoringCourse>
            </div>
        </div>
        <div>
        <div>
        <button onClick={handleFavoritos} className='mb-10 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>Favoritos</button>
        </div>
             <div style={{display:favoritos}}>
            <Favorites></Favorites>
            </div>
        </div>
        </div>
    </div>
  )
}
