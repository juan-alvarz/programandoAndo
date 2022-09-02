import React from "react";

import { NavLink, useLocation } from "react-router-dom";
import data from "../utils/data"
import Video from "./Video";
import Course from "./Course";
import { Paginated } from "./Paginated";
import { Videos } from "./Videos";
import { useEffect } from "react";



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


console.log(cursosfiltrados)

 
  

  
  return <div className="h-1000 p-100" >
           <div className="">
            
             {cursosfiltrados.length>0 ? 

                        <div className="">
                         <Course name={cursosfiltrados[0].name} description={cursosfiltrados[0].description}></Course>
                         </div>
              :<span>error</span>
             }
           </div>
           <div >
             {
              cursosfiltrados.length>0 ? 
              
              
              cursosfiltrados.map((elemento,index)=>{
                
                 return (
                     <div key={index}>
                         
                        
                         <div className="justify-center">
                            
                         
                             {elemento.course.map((el,index)=>{
                                 return(
                                   <div className="justify-center" key={index}>
                                      <div className="grid justify-items-center mt-4 mb-4 bg-gray-200 p-20">
                                      <h2 className="text-2xl">{el.name}</h2>
                                      <p>{el.description}</p>
                                      <p>Imagen: {el.image}</p>
                                      
                                      </div>
                                      
                                      <Videos videos={el.videos} name={name}></Videos>
                                     
                                     
                                    
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
            </div>
        </div>;
}

export default Courses;
