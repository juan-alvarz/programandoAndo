import React from "react";

import { NavLink, useLocation } from "react-router-dom";

import Video from "./Video";
import Course from "./Course";
import { Paginated } from "./Paginated";
import { Videos } from "./Videos";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import {getAllSchools} from "../redux/actions"
import { useState } from "react";
import { CourseDetail } from "./CourseDetail";



function Courses() {
  const dispatch=useDispatch()
  
  const {schools} = useSelector(state => state.programandoando)
  console.log(schools)
  const location = useLocation()
  const name=location.state
  let cursos= schools

  useEffect(() => {
    dispatch(getAllSchools())
  },[dispatch]);
  
  
  let cursosfiltrados=[]
  for(let i=0; i< cursos.length;i++){
    if(cursos[i].name===name){
      cursosfiltrados.push(cursos[i])
    }
  }


  




 
  

  
  return <div className="h-1000 p-100" >
           <div className="">
            
             {cursosfiltrados.length>0 ? 
                        

                        <div className="">
                         <Course name={cursosfiltrados[0].name} description={cursosfiltrados[0].description} ></Course>
                         
                         
                         
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
                         
                        
                         <div className="" style={{}}>
                            
                         
                             {elemento.courses.map((el,index)=>{
                                 return(
                                      <div className="justify-center" key={index}>
                                      
                                      <CourseDetail element={el}></CourseDetail>
                                      
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
