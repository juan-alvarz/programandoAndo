import React from "react";
import { useState } from "react";

function Course(props) {

  const [info,setInfo]=useState("")

  let description=props.description


  const handleInfo=(e)=>{
      if(info===""){
        setInfo(description)
      }else{
        setInfo("")
      }

  }
  
  return <div className="grid justify-items-center  mt-40 ml-40 mr-40">
            <h1 className=" mb-10 mt-4 text-4xl font-bold tracking-tight text-gray-800">{props.name}</h1>
            <button onClick={handleInfo}>{"More info"}</button>
            <div className="w-80 mt-20">
                      <p className="mb-6 text-lg text-gray-600 ">{info}</p>
            </div>
            
            
            

        </div>;
}

export default Course;
