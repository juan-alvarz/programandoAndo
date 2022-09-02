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
                        <NavLink className="hover:bg-gray-600 hover:text-white" style={{margin:10,padding:3,borderRadius:3}} to="/courses" state={name=name}>{elemento.name}</NavLink>
                    </div>
                 )
            }):
            <span>Error</span>
        }

    </div>
)}
