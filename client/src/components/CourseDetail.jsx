import React from 'react'
import { CourseMoreDetail } from './CourseMoreDetail'

export const CourseDetail = ({element}) => {
    let el=element
    
    return (
        <div className="grid justify-items-center mt-4  bg-gray-200 pt-5 border-t-4 border-indigo-300">
            <h2 className="text-2xl mb-10">{el.name}</h2>
            <div className='mt-10 '>
               <img style={{maxHeight:150,maxWidth:300}} className="mb-10" src={el.image}></img> 
            </div>
            
            <CourseMoreDetail element={el}></CourseMoreDetail>
            
            

        </div>
    )
}
