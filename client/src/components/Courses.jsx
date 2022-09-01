import React from "react";

import { NavLink, useLocation } from "react-router-dom";
import data from "../utils/data"
import Video from "./Video";
import Course from "./Course";


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

 
  

  
  return <div className=" text-black flex items-center justify-center" style={{padding:40}}>
           <div class="max-w-md">
             {cursosfiltrados.length>0 ? 

             <div className="flex items-center justify-center">
                         <Course name={cursosfiltrados[0].name} description={cursosfiltrados[0].description}></Course>
                         </div>
              :<span>error</span>
             }
           </div>
             {
              cursosfiltrados.length>0 ? 
              
              
              cursosfiltrados.map((elemento,index)=>{
                console.log(elemento)
                 return (
                     <div key={index}>
                         
                         <hr></hr>
                         <div className="flex justify-between">
                            
                         
                             {elemento.course.map((el,index)=>{
                                 return(
                                   <div key={index}>
                                      <h2>{el.name}</h2>
                                      <p>{el.description}</p>
                                      <p>Imagen: {el.image}</p>
                                      {
                                        el.videos.map((elemento,index)=>{
                                          return(
                                              <div key={index} style={{margin:10}} className="clablock p-6 max-w-sm bg-gray-800 rounded-lg border border-gray-200   hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 shadow-2xl">
                                                <NavLink to="/video">
                                                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-gray-800">{elemento.name}</h3>
                                                <p className="font-normal text-gray-400 dark:text-gray-900">{elemento.description}</p>
                                                </NavLink>
                                              </div>
                                          )
                                     })
          
        
                                      }
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
