import React from 'react'

export const CourseDetail = ({element}) => {
    let el=element
    
    return (
        <div className="grid justify-items-center mt-4  bg-gray-200 pt-5 border-t-4 border-indigo-300">
            <h2 className="text-2xl">{el.name}</h2>
            <p className="flex">{el.description}</p>
            <div className='w-80 h-48 mt-10'>
               <img src={el.image}></img> 
            </div>
            

        </div>
    )
}
