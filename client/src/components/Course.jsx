import React from "react";

function Course(props) {
  
  return <div className="grid justify-items-center mb-40 mt-40 ml-40 mr-40">
            <h1 className=" mb-10 mt-4 text-3xl font-bold tracking-tight text-gray-800">{props.name}</h1>
            <div className="">
            <p className="mb-6 text-lg text-gray-600 ">{props.description}</p>
            </div>
            
            

        </div>;
}

export default Course;
