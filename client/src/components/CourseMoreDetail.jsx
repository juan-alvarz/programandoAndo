import React from 'react'
import { useState } from 'react'

export const CourseMoreDetail = ({element}) => {

  const [hidden,setHidden]=useState("none")

  let position2="absolute"
  
  const handleMostrar=()=>{
    if(hidden==="none"){
        setHidden("")
    }else{
        setHidden("none")
    }
  }

  return (
    <div>
       <button onClick={handleMostrar} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">More details</button>
    <div className='grid justify-items-center mt-10 bg-gray-200  h-80 p-10 rounded-md' style={{display:hidden,position:position2,boxShadow: '2px 2px 9px #312928',width:"50%"}}>
        <p className="flex ">{element.description}</p>
            
    </div>
    </div>
    
  )
}
