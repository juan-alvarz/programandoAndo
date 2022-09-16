import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"

import { getUser, getUsers} from "../redux/actions";


const Puntuation = () => {
 
const dispatch = useDispatch();
const {users, user} = useSelector( (state) => state.programandoando)

const usuario = window.localStorage.getItem("user");


let userObj = JSON.parse(usuario);

useEffect( () => {
    dispatch(getUsers())
}, [dispatch])


let usuarios = users;

function promedioPuntuacion(users) {
    let suma = 0
    let todos = 0
    for (let key in users) {
        todos++
        suma+= users[key]["pagePuntuation"]
    }
    let promedio = suma / todos
    return promedio;
}

let total = promedioPuntuacion(usuarios)
console.log(total)
//console.log(usuarios)
// console.log(usuarios[0].name)
//console.log(usuario.name)
// vamos a crear una ruta en el back que mande la informacion 
if(!usuario) {
    <div>
        <h2>Inicia sesión para dejar tu feedback de la página aun hazlo aqui {}</h2>
            {Object.keys(users).length > 0 ? (
                users.map(
                    (usuario) => {
                        <ol>
                             <h1>{usuario.name}</h1>
                             <h1>{usuario.pagePuntuation}</h1>
                             <h1>{usuario.pageOpinion}</h1>
                        </ol>
                       
                    }
                )
            )
            : 
            <h1>Se el primero en dejar feedback sobre la página</h1>}
    </div>
} else {
    return(
        <div>
           <h1>Hola {user.name}</h1>
            <h1>Nos gustaria recibir tu puntuacion a cerca de la página y un comentario al respecto</h1>
            <input

            />
            {/* <h1>{userObj.user._id}</h1> */} 
            <h3>Promedio de la página {total}</h3>
        </div>
    
    )
}
}

export default Puntuation;

