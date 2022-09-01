import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import data from "../utils/data"


function Courses() {
  const location = useLocation()
  const name=location.state
  let cursos= data;
  
  let cursosfiltrados=[]
  for(let i=0; i< cursos.length;i++){
    if(cursos[i].name===name){
      cursosfiltrados.push(cursos[i])
    }
  }
  

  
  return <div>
             {
              cursosfiltrados.length>0 ? cursosfiltrados.map((elemento,index)=>{
                 return (
                     <div key={index}>
                         <h1>{elemento.name}</h1>
                         <p>{elemento.description}</p>
                         <p>{elemento.course[0].name}</p>
                         
                     </div>
                 )
              }):
              <span>Error span</span>
             } 
        </div>;
}

export default Courses;
