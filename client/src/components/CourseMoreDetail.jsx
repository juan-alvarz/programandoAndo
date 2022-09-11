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
  const handleOcultar=()=>{
    setHidden("none")
  }

  return (
    <div>
       <button onClick={handleMostrar} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-#A84C65 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-gray-200">More details</button>
    <div className=' p-10 bg-white backdrop-opacity-60  rounded-lg border border-gray-200 shadow-md hover:bg-gray-100' style={{display:hidden,position:position2,boxShadow: '2px 2px 9px #312928',width:"50%"}}>
        <div className='flex justify-end' style={{width:"100%"}}>
            <button className='bg-gray-700 text-white hover:bg-gray-300 hover:text-black rounded' style={{width:22,paddingBottom:3}} onClick={handleOcultar}>x</button>

        </div>
        <div>

        <p className="flex mt-10">{element.description}</p>
        </div>
        
            
    </div>
    </div>
    
  )
}