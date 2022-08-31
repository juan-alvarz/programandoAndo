import React from 'react'
import { NavLink } from 'react-router-dom'
import data from "../utils/data"

export const DetailSchool = () => {
    console.log(data)
  return (
    <div>
        {
            data ? data.map((elemento,index)=>{
                 return (
                    <div key={index}>
                        <NavLink to="/courses">{elemento.name}</NavLink>
                    </div>
                 )
            }):
            <span>Error</span>
        }
        
    </div>
  )
}
