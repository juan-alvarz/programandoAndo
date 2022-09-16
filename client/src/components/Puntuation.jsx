import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"

import { getUser, getUsers} from "../redux/actions";


const Puntuation = () => {
 
const dispatch = useDispatch();
const {users, user} = useSelector( (state) => state.programandoando)
let userLocal = window.localStorage.getItem("user");
let userObj = JSON.parse(userLocal);

useEffect( () => {
    dispatch(getUsers())
    dispatch(getUser(userObj.user._id))
}, [dispatch])


// let usuarios = users;
// let usuario = user

// function promedioPuntuacion(users) {
//     let suma = 0
//     let todos = 0
//     for (let key in users) {
//         todos++
//         suma+= users[key]["pagePuntuation"]
//     }
//     let promedio = suma / todos
//     return promedio;
// }

//let total = promedioPuntuacion(usuarios)
//console.log(total)
//console.log(usuarios)
// console.log(usuarios[0].name)
//console.log(usuario.name)
// vamos a crear una ruta en el back que mande la informacion 
if(!Object.keys(users).length) {
    return <h2>Cargando Usuarios</h2>;
} else {
    return(
        <div>
            {/* <h1>Hola {usuario.name}</h1> */}
            <h1>Nos gustaria recibir tu puntuacion a cerca de la página y un comentario al respecto</h1>
            <input
            
            

            />
            <h1>{userObj.user._id}</h1>
            {/* <h3>Promedio de la página {total}</h3> */}
        </div>
    
    )
}
}

export default Puntuation;

