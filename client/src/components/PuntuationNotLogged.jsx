import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"

import { getUsers, userOpinion} from "../redux/actions";

const PuntuationNotLogged = () => {

const dispatch = useDispatch();
const {users} = useSelector( (state) => state.programandoando)
console.log(users)

useEffect( () => {
    dispatch(getUsers())
}, [dispatch])


let usuarios = users;

function promedioPuntuacion(users) {
    let suma = 0
    let todos = 0
    for (let key in users) {
        if (users[key]["pagePuntuation"] > 0) {
            todos++
            suma+= users[key]["pagePuntuation"]
        }
    }
    let promedio = suma / todos
    const average = Math.round(promedio * 10) / 10
    return average;
}

let total = promedioPuntuacion(usuarios)
console.log(total)

    return(
           
        <div style={{backgroundColor: "#fff", borderRadius: 10, height: 600}} className="w-80 md:w-3/6 shadow-xl py-5 overflow-hidden hover:overflow-y-scroll scrolling-touch">
            <div style={{display: "flex", justifyContent: "center", color: 'rgb(55, 109, 109)'}} className="mb-1">
                <h1 className="font-bold">Calificacion Promedio</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}} className="my-3">
            <svg
                aria-hidden="true"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>{total}/10</span>
            </div>
            <div style={{display: "flex", justifyContent: "center", color: 'rgb(168, 76, 101)'}}>
                <p className="font-bold">Registrate para dejar tu FeedBack de la página</p>
            </div>
            <div className="mx-3 my-3">
            {Object.keys(users).length > 0 ? ( 
                users.map(
                    (user) => ( 
                    (user.pageOpinion !== "" && user.pagePuntuation !== 0? (
                        <ol className="mb-5 bg-gray-200  py-1 rounded-md">
                            <div style={{display: 'flex', justifyContent: 'center', color: 'rgb(55, 109, 109)'}}>
                                <p className="text-sm font-bold">{user.name}</p>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <p className="max-w-xs text-center text-sm my-1">{user.pageOpinion} </p>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <p style={{color: 'rgb(17, 52, 82)'}} className="text-sm font-bold">{user.pagePuntuation}</p>  
                            </div>
                            
                        </ol>
                        )
                        :  ""
                ))
            ) 
        )
        : "" } 
            </div>
        </div>
    )
}

export default PuntuationNotLogged;