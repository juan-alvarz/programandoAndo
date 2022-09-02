import React from 'react'
import { NavLink } from 'react-router-dom'
import data from "../utils/data"

export const DetailSchool = () => {
    
  return (
    <div>
        {
            data ? data.map((elemento,index)=>{
                let name=elemento.name
                 return (
                    <div key={index}>
                        <NavLink to="/courses" state={name=name}>{elemento.name}</NavLink>
                    </div>
                 )
            }):
            <span>Error</span>
        }
        
    </div>
  )
}