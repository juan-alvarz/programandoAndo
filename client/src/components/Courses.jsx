import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import data from "../utils/data"
import Video from "./Video";


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
                         <h2>VIDEOS</h2>
                         <hr></hr>
                         <div>
                             {elemento.course[0].videos.map((elemento,index)=>{
                                  return(
                                      <div>
                                        <Video></Video>
                                        <h3>{elemento.name}</h3>
                                        <p>{elemento.description}</p>
                                      </div>
                                  )
                             })

                             }

                         </div>
                         
                     </div>
                 )
              }):
              <span>Error span</span>
             } 
        </div>;
}

export default Courses;
