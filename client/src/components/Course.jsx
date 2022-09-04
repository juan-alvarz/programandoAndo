import React from "react";
import { useState } from "react";

function Course(props) {

  const [info,setInfo]=useState("")
  const [estilosCard,setEstilos]=useState("")
  const [infoBoton,setInfoBoton]=useState("More info")

  let description=props.description


  const handleInfo=(e)=>{
      if(info===""){
        setInfo(description)
        setEstilos("block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700")
        setInfoBoton("Close info")
      }else{
        setInfo("")
        setEstilos("")
        setInfoBoton("More info")
      }

  }
  
  
  return <div className="grid justify-items-center  mt-20 ml-40 mr-40">
            <h1 className=" mb-5 mt-4 text-4xl font-bold tracking-tight text-gray-700">{props.name}</h1>
            <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={handleInfo}>{infoBoton}</button>
            <div className={estilosCard}>
            
                      <p className="font-normal text-gray-700 dark:text-gray-400">{info}</p>
            </div>
            
            
            

        </div>;
}

export default Course;
