import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import Swal from "sweetalert2";
import { getUser, getUsers, userOpinion} from "../redux/actions";

const Puntuation = () => {

const dispatch = useDispatch();
const [contador, setContador] = useState(1)
const {users, user} = useSelector( (state) => state.programandoando)
console.log(users)
const usuario = window.localStorage.getItem("user");

let userObj = JSON.parse(usuario);

useEffect( () => {
    dispatch(getUsers())
}, [user])



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
let total = promedioPuntuacion(users)
console.log(total)


const [opinionUser, setOpinionUser] = useState({
    opinion: "",
})
console.log(users)
console.log(opinionUser)

async function handleClickVote(e) {
    e.preventDefault();
    const { value: inputValue } = await Swal.fire({
      title: "Rate the oage",
      text: "You can rate this page in a range of 1 up to 5 starts",
      input: "range",
      inputLabel: "Your rate in stars ⭐",
      inputAttributes: {
        min: 1,
        max: 10,
        step: 1,
      },
      showCancelButton: true,
      confirmButtonText: "SEND PUNTUATION",
      backdrop: "rgba(96, 165, 250, .3)",
      showLoaderOnConfirm: true,
//      inputValue: 4,
    });
    if (inputValue) {
        const payload = {
            puntuation: Number(inputValue),
            opinion: opinionUser.opinion
        }
        console.log(payload)
        dispatch (userOpinion(userObj.user._id, payload))
        setOpinionUser({opinion: ""})
    //    window.location.reload(true);
    }
  }

function handleChange(e) {
    e.preventDefault();
    setOpinionUser({
        opinion: e.target.value,
    })
}

    return(
        <div style={{width: 500, backgroundColor: "#fff", borderRadius: 10, height: 600}} className="shadow-lg py-5 overflow-hidden hover:overflow-y-scroll scrolling-touch">
            <div >
                <div style={{display: "flex", justifyContent: "center", color: 'rgb(55, 109, 109)'}} className='font-bold'>
                    <p>Hello {user.name},</p>
                </div>
                <div style={{display: "flex", justifyContent: "center"}} className='px-10 my-5 text-center'>
                    {user.pageOpinion? <p>Tu opinion: {user.pageOpinion}</p>: <p>Your opinion is very important to us, we invite you to leave us your comment and give us a rating.</p>}
                </div>

           <div style={{display: 'flex', justifyContent: 'center'}} className="my-5">
            <input
            className="border border-gray-300 rounded-l-md pl-3"
             type="text"
             placeholder="Comment..."
             value = {opinionUser.opinion} 
             name="hola"
             onChange={(e) => handleChange(e)}
            />
            <button
            style={{width: 130, backgroundColor: 'rgb(55, 109, 109)'}}
            className="bg-blue-500 text-xs hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-r-md"
             type="submit"
             onClick={(e) => handleClickVote(e)}
             disabled={opinionUser.opinion? "": true}
            >Rate the page</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3 className="font-bold">Page average </h3>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}} className="mb-5">
                <div style={{display: "flex"}} className="content-center">
                <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span >{total}/10</span>
                </div>
            </div>
            </div>

            <div className="mx-3">
            {Object.keys(users).length > 0 ? ( 
                users.map(
                    (user) => ( 
                    (user.pageOpinion !== "" && user.pagePuntuation !== 0? (
                        <ol className="mb-5 bg-gray-200  py-1 rounded-md">
                            <div style={{display: 'flex', justifyContent: 'center', color: 'rgb(55, 109, 109)'}}>
                            <p className="text-sm font-bold">{user.name}</p>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                            <p className="text-sm my-1">{user.pageOpinion} </p>
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

export default Puntuation;

