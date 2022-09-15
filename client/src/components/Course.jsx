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
        setEstilos("flex py-5 max-w-xl justify-center text-center")
        setInfoBoton("Close info")
      }else{
        setInfo("")
        setEstilos("")
        setInfoBoton("More info")
      }
  }
  
  
  return <div className="grid justify-items-center mt-10" >
            <h1 className="mb-5 mt-2 text-2xl font-bold tracking-tight text-gray-700">{props.name}</h1>
            <button className="shadow-md shadow-gray-300 py-2 px-3 mx-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700" onClick={handleInfo}>{infoBoton}</button>
            <div className={estilosCard}>
                      <p style={{color: 'rgb(17, 52, 82)'}} className="font-medium text-sm">{info}</p>
            </div>
        </div>;
}

export default Course;
