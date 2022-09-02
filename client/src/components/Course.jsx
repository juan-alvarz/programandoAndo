import React from "react";

function Course(props) {
  
  return <div className="grid justify-items-center">
            <h1 className=" mb-3 mt-4 text-3xl font-bold tracking-tight text-gray-800">{props.name}</h1>
            <p className="mb-6 text-lg text-gray-600">{props.description}</p>
            

        </div>;
}

export default Course;
