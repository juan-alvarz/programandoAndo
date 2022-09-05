import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesByName,getAllSchoolByName,getVideoByName} from "../redux/actions";

const SearchBar= ({path,setPagina}) => {

    
    const dispatch = useDispatch()
    const [name,setName] = useState('')

    const handleChange = (e) =>{
        e.preventDefault()
        setName(e.target.value)        
    }
    // console.log(path)
    const handlerSubmit = (e) =>{
        if(path === "schools"){
            e.preventDefault()     
            // dispatch(cleanFilter())  
            dispatch(getAllSchoolByName(name))
            setName('')
            setPagina(1)
        }
        if(path === "courses")
        {
            e.preventDefault()     
            // dispatch(cleanFilter())  
            dispatch(getCoursesByName(name))
            setName('')
            // console.log(name)
            // setPagina(1)
        }
        if(path === "videos"){
            e.preventDefault()     
            // dispatch(cleanFilter())  
            dispatch(getVideoByName(name))
            setName('')
            setPagina(1)
        }
    }   
    return (
        <div className="flex items-center">
            <div className="flex space-x-1">            
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-full focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search course..."
                    onChange={(event) =>handleChange(event) }
                />
                <button type="submit" onClick={(event) =>handlerSubmit(event) } className="px-4 text-white bg-gray-800 rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SearchBar


